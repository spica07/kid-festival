(function () {
  // C1·C5: 이어서 하기 카드 + 진행 초기화 버튼용 스타일 (허브 공통 1회 주입)
  (function injectEnhancementStyle() {
    if (document.getElementById("hub-enh-style")) return;
    const s = document.createElement("style");
    s.id = "hub-enh-style";
    s.textContent = [
      ".resume-card{display:flex;align-items:center;gap:14px;text-decoration:none;",
      "background:linear-gradient(135deg,var(--c1,#A8C5FF),var(--c2,#7FA8FF));border-radius:20px;",
      "padding:16px 18px;margin:0 0 16px;color:#fff;box-shadow:0 8px 22px rgba(80,80,140,.18);",
      "transition:transform .2s,box-shadow .2s;}",
      ".resume-card:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(80,80,140,.28);}",
      ".resume-emoji{font-size:2rem;flex:0 0 auto;width:52px;height:52px;border-radius:16px;",
      "background:rgba(255,255,255,.25);display:flex;align-items:center;justify-content:center;}",
      ".resume-body{flex:1;min-width:0;display:flex;flex-direction:column;gap:4px;}",
      ".resume-label{font-size:.8rem;opacity:.92;font-weight:700;}",
      ".resume-name{font-size:1.15rem;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}",
      ".resume-prog{display:flex;align-items:center;gap:8px;margin-top:2px;}",
      ".resume-track{flex:1;height:7px;background:rgba(255,255,255,.35);border-radius:99px;overflow:hidden;max-width:160px;}",
      ".resume-fill{display:block;height:100%;background:#fff;border-radius:99px;}",
      ".resume-cnt{font-size:.8rem;font-weight:700;white-space:nowrap;}",
      ".resume-go{flex:0 0 auto;font-weight:800;font-size:.95rem;background:rgba(255,255,255,.22);",
      "padding:8px 12px;border-radius:14px;white-space:nowrap;}",
      ".reset-progress-btn{margin-left:8px;}",
      "@media(max-width:480px){.resume-go{display:none;}.resume-name{font-size:1.05rem;}}"
    ].join("");
    document.head.appendChild(s);
  })();

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

  function courseTotal(course) {
    return course.total || course.days || 30;
  }

  function courseUnit(course) {
    return course.unit || "일";
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

    card.className = "card";
    card.href = course.file;
    card.style.setProperty("--c1", course.c1);
    card.style.setProperty("--c2", course.c2);
    card.style.setProperty("--soft", course.soft);
    card.innerHTML =
      '<span class="badge-done ' + (done >= total ? "show" : "") + '">완주!</span>' +
      '<div class="card-top"><div class="avatar">' + course.emoji + '</div>' +
      '<div><div class="card-name">' + course.name + '</div>' + badgeHtml + '<div class="card-theme">' + course.theme + '</div></div></div>' +
      '<div class="card-prog"><div class="track"><div class="fill" style="width:' + percent + '%"></div></div>' +
      '<span class="cnt">' + done + '/' + total + courseUnit(course) + '</span></div>' +
      '<span class="card-start">' + (course.startLabel || "시작하기 →") + '</span>';

    if (done >= total) card.classList.add("is-complete");
    return { card, done, total };
  }

  const grid = document.getElementById("grid");
  let totalDone = 0;
  let totalAll = 0;

  const extraCards = window.EXTRA_HUB_CARDS || [];
  extraCards.forEach((course) => {
    const result = createCard(course);
    grid.appendChild(result.card);
  });

  courses.forEach((course) => {
    const result = createCard(course);
    totalDone += result.done;
    totalAll += result.total;
    grid.appendChild(result.card);
  });

  const totalDoneNode = document.getElementById("totalDone");
  if (totalDoneNode) totalDoneNode.textContent = totalDone;

  const totalAllNode = document.getElementById("totalAll") || document.getElementById("totalAllNum");
  if (totalAllNode) totalAllNode.textContent = totalAll;

  const totalFill = document.getElementById("totalFill");
  if (totalFill) totalFill.style.width = Math.round(totalDone / totalAll * 100) + "%";

  let hideCompleted = true;
  const toggleBtn = document.getElementById("toggleDone");

  function applyHide() {
    grid.querySelectorAll(".card.is-complete").forEach((card) => {
      card.style.display = hideCompleted ? "none" : "";
    });

    toggleBtn.textContent = hideCompleted ? "완료한 과정 보이기" : "완료한 과정 숨기기";

    const visibleCount = [...grid.querySelectorAll(".card")].filter((card) => card.style.display !== "none").length;
    let note = document.getElementById("emptyNote");
    if (hideCompleted && visibleCount === 0) {
      if (!note) {
        note = document.createElement("div");
        note.id = "emptyNote";
        note.className = "empty-note";
        grid.insertAdjacentElement("afterend", note);
      }
      note.textContent = "모든 과정을 완주했어요. 완료한 과정 보이기를 눌러 다시 볼 수 있어요.";
      note.style.display = "";
    } else if (note) {
      note.style.display = "none";
    }
  }

  if (grid.querySelectorAll(".card.is-complete").length === 0) {
    toggleBtn.style.display = "none";
  }

  toggleBtn.addEventListener("click", () => {
    hideCompleted = !hideCompleted;
    applyHide();
  });
  applyHide();

  // C5: 진행 초기화 — 이 과목의 모든 코스 진행 기록(localStorage)을 비운다
  (function setupResetButton() {
    const toolbar = (toggleBtn && toggleBtn.parentElement) || (grid && grid.parentElement);
    if (!toolbar) return;

    const allKeys = [];
    extraCards.forEach((c) => { if (c.key) allKeys.push(c.key); });
    courses.forEach((c) => { if (c.key) allKeys.push(c.key); });
    if (!allKeys.length) return;

    const hasProgress = allKeys.some((k) => doneCount(k) > 0 || hasStreak(k) || hasStickers(k));

    const resetBtn = document.createElement("button");
    resetBtn.type = "button";
    resetBtn.className = "toggle-done-btn reset-progress-btn";
    resetBtn.textContent = "🔄 진행 초기화";
    resetBtn.disabled = !hasProgress;
    if (!hasProgress) resetBtn.style.opacity = "0.5";

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
    const candidates = [].concat(extraCards, courses).filter((c) => c && c.key && c.file);
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
        '<span class="resume-label">▶ 이어서 하기</span>' +
        '<span class="resume-name">' + c.name + '</span>' +
        '<span class="resume-prog"><span class="resume-track"><span class="resume-fill" style="width:' + percent + '%"></span></span>' +
        '<span class="resume-cnt">' + best.done + '/' + best.total + unit + '</span></span>' +
      '</span>' +
      '<span class="resume-go">계속하기 →</span>';

    const anchor = document.querySelector(".total-bar") || grid;
    if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(card, anchor);
  })();
})();
