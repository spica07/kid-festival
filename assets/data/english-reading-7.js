const STORAGE_KEY = "english_reading7_done";
const greetings = ["리딩 첫걸음을 시작해요!", "짧은 문장을 눈으로 보고 소리 내어 읽어요.", "그림을 떠올리며 읽어봐요.", "오늘도 리더처럼 읽어봐요."];
const MSG = { allDone: "리딩 첫걸음 30일을 모두 끝냈어요!", cheer: (n) => n + "일째 리딩 성공!", undo: "다시 천천히 읽어봐요." };
const READING_THEMES = [
  "나 소개", "가족", "친구", "학교", "교실", "가방", "색깔", "모양", "숫자", "동물",
  "음식", "과일", "날씨", "옷", "놀이", "운동", "집", "방", "공원", "마트",
  "감정", "몸", "하루", "아침", "저녁", "위치", "동작", "질문", "복습 1", "복습 2",
];
const READING_WORDS = [
  { en: "name", ko: "이름", emoji: "🏷️", s: "My name is Min.", sk: "내 이름은 민이에요." },
  { en: "family", ko: "가족", emoji: "👨‍👩‍👧", s: "I love my family.", sk: "나는 가족을 사랑해요." },
  { en: "school", ko: "학교", emoji: "🏫", s: "I go to school.", sk: "나는 학교에 가요." },
  { en: "bag", ko: "가방", emoji: "🎒", s: "My bag is blue.", sk: "내 가방은 파란색이에요." },
  { en: "circle", ko: "원", emoji: "⭕", s: "I see a circle.", sk: "나는 원을 봐요." },
  { en: "three", ko: "셋", emoji: "3️⃣", s: "I have three blocks.", sk: "나는 블록 세 개가 있어요." },
  { en: "apple", ko: "사과", emoji: "🍎", s: "The apple is red.", sk: "사과는 빨간색이에요." },
  { en: "cloudy", ko: "흐린", emoji: "☁️", s: "It is cloudy today.", sk: "오늘은 흐려요." },
  { en: "jacket", ko: "재킷", emoji: "🧥", s: "I wear a jacket.", sk: "나는 재킷을 입어요." },
  { en: "soccer", ko: "축구", emoji: "⚽", s: "We play soccer.", sk: "우리는 축구를 해요." },
  { en: "kitchen", ko: "부엌", emoji: "🍳", s: "Dad is in the kitchen.", sk: "아빠는 부엌에 있어요." },
  { en: "park", ko: "공원", emoji: "🏞️", s: "We walk in the park.", sk: "우리는 공원에서 걸어요." },
  { en: "happy", ko: "행복한", emoji: "😊", s: "I am happy now.", sk: "나는 지금 행복해요." },
  { en: "hand", ko: "손", emoji: "✋", s: "Wash your hands.", sk: "손을 씻어요." },
  { en: "morning", ko: "아침", emoji: "🌅", s: "Good morning, mom.", sk: "좋은 아침이에요, 엄마." },
  { en: "under", ko: "아래", emoji: "⬇️", s: "The toy is under the bed.", sk: "장난감은 침대 아래에 있어요." },
  { en: "open", ko: "열다", emoji: "📖", s: "Open the book.", sk: "책을 펴요." },
  { en: "look", ko: "보다", emoji: "👀", s: "Look at the picture.", sk: "그림을 봐요." },
  { en: "small", ko: "작은", emoji: "🔹", s: "This is a small box.", sk: "이것은 작은 상자예요." },
  { en: "big", ko: "큰", emoji: "🔷", s: "That is a big bus.", sk: "저것은 큰 버스예요." },
];
const lessons = KID_COURSE_BUILDERS.makeEnglishLessons(READING_THEMES, READING_WORDS);
