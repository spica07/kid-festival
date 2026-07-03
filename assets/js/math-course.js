// 수학 코스 페이지. TTS/보상 패널은 course-common.js(CourseCommon)를 사용한다.
(function () {
  const progress = CourseCommon.createProgress(STORAGE_KEY);
  const rewards = CourseCommon.createRewards(STORAGE_KEY);
  const speak = CourseCommon.createSpeaker({ lang: "ko-KR" });

  let doneDays = progress.load();
  let currentDay = 1;

  function setBubble(text) {
    document.getElementById("leoBubble").textContent = text;
  }

  function updateProgress() {
    const doneCount = doneDays.size;
    document.getElementById("doneCount").textContent = doneCount;
    document.getElementById("progressFill").style.width = (doneCount / lessons.length * 100) + "%";
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
      button.innerHTML =
        '<span class="d-num">' + lesson.day + '</span>' +
        '<span class="d-check">' + (doneDays.has(lesson.day) ? "✓" : "") + '</span>';
      button.addEventListener("click", () => selectDay(lesson.day));
      grid.appendChild(button);
    });
  }

  function renderLesson() {
    const lesson = lessons.find((item) => item.day === currentDay);
    const root = document.getElementById("lesson");
    const isDone = doneDays.has(lesson.day);

    let html =
      '<div class="lesson-head">' +
        '<span class="lesson-day">Day ' + lesson.day + '</span>' +
        '<span class="lesson-theme">' + lesson.theme + '</span>' +
      '</div>';

    html +=
      '<div class="lesson-hint">문제를 누르면 소리로 읽어줘요. 생각한 뒤 정답을 눌러보세요.</div>' +
      '<div class="prob-list">';

    lesson.items.forEach((item, index) => {
      html +=
        '<div class="prob">' +
          '<div class="prob-top">' +
            '<span class="prob-c">' + item.emoji + ' ' + item.c + '</span>' +
            '<button class="icon-btn say-btn" data-say="' + item.q + '" title="문제 듣기">🔊</button>' +
          '</div>' +
          (item.pic ? '<div class="prob-pic">' + item.pic + '</div>' : '') +
          '<div class="prob-q" data-say="' + item.q + '">' + item.q + '</div>' +
          '<button class="ans-btn" data-i="' + index + '" data-ans="' + item.a + '">정답 보기</button>' +
          '<div class="prob-a" id="ans' + index + '" hidden>👉 ' + item.a + '</div>' +
        '</div>';
    });

    html += '</div>';
    html +=
      '<button class="complete-btn ' + (isDone ? "is-done" : "") + '" id="completeBtn">' +
        (isDone ? "✓ 오늘 학습 끝! 잘했어요" : "오늘 학습 완료! ✓") +
      '</button>';
    html +=
      '<div class="nav-row">' +
        '<button class="nav-btn" id="prevBtn" ' + (currentDay <= 1 ? "disabled" : "") + '>← 이전 날</button>' +
        '<button class="nav-btn" id="nextBtn" ' + (currentDay >= lessons.length ? "disabled" : "") + '>다음 날 →</button>' +
      '</div>';

    root.innerHTML = html;

    root.querySelectorAll(".prob-q[data-say], .say-btn[data-say]").forEach((node) => {
      node.addEventListener("click", (event) => {
        event.stopPropagation();
        speak(node.getAttribute("data-say"));
      });
    });

    root.querySelectorAll(".ans-btn").forEach((button) => {
      button.addEventListener("click", () => {
        const answer = document.getElementById("ans" + button.getAttribute("data-i"));
        answer.hidden = !answer.hidden;
        if (!answer.hidden) speak(button.getAttribute("data-ans"));
      });
    });

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
    setDayLabel();
    document.getElementById("dayPanel").hidden = true;
    setBubble(greetings[0]);
    updateProgress();
    renderDays();
    renderLesson();
  });

  currentDay = firstUndoneDay();
  updateProgress();
  renderDays();
  renderLesson();
  setDayLabel();
  scrollToLesson();
})();
