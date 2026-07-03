  const NAME = "퍼피";
  const STORAGE_KEY = "english_puppy_done";
  const greetings = [
    "멍멍! 나는 강아지 퍼피야. 오늘도 신나게 영어 배우자!",
    "단어 카드를 누르면 내가 영어로 말해줄게! 🐶",
    "큰 소리로 따라 말해보자. 멍멍!",
    "오늘도 멋지다! 우리 같이 산책하듯 배워보자.",
  ];
  const MSG = {
    allDone: "우와! 30일 영어 모두 끝냈어! 정말 최고야! 🏆🐶",
    cheer: (n) => "참 잘했어요! " + n + "일째 성공! 멍멍~ 🎉",
    undo: "괜찮아! 다시 천천히 해보자. 🐶",
  };

  const lessons = [
  { day: 1, theme: "날씨", words: [
    { en: "sun", ko: "해", emoji: "☀️", s: "The sun is hot.", sk: "해는 뜨거워요." },
    { en: "rain", ko: "비", emoji: "🌧️", s: "I see the rain.", sk: "나는 비를 봐요." },
    { en: "snow", ko: "눈", emoji: "❄️", s: "I like the snow.", sk: "나는 눈을 좋아해요." },
    { en: "wind", ko: "바람", emoji: "🌬️", s: "The wind is cold.", sk: "바람이 차가워요." },
    { en: "cloud", ko: "구름", emoji: "☁️", s: "Look at the cloud!", sk: "구름을 보세요!" },
    { en: "thunder", ko: "천둥", emoji: "🌩️", s: "I hear the thunder.", sk: "나는 천둥을 들어요." }
  ]},
  { day: 2, theme: "하늘 날씨", words: [
    { en: "rainbow", ko: "무지개", emoji: "🌈", s: "I see a rainbow.", sk: "나는 무지개를 봐요." },
    { en: "storm", ko: "폭풍", emoji: "⛈️", s: "The storm is big.", sk: "폭풍이 커요." },
    { en: "fog", ko: "안개", emoji: "🌫️", s: "I see the fog.", sk: "나는 안개를 봐요." },
    { en: "lightning", ko: "번개", emoji: "⚡", s: "Look at the lightning!", sk: "번개를 보세요!" },
    { en: "ice", ko: "얼음", emoji: "🧊", s: "The ice is cold.", sk: "얼음이 차가워요." },
    { en: "puddle", ko: "웅덩이", emoji: "💧", s: "I see a puddle.", sk: "나는 웅덩이를 봐요." }
  ]},
  { day: 3, theme: "봄", words: [
    { en: "spring", ko: "봄", emoji: "🌱", s: "I like spring.", sk: "나는 봄을 좋아해요." },
    { en: "flower", ko: "꽃", emoji: "🌷", s: "I see a flower.", sk: "나는 꽃을 봐요." },
    { en: "bud", ko: "새싹", emoji: "🌿", s: "The bud is small.", sk: "새싹이 작아요." },
    { en: "seed", ko: "씨앗", emoji: "🌰", s: "I have a seed.", sk: "나는 씨앗이 있어요." },
    { en: "warm", ko: "따뜻한", emoji: "🌞", s: "It is warm.", sk: "따뜻해요." },
    { en: "blossom", ko: "꽃망울", emoji: "🌸", s: "The blossom is pretty.", sk: "꽃이 예뻐요." }
  ]},
  { day: 4, theme: "여름", words: [
    { en: "summer", ko: "여름", emoji: "🏖️", s: "I like summer.", sk: "나는 여름을 좋아해요." },
    { en: "hot", ko: "더운", emoji: "🥵", s: "It is hot.", sk: "더워요." },
    { en: "beach", ko: "해변", emoji: "🏝️", s: "I go to the beach.", sk: "나는 해변에 가요." },
    { en: "wave", ko: "파도", emoji: "🌊", s: "The wave is big.", sk: "파도가 커요." },
    { en: "shell", ko: "조개껍데기", emoji: "🐚", s: "I see a shell.", sk: "나는 조개껍데기를 봐요." },
    { en: "swimsuit", ko: "수영복", emoji: "🩱", s: "I wear a swimsuit.", sk: "나는 수영복을 입어요." }
  ]},
  { day: 5, theme: "가을", words: [
    { en: "fall", ko: "가을", emoji: "🍂", s: "I like fall.", sk: "나는 가을을 좋아해요." },
    { en: "leaf", ko: "나뭇잎", emoji: "🍁", s: "I see a leaf.", sk: "나는 나뭇잎을 봐요." },
    { en: "acorn", ko: "도토리", emoji: "🌰", s: "Look at the acorn!", sk: "도토리를 보세요!" },
    { en: "cool", ko: "시원한", emoji: "🍃", s: "It is cool.", sk: "시원해요." },
    { en: "harvest", ko: "수확", emoji: "🌾", s: "I like the harvest.", sk: "나는 수확을 좋아해요." },
    { en: "pumpkin", ko: "호박", emoji: "🎃", s: "I see a pumpkin.", sk: "나는 호박을 봐요." }
  ]},
  { day: 6, theme: "겨울", words: [
    { en: "winter", ko: "겨울", emoji: "⛄", s: "I like winter.", sk: "나는 겨울을 좋아해요." },
    { en: "cold", ko: "추운", emoji: "🥶", s: "It is cold.", sk: "추워요." },
    { en: "snowman", ko: "눈사람", emoji: "☃️", s: "I make a snowman.", sk: "나는 눈사람을 만들어요." },
    { en: "scarf", ko: "목도리", emoji: "🧣", s: "I wear a scarf.", sk: "나는 목도리를 해요." },
    { en: "sled", ko: "썰매", emoji: "🛷", s: "I ride a sled.", sk: "나는 썰매를 타요." },
    { en: "mitten", ko: "벙어리장갑", emoji: "🧤", s: "I wear mittens.", sk: "나는 벙어리장갑을 껴요." }
  ]},
  { day: 7, theme: "하늘", words: [
    { en: "sky", ko: "하늘", emoji: "🌌", s: "The sky is blue.", sk: "하늘이 파래요." },
    { en: "moon", ko: "달", emoji: "🌙", s: "I see the moon.", sk: "나는 달을 봐요." },
    { en: "star", ko: "별", emoji: "⭐", s: "Look at the star!", sk: "별을 보세요!" },
    { en: "sunset", ko: "노을", emoji: "🌇", s: "The sunset is red.", sk: "노을이 빨개요." },
    { en: "night", ko: "밤", emoji: "🌃", s: "It is night.", sk: "밤이에요." },
    { en: "sunrise", ko: "일출", emoji: "🌅", s: "The sunrise is pretty.", sk: "일출이 예뻐요." }
  ]},
  { day: 8, theme: "자연", words: [
    { en: "mountain", ko: "산", emoji: "⛰️", s: "The mountain is big.", sk: "산이 커요." },
    { en: "river", ko: "강", emoji: "🏞️", s: "I see a river.", sk: "나는 강을 봐요." },
    { en: "sea", ko: "바다", emoji: "🌊", s: "The sea is blue.", sk: "바다가 파래요." },
    { en: "field", ko: "들판", emoji: "🌾", s: "I see a field.", sk: "나는 들판을 봐요." },
    { en: "hill", ko: "언덕", emoji: "🌄", s: "I go up the hill.", sk: "나는 언덕을 올라가요." },
    { en: "forest", ko: "숲", emoji: "🌲", s: "I see a forest.", sk: "나는 숲을 봐요." }
  ]},
  { day: 9, theme: "물과 땅", words: [
    { en: "lake", ko: "호수", emoji: "🏕️", s: "I see a lake.", sk: "나는 호수를 봐요." },
    { en: "pond", ko: "연못", emoji: "💧", s: "The pond is small.", sk: "연못이 작아요." },
    { en: "rock", ko: "바위", emoji: "🪨", s: "The rock is big.", sk: "바위가 커요." },
    { en: "sand", ko: "모래", emoji: "🏜️", s: "I play in the sand.", sk: "나는 모래에서 놀아요." },
    { en: "cave", ko: "동굴", emoji: "🕳️", s: "I see a cave.", sk: "나는 동굴을 봐요." },
    { en: "waterfall", ko: "폭포", emoji: "💦", s: "Look at the waterfall!", sk: "폭포를 보세요!" }
  ]},
  { day: 10, theme: "공원", words: [
    { en: "park", ko: "공원", emoji: "🏞️", s: "I go to the park.", sk: "나는 공원에 가요." },
    { en: "grass", ko: "잔디", emoji: "🌱", s: "The grass is green.", sk: "잔디가 초록색이에요." },
    { en: "tree", ko: "나무", emoji: "🌳", s: "The tree is tall.", sk: "나무가 키가 커요." },
    { en: "fountain", ko: "분수", emoji: "⛲", s: "Look at the fountain!", sk: "분수를 보세요!" },
    { en: "path", ko: "길", emoji: "🛤️", s: "I walk on the path.", sk: "나는 길을 걸어요." },
    { en: "statue", ko: "동상", emoji: "🗿", s: "Look at the statue!", sk: "동상을 보세요!" }
  ]},
  { day: 11, theme: "놀이터", words: [
    { en: "slide", ko: "미끄럼틀", emoji: "🛝", s: "I go down the slide.", sk: "나는 미끄럼틀을 타요." },
    { en: "swing", ko: "그네", emoji: "🤸", s: "I like the swing.", sk: "나는 그네를 좋아해요." },
    { en: "sandbox", ko: "모래놀이터", emoji: "🏖️", s: "I play in the sandbox.", sk: "나는 모래놀이터에서 놀아요." },
    { en: "ball", ko: "공", emoji: "⚽", s: "I have a ball.", sk: "나는 공이 있어요." },
    { en: "kite", ko: "연", emoji: "🪁", s: "I fly a kite.", sk: "나는 연을 날려요." },
    { en: "seesaw", ko: "시소", emoji: "🪜", s: "I play on the seesaw.", sk: "나는 시소를 타요." }
  ]},
  { day: 12, theme: "나무와 풀", words: [
    { en: "branch", ko: "나뭇가지", emoji: "🌿", s: "The branch is long.", sk: "나뭇가지가 길어요." },
    { en: "root", ko: "뿌리", emoji: "🌱", s: "I see a root.", sk: "나는 뿌리를 봐요." },
    { en: "log", ko: "통나무", emoji: "🪵", s: "The log is big.", sk: "통나무가 커요." },
    { en: "bush", ko: "덤불", emoji: "🌳", s: "I see a bush.", sk: "나는 덤불을 봐요." },
    { en: "weed", ko: "잡초", emoji: "🌾", s: "The weed is tall.", sk: "잡초가 키가 커요." },
    { en: "moss", ko: "이끼", emoji: "🍀", s: "The moss is green.", sk: "이끼가 초록색이에요." }
  ]},
  { day: 13, theme: "꽃", words: [
    { en: "rose", ko: "장미", emoji: "🌹", s: "I like a rose.", sk: "나는 장미를 좋아해요." },
    { en: "tulip", ko: "튤립", emoji: "🌷", s: "I see a tulip.", sk: "나는 튤립을 봐요." },
    { en: "sunflower", ko: "해바라기", emoji: "🌻", s: "The sunflower is tall.", sk: "해바라기가 키가 커요." },
    { en: "daisy", ko: "데이지", emoji: "🌼", s: "Look at the daisy!", sk: "데이지를 보세요!" },
    { en: "petal", ko: "꽃잎", emoji: "🌸", s: "The petal is pink.", sk: "꽃잎이 분홍색이에요." },
    { en: "lily", ko: "백합", emoji: "💐", s: "I like a lily.", sk: "나는 백합을 좋아해요." }
  ]},
  { day: 14, theme: "곤충", words: [
    { en: "bee", ko: "벌", emoji: "🐝", s: "I see a bee.", sk: "나는 벌을 봐요." },
    { en: "ant", ko: "개미", emoji: "🐜", s: "The ant is small.", sk: "개미가 작아요." },
    { en: "butterfly", ko: "나비", emoji: "🦋", s: "Look at the butterfly!", sk: "나비를 보세요!" },
    { en: "ladybug", ko: "무당벌레", emoji: "🐞", s: "I like the ladybug.", sk: "나는 무당벌레를 좋아해요." },
    { en: "spider", ko: "거미", emoji: "🕷️", s: "I see a spider.", sk: "나는 거미를 봐요." },
    { en: "beetle", ko: "딱정벌레", emoji: "🪲", s: "I see a beetle.", sk: "나는 딱정벌레를 봐요." }
  ]},
  { day: 15, theme: "작은 생물", words: [
    { en: "snail", ko: "달팽이", emoji: "🐌", s: "The snail is slow.", sk: "달팽이가 느려요." },
    { en: "worm", ko: "지렁이", emoji: "🪱", s: "I see a worm.", sk: "나는 지렁이를 봐요." },
    { en: "frog", ko: "개구리", emoji: "🐸", s: "The frog can jump.", sk: "개구리는 점프할 수 있어요." },
    { en: "grasshopper", ko: "메뚜기", emoji: "🦗", s: "Look at the grasshopper!", sk: "메뚜기를 보세요!" },
    { en: "dragonfly", ko: "잠자리", emoji: "🪰", s: "I see a dragonfly.", sk: "나는 잠자리를 봐요." },
    { en: "caterpillar", ko: "애벌레", emoji: "🐛", s: "The caterpillar is small.", sk: "애벌레가 작아요." }
  ]},
  { day: 16, theme: "새와 동물", words: [
    { en: "bird", ko: "새", emoji: "🐦", s: "I see a bird.", sk: "나는 새를 봐요." },
    { en: "duck", ko: "오리", emoji: "🦆", s: "The duck can swim.", sk: "오리는 수영할 수 있어요." },
    { en: "squirrel", ko: "다람쥐", emoji: "🐿️", s: "Look at the squirrel!", sk: "다람쥐를 보세요!" },
    { en: "rabbit", ko: "토끼", emoji: "🐰", s: "The rabbit can hop.", sk: "토끼는 깡충 뛸 수 있어요." },
    { en: "nest", ko: "둥지", emoji: "🪺", s: "I see a nest.", sk: "나는 둥지를 봐요." },
    { en: "deer", ko: "사슴", emoji: "🦌", s: "I see a deer.", sk: "나는 사슴을 봐요." }
  ]},
  { day: 17, theme: "거리", words: [
    { en: "road", ko: "도로", emoji: "🛣️", s: "The road is long.", sk: "도로가 길어요." },
    { en: "store", ko: "가게", emoji: "🏪", s: "I go to the store.", sk: "나는 가게에 가요." },
    { en: "sign", ko: "표지판", emoji: "🪧", s: "I see a sign.", sk: "나는 표지판을 봐요." },
    { en: "bench", ko: "벤치", emoji: "🪑", s: "I sit on the bench.", sk: "나는 벤치에 앉아요." },
    { en: "light", ko: "가로등", emoji: "💡", s: "Look at the light!", sk: "가로등을 보세요!" },
    { en: "sidewalk", ko: "인도", emoji: "🚶", s: "I walk on the sidewalk.", sk: "나는 인도를 걸어요." }
  ]},
  { day: 18, theme: "동네", words: [
    { en: "house", ko: "집", emoji: "🏠", s: "I see a house.", sk: "나는 집을 봐요." },
    { en: "building", ko: "건물", emoji: "🏢", s: "The building is tall.", sk: "건물이 높아요." },
    { en: "wall", ko: "담", emoji: "🧱", s: "The wall is big.", sk: "담이 커요." },
    { en: "gate", ko: "대문", emoji: "🚪", s: "I open the gate.", sk: "나는 대문을 열어요." },
    { en: "mailbox", ko: "우체통", emoji: "📮", s: "I see a mailbox.", sk: "나는 우체통을 봐요." },
    { en: "window", ko: "창문", emoji: "🪟", s: "I see a window.", sk: "나는 창문을 봐요." }
  ]},
  { day: 19, theme: "교통수단", words: [
    { en: "car", ko: "자동차", emoji: "🚗", s: "I ride in a car.", sk: "나는 자동차를 타요." },
    { en: "bus", ko: "버스", emoji: "🚌", s: "I ride the bus.", sk: "나는 버스를 타요." },
    { en: "bike", ko: "자전거", emoji: "🚲", s: "I ride a bike.", sk: "나는 자전거를 타요." },
    { en: "truck", ko: "트럭", emoji: "🚚", s: "The truck is big.", sk: "트럭이 커요." },
    { en: "taxi", ko: "택시", emoji: "🚕", s: "I see a taxi.", sk: "나는 택시를 봐요." },
    { en: "van", ko: "승합차", emoji: "🚐", s: "I see a van.", sk: "나는 승합차를 봐요." }
  ]},
  { day: 20, theme: "교통 안전", words: [
    { en: "traffic light", ko: "신호등", emoji: "🚦", s: "Look at the traffic light!", sk: "신호등을 보세요!" },
    { en: "crosswalk", ko: "횡단보도", emoji: "🚸", s: "I walk on the crosswalk.", sk: "나는 횡단보도를 건너요." },
    { en: "station", ko: "정류장", emoji: "🚏", s: "I wait at the station.", sk: "나는 정류장에서 기다려요." },
    { en: "stop", ko: "멈춤", emoji: "🛑", s: "I stop here.", sk: "나는 여기서 멈춰요." },
    { en: "horn", ko: "경적", emoji: "📢", s: "I hear a horn.", sk: "나는 경적을 들어요." },
    { en: "helmet", ko: "안전모", emoji: "⛑️", s: "I wear a helmet.", sk: "나는 안전모를 써요." }
  ]},
  { day: 21, theme: "더 많은 탈것", words: [
    { en: "train", ko: "기차", emoji: "🚆", s: "I ride a train.", sk: "나는 기차를 타요." },
    { en: "plane", ko: "비행기", emoji: "✈️", s: "The plane can fly.", sk: "비행기는 날 수 있어요." },
    { en: "boat", ko: "배", emoji: "⛵", s: "I see a boat.", sk: "나는 배를 봐요." },
    { en: "subway", ko: "지하철", emoji: "🚇", s: "I ride the subway.", sk: "나는 지하철을 타요." },
    { en: "scooter", ko: "킥보드", emoji: "🛴", s: "I ride a scooter.", sk: "나는 킥보드를 타요." },
    { en: "ship", ko: "큰 배", emoji: "🚢", s: "The ship is big.", sk: "큰 배가 커요." }
  ]},
  { day: 22, theme: "도시 장소 1", words: [
    { en: "school", ko: "학교", emoji: "🏫", s: "I go to school.", sk: "나는 학교에 가요." },
    { en: "library", ko: "도서관", emoji: "📚", s: "I go to the library.", sk: "나는 도서관에 가요." },
    { en: "market", ko: "시장", emoji: "🏬", s: "I go to the market.", sk: "나는 시장에 가요." },
    { en: "hospital", ko: "병원", emoji: "🏥", s: "I see a hospital.", sk: "나는 병원을 봐요." },
    { en: "bank", ko: "은행", emoji: "🏦", s: "I see a bank.", sk: "나는 은행을 봐요." },
    { en: "bakery", ko: "빵집", emoji: "🥐", s: "I go to the bakery.", sk: "나는 빵집에 가요." }
  ]},
  { day: 23, theme: "도시 장소 2", words: [
    { en: "zoo", ko: "동물원", emoji: "🦁", s: "I go to the zoo.", sk: "나는 동물원에 가요." },
    { en: "museum", ko: "박물관", emoji: "🏛️", s: "I go to the museum.", sk: "나는 박물관에 가요." },
    { en: "cafe", ko: "카페", emoji: "☕", s: "I go to the cafe.", sk: "나는 카페에 가요." },
    { en: "church", ko: "교회", emoji: "⛪", s: "I see a church.", sk: "나는 교회를 봐요." },
    { en: "post office", ko: "우체국", emoji: "🏤", s: "I go to the post office.", sk: "나는 우체국에 가요." },
    { en: "restaurant", ko: "식당", emoji: "🍽️", s: "I go to the restaurant.", sk: "나는 식당에 가요." }
  ]},
  { day: 24, theme: "일하는 사람들", words: [
    { en: "police", ko: "경찰", emoji: "👮", s: "I see a police officer.", sk: "나는 경찰을 봐요." },
    { en: "doctor", ko: "의사", emoji: "🧑‍⚕️", s: "The doctor is kind.", sk: "의사 선생님은 친절해요." },
    { en: "driver", ko: "운전사", emoji: "🧑‍✈️", s: "The driver is nice.", sk: "운전사는 친절해요." },
    { en: "farmer", ko: "농부", emoji: "🧑‍🌾", s: "I see a farmer.", sk: "나는 농부를 봐요." },
    { en: "mail carrier", ko: "집배원", emoji: "📬", s: "The mail carrier comes.", sk: "집배원이 와요." },
    { en: "teacher", ko: "선생님", emoji: "🧑‍🏫", s: "The teacher is kind.", sk: "선생님은 친절해요." }
  ]},
  { day: 25, theme: "산책", words: [
    { en: "walk", ko: "걷기", emoji: "🚶", s: "I like to walk.", sk: "나는 걷는 것을 좋아해요." },
    { en: "run", ko: "달리기", emoji: "🏃", s: "I can run fast.", sk: "나는 빨리 달릴 수 있어요." },
    { en: "jump", ko: "뛰기", emoji: "🤸", s: "I can jump high.", sk: "나는 높이 뛸 수 있어요." },
    { en: "climb", ko: "오르기", emoji: "🧗", s: "I can climb up.", sk: "나는 올라갈 수 있어요." },
    { en: "play", ko: "놀기", emoji: "🤾", s: "I like to play.", sk: "나는 노는 것을 좋아해요." },
    { en: "rest", ko: "쉬다", emoji: "😌", s: "I rest a bit.", sk: "나는 잠깐 쉬어요." }
  ]},
  { day: 26, theme: "야외 활동", words: [
    { en: "picnic", ko: "소풍", emoji: "🧺", s: "I go on a picnic.", sk: "나는 소풍을 가요." },
    { en: "camp", ko: "캠핑", emoji: "🏕️", s: "I like to camp.", sk: "나는 캠핑을 좋아해요." },
    { en: "tent", ko: "텐트", emoji: "⛺", s: "I see a tent.", sk: "나는 텐트를 봐요." },
    { en: "fire", ko: "모닥불", emoji: "🔥", s: "The fire is hot.", sk: "모닥불이 뜨거워요." },
    { en: "map", ko: "지도", emoji: "🗺️", s: "I look at the map.", sk: "나는 지도를 봐요." },
    { en: "backpack", ko: "배낭", emoji: "🎒", s: "I carry a backpack.", sk: "나는 배낭을 메요." }
  ]},
  { day: 27, theme: "바깥 놀이", words: [
    { en: "swim", ko: "수영", emoji: "🏊", s: "I can swim.", sk: "나는 수영할 수 있어요." },
    { en: "fish", ko: "낚시", emoji: "🎣", s: "I like to fish.", sk: "나는 낚시를 좋아해요." },
    { en: "skate", ko: "스케이트", emoji: "⛸️", s: "I can skate.", sk: "나는 스케이트를 탈 수 있어요." },
    { en: "ski", ko: "스키", emoji: "⛷️", s: "I like to ski.", sk: "나는 스키를 좋아해요." },
    { en: "hike", ko: "등산", emoji: "🥾", s: "I go on a hike.", sk: "나는 등산을 가요." },
    { en: "surf", ko: "서핑", emoji: "🏄", s: "I like to surf.", sk: "나는 서핑을 좋아해요." }
  ]},
  { day: 28, theme: "하늘과 우주", words: [
    { en: "rocket", ko: "로켓", emoji: "🚀", s: "The rocket can fly.", sk: "로켓은 날 수 있어요." },
    { en: "balloon", ko: "풍선", emoji: "🎈", s: "I have a balloon.", sk: "나는 풍선이 있어요." },
    { en: "earth", ko: "지구", emoji: "🌍", s: "I live on Earth.", sk: "나는 지구에 살아요." },
    { en: "planet", ko: "행성", emoji: "🪐", s: "I see a planet.", sk: "나는 행성을 봐요." },
    { en: "comet", ko: "혜성", emoji: "☄️", s: "Look at the comet!", sk: "혜성을 보세요!" },
    { en: "astronaut", ko: "우주비행사", emoji: "👨‍🚀", s: "I see an astronaut.", sk: "나는 우주비행사를 봐요." }
  ]},
  { day: 29, theme: "색깔과 모양", words: [
    { en: "green", ko: "초록색", emoji: "🟢", s: "The tree is green.", sk: "나무는 초록색이에요." },
    { en: "blue", ko: "파란색", emoji: "🔵", s: "The sky is blue.", sk: "하늘은 파란색이에요." },
    { en: "round", ko: "둥근", emoji: "⭕", s: "The sun is round.", sk: "해는 둥글어요." },
    { en: "tall", ko: "키 큰", emoji: "🌲", s: "The tree is tall.", sk: "나무가 키가 커요." },
    { en: "wide", ko: "넓은", emoji: "🟦", s: "The sea is wide.", sk: "바다가 넓어요." },
    { en: "red", ko: "빨간색", emoji: "🔴", s: "The rose is red.", sk: "장미는 빨간색이에요." }
  ]},
  { day: 30, theme: "바깥세상 복습", words: [
    { en: "weather", ko: "날씨", emoji: "🌤️", s: "I like the weather.", sk: "나는 날씨를 좋아해요." },
    { en: "nature", ko: "자연", emoji: "🍀", s: "I love nature.", sk: "나는 자연을 사랑해요." },
    { en: "town", ko: "마을", emoji: "🏘️", s: "I live in a town.", sk: "나는 마을에 살아요." },
    { en: "garden", ko: "정원", emoji: "🌻", s: "I see a garden.", sk: "나는 정원을 봐요." },
    { en: "world", ko: "세상", emoji: "🌎", s: "I love the world.", sk: "나는 세상을 사랑해요." },
    { en: "outside", ko: "바깥", emoji: "🌳", s: "I love the outside.", sk: "나는 바깥을 사랑해요." }
  ]}
  ];
