  const NAME = "바니";
  const STORAGE_KEY = "english_bunny_done";
  const greetings = [
    "안녕! 나는 토끼 바니야. 오늘도 영어 다섯 개 배워볼까?",
    "단어 카드를 누르면 내가 영어로 말해줄게! 🐰",
    "큰 소리로 따라 말해보자. 깡충!",
    "오늘도 멋지다! 우리 같이 해보자.",
  ];
  const MSG = {
    allDone: "우와! 30일 영어 모두 끝냈어! 정말 최고야! 🏆🐰",
    cheer: (n) => "참 잘했어요! " + n + "일째 성공! 깡충깡충~ 🎉",
    undo: "괜찮아! 다시 천천히 해보자. 🐰",
  };

  const lessons = [
  { day: 1, theme: "인사와 예절", words: [
    { en: "hello", ko: "안녕(만날 때)", emoji: "👋", s: "Hello, my friend.", sk: "안녕, 친구야." },
    { en: "thank you", ko: "고마워요", emoji: "🙏", s: "Thank you, mom.", sk: "고마워요, 엄마." },
    { en: "please", ko: "부탁해요", emoji: "🤲", s: "Water, please.", sk: "물 좀 주세요." },
    { en: "sorry", ko: "미안해요", emoji: "😟", s: "I am sorry.", sk: "미안해요." },
    { en: "bye", ko: "잘 가", emoji: "✋", s: "Bye, see you.", sk: "잘 가, 또 봐요." },
    { en: "welcome", ko: "환영해요", emoji: "🎊", s: "Welcome, friend.", sk: "환영해요, 친구야." }
  ]},
  { day: 2, theme: "아침 인사", words: [
    { en: "good morning", ko: "좋은 아침", emoji: "🌅", s: "Good morning, dad.", sk: "좋은 아침이에요, 아빠." },
    { en: "wake up", ko: "일어나다", emoji: "⏰", s: "I wake up now.", sk: "저는 지금 일어나요." },
    { en: "yawn", ko: "하품하다", emoji: "🥱", s: "I yawn a lot.", sk: "저는 하품을 많이 해요." },
    { en: "stretch", ko: "기지개 켜다", emoji: "🙆", s: "I stretch my arms.", sk: "저는 팔을 쭉 펴요." },
    { en: "smile", ko: "미소", emoji: "😊", s: "I smile at you.", sk: "저는 당신에게 미소 지어요." },
    { en: "fresh", ko: "상쾌한", emoji: "🌞", s: "I feel fresh.", sk: "저는 상쾌해요." }
  ]},
  { day: 3, theme: "집의 방들", words: [
    { en: "house", ko: "집", emoji: "🏠", s: "This is my house.", sk: "이건 우리 집이에요." },
    { en: "room", ko: "방", emoji: "🚪", s: "I like my room.", sk: "저는 제 방을 좋아해요." },
    { en: "kitchen", ko: "부엌", emoji: "🍳", s: "Mom is in the kitchen.", sk: "엄마는 부엌에 있어요." },
    { en: "living room", ko: "거실", emoji: "🛋️", s: "We sit in the living room.", sk: "우리는 거실에 앉아요." },
    { en: "door", ko: "문", emoji: "🚪", s: "Open the door.", sk: "문을 열어요." },
    { en: "stairs", ko: "계단", emoji: "🪜", s: "I go up the stairs.", sk: "저는 계단을 올라가요." }
  ]},
  { day: 4, theme: "침실 물건", words: [
    { en: "bed", ko: "침대", emoji: "🛏️", s: "This is my bed.", sk: "이건 제 침대예요." },
    { en: "pillow", ko: "베개", emoji: "🛌", s: "I like my pillow.", sk: "저는 제 베개를 좋아해요." },
    { en: "blanket", ko: "이불", emoji: "🧶", s: "The blanket is warm.", sk: "이불이 따뜻해요." },
    { en: "lamp", ko: "전등", emoji: "💡", s: "I turn on the lamp.", sk: "저는 전등을 켜요." },
    { en: "clock", ko: "시계", emoji: "🕐", s: "I see a clock.", sk: "저는 시계를 봐요." },
    { en: "curtain", ko: "커튼", emoji: "🪟", s: "I open the curtain.", sk: "저는 커튼을 열어요." }
  ]},
  { day: 5, theme: "세수와 양치", words: [
    { en: "wash", ko: "씻다", emoji: "🧼", s: "I wash my face.", sk: "저는 얼굴을 씻어요." },
    { en: "face", ko: "얼굴", emoji: "😀", s: "This is my face.", sk: "이건 제 얼굴이에요." },
    { en: "brush teeth", ko: "이를 닦다", emoji: "🪥", s: "I brush teeth now.", sk: "저는 지금 이를 닦아요." },
    { en: "soap", ko: "비누", emoji: "🧴", s: "I use the soap.", sk: "저는 비누를 써요." },
    { en: "towel", ko: "수건", emoji: "🧺", s: "This is my towel.", sk: "이건 제 수건이에요." },
    { en: "tooth", ko: "이", emoji: "🦷", s: "My tooth is white.", sk: "제 이는 하얘요." }
  ]},
  { day: 6, theme: "욕실 물건", words: [
    { en: "bathroom", ko: "욕실", emoji: "🚿", s: "I go to the bathroom.", sk: "저는 욕실에 가요." },
    { en: "toothbrush", ko: "칫솔", emoji: "🪥", s: "This is my toothbrush.", sk: "이건 제 칫솔이에요." },
    { en: "shower", ko: "샤워", emoji: "🚿", s: "I take a shower.", sk: "저는 샤워를 해요." },
    { en: "mirror", ko: "거울", emoji: "🪞", s: "I see the mirror.", sk: "저는 거울을 봐요." },
    { en: "water", ko: "물", emoji: "💧", s: "The water is cold.", sk: "물이 차가워요." },
    { en: "toilet", ko: "변기", emoji: "🚽", s: "I use the toilet.", sk: "저는 변기를 써요." }
  ]},
  { day: 7, theme: "옷 입기", words: [
    { en: "get dressed", ko: "옷을 입다", emoji: "🧥", s: "I get dressed now.", sk: "저는 지금 옷을 입어요." },
    { en: "shirt", ko: "셔츠", emoji: "👕", s: "This is my shirt.", sk: "이건 제 셔츠예요." },
    { en: "pants", ko: "바지", emoji: "👖", s: "I wear my pants.", sk: "저는 제 바지를 입어요." },
    { en: "socks", ko: "양말", emoji: "🧦", s: "I put on socks.", sk: "저는 양말을 신어요." },
    { en: "shoes", ko: "신발", emoji: "👟", s: "I like my shoes.", sk: "저는 제 신발을 좋아해요." },
    { en: "jacket", ko: "잠바", emoji: "🧥", s: "I wear a jacket.", sk: "저는 잠바를 입어요." }
  ]},
  { day: 8, theme: "아침 식사", words: [
    { en: "breakfast", ko: "아침밥", emoji: "🍳", s: "I eat breakfast.", sk: "저는 아침밥을 먹어요." },
    { en: "milk", ko: "우유", emoji: "🥛", s: "I drink milk.", sk: "저는 우유를 마셔요." },
    { en: "bread", ko: "빵", emoji: "🍞", s: "I like bread.", sk: "저는 빵을 좋아해요." },
    { en: "egg", ko: "달걀", emoji: "🥚", s: "I see an egg.", sk: "저는 달걀을 봐요." },
    { en: "juice", ko: "주스", emoji: "🧃", s: "I drink juice.", sk: "저는 주스를 마셔요." },
    { en: "cereal", ko: "시리얼", emoji: "🥣", s: "I eat cereal.", sk: "저는 시리얼을 먹어요." }
  ]},
  { day: 9, theme: "외출 준비", words: [
    { en: "go out", ko: "나가다", emoji: "🚶", s: "I go out now.", sk: "저는 지금 나가요." },
    { en: "bag", ko: "가방", emoji: "🎒", s: "This is my bag.", sk: "이건 제 가방이에요." },
    { en: "hat", ko: "모자", emoji: "🧢", s: "I wear a hat.", sk: "저는 모자를 써요." },
    { en: "coat", ko: "외투", emoji: "🧥", s: "I put on my coat.", sk: "저는 외투를 입어요." },
    { en: "key", ko: "열쇠", emoji: "🔑", s: "I have the key.", sk: "저는 열쇠를 가지고 있어요." },
    { en: "gloves", ko: "장갑", emoji: "🧤", s: "I wear gloves.", sk: "저는 장갑을 껴요." }
  ]},
  { day: 10, theme: "정중한 표현", words: [
    { en: "excuse me", ko: "실례합니다", emoji: "🙋", s: "Excuse me, sir.", sk: "실례합니다, 선생님." },
    { en: "you're welcome", ko: "천만에요", emoji: "😄", s: "You're welcome.", sk: "천만에요." },
    { en: "yes", ko: "네", emoji: "✅", s: "Yes, I do.", sk: "네, 그래요." },
    { en: "no", ko: "아니요", emoji: "❌", s: "No, thank you.", sk: "아니요, 괜찮아요." },
    { en: "okay", ko: "좋아요", emoji: "👌", s: "Okay, let's go.", sk: "좋아요, 가요." },
    { en: "maybe", ko: "아마도", emoji: "🤔", s: "Maybe later.", sk: "아마 나중에요." }
  ]},
  { day: 11, theme: "거실 물건", words: [
    { en: "sofa", ko: "소파", emoji: "🛋️", s: "I sit on the sofa.", sk: "저는 소파에 앉아요." },
    { en: "tv", ko: "텔레비전", emoji: "📺", s: "I watch the tv.", sk: "저는 텔레비전을 봐요." },
    { en: "window", ko: "창문", emoji: "🪟", s: "I open the window.", sk: "저는 창문을 열어요." },
    { en: "table", ko: "탁자", emoji: "🪑", s: "This is a table.", sk: "이건 탁자예요." },
    { en: "chair", ko: "의자", emoji: "🪑", s: "I sit on the chair.", sk: "저는 의자에 앉아요." },
    { en: "picture", ko: "그림", emoji: "🖼️", s: "I see a picture.", sk: "저는 그림을 봐요." }
  ]},
  { day: 12, theme: "부엌 물건", words: [
    { en: "cup", ko: "컵", emoji: "🥤", s: "This is my cup.", sk: "이건 제 컵이에요." },
    { en: "plate", ko: "접시", emoji: "🍽️", s: "I have a plate.", sk: "저는 접시를 가지고 있어요." },
    { en: "spoon", ko: "숟가락", emoji: "🥄", s: "I use a spoon.", sk: "저는 숟가락을 써요." },
    { en: "fork", ko: "포크", emoji: "🍴", s: "I use a fork.", sk: "저는 포크를 써요." },
    { en: "bowl", ko: "그릇", emoji: "🥣", s: "I see a bowl.", sk: "저는 그릇을 봐요." },
    { en: "pot", ko: "냄비", emoji: "🍲", s: "I see a pot.", sk: "저는 냄비를 봐요." }
  ]},
  { day: 13, theme: "냉장고 음식", words: [
    { en: "apple", ko: "사과", emoji: "🍎", s: "I eat an apple.", sk: "저는 사과를 먹어요." },
    { en: "banana", ko: "바나나", emoji: "🍌", s: "I like a banana.", sk: "저는 바나나를 좋아해요." },
    { en: "cheese", ko: "치즈", emoji: "🧀", s: "I eat cheese.", sk: "저는 치즈를 먹어요." },
    { en: "rice", ko: "밥", emoji: "🍚", s: "I eat rice.", sk: "저는 밥을 먹어요." },
    { en: "soup", ko: "국", emoji: "🍲", s: "The soup is hot.", sk: "국이 뜨거워요." },
    { en: "yogurt", ko: "요거트", emoji: "🥛", s: "I eat yogurt.", sk: "저는 요거트를 먹어요." }
  ]},
  { day: 14, theme: "전화 표현", words: [
    { en: "phone", ko: "전화기", emoji: "📱", s: "This is my phone.", sk: "이건 제 전화기예요." },
    { en: "call", ko: "전화하다", emoji: "📞", s: "I call my mom.", sk: "저는 엄마에게 전화해요." },
    { en: "hi", ko: "안녕(가벼운)", emoji: "🙋", s: "Hi, it is me.", sk: "안녕, 저예요." },
    { en: "wait", ko: "기다리다", emoji: "⏳", s: "Please wait a bit.", sk: "잠깐 기다려 주세요." },
    { en: "talk", ko: "이야기하다", emoji: "🗣️", s: "I talk to grandma.", sk: "저는 할머니와 이야기해요." },
    { en: "listen", ko: "듣다", emoji: "👂", s: "I listen to grandma.", sk: "저는 할머니 말을 들어요." }
  ]},
  { day: 15, theme: "집안일 돕기", words: [
    { en: "help", ko: "돕다", emoji: "🤝", s: "I help my mom.", sk: "저는 엄마를 도와요." },
    { en: "clean", ko: "청소하다", emoji: "🧹", s: "I clean my room.", sk: "저는 제 방을 청소해요." },
    { en: "broom", ko: "빗자루", emoji: "🧹", s: "I use a broom.", sk: "저는 빗자루를 써요." },
    { en: "trash", ko: "쓰레기", emoji: "🗑️", s: "I throw the trash.", sk: "저는 쓰레기를 버려요." },
    { en: "tidy", ko: "정리하다", emoji: "📦", s: "I tidy my toys.", sk: "저는 제 장난감을 정리해요." },
    { en: "wash dishes", ko: "설거지하다", emoji: "🧽", s: "I wash dishes.", sk: "저는 설거지를 해요." }
  ]},
  { day: 16, theme: "놀이 시간", words: [
    { en: "play", ko: "놀다", emoji: "🧸", s: "I play with toys.", sk: "저는 장난감을 가지고 놀아요." },
    { en: "toy", ko: "장난감", emoji: "🧸", s: "This is my toy.", sk: "이건 제 장난감이에요." },
    { en: "ball", ko: "공", emoji: "⚽", s: "I see a ball.", sk: "저는 공을 봐요." },
    { en: "doll", ko: "인형", emoji: "🪆", s: "I like my doll.", sk: "저는 제 인형을 좋아해요." },
    { en: "book", ko: "책", emoji: "📖", s: "I read a book.", sk: "저는 책을 읽어요." },
    { en: "blocks", ko: "블록", emoji: "🧱", s: "I build with blocks.", sk: "저는 블록으로 만들어요." }
  ]},
  { day: 17, theme: "점심 식사", words: [
    { en: "lunch", ko: "점심밥", emoji: "🍱", s: "I eat lunch.", sk: "저는 점심밥을 먹어요." },
    { en: "noodle", ko: "국수", emoji: "🍜", s: "I like noodle.", sk: "저는 국수를 좋아해요." },
    { en: "chicken", ko: "닭고기", emoji: "🍗", s: "I eat chicken.", sk: "저는 닭고기를 먹어요." },
    { en: "fish", ko: "생선", emoji: "🐟", s: "I eat fish.", sk: "저는 생선을 먹어요." },
    { en: "fruit", ko: "과일", emoji: "🍓", s: "I like fruit.", sk: "저는 과일을 좋아해요." },
    { en: "vegetable", ko: "채소", emoji: "🥦", s: "I eat vegetables.", sk: "저는 채소를 먹어요." }
  ]},
  { day: 18, theme: "식탁 예절", words: [
    { en: "eat", ko: "먹다", emoji: "😋", s: "I eat my food.", sk: "저는 제 음식을 먹어요." },
    { en: "drink", ko: "마시다", emoji: "🥤", s: "I drink water.", sk: "저는 물을 마셔요." },
    { en: "napkin", ko: "냅킨", emoji: "🧻", s: "I use a napkin.", sk: "저는 냅킨을 써요." },
    { en: "yummy", ko: "맛있는", emoji: "😍", s: "It is yummy.", sk: "맛있어요." },
    { en: "full", ko: "배부른", emoji: "😌", s: "I am full now.", sk: "저는 지금 배불러요." },
    { en: "sit", ko: "앉다", emoji: "🪑", s: "I sit at the table.", sk: "저는 식탁에 앉아요." }
  ]},
  { day: 19, theme: "집에 오기", words: [
    { en: "come home", ko: "집에 오다", emoji: "🏡", s: "I come home now.", sk: "저는 지금 집에 와요." },
    { en: "hug", ko: "안다", emoji: "🤗", s: "I hug my mom.", sk: "저는 엄마를 안아요." },
    { en: "rest", ko: "쉬다", emoji: "😴", s: "I rest a little.", sk: "저는 조금 쉬어요." },
    { en: "snack", ko: "간식", emoji: "🍪", s: "I eat a snack.", sk: "저는 간식을 먹어요." },
    { en: "home", ko: "집", emoji: "🏘️", s: "I love my home.", sk: "저는 제 집을 사랑해요." },
    { en: "wave", ko: "손 흔들다", emoji: "👋", s: "I wave hello.", sk: "저는 손을 흔들어요." }
  ]},
  { day: 20, theme: "가족", words: [
    { en: "mom", ko: "엄마", emoji: "👩", s: "I love my mom.", sk: "저는 엄마를 사랑해요." },
    { en: "dad", ko: "아빠", emoji: "👨", s: "I love my dad.", sk: "저는 아빠를 사랑해요." },
    { en: "baby", ko: "아기", emoji: "👶", s: "I see a baby.", sk: "저는 아기를 봐요." },
    { en: "grandma", ko: "할머니", emoji: "👵", s: "This is my grandma.", sk: "이분은 제 할머니예요." },
    { en: "grandpa", ko: "할아버지", emoji: "👴", s: "This is my grandpa.", sk: "이분은 제 할아버지예요." },
    { en: "sister", ko: "여동생", emoji: "👧", s: "This is my sister.", sk: "이 아이는 제 여동생이에요." }
  ]},
  { day: 21, theme: "공부 시간", words: [
    { en: "pencil", ko: "연필", emoji: "✏️", s: "This is my pencil.", sk: "이건 제 연필이에요." },
    { en: "paper", ko: "종이", emoji: "📄", s: "I have paper.", sk: "저는 종이를 가지고 있어요." },
    { en: "crayon", ko: "크레용", emoji: "🖍️", s: "I use a crayon.", sk: "저는 크레용을 써요." },
    { en: "draw", ko: "그리다", emoji: "🎨", s: "I draw a house.", sk: "저는 집을 그려요." },
    { en: "write", ko: "쓰다", emoji: "📝", s: "I write my name.", sk: "저는 제 이름을 써요." },
    { en: "scissors", ko: "가위", emoji: "✂️", s: "I use scissors.", sk: "저는 가위를 써요." }
  ]},
  { day: 22, theme: "저녁 식사", words: [
    { en: "dinner", ko: "저녁밥", emoji: "🍽️", s: "I eat dinner.", sk: "저는 저녁밥을 먹어요." },
    { en: "meat", ko: "고기", emoji: "🍖", s: "I eat meat.", sk: "저는 고기를 먹어요." },
    { en: "salad", ko: "샐러드", emoji: "🥗", s: "I like salad.", sk: "저는 샐러드를 좋아해요." },
    { en: "carrot", ko: "당근", emoji: "🥕", s: "I eat a carrot.", sk: "저는 당근을 먹어요." },
    { en: "potato", ko: "감자", emoji: "🥔", s: "I see a potato.", sk: "저는 감자를 봐요." },
    { en: "corn", ko: "옥수수", emoji: "🌽", s: "I eat corn.", sk: "저는 옥수수를 먹어요." }
  ]},
  { day: 23, theme: "목욕 시간", words: [
    { en: "bath", ko: "목욕", emoji: "🛁", s: "I take a bath.", sk: "저는 목욕을 해요." },
    { en: "bubble", ko: "거품", emoji: "🫧", s: "I see bubbles.", sk: "저는 거품을 봐요." },
    { en: "shampoo", ko: "샴푸", emoji: "🧴", s: "I use shampoo.", sk: "저는 샴푸를 써요." },
    { en: "hair", ko: "머리카락", emoji: "💇", s: "I wash my hair.", sk: "저는 머리를 감아요." },
    { en: "warm", ko: "따뜻한", emoji: "♨️", s: "The water is warm.", sk: "물이 따뜻해요." },
    { en: "sponge", ko: "스펀지", emoji: "🧽", s: "I use a sponge.", sk: "저는 스펀지를 써요." }
  ]},
  { day: 24, theme: "잠자리 준비", words: [
    { en: "pajamas", ko: "잠옷", emoji: "👚", s: "I wear pajamas.", sk: "저는 잠옷을 입어요." },
    { en: "sleepy", ko: "졸린", emoji: "😪", s: "I am sleepy now.", sk: "저는 지금 졸려요." },
    { en: "teddy bear", ko: "곰인형", emoji: "🧸", s: "I hug my teddy bear.", sk: "저는 제 곰인형을 안아요." },
    { en: "story", ko: "이야기", emoji: "📚", s: "I read a story.", sk: "저는 이야기를 읽어요." },
    { en: "night light", ko: "수면등", emoji: "🌙", s: "I see the night light.", sk: "저는 수면등을 봐요." },
    { en: "bedtime", ko: "잘 시간", emoji: "🕘", s: "It is bedtime.", sk: "잘 시간이에요." }
  ]},
  { day: 25, theme: "잘 자요", words: [
    { en: "good night", ko: "잘 자요", emoji: "🌃", s: "Good night, mom.", sk: "잘 자요, 엄마." },
    { en: "sleep", ko: "자다", emoji: "😴", s: "I sleep now.", sk: "저는 지금 자요." },
    { en: "dream", ko: "꿈", emoji: "💭", s: "I have a good dream.", sk: "저는 좋은 꿈을 꿔요." },
    { en: "kiss", ko: "뽀뽀", emoji: "😘", s: "I give a kiss.", sk: "저는 뽀뽀를 해요." },
    { en: "star", ko: "별", emoji: "⭐", s: "I see a star.", sk: "저는 별을 봐요." },
    { en: "moon", ko: "달", emoji: "🌙", s: "I see the moon.", sk: "저는 달을 봐요." }
  ]},
  { day: 26, theme: "기분 말하기", words: [
    { en: "happy", ko: "행복한", emoji: "😄", s: "I am happy.", sk: "저는 행복해요." },
    { en: "sad", ko: "슬픈", emoji: "😢", s: "I am sad.", sk: "저는 슬퍼요." },
    { en: "love", ko: "사랑하다", emoji: "❤️", s: "I love you.", sk: "저는 당신을 사랑해요." },
    { en: "tired", ko: "피곤한", emoji: "😩", s: "I am tired.", sk: "저는 피곤해요." },
    { en: "hungry", ko: "배고픈", emoji: "🍴", s: "I am hungry.", sk: "저는 배고파요." },
    { en: "angry", ko: "화난", emoji: "😠", s: "I am angry.", sk: "저는 화났어요." }
  ]},
  { day: 27, theme: "몸이 아플 때", words: [
    { en: "hurt", ko: "아프다", emoji: "🤕", s: "My knee hurts.", sk: "제 무릎이 아파요." },
    { en: "sick", ko: "아픈", emoji: "🤒", s: "I am sick today.", sk: "저는 오늘 아파요." },
    { en: "medicine", ko: "약", emoji: "💊", s: "I take medicine.", sk: "저는 약을 먹어요." },
    { en: "doctor", ko: "의사", emoji: "🩺", s: "I see a doctor.", sk: "저는 의사를 봐요." },
    { en: "better", ko: "나아진", emoji: "🙂", s: "I feel better now.", sk: "저는 이제 나아졌어요." },
    { en: "cold", ko: "감기", emoji: "🤧", s: "I have a cold.", sk: "저는 감기에 걸렸어요." }
  ]},
  { day: 28, theme: "날씨와 외출", words: [
    { en: "sunny", ko: "맑은", emoji: "☀️", s: "It is sunny today.", sk: "오늘은 맑아요." },
    { en: "rain", ko: "비", emoji: "🌧️", s: "I see the rain.", sk: "저는 비를 봐요." },
    { en: "umbrella", ko: "우산", emoji: "☂️", s: "I have an umbrella.", sk: "저는 우산을 가지고 있어요." },
    { en: "windy", ko: "바람 부는", emoji: "🌬️", s: "It is windy.", sk: "바람이 불어요." },
    { en: "boots", ko: "장화", emoji: "🥾", s: "I wear my boots.", sk: "저는 제 장화를 신어요." },
    { en: "snow", ko: "눈", emoji: "❄️", s: "I see the snow.", sk: "저는 눈을 봐요." }
  ]},
  { day: 29, theme: "안전과 약속", words: [
    { en: "stop", ko: "멈추다", emoji: "🛑", s: "I stop and look.", sk: "저는 멈추고 봐요." },
    { en: "go", ko: "가다", emoji: "🟢", s: "I go with mom.", sk: "저는 엄마와 가요." },
    { en: "hold hands", ko: "손잡다", emoji: "🤝", s: "I hold hands.", sk: "저는 손을 잡아요." },
    { en: "careful", ko: "조심하는", emoji: "⚠️", s: "I am careful.", sk: "저는 조심해요." },
    { en: "wait here", ko: "여기서 기다리다", emoji: "🚸", s: "I wait here.", sk: "저는 여기서 기다려요." },
    { en: "look", ko: "살피다", emoji: "👀", s: "I look both ways.", sk: "저는 양쪽을 살펴요." }
  ]},
  { day: 30, theme: "하루 마무리", words: [
    { en: "wash hands", ko: "손 씻다", emoji: "🧼", s: "I wash my hands.", sk: "저는 손을 씻어요." },
    { en: "share", ko: "나누다", emoji: "🤲", s: "I share my toy.", sk: "저는 제 장난감을 나눠요." },
    { en: "friend", ko: "친구", emoji: "👬", s: "This is my friend.", sk: "이 친구는 제 친구예요." },
    { en: "fun", ko: "재미있는", emoji: "🎉", s: "It is so fun.", sk: "정말 재미있어요." },
    { en: "see you", ko: "또 만나요", emoji: "👋", s: "See you tomorrow.", sk: "내일 또 만나요." },
    { en: "good job", ko: "잘했어요", emoji: "👏", s: "Good job today.", sk: "오늘 잘했어요." }
  ]}
  ];
