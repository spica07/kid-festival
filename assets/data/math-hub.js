  const courses = [
    { file: "math-thinking-30days.html", emoji: "🦊", name: "사고력 수학 (종합)", theme: "수·비교·연산·도형·논리 골고루", key: "math_thinking_done", age: 6, days: 30, c1: "#34d399", c2: "#059669", soft: "#a7f3d0" },
    { file: "math-number-30days.html", emoji: "🐿️", name: "수와 연산", theme: "세기·가르기모으기·덧셈뺄셈", key: "math_number_done", age: 6, days: 30, c1: "#60a5fa", c2: "#2563eb", soft: "#bfdbfe" },
    { file: "math-shape-30days.html", emoji: "🐰", name: "도형과 공간", theme: "모양·입체·위치·방향", key: "math_shape_done", age: 6, days: 30, c1: "#a78bfa", c2: "#7c3aed", soft: "#ddd6fe" },
    { file: "math-measure-30days.html", emoji: "🦒", name: "측정", theme: "길이·무게·시간·돈 비교", key: "math_measure_done", age: 6, days: 30, c1: "#22d3ee", c2: "#0891b2", soft: "#a5f3fc" },
    { file: "math-pattern-30days.html", emoji: "🐝", name: "규칙과 분류", theme: "패턴·규칙·분류·짝짓기", key: "math_pattern_done", age: 6, days: 30, c1: "#f472b6", c2: "#db2777", soft: "#fbcfe8" },
    { file: "math-data-30days.html", emoji: "🦉", name: "자료와 논리", theme: "표·그래프·논리·추론", key: "math_data_done", age: 6, days: 30, c1: "#fbbf24", c2: "#d97706", soft: "#fde68a" },
    { file: "math-addsub-7.html", emoji: "➕", name: "예비초등 덧셈·뺄셈", theme: "20 안 연산·□가 있는 식·검산", key: "math_addsub7_done", age: 7, days: 30, c1: "#fb7185", c2: "#be123c", soft: "#fecdd3" },
    { file: "math-placevalue-7.html", emoji: "💯", name: "100까지 수", theme: "십의 자리·일의 자리·수 비교", key: "math_placevalue7_done", age: 7, days: 30, c1: "#38bdf8", c2: "#0369a1", soft: "#bae6fd" },
    { file: "math-time-money-7.html", emoji: "🕘", name: "시간과 돈", theme: "시계·달력·동전·물건 값", key: "math_time_money7_done", age: 7, days: 30, c1: "#f59e0b", c2: "#b45309", soft: "#fde68a" },
    { file: "math-geometry-7.html", emoji: "📐", name: "예비초등 도형과 공간", theme: "변·꼭짓점·위치·방향", key: "math_geometry7_done", age: 7, days: 30, c1: "#a78bfa", c2: "#6d28d9", soft: "#ddd6fe" },
    { file: "math-wordproblems-7.html", emoji: "📝", name: "수학 문장제", theme: "묻는 말 찾기·식 세우기·검산", key: "math_wordproblems7_done", age: 7, days: 30, c1: "#34d399", c2: "#047857", soft: "#a7f3d0" },
  ];
  window.EXTRA_HUB_CARDS = [
    {
      file: "math-numbers-writing.html",
      emoji: "✏️",
      name: "숫자 쓰기",
      theme: "1~10 숫자 따라쓰기",
      done: (function(){ try { const a = JSON.parse(localStorage.getItem("math_numbers_done")) || []; return Array.isArray(a) ? a.length : 0; } catch(e){ return 0; } })(),
      total: 10,
      unit: "개",
      age: 6,
      c1: "#34d399",
      c2: "#059669",
      soft: "#a7f3d0",
      startLabel: "쓰기 연습 →",
    },
  ];
