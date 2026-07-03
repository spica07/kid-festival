const STORAGE_KEY = "english_sentences7_done";
const greetings = ["짧은 영어 문장을 말해봐요!", "I can으로 자신 있게 시작해요.", "질문과 대답을 한 문장씩 연습해요.", "오늘도 입으로 말하는 영어!"];
const MSG = { allDone: "30일 문장 말하기를 모두 끝냈어요!", cheer: (n) => n + "일째 문장 말하기 성공!", undo: "다시 말해도 괜찮아요." };
const SENTENCE_THEMES = [
  "I am", "I like", "I have", "I can", "I see", "I want", "This is", "That is", "It is",
  "Where is", "What is", "Who is", "How many", "Can you", "Do you like", "Yes 문장", "No 문장",
  "감정 문장", "날씨 문장", "색깔 문장", "위치 문장", "동작 문장", "가족 문장", "친구 문장",
  "학교 문장", "놀이 문장", "음식 문장", "하루 문장", "복습 1", "복습 2",
];
const SENTENCE_WORDS = [
  { en: "I am happy.", ko: "나는 행복해요.", emoji: "😊", s: "I am happy.", sk: "나는 행복해요." },
  { en: "I am ready.", ko: "나는 준비됐어요.", emoji: "🎒", s: "I am ready.", sk: "나는 준비됐어요." },
  { en: "I like apples.", ko: "나는 사과를 좋아해요.", emoji: "🍎", s: "I like apples.", sk: "나는 사과를 좋아해요." },
  { en: "I like books.", ko: "나는 책을 좋아해요.", emoji: "📚", s: "I like books.", sk: "나는 책을 좋아해요." },
  { en: "I have a pencil.", ko: "나는 연필이 있어요.", emoji: "✏️", s: "I have a pencil.", sk: "나는 연필이 있어요." },
  { en: "I have a bag.", ko: "나는 가방이 있어요.", emoji: "🎒", s: "I have a bag.", sk: "나는 가방이 있어요." },
  { en: "I can read.", ko: "나는 읽을 수 있어요.", emoji: "📖", s: "I can read.", sk: "나는 읽을 수 있어요." },
  { en: "I can jump.", ko: "나는 뛸 수 있어요.", emoji: "🏃", s: "I can jump.", sk: "나는 뛸 수 있어요." },
  { en: "I see a star.", ko: "나는 별을 봐요.", emoji: "⭐", s: "I see a star.", sk: "나는 별을 봐요." },
  { en: "I want water.", ko: "나는 물을 원해요.", emoji: "💧", s: "I want water.", sk: "나는 물을 원해요." },
  { en: "This is my desk.", ko: "이것은 내 책상이에요.", emoji: "🪑", s: "This is my desk.", sk: "이것은 내 책상이에요." },
  { en: "It is sunny.", ko: "날이 맑아요.", emoji: "☀️", s: "It is sunny.", sk: "날이 맑아요." },
  { en: "Where is my book?", ko: "내 책은 어디 있나요?", emoji: "❓", s: "Where is my book?", sk: "내 책은 어디 있나요?" },
  { en: "What is this?", ko: "이것은 무엇인가요?", emoji: "🔎", s: "What is this?", sk: "이것은 무엇인가요?" },
  { en: "How many stars?", ko: "별이 몇 개인가요?", emoji: "⭐", s: "How many stars?", sk: "별이 몇 개인가요?" },
  { en: "Can you help me?", ko: "나를 도와줄 수 있나요?", emoji: "🤝", s: "Can you help me?", sk: "나를 도와줄 수 있나요?" },
  { en: "Yes, I can.", ko: "네, 할 수 있어요.", emoji: "✅", s: "Yes, I can.", sk: "네, 할 수 있어요." },
  { en: "No, thank you.", ko: "아니요, 괜찮아요.", emoji: "🙏", s: "No, thank you.", sk: "아니요, 괜찮아요." },
  { en: "The ball is under the chair.", ko: "공은 의자 아래에 있어요.", emoji: "⚽", s: "The ball is under the chair.", sk: "공은 의자 아래에 있어요." },
  { en: "My friend is kind.", ko: "내 친구는 친절해요.", emoji: "🧒", s: "My friend is kind.", sk: "내 친구는 친절해요." },
];
const lessons = KID_COURSE_BUILDERS.makeEnglishLessons(SENTENCE_THEMES, SENTENCE_WORDS);
