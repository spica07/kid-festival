  const NAME = "올리";
  const STORAGE_KEY = "english_owly_done";
  const greetings = [
    "부엉부엉! 나는 부엉이 올리야. 똑똑하게 영어 다섯 개 배워볼까?",
    "단어 카드를 누르면 내가 영어로 말해줄게! 🦉",
    "큰 소리로 따라 말해보자. 부엉!",
    "오늘도 멋지다! 우리 같이 똑똑하게 배워보자.",
  ];
  const MSG = {
    allDone: "우와! 30일 영어 모두 끝냈어! 정말 최고야! 🏆🦉",
    cheer: (n) => "참 잘했어요! " + n + "일째 성공! 부엉부엉~ 🎉",
    undo: "괜찮아! 다시 천천히 해보자. 🦉",
  };

  const lessons = [
  { day: 1, theme: "모양", words: [
    { en: "circle", ko: "동그라미", emoji: "⭕", s: "It is a circle.", sk: "그것은 동그라미예요." },
    { en: "square", ko: "네모", emoji: "🟦", s: "It is a square.", sk: "그것은 네모예요." },
    { en: "triangle", ko: "세모", emoji: "🔺", s: "I see a triangle.", sk: "나는 세모를 봐요." },
    { en: "star", ko: "별 모양", emoji: "⭐", s: "Look at the star.", sk: "별을 보세요." },
    { en: "heart", ko: "하트", emoji: "❤️", s: "It is a heart.", sk: "그것은 하트예요." },
    { en: "arrow", ko: "화살표", emoji: "➡️", s: "I see an arrow.", sk: "나는 화살표를 봐요." }
  ]},
  { day: 2, theme: "더 많은 모양", words: [
    { en: "oval", ko: "타원", emoji: "🥚", s: "It is an oval.", sk: "그것은 타원이에요." },
    { en: "diamond", ko: "마름모", emoji: "🔶", s: "I see a diamond.", sk: "나는 마름모를 봐요." },
    { en: "line", ko: "선", emoji: "➖", s: "It is a line.", sk: "그것은 선이에요." },
    { en: "dot", ko: "점", emoji: "🔵", s: "I see a dot.", sk: "나는 점을 봐요." },
    { en: "rectangle", ko: "직사각형", emoji: "🟫", s: "It is a rectangle.", sk: "그것은 직사각형이에요." },
    { en: "curve", ko: "곡선", emoji: "〰️", s: "It is a curve.", sk: "그것은 곡선이에요." }
  ]},
  { day: 3, theme: "기본 색깔", words: [
    { en: "red", ko: "빨강", emoji: "🔴", s: "The ball is red.", sk: "공은 빨간색이에요." },
    { en: "blue", ko: "파랑", emoji: "🔵", s: "The sky is blue.", sk: "하늘은 파란색이에요." },
    { en: "yellow", ko: "노랑", emoji: "🟡", s: "The sun is yellow.", sk: "해는 노란색이에요." },
    { en: "green", ko: "초록", emoji: "🟢", s: "The leaf is green.", sk: "잎은 초록색이에요." },
    { en: "black", ko: "검정", emoji: "⚫", s: "It is black.", sk: "그것은 검은색이에요." },
    { en: "sky blue", ko: "하늘색", emoji: "🩵", s: "It is sky blue.", sk: "그것은 하늘색이에요." }
  ]},
  { day: 4, theme: "더 많은 색깔", words: [
    { en: "pink", ko: "분홍", emoji: "🌸", s: "The flower is pink.", sk: "꽃은 분홍색이에요." },
    { en: "purple", ko: "보라", emoji: "🟣", s: "It is purple.", sk: "그것은 보라색이에요." },
    { en: "brown", ko: "갈색", emoji: "🟤", s: "The bear is brown.", sk: "곰은 갈색이에요." },
    { en: "orange", ko: "주황", emoji: "🟠", s: "It is orange.", sk: "그것은 주황색이에요." },
    { en: "white", ko: "하양", emoji: "⚪", s: "The cloud is white.", sk: "구름은 하얀색이에요." },
    { en: "silver", ko: "은색", emoji: "🥈", s: "It is silver.", sk: "그것은 은색이에요." }
  ]},
  { day: 5, theme: "색깔과 밝기", words: [
    { en: "gray", ko: "회색", emoji: "🌫️", s: "It is gray.", sk: "그것은 회색이에요." },
    { en: "color", ko: "색깔", emoji: "🎨", s: "I like this color.", sk: "나는 이 색깔이 좋아요." },
    { en: "light", ko: "밝은", emoji: "💡", s: "It is light.", sk: "그것은 밝아요." },
    { en: "dark", ko: "어두운", emoji: "🌑", s: "It is dark.", sk: "그것은 어두워요." },
    { en: "bright", ko: "환한", emoji: "✨", s: "The star is bright.", sk: "별이 환해요." },
    { en: "colorful", ko: "알록달록한", emoji: "🌈", s: "It is colorful.", sk: "그것은 알록달록해요." }
  ]},
  { day: 6, theme: "숫자 1-5", words: [
    { en: "one", ko: "하나", emoji: "1", s: "I see one star.", sk: "나는 별 하나를 봐요." },
    { en: "two", ko: "둘", emoji: "2", s: "I have two hands.", sk: "나는 손이 두 개예요." },
    { en: "three", ko: "셋", emoji: "3", s: "I see three dots.", sk: "나는 점 세 개를 봐요." },
    { en: "four", ko: "넷", emoji: "4", s: "It has four sides.", sk: "그것은 네 면이 있어요." },
    { en: "five", ko: "다섯", emoji: "5", s: "I see five stars.", sk: "나는 별 다섯 개를 봐요." },
    { en: "zero", ko: "영", emoji: "0", s: "I count from zero.", sk: "나는 영부터 세요." }
  ]},
  { day: 7, theme: "숫자 6-10", words: [
    { en: "six", ko: "여섯", emoji: "6", s: "I count to six.", sk: "나는 여섯까지 세요." },
    { en: "seven", ko: "일곱", emoji: "7", s: "I see seven dots.", sk: "나는 점 일곱 개를 봐요." },
    { en: "eight", ko: "여덟", emoji: "8", s: "I count to eight.", sk: "나는 여덟까지 세요." },
    { en: "nine", ko: "아홉", emoji: "9", s: "I see nine stars.", sk: "나는 별 아홉 개를 봐요." },
    { en: "ten", ko: "열", emoji: "10", s: "I count to ten.", sk: "나는 열까지 세요." },
    { en: "eleven", ko: "열하나", emoji: "🔢", s: "I count to eleven.", sk: "나는 열하나까지 세요." }
  ]},
  { day: 8, theme: "세기 개념", words: [
    { en: "first", ko: "첫째", emoji: "🥇", s: "I am first.", sk: "내가 첫째예요." },
    { en: "last", ko: "마지막", emoji: "🏁", s: "It is the last.", sk: "그것은 마지막이에요." },
    { en: "many", ko: "많은", emoji: "🌟", s: "I see many stars.", sk: "나는 별을 많이 봐요." },
    { en: "few", ko: "적은", emoji: "🔅", s: "I have a few.", sk: "나는 조금 가지고 있어요." },
    { en: "count", ko: "세다", emoji: "🔢", s: "I can count.", sk: "나는 셀 수 있어요." },
    { en: "second", ko: "둘째", emoji: "🥈", s: "I am second.", sk: "나는 둘째예요." }
  ]},
  { day: 9, theme: "반대말 (크기)", words: [
    { en: "big", ko: "큰", emoji: "🐘", s: "The bear is big.", sk: "곰은 커요." },
    { en: "small", ko: "작은", emoji: "🐜", s: "The ant is small.", sk: "개미는 작아요." },
    { en: "long", ko: "긴", emoji: "📏", s: "It is long.", sk: "그것은 길어요." },
    { en: "short", ko: "짧은", emoji: "📐", s: "It is short.", sk: "그것은 짧아요." },
    { en: "tall", ko: "키 큰", emoji: "🦒", s: "The tree is tall.", sk: "나무는 키가 커요." },
    { en: "wide", ko: "넓은", emoji: "↔️", s: "The road is wide.", sk: "길은 넓어요." }
  ]},
  { day: 10, theme: "반대말 (온도)", words: [
    { en: "hot", ko: "뜨거운", emoji: "🔥", s: "The sun is hot.", sk: "해는 뜨거워요." },
    { en: "cold", ko: "차가운", emoji: "❄️", s: "The ice is cold.", sk: "얼음은 차가워요." },
    { en: "warm", ko: "따뜻한", emoji: "☀️", s: "It is warm.", sk: "그것은 따뜻해요." },
    { en: "cool", ko: "시원한", emoji: "🧊", s: "The water is cool.", sk: "물은 시원해요." },
    { en: "wet", ko: "젖은", emoji: "💧", s: "It is wet.", sk: "그것은 젖었어요." },
    { en: "freezing", ko: "꽁꽁 언", emoji: "🥶", s: "It is freezing.", sk: "꽁꽁 얼었어요." }
  ]},
  { day: 11, theme: "반대말 (방향)", words: [
    { en: "up", ko: "위로", emoji: "⬆️", s: "Look up!", sk: "위를 보세요!" },
    { en: "down", ko: "아래로", emoji: "⬇️", s: "Look down!", sk: "아래를 보세요!" },
    { en: "left", ko: "왼쪽", emoji: "⬅️", s: "Go to the left.", sk: "왼쪽으로 가요." },
    { en: "right", ko: "오른쪽", emoji: "➡️", s: "Go to the right.", sk: "오른쪽으로 가요." },
    { en: "dry", ko: "마른", emoji: "🌵", s: "It is dry.", sk: "그것은 말랐어요." },
    { en: "forward", ko: "앞으로", emoji: "⏩", s: "Go forward.", sk: "앞으로 가요." }
  ]},
  { day: 12, theme: "반대말 (속도)", words: [
    { en: "fast", ko: "빠른", emoji: "🏃", s: "The car is fast.", sk: "차는 빨라요." },
    { en: "slow", ko: "느린", emoji: "🐢", s: "The turtle is slow.", sk: "거북이는 느려요." },
    { en: "open", ko: "열린", emoji: "📂", s: "Open the box.", sk: "상자를 열어요." },
    { en: "close", ko: "닫힌", emoji: "📁", s: "Close the door.", sk: "문을 닫아요." },
    { en: "new", ko: "새로운", emoji: "🆕", s: "It is new.", sk: "그것은 새거예요." },
    { en: "still", ko: "가만히", emoji: "✋", s: "Stand still.", sk: "가만히 서요." }
  ]},
  { day: 13, theme: "반대말 (기분)", words: [
    { en: "happy", ko: "기쁜", emoji: "😊", s: "I am happy.", sk: "나는 기뻐요." },
    { en: "sad", ko: "슬픈", emoji: "😢", s: "I am sad.", sk: "나는 슬퍼요." },
    { en: "good", ko: "좋은", emoji: "👍", s: "It is good.", sk: "그것은 좋아요." },
    { en: "bad", ko: "나쁜", emoji: "👎", s: "It is bad.", sk: "그것은 나빠요." },
    { en: "old", ko: "오래된", emoji: "👴", s: "It is old.", sk: "그것은 오래됐어요." },
    { en: "young", ko: "어린", emoji: "👶", s: "The baby is young.", sk: "아기는 어려요." }
  ]},
  { day: 14, theme: "반대말 (가득/빔)", words: [
    { en: "full", ko: "가득 찬", emoji: "🍱", s: "The cup is full.", sk: "컵이 가득 찼어요." },
    { en: "empty", ko: "빈", emoji: "🕳️", s: "The cup is empty.", sk: "컵이 비었어요." },
    { en: "clean", ko: "깨끗한", emoji: "🧼", s: "It is clean.", sk: "그것은 깨끗해요." },
    { en: "dirty", ko: "더러운", emoji: "🧹", s: "It is dirty.", sk: "그것은 더러워요." },
    { en: "soft", ko: "부드러운", emoji: "🧸", s: "The bear is soft.", sk: "곰은 부드러워요." },
    { en: "heavy", ko: "무거운", emoji: "🪨", s: "The rock is heavy.", sk: "돌은 무거워요." }
  ]},
  { day: 15, theme: "반대말 (낮/밤)", words: [
    { en: "day", ko: "낮", emoji: "🌞", s: "It is day.", sk: "지금은 낮이에요." },
    { en: "night", ko: "밤", emoji: "🌙", s: "It is night.", sk: "지금은 밤이에요." },
    { en: "loud", ko: "시끄러운", emoji: "📢", s: "It is loud.", sk: "그것은 시끄러워요." },
    { en: "quiet", ko: "조용한", emoji: "🤫", s: "It is quiet.", sk: "그것은 조용해요." },
    { en: "hard", ko: "딱딱한", emoji: "🪨", s: "The rock is hard.", sk: "돌은 딱딱해요." },
    { en: "light", ko: "가벼운", emoji: "🪶", s: "The feather is light.", sk: "깃털은 가벼워요." }
  ]},
  { day: 16, theme: "위치 (안/밖)", words: [
    { en: "in", ko: "안에", emoji: "📦", s: "It is in the box.", sk: "그것은 상자 안에 있어요." },
    { en: "out", ko: "밖에", emoji: "🚪", s: "I go out.", sk: "나는 밖으로 나가요." },
    { en: "on", ko: "위에", emoji: "🔛", s: "It is on the table.", sk: "그것은 탁자 위에 있어요." },
    { en: "under", ko: "아래에", emoji: "🛏️", s: "The cat is under it.", sk: "고양이가 그 아래에 있어요." },
    { en: "top", ko: "꼭대기", emoji: "🔝", s: "It is on top.", sk: "그것은 꼭대기에 있어요." },
    { en: "bottom", ko: "바닥", emoji: "🔽", s: "It is at the bottom.", sk: "그것은 바닥에 있어요." }
  ]},
  { day: 17, theme: "위치 (옆/뒤)", words: [
    { en: "next to", ko: "옆에", emoji: "↔️", s: "Sit next to me.", sk: "내 옆에 앉아요." },
    { en: "behind", ko: "뒤에", emoji: "🙈", s: "It is behind me.", sk: "그것은 내 뒤에 있어요." },
    { en: "front", ko: "앞에", emoji: "🚸", s: "I am in front.", sk: "나는 앞에 있어요." },
    { en: "between", ko: "사이에", emoji: "🔀", s: "It is between us.", sk: "그것은 우리 사이에 있어요." },
    { en: "near", ko: "가까이", emoji: "📍", s: "It is near.", sk: "그것은 가까이 있어요." },
    { en: "above", ko: "위쪽에", emoji: "🔼", s: "It is above me.", sk: "그것은 내 위에 있어요." }
  ]},
  { day: 18, theme: "위치와 거리", words: [
    { en: "far", ko: "멀리", emoji: "🛰️", s: "It is far away.", sk: "그것은 멀리 있어요." },
    { en: "here", ko: "여기", emoji: "📌", s: "It is here.", sk: "그것은 여기 있어요." },
    { en: "there", ko: "저기", emoji: "👉", s: "It is there.", sk: "그것은 저기 있어요." },
    { en: "around", ko: "주위에", emoji: "🔄", s: "Look around.", sk: "주위를 둘러봐요." },
    { en: "high", ko: "높은", emoji: "🪜", s: "It is high.", sk: "그것은 높아요." },
    { en: "low", ko: "낮은", emoji: "🔽", s: "It is low.", sk: "그것은 낮아요." }
  ]},
  { day: 19, theme: "하늘과 별", words: [
    { en: "sky", ko: "하늘", emoji: "🌌", s: "The sky is blue.", sk: "하늘은 파란색이에요." },
    { en: "sun", ko: "해", emoji: "☀️", s: "The sun is hot.", sk: "해는 뜨거워요." },
    { en: "moon", ko: "달", emoji: "🌝", s: "I see the moon.", sk: "나는 달을 봐요." },
    { en: "cloud", ko: "구름", emoji: "☁️", s: "The cloud is white.", sk: "구름은 하얀색이에요." },
    { en: "rainbow", ko: "무지개", emoji: "🌈", s: "I see a rainbow.", sk: "나는 무지개를 봐요." },
    { en: "shooting star", ko: "별똥별", emoji: "💫", s: "I see a shooting star.", sk: "나는 별똥별을 봐요." }
  ]},
  { day: 20, theme: "우주", words: [
    { en: "space", ko: "우주", emoji: "🌠", s: "I look at space.", sk: "나는 우주를 봐요." },
    { en: "planet", ko: "행성", emoji: "🪐", s: "It is a planet.", sk: "그것은 행성이에요." },
    { en: "rocket", ko: "로켓", emoji: "🚀", s: "The rocket goes up.", sk: "로켓이 위로 가요." },
    { en: "earth", ko: "지구", emoji: "🌍", s: "We live on earth.", sk: "우리는 지구에 살아요." },
    { en: "comet", ko: "혜성", emoji: "☄️", s: "I see a comet.", sk: "나는 혜성을 봐요." },
    { en: "alien", ko: "외계인", emoji: "👽", s: "I see an alien.", sk: "나는 외계인을 봐요." }
  ]},
  { day: 21, theme: "날씨", words: [
    { en: "rain", ko: "비", emoji: "🌧️", s: "The rain is wet.", sk: "비는 젖어요." },
    { en: "snow", ko: "눈", emoji: "🌨️", s: "The snow is white.", sk: "눈은 하얀색이에요." },
    { en: "wind", ko: "바람", emoji: "🌬️", s: "The wind is fast.", sk: "바람은 빨라요." },
    { en: "storm", ko: "폭풍", emoji: "⛈️", s: "I see a storm.", sk: "나는 폭풍을 봐요." },
    { en: "sunny", ko: "맑은", emoji: "🌤️", s: "It is sunny.", sk: "날씨가 맑아요." },
    { en: "cloudy", ko: "흐린", emoji: "☁️", s: "It is cloudy.", sk: "날씨가 흐려요." }
  ]},
  { day: 22, theme: "시간", words: [
    { en: "clock", ko: "시계", emoji: "🕐", s: "I see a clock.", sk: "나는 시계를 봐요." },
    { en: "time", ko: "시간", emoji: "⏰", s: "What time is it?", sk: "몇 시예요?" },
    { en: "morning", ko: "아침", emoji: "🌅", s: "It is morning.", sk: "지금은 아침이에요." },
    { en: "noon", ko: "정오", emoji: "🌞", s: "It is noon.", sk: "지금은 정오예요." },
    { en: "evening", ko: "저녁", emoji: "🌆", s: "It is evening.", sk: "지금은 저녁이에요." },
    { en: "hour", ko: "시간", emoji: "⏱️", s: "It is one hour.", sk: "한 시간이에요." }
  ]},
  { day: 23, theme: "달력", words: [
    { en: "today", ko: "오늘", emoji: "📅", s: "It is sunny today.", sk: "오늘은 맑아요." },
    { en: "tomorrow", ko: "내일", emoji: "➡️", s: "I play tomorrow.", sk: "나는 내일 놀아요." },
    { en: "week", ko: "주", emoji: "🗓️", s: "It is a new week.", sk: "새로운 한 주예요." },
    { en: "month", ko: "달(월)", emoji: "📆", s: "It is a new month.", sk: "새로운 한 달이에요." },
    { en: "year", ko: "년", emoji: "🎍", s: "It is a new year.", sk: "새해예요." },
    { en: "yesterday", ko: "어제", emoji: "⬅️", s: "I played yesterday.", sk: "나는 어제 놀았어요." }
  ]},
  { day: 24, theme: "계절", words: [
    { en: "spring", ko: "봄", emoji: "🌷", s: "I like spring.", sk: "나는 봄이 좋아요." },
    { en: "summer", ko: "여름", emoji: "🏖️", s: "Summer is hot.", sk: "여름은 더워요." },
    { en: "fall", ko: "가을", emoji: "🍂", s: "I like fall.", sk: "나는 가을이 좋아요." },
    { en: "winter", ko: "겨울", emoji: "⛄", s: "Winter is cold.", sk: "겨울은 추워요." },
    { en: "season", ko: "계절", emoji: "🍃", s: "I like this season.", sk: "나는 이 계절이 좋아요." },
    { en: "weather", ko: "날씨", emoji: "🌦️", s: "The weather is nice.", sk: "날씨가 좋아요." }
  ]},
  { day: 25, theme: "질문 말 (무엇/누구)", words: [
    { en: "what", ko: "무엇", emoji: "❓", s: "What is this?", sk: "이것은 무엇이에요?" },
    { en: "who", ko: "누구", emoji: "🧐", s: "Who is there?", sk: "누가 있어요?" },
    { en: "where", ko: "어디", emoji: "📍", s: "Where is it?", sk: "그것은 어디 있어요?" },
    { en: "when", ko: "언제", emoji: "⌛", s: "When is it?", sk: "그것은 언제예요?" },
    { en: "why", ko: "왜", emoji: "🤔", s: "Why is it big?", sk: "왜 그것은 커요?" },
    { en: "which", ko: "어느 것", emoji: "🔎", s: "Which one is big?", sk: "어느 것이 커요?" }
  ]},
  { day: 26, theme: "질문 말 (어떻게)", words: [
    { en: "how", ko: "어떻게", emoji: "💭", s: "How are you?", sk: "어떻게 지내요?" },
    { en: "yes", ko: "응", emoji: "✅", s: "Yes, I can.", sk: "응, 할 수 있어요." },
    { en: "no", ko: "아니", emoji: "❌", s: "No, I cannot.", sk: "아니, 못 해요." },
    { en: "this", ko: "이것", emoji: "👇", s: "This is big.", sk: "이것은 커요." },
    { en: "that", ko: "저것", emoji: "👆", s: "That is small.", sk: "저것은 작아요." },
    { en: "okay", ko: "좋아", emoji: "👌", s: "Okay, I see.", sk: "좋아요, 알겠어요." }
  ]},
  { day: 27, theme: "똑똑한 말", words: [
    { en: "think", ko: "생각하다", emoji: "🧠", s: "I think and learn.", sk: "나는 생각하고 배워요." },
    { en: "know", ko: "알다", emoji: "💡", s: "I know it.", sk: "나는 그것을 알아요." },
    { en: "learn", ko: "배우다", emoji: "📚", s: "I learn English.", sk: "나는 영어를 배워요." },
    { en: "smart", ko: "똑똑한", emoji: "🦉", s: "The owl is smart.", sk: "올빼미는 똑똑해요." },
    { en: "look", ko: "보다", emoji: "👀", s: "Look at the sky.", sk: "하늘을 봐요." },
    { en: "read", ko: "읽다", emoji: "📖", s: "I read a book.", sk: "나는 책을 읽어요." }
  ]},
  { day: 28, theme: "행동", words: [
    { en: "go", ko: "가다", emoji: "🚶", s: "I go up.", sk: "나는 위로 가요." },
    { en: "stop", ko: "멈추다", emoji: "🛑", s: "Stop here.", sk: "여기 멈춰요." },
    { en: "find", ko: "찾다", emoji: "🔍", s: "I find a star.", sk: "나는 별을 찾아요." },
    { en: "point", ko: "가리키다", emoji: "👉", s: "Point to it.", sk: "그것을 가리켜요." },
    { en: "show", ko: "보여주다", emoji: "🪧", s: "Show me the shape.", sk: "모양을 보여줘요." },
    { en: "give", ko: "주다", emoji: "🤲", s: "I give a star.", sk: "나는 별을 줘요." }
  ]},
  { day: 29, theme: "수와 양", words: [
    { en: "more", ko: "더 많이", emoji: "➕", s: "I want more.", sk: "나는 더 원해요." },
    { en: "less", ko: "더 적게", emoji: "➖", s: "I have less.", sk: "나는 더 적게 가져요." },
    { en: "same", ko: "같은", emoji: "🟰", s: "It is the same.", sk: "그것은 같아요." },
    { en: "half", ko: "반", emoji: "🌗", s: "I see half a moon.", sk: "나는 반달을 봐요." },
    { en: "whole", ko: "전부", emoji: "🟠", s: "I see the whole sun.", sk: "나는 해 전체를 봐요." },
    { en: "none", ko: "없음", emoji: "0", s: "I have none.", sk: "나는 하나도 없어요." }
  ]},
  { day: 30, theme: "복습과 칭찬", words: [
    { en: "shape", ko: "모양", emoji: "🔷", s: "I know this shape.", sk: "나는 이 모양을 알아요." },
    { en: "number", ko: "숫자", emoji: "#️⃣", s: "I can say the number.", sk: "나는 숫자를 말할 수 있어요." },
    { en: "great", ko: "훌륭한", emoji: "🌟", s: "You are great!", sk: "너는 훌륭해요!" },
    { en: "win", ko: "이기다", emoji: "🏆", s: "I win!", sk: "내가 이겼어요!" },
    { en: "wise", ko: "지혜로운", emoji: "🦉", s: "The owl is wise.", sk: "올빼미는 지혜로워요." },
    { en: "proud", ko: "자랑스러운", emoji: "😊", s: "I am proud!", sk: "나는 자랑스러워요!" }
  ]}
  ];
