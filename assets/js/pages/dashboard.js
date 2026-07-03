(function () {
  const catalog = window.KKOMA_CATALOG || { courses: [], progressKeys: [] };
  const WEEKLY_GOAL = 5;
  const SUBJECT_ORDER = ["english", "math", "korean"];
  const SUBJECT_LABELS = { english: "영어", math: "수학", korean: "한글" };
  const APP_KEYS = [
    "kkoma:lastTab",
    "kkoma:frame:english",
    "kkoma:frame:math",
    "kkoma:frame:korean",
    "kkoma:frame:story",
    "kkoma:frame:roadmap",
    "kidFestivalFavorites"
  ];

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key)) || [];
      return Array.isArray(value) ? value : [];
    } catch (e) {
      return [];
    }
  }

  function courseKeys(course) {
    if (course.key) return [course.key];
    return Array.isArray(course.keys) ? course.keys.slice() : [];
  }

  function courseDone(course) {
    if (course.strategy === "abc") {
      const paired = readArray("abc_done").length * 2;
      const split = readArray("abc_upper_done").length + readArray("abc_lower_done").length;
      return Math.min(course.total, Math.max(paired, split));
    }
    const key = courseKeys(course)[0];
    return Math.min(course.total, readArray(key).length);
  }

  function pct(done, total) {
    if (!total) return 0;
    return Math.round((done / total) * 100);
  }

  function todayKey(date) {
    const d = date || new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function dateFromKey(key) {
    const parts = String(key || "").split("-").map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }

  function allStudyDates() {
    const dates = new Set();
    catalog.progressKeys.forEach((key) => {
      readArray(key + "_streak").forEach((date) => {
        if (/^\d{4}-\d{2}-\d{2}$/.test(date)) dates.add(date);
      });
    });
    return Array.from(dates).sort();
  }

  function currentStreak(dates) {
    const set = new Set(dates);
    const today = new Date();
    let anchor = set.has(todayKey(today)) ? today : new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
    let count = 0;
    while (set.has(todayKey(anchor))) {
      count += 1;
      anchor.setDate(anchor.getDate() - 1);
    }
    return count;
  }

  function weeklyCount(dates) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
    const end = new Date(start);
    end.setDate(start.getDate() + 7);
    return dates.filter((key) => {
      const d = dateFromKey(key);
      return d && d >= start && d < end;
    }).length;
  }

  function summary() {
    const subjects = {};
    SUBJECT_ORDER.forEach((subject) => {
      subjects[subject] = { subject: subject, label: SUBJECT_LABELS[subject], done: 0, total: 0, active: 0 };
    });

    const courses = catalog.courses.map((course) => {
      const done = courseDone(course);
      const total = course.total || 0;
      const item = Object.assign({}, course, { done: done, percent: pct(done, total) });
      if (subjects[course.subject]) {
        subjects[course.subject].done += done;
        subjects[course.subject].total += total;
        if (done > 0 && done < total) subjects[course.subject].active += 1;
      }
      return item;
    });

    const overall = SUBJECT_ORDER.reduce((acc, subject) => {
      acc.done += subjects[subject].done;
      acc.total += subjects[subject].total;
      return acc;
    }, { done: 0, total: 0 });

    return {
      courses: courses,
      subjects: SUBJECT_ORDER.map((subject) => subjects[subject]),
      overall: overall
    };
  }

  function renderSummary(data) {
    document.getElementById("overallDone").textContent = data.overall.done;
    document.getElementById("overallTotal").textContent = "/ " + data.overall.total;
    const percent = pct(data.overall.done, data.overall.total);
    document.getElementById("overallPercent").textContent = percent + "%";
    document.getElementById("overallBar").style.width = percent + "%";

    const dates = allStudyDates();
    const week = weeklyCount(dates);
    document.getElementById("overallStreak").textContent = currentStreak(dates) + "일";
    document.getElementById("weeklyStudy").textContent = "이번 주 " + week + "/" + WEEKLY_GOAL + "일";
  }

  function renderSubjects(subjects) {
    const grid = document.getElementById("subjectGrid");
    grid.innerHTML = "";
    subjects.forEach((subject) => {
      const percent = pct(subject.done, subject.total);
      const card = document.createElement("article");
      card.className = "subject-card";
      card.innerHTML =
        '<header><strong class="subject-name">' + subject.label + '</strong>' +
        '<strong class="subject-percent">' + percent + "%</strong></header>" +
        '<p class="course-meta">' + subject.done + " / " + subject.total + " 완료 · 진행 중 " + subject.active + "개</p>" +
        '<div class="subject-bar"><span style="width:' + percent + '%"></span></div>';
      grid.appendChild(card);
    });
  }

  function renderCourses(courses) {
    const list = document.getElementById("courseList");
    list.innerHTML = "";
    const active = courses
      .filter((course) => course.done > 0 && course.done < course.total)
      .sort((a, b) => b.percent - a.percent || b.done - a.done)
      .slice(0, 8);

    if (!active.length) {
      const note = document.createElement("p");
      note.className = "empty-note";
      note.textContent = "아직 진행 중인 코스가 없어요. 영어, 수학, 한글 탭에서 첫 학습을 시작해보세요.";
      list.appendChild(note);
      return;
    }

    active.forEach((course) => {
      const row = document.createElement("article");
      row.className = "course-row";
      row.innerHTML =
        '<div><div class="course-title"><strong>' + course.title + '</strong>' +
        '<span class="course-subject">' + course.subjectName + '</span></div>' +
        '<p class="course-meta">' + course.theme + " · " + course.done + " / " + course.total + " 완료</p>" +
        '<div class="subject-bar"><span style="width:' + course.percent + '%"></span></div></div>' +
        '<button class="course-open" type="button">열기</button>';
      row.querySelector(".course-open").addEventListener("click", () => openCourse(course));
      list.appendChild(row);
    });
  }

  function openCourse(course) {
    if (window.parent && window.parent !== window && typeof window.parent.openCatalogItem === "function") {
      window.parent.openCatalogItem({ target: course.subject, url: course.url });
      return;
    }
    location.href = "../../" + course.url;
  }

  function allowedStorageKeys() {
    const keys = new Set(APP_KEYS);
    catalog.progressKeys.forEach((key) => {
      keys.add(key);
      keys.add(key + "_streak");
      keys.add(key + "_stickers");
    });
    return keys;
  }

  function exportProgress() {
    const allowed = allowedStorageKeys();
    const items = {};
    allowed.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) items[key] = value;
    });

    const payload = {
      app: "kkoma-playground",
      version: 1,
      exportedAt: new Date().toISOString(),
      items: items
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kkoma-progress-" + todayKey() + ".json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setStatus("진도 파일을 만들었습니다.");
  }

  function importProgress(file) {
    if (!file) return;
    file.text().then((text) => {
      const data = JSON.parse(text);
      const items = data && (data.items || data.localStorage || data);
      if (!items || typeof items !== "object" || Array.isArray(items)) {
        throw new Error("invalid");
      }

      const allowed = allowedStorageKeys();
      let count = 0;
      Object.keys(items).forEach((key) => {
        if (!allowed.has(key)) return;
        const value = items[key];
        if (value === null) {
          localStorage.removeItem(key);
        } else if (typeof value === "string") {
          localStorage.setItem(key, value);
        } else {
          localStorage.setItem(key, JSON.stringify(value));
        }
        count += 1;
      });

      render();
      setStatus(count + "개 진도 항목을 가져왔습니다. 열린 코스 화면은 새로고침 후 반영됩니다.");
    }).catch(() => {
      setStatus("가져오기 파일을 읽지 못했습니다. JSON 백업 파일인지 확인해주세요.");
    });
  }

  function setStatus(message) {
    document.getElementById("backupStatus").textContent = message;
  }

  function bind() {
    document.getElementById("exportProgress").addEventListener("click", exportProgress);
    document.getElementById("importProgress").addEventListener("click", () => {
      document.getElementById("importFile").click();
    });
    document.getElementById("importFile").addEventListener("change", (event) => {
      importProgress(event.target.files[0]);
      event.target.value = "";
    });
  }

  function render() {
    const data = summary();
    renderSummary(data);
    renderSubjects(data.subjects);
    renderCourses(data.courses);
  }

  bind();
  render();
})();
