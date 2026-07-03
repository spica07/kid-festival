  const NAME = "코코";
  const STORAGE_KEY = "english_coco_done";
  const greetings = [
    "안녕! 나는 곰돌이 코코야. 맛있는 영어 다섯 개 먹어볼까?",
    "단어 카드를 누르면 내가 영어로 말해줄게! 🐻",
    "큰 소리로 따라 말해보자. 냠냠!",
    "오늘도 멋지다! 우리 같이 맛있게 배워보자.",
  ];
  const MSG = {
    allDone: "우와! 30일 영어 모두 끝냈어! 정말 최고야! 🏆🐻",
    cheer: (n) => "참 잘했어요! " + n + "일째 성공! 냠냠~ 🎉",
    undo: "괜찮아! 다시 천천히 해보자. 🐻",
  };

  const lessons = [
  { day: 1, theme: "과일", words: [
    { en: "apple", ko: "사과", emoji: "🍎", s: "I eat an apple.", sk: "나는 사과를 먹어요." },
    { en: "banana", ko: "바나나", emoji: "🍌", s: "I like a banana.", sk: "나는 바나나를 좋아해요." },
    { en: "grape", ko: "포도", emoji: "🍇", s: "The grape is sweet.", sk: "포도는 달아요." },
    { en: "orange", ko: "오렌지", emoji: "🍊", s: "I eat an orange.", sk: "나는 오렌지를 먹어요." },
    { en: "strawberry", ko: "딸기", emoji: "🍓", s: "I like a strawberry.", sk: "나는 딸기를 좋아해요." },
    { en: "blueberry", ko: "블루베리", emoji: "🫐", s: "I like a blueberry.", sk: "나는 블루베리를 좋아해요." }
  ]},
  { day: 2, theme: "더 많은 과일", words: [
    { en: "watermelon", ko: "수박", emoji: "🍉", s: "The watermelon is big.", sk: "수박은 커요." },
    { en: "peach", ko: "복숭아", emoji: "🍑", s: "I eat a peach.", sk: "나는 복숭아를 먹어요." },
    { en: "lemon", ko: "레몬", emoji: "🍋", s: "The lemon is sour.", sk: "레몬은 셔요." },
    { en: "cherry", ko: "체리", emoji: "🍒", s: "I like a cherry.", sk: "나는 체리를 좋아해요." },
    { en: "pineapple", ko: "파인애플", emoji: "🍍", s: "I eat a pineapple.", sk: "나는 파인애플을 먹어요." },
    { en: "melon", ko: "멜론", emoji: "🍈", s: "I eat a melon.", sk: "나는 멜론을 먹어요." }
  ]},
  { day: 3, theme: "채소", words: [
    { en: "carrot", ko: "당근", emoji: "🥕", s: "I eat a carrot.", sk: "나는 당근을 먹어요." },
    { en: "potato", ko: "감자", emoji: "🥔", s: "I like a potato.", sk: "나는 감자를 좋아해요." },
    { en: "tomato", ko: "토마토", emoji: "🍅", s: "The tomato is red.", sk: "토마토는 빨개요." },
    { en: "corn", ko: "옥수수", emoji: "🌽", s: "I eat corn.", sk: "나는 옥수수를 먹어요." },
    { en: "cucumber", ko: "오이", emoji: "🥒", s: "I like a cucumber.", sk: "나는 오이를 좋아해요." },
    { en: "cabbage", ko: "양배추", emoji: "🥬", s: "I eat cabbage.", sk: "나는 양배추를 먹어요." }
  ]},
  { day: 4, theme: "더 많은 채소", words: [
    { en: "onion", ko: "양파", emoji: "🧅", s: "I eat an onion.", sk: "나는 양파를 먹어요." },
    { en: "broccoli", ko: "브로콜리", emoji: "🥦", s: "I like broccoli.", sk: "나는 브로콜리를 좋아해요." },
    { en: "pepper", ko: "고추", emoji: "🌶️", s: "The pepper is spicy.", sk: "고추는 매워요." },
    { en: "mushroom", ko: "버섯", emoji: "🍄", s: "I eat a mushroom.", sk: "나는 버섯을 먹어요." },
    { en: "eggplant", ko: "가지", emoji: "🍆", s: "The eggplant is purple.", sk: "가지는 보라색이에요." },
    { en: "pumpkin", ko: "호박", emoji: "🎃", s: "The pumpkin is big.", sk: "호박은 커요." }
  ]},
  { day: 5, theme: "아침 식사", words: [
    { en: "egg", ko: "달걀", emoji: "🥚", s: "I eat an egg.", sk: "나는 달걀을 먹어요." },
    { en: "bread", ko: "빵", emoji: "🍞", s: "I like bread.", sk: "나는 빵을 좋아해요." },
    { en: "toast", ko: "토스트", emoji: "🍞", s: "I eat toast.", sk: "나는 토스트를 먹어요." },
    { en: "cereal", ko: "시리얼", emoji: "🥣", s: "I like cereal.", sk: "나는 시리얼을 좋아해요." },
    { en: "pancake", ko: "팬케이크", emoji: "🥞", s: "The pancake is yummy.", sk: "팬케이크는 맛있어요." },
    { en: "sausage", ko: "소시지", emoji: "🌭", s: "I eat a sausage.", sk: "나는 소시지를 먹어요." }
  ]},
  { day: 6, theme: "더 많은 아침 식사", words: [
    { en: "jam", ko: "잼", emoji: "🍯", s: "The jam is sweet.", sk: "잼은 달아요." },
    { en: "butter", ko: "버터", emoji: "🧈", s: "I like butter.", sk: "나는 버터를 좋아해요." },
    { en: "bacon", ko: "베이컨", emoji: "🥓", s: "I eat bacon.", sk: "나는 베이컨을 먹어요." },
    { en: "waffle", ko: "와플", emoji: "🧇", s: "The waffle is yummy.", sk: "와플은 맛있어요." },
    { en: "honey", ko: "꿀", emoji: "🍯", s: "The honey is sweet.", sk: "꿀은 달아요." },
    { en: "croissant", ko: "크루아상", emoji: "🥐", s: "I eat a croissant.", sk: "나는 크루아상을 먹어요." }
  ]},
  { day: 7, theme: "간식", words: [
    { en: "cookie", ko: "쿠키", emoji: "🍪", s: "I eat a cookie.", sk: "나는 쿠키를 먹어요." },
    { en: "popcorn", ko: "팝콘", emoji: "🍿", s: "I like popcorn.", sk: "나는 팝콘을 좋아해요." },
    { en: "chips", ko: "감자칩", emoji: "🥔", s: "I eat chips.", sk: "나는 감자칩을 먹어요." },
    { en: "cracker", ko: "크래커", emoji: "🍘", s: "I like a cracker.", sk: "나는 크래커를 좋아해요." },
    { en: "pretzel", ko: "프레첼", emoji: "🥨", s: "I eat a pretzel.", sk: "나는 프레첼을 먹어요." },
    { en: "biscuit", ko: "비스킷", emoji: "🍘", s: "I like a biscuit.", sk: "나는 비스킷을 좋아해요." }
  ]},
  { day: 8, theme: "더 많은 간식", words: [
    { en: "nuts", ko: "견과류", emoji: "🥜", s: "I like nuts.", sk: "나는 견과류를 좋아해요." },
    { en: "candy", ko: "사탕", emoji: "🍬", s: "The candy is sweet.", sk: "사탕은 달아요." },
    { en: "lollipop", ko: "막대사탕", emoji: "🍭", s: "I like a lollipop.", sk: "나는 막대사탕을 좋아해요." },
    { en: "gum", ko: "껌", emoji: "🍬", s: "I like gum.", sk: "나는 껌을 좋아해요." },
    { en: "jelly", ko: "젤리", emoji: "🍮", s: "The jelly is yummy.", sk: "젤리는 맛있어요." },
    { en: "caramel", ko: "캐러멜", emoji: "🍬", s: "The caramel is sweet.", sk: "캐러멜은 달아요." }
  ]},
  { day: 9, theme: "음료", words: [
    { en: "water", ko: "물", emoji: "💧", s: "I drink water.", sk: "나는 물을 마셔요." },
    { en: "milk", ko: "우유", emoji: "🥛", s: "I drink milk.", sk: "나는 우유를 마셔요." },
    { en: "juice", ko: "주스", emoji: "🧃", s: "I like juice.", sk: "나는 주스를 좋아해요." },
    { en: "tea", ko: "차", emoji: "🍵", s: "I drink tea.", sk: "나는 차를 마셔요." },
    { en: "cocoa", ko: "코코아", emoji: "☕", s: "I like cocoa.", sk: "나는 코코아를 좋아해요." },
    { en: "barley tea", ko: "보리차", emoji: "🍵", s: "I drink barley tea.", sk: "나는 보리차를 마셔요." }
  ]},
  { day: 10, theme: "더 많은 음료", words: [
    { en: "soda", ko: "탄산음료", emoji: "🥤", s: "I drink soda.", sk: "나는 탄산음료를 마셔요." },
    { en: "smoothie", ko: "스무디", emoji: "🥤", s: "I like a smoothie.", sk: "나는 스무디를 좋아해요." },
    { en: "lemonade", ko: "레모네이드", emoji: "🍋", s: "The lemonade is sour.", sk: "레모네이드는 셔요." },
    { en: "shake", ko: "셰이크", emoji: "🥤", s: "I drink a shake.", sk: "나는 셰이크를 마셔요." },
    { en: "coffee", ko: "커피", emoji: "☕", s: "Mom likes coffee.", sk: "엄마는 커피를 좋아해요." },
    { en: "bubble tea", ko: "버블티", emoji: "🧋", s: "I like bubble tea.", sk: "나는 버블티를 좋아해요." }
  ]},
  { day: 11, theme: "디저트와 단것", words: [
    { en: "cake", ko: "케이크", emoji: "🍰", s: "I eat a cake.", sk: "나는 케이크를 먹어요." },
    { en: "ice cream", ko: "아이스크림", emoji: "🍦", s: "I like ice cream.", sk: "나는 아이스크림을 좋아해요." },
    { en: "chocolate", ko: "초콜릿", emoji: "🍫", s: "The chocolate is sweet.", sk: "초콜릿은 달아요." },
    { en: "pie", ko: "파이", emoji: "🥧", s: "I eat a pie.", sk: "나는 파이를 먹어요." },
    { en: "donut", ko: "도넛", emoji: "🍩", s: "I like a donut.", sk: "나는 도넛을 좋아해요." },
    { en: "tart", ko: "타르트", emoji: "🥧", s: "I eat a tart.", sk: "나는 타르트를 먹어요." }
  ]},
  { day: 12, theme: "더 많은 디저트", words: [
    { en: "cupcake", ko: "컵케이크", emoji: "🧁", s: "I eat a cupcake.", sk: "나는 컵케이크를 먹어요." },
    { en: "pudding", ko: "푸딩", emoji: "🍮", s: "The pudding is yummy.", sk: "푸딩은 맛있어요." },
    { en: "muffin", ko: "머핀", emoji: "🧁", s: "I like a muffin.", sk: "나는 머핀을 좋아해요." },
    { en: "macaron", ko: "마카롱", emoji: "🍪", s: "The macaron is sweet.", sk: "마카롱은 달아요." },
    { en: "sundae", ko: "선데", emoji: "🍨", s: "I eat a sundae.", sk: "나는 선데를 먹어요." },
    { en: "parfait", ko: "파르페", emoji: "🍨", s: "I like a parfait.", sk: "나는 파르페를 좋아해요." }
  ]},
  { day: 13, theme: "한국 음식", words: [
    { en: "rice", ko: "밥", emoji: "🍚", s: "I eat rice.", sk: "나는 밥을 먹어요." },
    { en: "kimchi", ko: "김치", emoji: "🥬", s: "The kimchi is spicy.", sk: "김치는 매워요." },
    { en: "soup", ko: "국", emoji: "🍲", s: "I like soup.", sk: "나는 국을 좋아해요." },
    { en: "seaweed", ko: "김", emoji: "🍙", s: "I eat seaweed.", sk: "나는 김을 먹어요." },
    { en: "dumpling", ko: "만두", emoji: "🥟", s: "I like a dumpling.", sk: "나는 만두를 좋아해요." },
    { en: "bulgogi", ko: "불고기", emoji: "🥩", s: "I like bulgogi.", sk: "나는 불고기를 좋아해요." }
  ]},
  { day: 14, theme: "더 많은 한국 음식", words: [
    { en: "noodles", ko: "국수", emoji: "🍜", s: "I eat noodles.", sk: "나는 국수를 먹어요." },
    { en: "tofu", ko: "두부", emoji: "🍮", s: "I like tofu.", sk: "나는 두부를 좋아해요." },
    { en: "rice cake", ko: "떡", emoji: "🍡", s: "I eat a rice cake.", sk: "나는 떡을 먹어요." },
    { en: "gimbap", ko: "김밥", emoji: "🍙", s: "I like gimbap.", sk: "나는 김밥을 좋아해요." },
    { en: "pancake roll", ko: "전", emoji: "🥞", s: "I eat a pancake roll.", sk: "나는 전을 먹어요." },
    { en: "porridge", ko: "죽", emoji: "🥣", s: "I eat porridge.", sk: "나는 죽을 먹어요." }
  ]},
  { day: 15, theme: "서양 음식", words: [
    { en: "pizza", ko: "피자", emoji: "🍕", s: "I eat pizza.", sk: "나는 피자를 먹어요." },
    { en: "hamburger", ko: "햄버거", emoji: "🍔", s: "I like a hamburger.", sk: "나는 햄버거를 좋아해요." },
    { en: "sandwich", ko: "샌드위치", emoji: "🥪", s: "I eat a sandwich.", sk: "나는 샌드위치를 먹어요." },
    { en: "pasta", ko: "파스타", emoji: "🍝", s: "I like pasta.", sk: "나는 파스타를 좋아해요." },
    { en: "salad", ko: "샐러드", emoji: "🥗", s: "I eat a salad.", sk: "나는 샐러드를 먹어요." },
    { en: "steak", ko: "스테이크", emoji: "🥩", s: "I eat a steak.", sk: "나는 스테이크를 먹어요." }
  ]},
  { day: 16, theme: "더 많은 서양 음식", words: [
    { en: "hot dog", ko: "핫도그", emoji: "🌭", s: "I eat a hot dog.", sk: "나는 핫도그를 먹어요." },
    { en: "fries", ko: "감자튀김", emoji: "🍟", s: "I like fries.", sk: "나는 감자튀김을 좋아해요." },
    { en: "taco", ko: "타코", emoji: "🌮", s: "I eat a taco.", sk: "나는 타코를 먹어요." },
    { en: "soup bowl", ko: "수프", emoji: "🍲", s: "The soup bowl is hot.", sk: "수프는 뜨거워요." },
    { en: "burrito", ko: "부리토", emoji: "🌯", s: "I like a burrito.", sk: "나는 부리토를 좋아해요." },
    { en: "meatball", ko: "미트볼", emoji: "🍝", s: "I like a meatball.", sk: "나는 미트볼을 좋아해요." }
  ]},
  { day: 17, theme: "유제품", words: [
    { en: "cheese", ko: "치즈", emoji: "🧀", s: "I eat cheese.", sk: "나는 치즈를 먹어요." },
    { en: "yogurt", ko: "요거트", emoji: "🥛", s: "I like yogurt.", sk: "나는 요거트를 좋아해요." },
    { en: "cream", ko: "크림", emoji: "🍦", s: "The cream is sweet.", sk: "크림은 달아요." },
    { en: "ice", ko: "얼음", emoji: "🧊", s: "The ice is cold.", sk: "얼음은 차가워요." },
    { en: "milkshake", ko: "밀크셰이크", emoji: "🥤", s: "I drink a milkshake.", sk: "나는 밀크셰이크를 마셔요." },
    { en: "latte", ko: "라떼", emoji: "☕", s: "I like a latte.", sk: "나는 라떼를 좋아해요." }
  ]},
  { day: 18, theme: "고기와 단백질", words: [
    { en: "chicken", ko: "치킨", emoji: "🍗", s: "I eat chicken.", sk: "나는 치킨을 먹어요." },
    { en: "meat", ko: "고기", emoji: "🥩", s: "I like meat.", sk: "나는 고기를 좋아해요." },
    { en: "fish", ko: "생선", emoji: "🐟", s: "I eat fish.", sk: "나는 생선을 먹어요." },
    { en: "shrimp", ko: "새우", emoji: "🍤", s: "I like shrimp.", sk: "나는 새우를 좋아해요." },
    { en: "ham", ko: "햄", emoji: "🍖", s: "I eat ham.", sk: "나는 햄을 먹어요." },
    { en: "beef", ko: "소고기", emoji: "🥩", s: "I eat beef.", sk: "나는 소고기를 먹어요." }
  ]},
  { day: 19, theme: "맛", words: [
    { en: "sweet", ko: "달콤한", emoji: "🍯", s: "The cake is sweet.", sk: "케이크는 달아요." },
    { en: "sour", ko: "신", emoji: "🍋", s: "The lemon is sour.", sk: "레몬은 셔요." },
    { en: "salty", ko: "짠", emoji: "🧂", s: "The chips are salty.", sk: "감자칩은 짜요." },
    { en: "yummy", ko: "맛있는", emoji: "😋", s: "It is yummy.", sk: "맛있어요." },
    { en: "spicy", ko: "매운", emoji: "🌶️", s: "The kimchi is spicy.", sk: "김치는 매워요." },
    { en: "bitter", ko: "쓴", emoji: "☕", s: "The coffee is bitter.", sk: "커피는 써요." }
  ]},
  { day: 20, theme: "더 많은 맛", words: [
    { en: "hot", ko: "뜨거운", emoji: "🔥", s: "The soup is hot.", sk: "국은 뜨거워요." },
    { en: "cold", ko: "차가운", emoji: "❄️", s: "The milk is cold.", sk: "우유는 차가워요." },
    { en: "soft", ko: "부드러운", emoji: "🍮", s: "The bread is soft.", sk: "빵은 부드러워요." },
    { en: "crunchy", ko: "바삭한", emoji: "🍪", s: "The cookie is crunchy.", sk: "쿠키는 바삭해요." },
    { en: "fresh", ko: "신선한", emoji: "🥗", s: "The salad is fresh.", sk: "샐러드는 신선해요." },
    { en: "warm", ko: "따뜻한", emoji: "☀️", s: "The soup is warm.", sk: "국은 따뜻해요." }
  ]},
  { day: 21, theme: "주방 도구", words: [
    { en: "plate", ko: "접시", emoji: "🍽️", s: "I have a plate.", sk: "나는 접시가 있어요." },
    { en: "spoon", ko: "숟가락", emoji: "🥄", s: "I use a spoon.", sk: "나는 숟가락을 써요." },
    { en: "fork", ko: "포크", emoji: "🍴", s: "I use a fork.", sk: "나는 포크를 써요." },
    { en: "cup", ko: "컵", emoji: "🥤", s: "I have a cup.", sk: "나는 컵이 있어요." },
    { en: "bowl", ko: "그릇", emoji: "🥣", s: "I have a bowl.", sk: "나는 그릇이 있어요." },
    { en: "chopsticks", ko: "젓가락", emoji: "🥢", s: "I use chopsticks.", sk: "나는 젓가락을 써요." }
  ]},
  { day: 22, theme: "더 많은 주방 도구", words: [
    { en: "knife", ko: "칼", emoji: "🔪", s: "Mom uses a knife.", sk: "엄마는 칼을 써요." },
    { en: "pot", ko: "냄비", emoji: "🍲", s: "I see a pot.", sk: "나는 냄비를 봐요." },
    { en: "pan", ko: "프라이팬", emoji: "🍳", s: "I see a pan.", sk: "나는 프라이팬을 봐요." },
    { en: "napkin", ko: "냅킨", emoji: "🧻", s: "I use a napkin.", sk: "나는 냅킨을 써요." },
    { en: "straw", ko: "빨대", emoji: "🥤", s: "I use a straw.", sk: "나는 빨대를 써요." },
    { en: "kettle", ko: "주전자", emoji: "🫖", s: "I see a kettle.", sk: "나는 주전자를 봐요." }
  ]},
  { day: 23, theme: "요리하기", words: [
    { en: "cook", ko: "요리하다", emoji: "👨‍🍳", s: "I cook rice.", sk: "나는 밥을 요리해요." },
    { en: "mix", ko: "섞다", emoji: "🥣", s: "I mix the eggs.", sk: "나는 달걀을 섞어요." },
    { en: "cut", ko: "자르다", emoji: "🔪", s: "I cut a cake.", sk: "나는 케이크를 잘라요." },
    { en: "bake", ko: "굽다", emoji: "🧁", s: "I bake a cake.", sk: "나는 케이크를 구워요." },
    { en: "boil", ko: "끓이다", emoji: "🍲", s: "I boil water.", sk: "나는 물을 끓여요." },
    { en: "fry", ko: "부치다", emoji: "🍳", s: "I fry an egg.", sk: "나는 달걀을 부쳐요." }
  ]},
  { day: 24, theme: "먹는 행동", words: [
    { en: "eat", ko: "먹다", emoji: "🍴", s: "I eat lunch.", sk: "나는 점심을 먹어요." },
    { en: "drink", ko: "마시다", emoji: "🥛", s: "I drink milk.", sk: "나는 우유를 마셔요." },
    { en: "taste", ko: "맛보다", emoji: "👅", s: "I taste the soup.", sk: "나는 국을 맛봐요." },
    { en: "bite", ko: "베어 물다", emoji: "🦷", s: "I bite the apple.", sk: "나는 사과를 베어 물어요." },
    { en: "share", ko: "나누다", emoji: "🤝", s: "I share my cookie.", sk: "나는 쿠키를 나눠요." },
    { en: "serve", ko: "차리다", emoji: "🍽️", s: "I serve the food.", sk: "나는 음식을 차려요." }
  ]},
  { day: 25, theme: "더 많은 행동", words: [
    { en: "chew", ko: "씹다", emoji: "😋", s: "I chew my food.", sk: "나는 음식을 씹어요." },
    { en: "lick", ko: "핥다", emoji: "🍦", s: "I lick the ice cream.", sk: "나는 아이스크림을 핥아요." },
    { en: "sip", ko: "홀짝이다", emoji: "🥤", s: "I sip my juice.", sk: "나는 주스를 홀짝여요." },
    { en: "pour", ko: "붓다", emoji: "🫗", s: "I pour the milk.", sk: "나는 우유를 부어요." },
    { en: "wash", ko: "씻다", emoji: "🚰", s: "I wash the apple.", sk: "나는 사과를 씻어요." },
    { en: "peel", ko: "껍질 벗기다", emoji: "🍌", s: "I peel a banana.", sk: "나는 바나나 껍질을 벗겨요." }
  ]},
  { day: 26, theme: "식사 시간", words: [
    { en: "breakfast", ko: "아침 식사", emoji: "🍳", s: "I eat breakfast.", sk: "나는 아침을 먹어요." },
    { en: "lunch", ko: "점심 식사", emoji: "🍱", s: "I eat lunch.", sk: "나는 점심을 먹어요." },
    { en: "dinner", ko: "저녁 식사", emoji: "🍽️", s: "I eat dinner.", sk: "나는 저녁을 먹어요." },
    { en: "snack time", ko: "간식 시간", emoji: "🍪", s: "I like snack time.", sk: "나는 간식 시간을 좋아해요." },
    { en: "meal", ko: "식사", emoji: "🍲", s: "The meal is yummy.", sk: "식사가 맛있어요." },
    { en: "brunch", ko: "브런치", emoji: "🥐", s: "I like brunch.", sk: "나는 브런치를 좋아해요." }
  ]},
  { day: 27, theme: "식탁에서", words: [
    { en: "table", ko: "식탁", emoji: "🪑", s: "We sit at the table.", sk: "우리는 식탁에 앉아요." },
    { en: "menu", ko: "메뉴", emoji: "📋", s: "I read the menu.", sk: "나는 메뉴를 봐요." },
    { en: "hungry", ko: "배고픈", emoji: "😋", s: "I am hungry.", sk: "나는 배고파요." },
    { en: "full", ko: "배부른", emoji: "😊", s: "I am full.", sk: "나는 배불러요." },
    { en: "thirsty", ko: "목마른", emoji: "💧", s: "I am thirsty.", sk: "나는 목말라요." },
    { en: "chair", ko: "의자", emoji: "🪑", s: "I sit on a chair.", sk: "나는 의자에 앉아요." }
  ]},
  { day: 28, theme: "양념과 토핑", words: [
    { en: "salt", ko: "소금", emoji: "🧂", s: "I add salt.", sk: "나는 소금을 넣어요." },
    { en: "sugar", ko: "설탕", emoji: "🍬", s: "The sugar is sweet.", sk: "설탕은 달아요." },
    { en: "ketchup", ko: "케첩", emoji: "🍅", s: "I like ketchup.", sk: "나는 케첩을 좋아해요." },
    { en: "sauce", ko: "소스", emoji: "🥫", s: "I add sauce.", sk: "나는 소스를 넣어요." },
    { en: "oil", ko: "기름", emoji: "🫒", s: "Mom uses oil.", sk: "엄마는 기름을 써요." },
    { en: "soy sauce", ko: "간장", emoji: "🍶", s: "I add soy sauce.", sk: "나는 간장을 넣어요." }
  ]},
  { day: 29, theme: "더 많은 음식", words: [
    { en: "soup spoon", ko: "국숟가락", emoji: "🥄", s: "I use a soup spoon.", sk: "나는 국숟가락을 써요." },
    { en: "beans", ko: "콩", emoji: "🫘", s: "I eat beans.", sk: "나는 콩을 먹어요." },
    { en: "pear", ko: "배", emoji: "🍐", s: "I like a pear.", sk: "나는 배를 좋아해요." },
    { en: "kiwi", ko: "키위", emoji: "🥝", s: "I eat a kiwi.", sk: "나는 키위를 먹어요." },
    { en: "mango", ko: "망고", emoji: "🥭", s: "The mango is sweet.", sk: "망고는 달아요." },
    { en: "plum", ko: "자두", emoji: "🍑", s: "I eat a plum.", sk: "나는 자두를 먹어요." }
  ]},
  { day: 30, theme: "맛있는 마무리", words: [
    { en: "lettuce", ko: "상추", emoji: "🥬", s: "I eat lettuce.", sk: "나는 상추를 먹어요." },
    { en: "garlic", ko: "마늘", emoji: "🧄", s: "Mom uses garlic.", sk: "엄마는 마늘을 써요." },
    { en: "coconut", ko: "코코넛", emoji: "🥥", s: "I like a coconut.", sk: "나는 코코넛을 좋아해요." },
    { en: "avocado", ko: "아보카도", emoji: "🥑", s: "I eat an avocado.", sk: "나는 아보카도를 먹어요." },
    { en: "treat", ko: "특별한 간식", emoji: "🍬", s: "I love a treat.", sk: "나는 특별한 간식을 좋아해요." },
    { en: "spinach", ko: "시금치", emoji: "🥬", s: "I eat spinach.", sk: "나는 시금치를 먹어요." }
  ]}
  ];
