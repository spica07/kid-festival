(function () {
  function courseTotal(course) {
    return course.total || course.days || 30;
  }

  function courseUnit(course) {
    return course.unit || "일";
  }

  function doneCount(key) {
    try {
      const items = JSON.parse(localStorage.getItem(key)) || [];
      return Array.isArray(items) ? items.length : 0;
    } catch (e) {
      return 0;
    }
  }

  function hasStreak(key) {
    try {
      return !!localStorage.getItem(key + "_streak");
    } catch (e) {
      return false;
    }
  }

  function hasStickers(key) {
    try {
      return !!localStorage.getItem(key + "_stickers");
    } catch (e) {
      return false;
    }
  }

  function createCard(course) {
    const total = courseTotal(course);
    const done = course.done == null ? doneCount(course.key) : course.done;
    const percent = Math.round(done / total * 100);
    const card = document.createElement("a");
    const badges = course.badges || (course.age ? [course.age + "세추천"] : []);
    const badgeHtml = badges.length
      ? '<div class="course-badges">' + badges.map((badge) => '<span class="course-badge">' + badge + '</span>').join("") + '</div>'
      : "";
    const startLabel = (course.startLabel || "시작하기").replace(/\s*(→|->)\s*$/, "");

    card.className = "card";
    card.href = course.file;
    card.style.setProperty("--c1", course.c1);
    card.style.setProperty("--c2", course.c2);
    card.style.setProperty("--soft", course.soft);
    card.innerHTML =
      '<span class="badge-done ' + (done >= total ? "show" : "") + '">' + (window.KFIcon ? KFIcon("checkCircle") : "") + '완주!</span>' +
      '<div class="card-top"><div class="avatar">' + course.emoji + '</div>' +
      '<div><div class="card-name">' + course.name + '</div>' + badgeHtml + '<div class="card-theme">' + course.theme + '</div></div></div>' +
      '<div class="card-prog"><div class="track"><div class="fill" style="transform:scaleX(' + (percent / 100) + ')"></div></div>' +
      '<span class="cnt">' + done + '/' + total + courseUnit(course) + '</span></div>' +
      '<span class="card-start">' + startLabel + (window.KFIcon ? KFIcon("chevronRight") : "") + '</span>';

    if (done >= total) card.classList.add("is-complete");
    return { card, done, total };
  }

  const mount = document.getElementById("grid");
  mount.classList.remove("grid");
  mount.classList.add("grid-groups");

  const extraCards = window.EXTRA_HUB_CARDS || [];
  const allCards = extraCards.concat(courses);

  const AGE_LABEL = { 6: "6세", 7: "7세" };
  const groupsByAge = new Map();
  const ageOrder = [];
  allCards.forEach((course) => {
    const key = course.age != null ? course.age : "etc";
    if (!groupsByAge.has(key)) {
      groupsByAge.set(key, []);
      ageOrder.push(key);
    }
    groupsByAge.get(key).push(course);
  });
  ageOrder.sort((a, b) => (a === "etc" ? 1 : b === "etc" ? -1 : a - b));

  let totalDone = 0;
  let totalAll = 0;

  ageOrder.forEach((ageKey) => {
    const list = groupsByAge.get(ageKey);
    const section = document.createElement("div");
    section.className = "age-group";
    if (AGE_LABEL[ageKey]) {
      const heading = document.createElement("h2");
      heading.className = "age-group-heading";
      heading.innerHTML = '<span class="n">' + AGE_LABEL[ageKey] + '</span> 학습';
      section.appendChild(heading);
    }
    const grid = document.createElement("div");
    grid.className = "grid";
    list.forEach((course) => {
      const result = createCard(course);
      totalDone += result.done;
      totalAll += result.total;
      grid.appendChild(result.card);
    });
    section.appendChild(grid);
    mount.appendChild(section);
  });

  const totalDoneNode = document.getElementById("totalDone");
  if (totalDoneNode) totalDoneNode.textContent = totalDone;

  const totalAllNode = document.getElementById("totalAll") || document.getElementById("totalAllNum");
  if (totalAllNode) totalAllNode.textContent = totalAll;

  const totalFill = document.getElementById("totalFill");
  if (totalFill) totalFill.style.transform = "scaleX(" + (totalAll ? totalDone / totalAll : 0) + ")";

  let hideCompleted = true;
  const toggleBtn = document.getElementById("toggleDone");

  function applyHide() {
    mount.querySelectorAll(".card.is-complete").forEach((card) => {
      card.style.display = hideCompleted ? "none" : "";
    });

    mount.querySelectorAll(".age-group").forEach((group) => {
      const anyVisible = [...group.querySelectorAll(".card")].some((card) => card.style.display !== "none");
      group.style.display = anyVisible ? "" : "none";
    });

    toggleBtn.textContent = hideCompleted ? "완료한 과정 보이기" : "완료한 과정 숨기기";

    const visibleCount = [...mount.querySelectorAll(".card")].filter((card) => card.style.display !== "none").length;
    let note = document.getElementById("emptyNote");
    if (hideCompleted && visibleCount === 0) {
      if (!note) {
        note = document.createElement("div");
        note.id = "emptyNote";
        note.className = "empty-note";
        mount.insertAdjacentElement("afterend", note);
      }
      note.textContent = "모든 과정을 완주했어요. 완료한 과정 보이기를 눌러 다시 볼 수 있어요.";
      note.style.display = "";
    } else if (note) {
      note.style.display = "none";
    }
  }

  if (mount.querySelectorAll(".card.is-complete").length === 0) {
    toggleBtn.style.display = "none";
  }

  toggleBtn.addEventListener("click", () => {
    hideCompleted = !hideCompleted;
    applyHide();
  });
  applyHide();

  // C5: 진행 초기화 — 이 과목의 모든 코스 진행 기록(localStorage)을 비운다
  (function setupResetButton() {
    const toolbar = (toggleBtn && toggleBtn.parentElement) || mount.parentElement;
    if (!toolbar) return;

    const allKeys = [];
    allCards.forEach((c) => { if (c.key) allKeys.push(c.key); });
    if (!allKeys.length) return;

    const hasProgress = allKeys.some((k) => doneCount(k) > 0 || hasStreak(k) || hasStickers(k));

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "toggle-done-btn reset-progress-btn";
    resetBtn.innerHTML = (window.KFIcon ? KFIcon("refresh") : "") + "진행 초기화";
    resetBtn.disabled = !hasProgress;

    resetBtn.addEventListener("click", () => {
      if (!window.confirm("이 과목의 학습 진행을 모두 초기화할까요?\n완료 표시가 사라지며 되돌릴 수 없어요.")) return;
      allKeys.forEach((k) => {
        try {
          localStorage.removeItem(k);
          localStorage.removeItem(k + "_streak");
          localStorage.removeItem(k + "_stickers");
        } catch (e) {}
      });
      location.reload();
    });

    toolbar.appendChild(resetBtn);
  })();

  // C1: '오늘 이어서 하기' 카드 — 진행 중(0<완료<전체)인 코스를 맨 위에 안내
  (function setupResumeCard() {
    const candidates = allCards.filter((c) => c && c.key && c.file);
    let best = null;
    candidates.forEach((c) => {
      const total = courseTotal(c);
      const done = c.done == null ? doneCount(c.key) : c.done;
      if (done > 0 && done < total && (!best || done > best.done)) {
        best = { course: c, done, total };
      }
    });
    if (!best) return;

    const c = best.course;
    const unit = courseUnit(c);
    const percent = Math.round(best.done / best.total * 100);

    const card = document.createElement("a");
    card.className = "resume-card";
    card.href = c.file;
    if (c.c1) card.style.setProperty("--c1", c.c1);
    if (c.c2) card.style.setProperty("--c2", c.c2);
    card.innerHTML =
      '<span class="resume-emoji">' + (c.emoji || "📚") + '</span>' +
      '<span class="resume-body">' +
        '<span class="resume-label">' + (window.KFIcon ? KFIcon("play") : "") + '이어서 하기</span>' +
        '<span class="resume-name">' + c.name + '</span>' +
        '<span class="resume-prog"><span class="resume-track"><span class="resume-fill" style="width:' + percent + '%"></span></span>' +
        '<span class="resume-cnt">' + best.done + '/' + best.total + unit + '</span></span>' +
      '</span>' +
      '<span class="resume-go">계속하기' + (window.KFIcon ? KFIcon("chevronRight") : "") + '</span>';

    const anchor = document.querySelector(".total-bar") || mount;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(card, anchor);
  })();
})();
