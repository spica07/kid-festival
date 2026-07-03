const STORAGE_KEY = "english_vocab7_done";
const greetings = ["초등 필수 영어 낱말을 익혀요!", "말하고 듣고 문장으로 써봐요.", "아는 단어가 많아질수록 읽기가 쉬워져요.", "오늘도 다섯 단어를 모아요."];
const MSG = { allDone: "초등 준비 어휘 30일을 모두 끝냈어요!", cheer: (n) => n + "일째 어휘 성공!", undo: "괜찮아요. 다시 외워봐요." };
const VOCAB_THEMES = [
  "학교", "가족", "친구", "몸", "감정", "음식", "과일", "채소", "집", "방",
  "옷", "날씨", "계절", "동물", "탈것", "장소", "색깔", "모양", "숫자", "요일",
  "동작", "위치", "크기", "느낌", "예절", "놀이", "공부", "자연", "복습 1", "복습 2",
];
const VOCAB_WORDS = [
  { en: "student", ko: "학생", emoji: "🧑‍🎓", s: "I am a student.", sk: "나는 학생이에요." },
  { en: "parent", ko: "부모님", emoji: "👪", s: "My parents love me.", sk: "부모님은 나를 사랑해요." },
  { en: "neighbor", ko: "이웃", emoji: "🏘️", s: "She is my neighbor.", sk: "그녀는 우리 이웃이에요." },
  { en: "shoulder", ko: "어깨", emoji: "💪", s: "Touch your shoulders.", sk: "어깨를 만져요." },
  { en: "excited", ko: "신난", emoji: "🤩", s: "I am excited.", sk: "나는 신나요." },
  { en: "breakfast", ko: "아침밥", emoji: "🍳", s: "I eat breakfast.", sk: "나는 아침밥을 먹어요." },
  { en: "vegetable", ko: "채소", emoji: "🥕", s: "I like vegetables.", sk: "나는 채소를 좋아해요." },
  { en: "blanket", ko: "담요", emoji: "🛌", s: "The blanket is soft.", sk: "담요가 부드러워요." },
  { en: "raincoat", ko: "비옷", emoji: "🧥", s: "Wear a raincoat.", sk: "비옷을 입어요." },
  { en: "spring", ko: "봄", emoji: "🌸", s: "Spring is warm.", sk: "봄은 따뜻해요." },
  { en: "library", ko: "도서관", emoji: "📚", s: "We read in the library.", sk: "우리는 도서관에서 읽어요." },
  { en: "triangle", ko: "삼각형", emoji: "🔺", s: "Find a triangle.", sk: "삼각형을 찾아요." },
  { en: "Monday", ko: "월요일", emoji: "📅", s: "Today is Monday.", sk: "오늘은 월요일이에요." },
  { en: "between", ko: "사이에", emoji: "↔️", s: "I sit between friends.", sk: "나는 친구들 사이에 앉아요." },
  { en: "quiet", ko: "조용한", emoji: "🤫", s: "Be quiet, please.", sk: "조용히 해 주세요." },
  { en: "share", ko: "나누다", emoji: "🤲", s: "I share my crayons.", sk: "나는 크레용을 나눠 써요." },
  { en: "practice", ko: "연습하다", emoji: "📝", s: "I practice every day.", sk: "나는 매일 연습해요." },
  { en: "garden", ko: "정원", emoji: "🌼", s: "Flowers grow in the garden.", sk: "정원에 꽃이 자라요." },
  { en: "because", ko: "왜냐하면", emoji: "💡", s: "I smile because I am happy.", sk: "행복해서 웃어요." },
  { en: "together", ko: "함께", emoji: "🤝", s: "We learn together.", sk: "우리는 함께 배워요." },
];
const lessons = KID_COURSE_BUILDERS.makeEnglishLessons(VOCAB_THEMES, VOCAB_WORDS);
