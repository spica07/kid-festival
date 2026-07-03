const STORAGE_KEY = "english_school7_done";
const greetings = [
  "학교 영어를 미리 연습해요!",
  "교실에서 쓰는 말을 짧게 따라 해봐요.",
  "선생님 말을 듣고 대답하는 힘을 길러요.",
  "오늘도 학교 표현 다섯 개!",
];
const MSG = {
  allDone: "와! 학교 영어 30일을 모두 끝냈어요.",
  cheer: (n) => "잘했어요! " + n + "일째 학교 영어 성공!",
  undo: "다시 해도 괜찮아요. 천천히 말해봐요.",
};
const SCHOOL_THEMES = [
  "교실 물건", "등교 인사", "수업 시작", "듣고 따라 하기", "질문하기",
  "도움 요청", "친구와 말하기", "줄 서기", "책상 정리", "색칠하기",
  "쓰기 활동", "읽기 활동", "쉬는 시간", "점심 시간", "화장실 표현",
  "준비물", "규칙 말하기", "칭찬과 격려", "감정 말하기", "날씨 말하기",
  "요일 말하기", "숫자 말하기", "위치 말하기", "차례 지키기", "발표하기",
  "협동 활동", "마무리 인사", "복습 1", "복습 2", "초등 준비",
];
const SCHOOL_WORDS = [
  { en: "teacher", ko: "선생님", emoji: "👩‍🏫", s: "Hello, teacher.", sk: "안녕하세요, 선생님." },
  { en: "friend", ko: "친구", emoji: "🧒", s: "You are my friend.", sk: "너는 내 친구야." },
  { en: "classroom", ko: "교실", emoji: "🏫", s: "This is my classroom.", sk: "여기는 우리 교실이에요." },
  { en: "desk", ko: "책상", emoji: "🪑", s: "My book is on the desk.", sk: "내 책은 책상 위에 있어요." },
  { en: "book", ko: "책", emoji: "📖", s: "Open your book.", sk: "책을 펴세요." },
  { en: "pencil", ko: "연필", emoji: "✏️", s: "I write with a pencil.", sk: "연필로 써요." },
  { en: "eraser", ko: "지우개", emoji: "🧽", s: "Use an eraser.", sk: "지우개를 써요." },
  { en: "listen", ko: "듣다", emoji: "👂", s: "I listen carefully.", sk: "나는 잘 들어요." },
  { en: "read", ko: "읽다", emoji: "📚", s: "I can read.", sk: "나는 읽을 수 있어요." },
  { en: "write", ko: "쓰다", emoji: "📝", s: "I can write my name.", sk: "나는 내 이름을 쓸 수 있어요." },
  { en: "draw", ko: "그리다", emoji: "🎨", s: "I draw a house.", sk: "나는 집을 그려요." },
  { en: "line up", ko: "줄 서다", emoji: "🚶", s: "Line up, please.", sk: "줄 서 주세요." },
  { en: "wait", ko: "기다리다", emoji: "⏳", s: "I can wait.", sk: "나는 기다릴 수 있어요." },
  { en: "help", ko: "도움", emoji: "🤝", s: "Help me, please.", sk: "도와주세요." },
  { en: "question", ko: "질문", emoji: "❓", s: "I have a question.", sk: "질문이 있어요." },
  { en: "answer", ko: "대답", emoji: "💬", s: "I know the answer.", sk: "나는 답을 알아요." },
  { en: "again", ko: "다시", emoji: "🔁", s: "Say it again, please.", sk: "다시 말해 주세요." },
  { en: "bathroom", ko: "화장실", emoji: "🚻", s: "May I go to the bathroom?", sk: "화장실에 가도 될까요?" },
  { en: "lunch", ko: "점심", emoji: "🍱", s: "It is lunch time.", sk: "점심 시간이에요." },
  { en: "clean up", ko: "정리하다", emoji: "🧹", s: "Clean up your desk.", sk: "책상을 정리해요." },
];
const lessons = KID_COURSE_BUILDERS.makeEnglishLessons(SCHOOL_THEMES, SCHOOL_WORDS);
