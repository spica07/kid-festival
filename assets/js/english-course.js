// 영어 코스 페이지. 캐러셀 CSS/TTS/보상 패널은 course-common.js(CourseCommon)를 사용한다.
(function () {
  CourseCommon.ensureCarouselCss();

  const progress = CourseCommon.createProgress(STORAGE_KEY);
  const rewards = CourseCommon.createRewards(STORAGE_KEY);
  const speak = CourseCommon.createSpeaker({ lang: "en-US" });

  let doneDays = progress.load();
  let currentDay = 1;

  function setBubble(text) {
    document.getElementById("leoBubble").textContent = text;
  }

  function updateProgress() {
    const doneCount = doneDays.size;
    document.getElementById("doneCount").textContent = doneCount;
    document.getElementById("progressFill").style.transform = "scaleX(" + (doneCount / lessons.length) + ")";
    rewards.updateStreakPanel();
  }

  function renderDays() {
    const grid = document.getElementById("dayGrid");
    grid.innerHTML = "";

    lessons.forEach((lesson) => {
      const button = document.createElement("button");
      button.className = "day-btn";
      if (doneDays.has(lesson.day)) button.classList.add("done");
      if (lesson.day === currentDay) button.classList.add("active");
      const check = doneDays.has(lesson.day) ? KFIcon("check") : "";
      button.innerHTML = '<span class="d-num">' + lesson.day + '</span><span class="d-check">' + check + '</span>';
      button.addEventListener("click", () => {
        selectDay(lesson.day);
      });
      grid.appendChild(button);
    });
  }

  function renderLesson() {
    const lesson = lessons.find((item) => item.day === currentDay);
    const root = document.getElementById("lesson");
    const isDone = doneDays.has(lesson.day);

    // 단어 한 개당 카드 1장(단어 + 문장 함께), 5장이 캐러셀로 동작
    let slidesHtml = "";
    lesson.words.forEach((word, i) => {
      slidesHtml +=
        '<div class="wc-slide">' +
          '<div class="wc-card">' +
            '<span class="wc-index">' + (i + 1) + " / " + lesson.words.length + '</span>' +
            '<div class="wc-emoji">' + word.emoji + '</div>' +
            '<div class="wc-word">' +
              '<div class="wc-en">' + word.en + '</div>' +
              '<div class="wc-ko">' + word.ko + '</div>' +
              '<button class="wc-speak" data-say="' + word.en + '" title="단어 발음 듣기">' + KFIcon("speaker") + ' 단어</button>' +
            '</div>' +
            '<div class="wc-divider"></div>' +
            '<div class="wc-sentence">' +
              '<div class="wc-sen-en">' + word.s + '</div>' +
              '<div class="wc-sen-ko">' + word.sk + '</div>' +
              '<button class="wc-play" data-say="' + word.s + '" title="문장 듣기">' + KFIcon("play") + ' 문장</button>' +
            '</div>' +
          '</div>' +
        '</div>';
    });

    let dotsHtml = "";
    lesson.words.forEach((word, i) => {
      dotsHtml +=
        '<button class="wc-dot' + (i === 0 ? " active" : "") + '" data-idx="' + i +
        '" type="button" aria-label="' + (i + 1) + '번째 단어"></button>';
    });

    const carouselHtml =
      '<div class="word-carousel">' +
        '<button class="wc-arrow wc-prev is-hidden" type="button" aria-label="이전 단어">' + KFIcon("chevronLeft") + '</button>' +
        '<div class="wc-track" id="wcTrack">' + slidesHtml + '</div>' +
        '<button class="wc-arrow wc-next" type="button" aria-label="다음 단어">' + KFIcon("chevronRight") + '</button>' +
      '</div>' +
      '<div class="wc-dots" id="wcDots">' + dotsHtml + '</div>';

    const prevDisabled = currentDay <= 1 ? "disabled" : "";
    const nextDisabled = currentDay >= lessons.length ? "disabled" : "";

    root.innerHTML =
      '<div class="lesson-head"><span class="lesson-day">Day ' + lesson.day + '</span>' +
      '<span class="lesson-theme">' + lesson.theme + '</span></div>' +
      '<div class="lesson-hint">카드를 옆으로 넘기거나 화살표로 단어를 바꿔요. 스피커·재생 버튼으로 발음을 들어요.</div>' +
      carouselHtml +
      '<button class="complete-btn ' + (isDone ? "is-done" : "") + '" id="completeBtn">' + KFIcon("check") +
      (isDone ? "오늘 학습 끝! 잘했어요" : "오늘 학습 완료!") + '</button>' +
      '<div class="nav-row"><button class="nav-btn" id="prevBtn" ' + prevDisabled + '>' + KFIcon("chevronLeft") + ' 이전 날</button>' +
      '<button class="nav-btn" id="nextBtn" ' + nextDisabled + '>다음 날 ' + KFIcon("chevronRight") + '</button></div>';

    root.querySelectorAll("[data-say]").forEach((node) => {
      node.addEventListener("click", (event) => {
        event.stopPropagation();
        speak(node.getAttribute("data-say"));
      });
    });

    CourseCommon.setupCarousel(root);

    document.getElementById("completeBtn").addEventListener("click", toggleComplete);
    document.getElementById("prevBtn").addEventListener("click", () => {
      if (currentDay > 1) selectDay(currentDay - 1);
    });
    document.getElementById("nextBtn").addEventListener("click", () => {
      if (currentDay < lessons.length) selectDay(currentDay + 1);
    });
  }

  function setDayLabel() {
    const label = document.getElementById("dayLabel");
    if (label) label.textContent = "Day " + currentDay;
  }

  function scrollToLesson() {
    if (location.hash) return;
    const lessonNode = document.getElementById("lesson");
    if (!lessonNode) return;
    requestAnimationFrame(() => {
      lessonNode.scrollIntoView({ block: "start" });
    });
  }

  function selectDay(day) {
    currentDay = day;
    document.getElementById("dayPanel").hidden = true;
    setDayLabel();
    setBubble("Day " + day + " 시작! " + greetings[day % greetings.length]);
    renderDays();
    renderLesson();
    document.getElementById("lesson").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function toggleComplete() {
    if (doneDays.has(currentDay)) {
      doneDays.delete(currentDay);
      setBubble(MSG.undo);
    } else {
      doneDays.add(currentDay);
      rewards.recordStudyDate();
      rewards.awardSticker(currentDay);
      setBubble(doneDays.size >= lessons.length ? MSG.allDone : MSG.cheer(doneDays.size));
    }

    progress.save(doneDays);
    updateProgress();
    renderDays();
    renderLesson();
  }

  function firstUndoneDay() {
    for (let day = 1; day <= lessons.length; day++) {
      if (!doneDays.has(day)) return day;
    }
    return 1;
  }

  document.getElementById("dayPickBtn").addEventListener("click", () => {
    const panel = document.getElementById("dayPanel");
    panel.hidden = !panel.hidden;
  });

  document.getElementById("resetBtn").addEventListener("click", () => {
    if (!confirm("정말 모든 진행 기록을 지울까요?")) return;
    doneDays = new Set();
    progress.save(doneDays);
    rewards.resetAll();
    currentDay = 1;
    setBubble(greetings[0]);
    updateProgress();
    renderDays();
    renderLesson();
    setDayLabel();
    document.getElementById("dayPanel").hidden = true;
  });

  currentDay = firstUndoneDay();
  updateProgress();
  renderDays();
  renderLesson();
  setDayLabel();
  scrollToLesson();
})();
