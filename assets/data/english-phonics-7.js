const STORAGE_KEY = "english_phonics7_done";
const greetings = [
  "예비초등 파닉스 탐험을 시작해요!",
  "소리를 듣고 입 모양을 크게 따라 해요.",
  "짧은 단어를 읽는 힘이 자라고 있어요.",
  "오늘도 다섯 단어를 또박또박 읽어봐요.",
];
const MSG = {
  allDone: "와! 30일 파닉스 코스를 모두 끝냈어요. 읽기 준비 완료!",
  cheer: (n) => "좋아요! " + n + "일째 파닉스 성공!",
  undo: "괜찮아요. 다시 천천히 소리 내어 읽어봐요.",
};
const PHONICS_THEMES = [
  "a 짧은 소리", "e 짧은 소리", "i 짧은 소리", "o 짧은 소리", "u 짧은 소리",
  "b와 p 소리", "c와 k 소리", "d와 t 소리", "f와 v 소리", "m과 n 소리",
  "s와 z 소리", "l과 r 소리", "h와 w 소리", "sh 소리", "ch 소리",
  "th 소리", "ee 긴 소리", "ai 긴 소리", "oa 긴 소리", "oo 소리",
  "at 가족 단어", "an 가족 단어", "in 가족 단어", "op 가족 단어", "ug 가족 단어",
  "bl과 cl", "br과 cr", "st와 sp", "읽기 복습 1", "읽기 복습 2",
];
const PHONICS_WORDS = [
  { en: "cat", ko: "고양이", emoji: "🐱", s: "The cat can sit.", sk: "고양이가 앉을 수 있어요." },
  { en: "map", ko: "지도", emoji: "🗺️", s: "I see a map.", sk: "나는 지도를 봐요." },
  { en: "bed", ko: "침대", emoji: "🛏️", s: "This is my bed.", sk: "이것은 내 침대예요." },
  { en: "pen", ko: "펜", emoji: "🖊️", s: "I have a pen.", sk: "나는 펜이 있어요." },
  { en: "pig", ko: "돼지", emoji: "🐷", s: "The pig is big.", sk: "돼지가 커요." },
  { en: "fish", ko: "물고기", emoji: "🐟", s: "A fish can swim.", sk: "물고기는 헤엄칠 수 있어요." },
  { en: "box", ko: "상자", emoji: "📦", s: "Open the box.", sk: "상자를 열어요." },
  { en: "sun", ko: "해", emoji: "☀️", s: "The sun is hot.", sk: "해가 뜨거워요." },
  { en: "cup", ko: "컵", emoji: "🥤", s: "This cup is red.", sk: "이 컵은 빨간색이에요." },
  { en: "bus", ko: "버스", emoji: "🚌", s: "The bus is here.", sk: "버스가 왔어요." },
  { en: "ship", ko: "배", emoji: "🚢", s: "The ship is big.", sk: "배가 커요." },
  { en: "chair", ko: "의자", emoji: "🪑", s: "Sit on the chair.", sk: "의자에 앉아요." },
  { en: "thin", ko: "얇은", emoji: "📄", s: "The paper is thin.", sk: "종이가 얇아요." },
  { en: "tree", ko: "나무", emoji: "🌳", s: "I see a tree.", sk: "나는 나무를 봐요." },
  { en: "rain", ko: "비", emoji: "🌧️", s: "Rain falls down.", sk: "비가 내려요." },
  { en: "boat", ko: "보트", emoji: "⛵", s: "The boat floats.", sk: "보트가 떠 있어요." },
  { en: "moon", ko: "달", emoji: "🌙", s: "The moon is bright.", sk: "달이 밝아요." },
  { en: "star", ko: "별", emoji: "⭐", s: "A star shines.", sk: "별이 반짝여요." },
  { en: "frog", ko: "개구리", emoji: "🐸", s: "The frog can hop.", sk: "개구리가 뛸 수 있어요." },
  { en: "clock", ko: "시계", emoji: "🕒", s: "Look at the clock.", sk: "시계를 봐요." },
  { en: "bread", ko: "빵", emoji: "🍞", s: "I eat bread.", sk: "나는 빵을 먹어요." },
  { en: "crab", ko: "게", emoji: "🦀", s: "The crab is red.", sk: "게가 빨개요." },
  { en: "stop", ko: "멈춰", emoji: "🛑", s: "Stop at the line.", sk: "선에서 멈춰요." },
  { en: "spin", ko: "돌다", emoji: "🌀", s: "I can spin.", sk: "나는 돌 수 있어요." },
  { en: "jump", ko: "뛰다", emoji: "🦘", s: "I jump high.", sk: "나는 높이 뛰어요." },
];
const lessons = KID_COURSE_BUILDERS.makeEnglishLessons(PHONICS_THEMES, PHONICS_WORDS);
