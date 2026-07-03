  const NAME = "핑";
  const STORAGE_KEY = "english_ping_done";
  const greetings = [
    "안녕! 나는 펭귄 핑이야. 신나게 몸 풀고 영어 배우자!",
    "단어 카드를 누르면 내가 영어로 말해줄게! 🐧",
    "큰 소리로 따라 말하고 몸도 움직여보자!",
    "오늘도 멋지다! 우리 같이 신나게 놀며 배우자.",
  ];
  const MSG = {
    allDone: "우와! 30일 영어 모두 끝냈어! 정말 최고야! 🏆🐧",
    cheer: (n) => "참 잘했어요! " + n + "일째 성공! 신난다~ 🎉",
    undo: "괜찮아! 다시 천천히 해보자. 🐧",
  };

  const lessons = [
  { day: 1, theme: "움직여요", words: [
    { en: "run", ko: "달리다", emoji: "🏃", s: "I can run.", sk: "나는 달릴 수 있어요." },
    { en: "jump", ko: "점프하다", emoji: "🤸", s: "I can jump high.", sk: "나는 높이 뛸 수 있어요." },
    { en: "walk", ko: "걷다", emoji: "🚶", s: "I can walk.", sk: "나는 걸을 수 있어요." },
    { en: "stop", ko: "멈추다", emoji: "🛑", s: "Stop! Wait for me.", sk: "멈춰요! 기다려요." },
    { en: "go", ko: "가다", emoji: "🟢", s: "Let's go and play!", sk: "가서 놀아요!" },
    { en: "stand", ko: "서다", emoji: "🧍", s: "I can stand still.", sk: "나는 가만히 설 수 있어요." }
  ]},
  { day: 2, theme: "신나는 동작", words: [
    { en: "swim", ko: "수영하다", emoji: "🏊", s: "I can swim.", sk: "나는 수영할 수 있어요." },
    { en: "climb", ko: "오르다", emoji: "🧗", s: "I can climb up.", sk: "나는 위로 오를 수 있어요." },
    { en: "throw", ko: "던지다", emoji: "🤾", s: "I can throw a ball.", sk: "나는 공을 던질 수 있어요." },
    { en: "catch", ko: "잡다", emoji: "🧤", s: "I can catch a ball.", sk: "나는 공을 잡을 수 있어요." },
    { en: "kick", ko: "차다", emoji: "🦵", s: "I can kick a ball.", sk: "나는 공을 찰 수 있어요." },
    { en: "push", ko: "밀다", emoji: "🙌", s: "I can push the cart.", sk: "나는 수레를 밀 수 있어요." }
  ]},
  { day: 3, theme: "춤추고 박수", words: [
    { en: "dance", ko: "춤추다", emoji: "💃", s: "Let's dance together!", sk: "함께 춤춰요!" },
    { en: "clap", ko: "박수치다", emoji: "👏", s: "I can clap my hands.", sk: "나는 손뼉을 칠 수 있어요." },
    { en: "roll", ko: "구르다", emoji: "🤼", s: "I can roll over.", sk: "나는 데굴데굴 구를 수 있어요." },
    { en: "spin", ko: "빙빙 돌다", emoji: "🌀", s: "I can spin around.", sk: "나는 빙글빙글 돌 수 있어요." },
    { en: "hop", ko: "깡충 뛰다", emoji: "🐰", s: "I can hop like a bunny.", sk: "나는 토끼처럼 깡충 뛸 수 있어요." },
    { en: "sway", ko: "살랑살랑 흔들다", emoji: "🌾", s: "I sway side to side.", sk: "나는 좌우로 살랑여요." }
  ]},
  { day: 4, theme: "축구하자", words: [
    { en: "soccer", ko: "축구", emoji: "⚽", s: "Let's play soccer!", sk: "축구해요!" },
    { en: "ball", ko: "공", emoji: "🏐", s: "I like the ball.", sk: "나는 공이 좋아요." },
    { en: "goal", ko: "골", emoji: "🥅", s: "I can make a goal.", sk: "나는 골을 넣을 수 있어요." },
    { en: "team", ko: "팀", emoji: "🧑‍🤝‍🧑", s: "We are a team.", sk: "우리는 한 팀이에요." },
    { en: "pass", ko: "패스하다", emoji: "👟", s: "Pass the ball to me.", sk: "나에게 공을 패스해요." },
    { en: "shoot", ko: "슛하다", emoji: "⚽", s: "I shoot the ball.", sk: "나는 공을 슛해요." }
  ]},
  { day: 5, theme: "여러 가지 운동", words: [
    { en: "basketball", ko: "농구", emoji: "🏀", s: "Let's play basketball!", sk: "농구해요!" },
    { en: "baseball", ko: "야구", emoji: "⚾", s: "I like baseball.", sk: "나는 야구가 좋아요." },
    { en: "tennis", ko: "테니스", emoji: "🎾", s: "Let's play tennis!", sk: "테니스 쳐요!" },
    { en: "bat", ko: "방망이", emoji: "🏏", s: "I have a bat.", sk: "나는 방망이가 있어요." },
    { en: "hoop", ko: "골대", emoji: "⭕", s: "Throw it in the hoop.", sk: "골대 안에 던져요." },
    { en: "golf", ko: "골프", emoji: "⛳", s: "Let's play golf!", sk: "골프 쳐요!" }
  ]},
  { day: 6, theme: "물놀이 운동", words: [
    { en: "swimming", ko: "수영", emoji: "🏊", s: "I like swimming.", sk: "나는 수영을 좋아해요." },
    { en: "skating", ko: "스케이트", emoji: "⛸️", s: "Let's go skating!", sk: "스케이트 타러 가요!" },
    { en: "running", ko: "달리기", emoji: "🏃", s: "I like running.", sk: "나는 달리기를 좋아해요." },
    { en: "skiing", ko: "스키", emoji: "🎿", s: "Let's go skiing!", sk: "스키 타러 가요!" },
    { en: "biking", ko: "자전거 타기", emoji: "🚴", s: "I like biking.", sk: "나는 자전거 타기를 좋아해요." },
    { en: "jumping", ko: "점프하기", emoji: "🤸", s: "I like jumping.", sk: "나는 점프하기를 좋아해요." }
  ]},
  { day: 7, theme: "놀이터에서", words: [
    { en: "slide", ko: "미끄럼틀", emoji: "🛝", s: "Let's go on the slide!", sk: "미끄럼틀 타요!" },
    { en: "swing", ko: "그네", emoji: "🌳", s: "I like the swing.", sk: "나는 그네가 좋아요." },
    { en: "seesaw", ko: "시소", emoji: "🪜", s: "Let's play on the seesaw.", sk: "시소 타고 놀아요." },
    { en: "sandbox", ko: "모래밭", emoji: "🏖️", s: "I play in the sandbox.", sk: "나는 모래밭에서 놀아요." },
    { en: "park", ko: "공원", emoji: "🏞️", s: "Let's go to the park!", sk: "공원에 가요!" },
    { en: "monkey bars", ko: "구름사다리", emoji: "🐒", s: "I hang on the monkey bars.", sk: "나는 구름사다리에 매달려요." }
  ]},
  { day: 8, theme: "더 놀자 놀이터", words: [
    { en: "sand", ko: "모래", emoji: "🏜️", s: "I play with sand.", sk: "나는 모래를 가지고 놀아요." },
    { en: "bucket", ko: "양동이", emoji: "🪣", s: "I have a bucket.", sk: "나는 양동이가 있어요." },
    { en: "shovel", ko: "삽", emoji: "🛠️", s: "I dig with a shovel.", sk: "나는 삽으로 파요." },
    { en: "tunnel", ko: "터널", emoji: "🚇", s: "I go through the tunnel.", sk: "나는 터널을 지나가요." },
    { en: "ladder", ko: "사다리", emoji: "🪜", s: "I climb the ladder.", sk: "나는 사다리를 올라가요." },
    { en: "castle", ko: "모래성", emoji: "🏰", s: "I build a sand castle.", sk: "나는 모래성을 만들어요." }
  ]},
  { day: 9, theme: "몸을 써요", words: [
    { en: "arm", ko: "팔", emoji: "💪", s: "I move my arm.", sk: "나는 팔을 움직여요." },
    { en: "leg", ko: "다리", emoji: "🦵", s: "I move my leg.", sk: "나는 다리를 움직여요." },
    { en: "knee", ko: "무릎", emoji: "🦿", s: "Bend your knee.", sk: "무릎을 굽혀요." },
    { en: "finger", ko: "손가락", emoji: "👆", s: "I have ten fingers.", sk: "나는 손가락이 열 개예요." },
    { en: "back", ko: "등", emoji: "🔙", s: "My back is strong.", sk: "내 등은 튼튼해요." },
    { en: "shoulder", ko: "어깨", emoji: "🙆", s: "I move my shoulders.", sk: "나는 어깨를 움직여요." }
  ]},
  { day: 10, theme: "몸 더 알기", words: [
    { en: "hand", ko: "손", emoji: "✋", s: "I clap my hands.", sk: "나는 손뼉을 쳐요." },
    { en: "foot", ko: "발", emoji: "🦶", s: "I kick with my foot.", sk: "나는 발로 차요." },
    { en: "head", ko: "머리", emoji: "🧠", s: "I shake my head.", sk: "나는 머리를 흔들어요." },
    { en: "toe", ko: "발가락", emoji: "🐾", s: "I touch my toes.", sk: "나는 발가락을 만져요." },
    { en: "elbow", ko: "팔꿈치", emoji: "🦴", s: "I bend my elbow.", sk: "나는 팔꿈치를 굽혀요." },
    { en: "wrist", ko: "손목", emoji: "🤚", s: "I turn my wrist.", sk: "나는 손목을 돌려요." }
  ]},
  { day: 11, theme: "숨바꼭질 놀이", words: [
    { en: "hide and seek", ko: "숨바꼭질", emoji: "🙈", s: "Let's play hide and seek!", sk: "숨바꼭질해요!" },
    { en: "hide", ko: "숨다", emoji: "🫣", s: "I can hide here.", sk: "나는 여기 숨을 수 있어요." },
    { en: "find", ko: "찾다", emoji: "🔍", s: "I can find you.", sk: "나는 너를 찾을 수 있어요." },
    { en: "tag", ko: "술래잡기", emoji: "🏃", s: "Let's play tag!", sk: "술래잡기해요!" },
    { en: "count", ko: "세다", emoji: "🔢", s: "I can count to ten.", sk: "나는 열까지 셀 수 있어요." },
    { en: "peek", ko: "살짝 보다", emoji: "👀", s: "I peek around.", sk: "나는 살짝 엿봐요." }
  ]},
  { day: 12, theme: "장난감 놀이", words: [
    { en: "kite", ko: "연", emoji: "🪁", s: "Let's fly a kite!", sk: "연을 날려요!" },
    { en: "jump rope", ko: "줄넘기", emoji: "🪢", s: "I can jump rope.", sk: "나는 줄넘기를 할 수 있어요." },
    { en: "balloon", ko: "풍선", emoji: "🎈", s: "I like the balloon.", sk: "나는 풍선이 좋아요." },
    { en: "blocks", ko: "블록", emoji: "🧱", s: "I play with blocks.", sk: "나는 블록을 가지고 놀아요." },
    { en: "toy", ko: "장난감", emoji: "🧸", s: "I like my toy.", sk: "나는 내 장난감이 좋아요." },
    { en: "yo-yo", ko: "요요", emoji: "🪀", s: "I play with a yo-yo.", sk: "나는 요요를 가지고 놀아요." }
  ]},
  { day: 13, theme: "더 많은 장난감", words: [
    { en: "doll", ko: "인형", emoji: "🪆", s: "I have a doll.", sk: "나는 인형이 있어요." },
    { en: "car", ko: "자동차", emoji: "🚗", s: "I play with a toy car.", sk: "나는 장난감 자동차를 가지고 놀아요." },
    { en: "robot", ko: "로봇", emoji: "🤖", s: "I like the robot.", sk: "나는 로봇이 좋아요." },
    { en: "puzzle", ko: "퍼즐", emoji: "🧩", s: "Let's do a puzzle!", sk: "퍼즐 맞춰요!" },
    { en: "top", ko: "팽이", emoji: "🎯", s: "I spin the top.", sk: "나는 팽이를 돌려요." },
    { en: "train", ko: "기차", emoji: "🚂", s: "I push the toy train.", sk: "나는 장난감 기차를 밀어요." }
  ]},
  { day: 14, theme: "물놀이 신나요", words: [
    { en: "water", ko: "물", emoji: "💧", s: "I like to play in water.", sk: "나는 물에서 노는 게 좋아요." },
    { en: "splash", ko: "첨벙", emoji: "💦", s: "I splash in the pool.", sk: "나는 수영장에서 첨벙거려요." },
    { en: "pool", ko: "수영장", emoji: "🏊", s: "Let's go to the pool!", sk: "수영장에 가요!" },
    { en: "float", ko: "뜨다", emoji: "🛟", s: "I can float on water.", sk: "나는 물에 뜰 수 있어요." },
    { en: "dive", ko: "다이빙하다", emoji: "🤿", s: "I can dive in.", sk: "나는 물에 뛰어들 수 있어요." },
    { en: "goggles", ko: "물안경", emoji: "🥽", s: "I wear goggles.", sk: "나는 물안경을 써요." }
  ]},
  { day: 15, theme: "바닷가 놀이", words: [
    { en: "beach", ko: "해변", emoji: "🏖️", s: "Let's go to the beach!", sk: "해변에 가요!" },
    { en: "wave", ko: "파도", emoji: "🌊", s: "I jump over the wave.", sk: "나는 파도를 뛰어넘어요." },
    { en: "shell", ko: "조개", emoji: "🐚", s: "I find a shell.", sk: "나는 조개를 찾아요." },
    { en: "boat", ko: "배", emoji: "⛵", s: "I ride a boat.", sk: "나는 배를 타요." },
    { en: "fish", ko: "물고기", emoji: "🐟", s: "I see a fish.", sk: "나는 물고기를 봐요." },
    { en: "crab", ko: "게", emoji: "🦀", s: "I see a crab.", sk: "나는 게를 봐요." }
  ]},
  { day: 16, theme: "밖에서 놀아요", words: [
    { en: "outside", ko: "밖", emoji: "🌳", s: "Let's go outside!", sk: "밖에 나가요!" },
    { en: "bike", ko: "자전거", emoji: "🚲", s: "I can ride a bike.", sk: "나는 자전거를 탈 수 있어요." },
    { en: "scooter", ko: "킥보드", emoji: "🛴", s: "I ride a scooter.", sk: "나는 킥보드를 타요." },
    { en: "tree", ko: "나무", emoji: "🌲", s: "I climb the tree.", sk: "나는 나무에 올라가요." },
    { en: "hill", ko: "언덕", emoji: "⛰️", s: "I run up the hill.", sk: "나는 언덕을 뛰어 올라가요." },
    { en: "rock", ko: "바위", emoji: "🪨", s: "I sit on a rock.", sk: "나는 바위에 앉아요." }
  ]},
  { day: 17, theme: "달리기 시합", words: [
    { en: "race", ko: "경주", emoji: "🏁", s: "Let's have a race!", sk: "달리기 시합해요!" },
    { en: "fast", ko: "빠른", emoji: "⚡", s: "I run fast.", sk: "나는 빨리 달려요." },
    { en: "slow", ko: "느린", emoji: "🐢", s: "The turtle is slow.", sk: "거북이는 느려요." },
    { en: "start", ko: "출발", emoji: "🚦", s: "Ready, set, start!", sk: "준비, 시작!" },
    { en: "finish", ko: "도착", emoji: "🏆", s: "I finish first.", sk: "나는 일등으로 들어와요." },
    { en: "lane", ko: "레인", emoji: "🛣️", s: "I run in my lane.", sk: "나는 내 레인에서 달려요." }
  ]},
  { day: 18, theme: "공놀이", words: [
    { en: "bounce", ko: "튕기다", emoji: "🏀", s: "I bounce the ball.", sk: "나는 공을 튕겨요." },
    { en: "roll over", ko: "굴러가다", emoji: "🎳", s: "The ball rolls over here.", sk: "공이 이쪽으로 굴러와요." },
    { en: "toss", ko: "살짝 던지다", emoji: "🤹", s: "I toss the ball up.", sk: "나는 공을 위로 던져요." },
    { en: "hit", ko: "치다", emoji: "🏏", s: "I hit the ball.", sk: "나는 공을 쳐요." },
    { en: "miss", ko: "놓치다", emoji: "😯", s: "I miss the ball.", sk: "나는 공을 놓쳐요." },
    { en: "aim", ko: "겨냥하다", emoji: "🎯", s: "I aim at the goal.", sk: "나는 골대를 겨냥해요." }
  ]},
  { day: 19, theme: "기분 좋아요", words: [
    { en: "fun", ko: "재미있는", emoji: "😄", s: "It is so fun!", sk: "정말 재미있어요!" },
    { en: "happy", ko: "행복한", emoji: "😊", s: "I am happy.", sk: "나는 행복해요." },
    { en: "excited", ko: "신나는", emoji: "🤩", s: "I am so excited!", sk: "나는 너무 신나요!" },
    { en: "ready", ko: "준비된", emoji: "👍", s: "I am ready to play.", sk: "나는 놀 준비가 됐어요." },
    { en: "play", ko: "놀다", emoji: "🎉", s: "Let's play together!", sk: "함께 놀아요!" },
    { en: "glad", ko: "기쁜", emoji: "😁", s: "I am glad.", sk: "나는 기뻐요." }
  ]},
  { day: 20, theme: "놀고 난 기분", words: [
    { en: "tired", ko: "피곤한", emoji: "😴", s: "I am tired now.", sk: "나는 이제 피곤해요." },
    { en: "win", ko: "이기다", emoji: "🥇", s: "I want to win!", sk: "나는 이기고 싶어요!" },
    { en: "lose", ko: "지다", emoji: "😢", s: "I do not want to lose.", sk: "나는 지기 싫어요." },
    { en: "strong", ko: "힘센", emoji: "💪", s: "I am strong.", sk: "나는 힘이 세요." },
    { en: "brave", ko: "용감한", emoji: "🦸", s: "I am brave.", sk: "나는 용감해요." },
    { en: "proud", ko: "자랑스러운", emoji: "😎", s: "I am proud of me.", sk: "나는 내가 자랑스러워요." }
  ]},
  { day: 21, theme: "체조 시간", words: [
    { en: "stretch", ko: "쭉 펴다", emoji: "🧘", s: "Let's stretch our arms.", sk: "팔을 쭉 펴요." },
    { en: "bend", ko: "구부리다", emoji: "🙇", s: "I bend down low.", sk: "나는 아래로 숙여요." },
    { en: "twist", ko: "비틀다", emoji: "🤸", s: "I twist my body.", sk: "나는 몸을 비틀어요." },
    { en: "march", ko: "행진하다", emoji: "🥁", s: "Let's march in place.", sk: "제자리에서 행진해요." },
    { en: "wiggle", ko: "꼼지락거리다", emoji: "🐛", s: "I wiggle my toes.", sk: "나는 발가락을 꼼지락거려요." },
    { en: "reach", ko: "손 뻗다", emoji: "🙆", s: "I reach up high.", sk: "나는 위로 손을 뻗어요." }
  ]},
  { day: 22, theme: "높이 낮이", words: [
    { en: "high", ko: "높은", emoji: "⬆️", s: "I jump up high.", sk: "나는 높이 뛰어요." },
    { en: "low", ko: "낮은", emoji: "⬇️", s: "I crouch down low.", sk: "나는 낮게 웅크려요." },
    { en: "up", ko: "위로", emoji: "🔼", s: "I go up the slide.", sk: "나는 미끄럼틀 위로 올라가요." },
    { en: "down", ko: "아래로", emoji: "🔽", s: "I slide down.", sk: "나는 미끄럼틀을 타고 내려가요." },
    { en: "fall", ko: "넘어지다", emoji: "🙃", s: "Oops, I fall down.", sk: "앗, 나는 넘어졌어요." },
    { en: "stand up", ko: "일어서다", emoji: "🧍", s: "I stand up tall.", sk: "나는 우뚝 일어서요." }
  ]},
  { day: 23, theme: "함께 놀아요", words: [
    { en: "friend", ko: "친구", emoji: "🧒", s: "I play with my friend.", sk: "나는 친구와 놀아요." },
    { en: "share", ko: "나누다", emoji: "🤝", s: "I share my toy.", sk: "나는 내 장난감을 나눠요." },
    { en: "help", ko: "돕다", emoji: "🆘", s: "I can help you.", sk: "나는 너를 도와줄 수 있어요." },
    { en: "wait", ko: "기다리다", emoji: "⏳", s: "Please wait for me.", sk: "나를 기다려 주세요." },
    { en: "turn", ko: "차례", emoji: "🔄", s: "It is my turn.", sk: "이제 내 차례예요." },
    { en: "kind", ko: "친절한", emoji: "😊", s: "I am kind to friends.", sk: "나는 친구에게 친절해요." }
  ]},
  { day: 24, theme: "잡기 놀이", words: [
    { en: "chase", ko: "쫓다", emoji: "🏃", s: "I chase my friend.", sk: "나는 친구를 쫓아가요." },
    { en: "run away", ko: "도망가다", emoji: "💨", s: "I run away fast.", sk: "나는 빨리 도망가요." },
    { en: "freeze", ko: "얼음", emoji: "🧊", s: "Freeze! Do not move.", sk: "얼음! 움직이지 마요." },
    { en: "duck", ko: "숙이다", emoji: "🦆", s: "I duck down low.", sk: "나는 몸을 낮게 숙여요." },
    { en: "crawl", ko: "기어가다", emoji: "🐛", s: "I crawl on the floor.", sk: "나는 바닥을 기어가요." },
    { en: "sneak", ko: "살금살금 가다", emoji: "🐾", s: "I sneak quietly.", sk: "나는 살금살금 가요." }
  ]},
  { day: 25, theme: "공원 나들이", words: [
    { en: "grass", ko: "잔디", emoji: "🌱", s: "I sit on the grass.", sk: "나는 잔디에 앉아요." },
    { en: "flower", ko: "꽃", emoji: "🌸", s: "I see a flower.", sk: "나는 꽃을 봐요." },
    { en: "bird", ko: "새", emoji: "🐦", s: "A bird can fly.", sk: "새는 날 수 있어요." },
    { en: "butterfly", ko: "나비", emoji: "🦋", s: "I chase a butterfly.", sk: "나는 나비를 쫓아가요." },
    { en: "bug", ko: "벌레", emoji: "🐞", s: "I find a little bug.", sk: "나는 작은 벌레를 찾아요." },
    { en: "ant", ko: "개미", emoji: "🐜", s: "I see an ant.", sk: "나는 개미를 봐요." }
  ]},
  { day: 26, theme: "둥글게 놀아요", words: [
    { en: "circle", ko: "원", emoji: "⭕", s: "Let's make a circle.", sk: "동그랗게 모여요." },
    { en: "ring", ko: "고리", emoji: "💍", s: "I toss the ring.", sk: "나는 고리를 던져요." },
    { en: "hula hoop", ko: "훌라후프", emoji: "🟠", s: "I spin the hula hoop.", sk: "나는 훌라후프를 돌려요." },
    { en: "marble", ko: "구슬", emoji: "🔵", s: "I play with a marble.", sk: "나는 구슬을 가지고 놀아요." },
    { en: "bubble", ko: "비눗방울", emoji: "🫧", s: "I blow a bubble.", sk: "나는 비눗방울을 불어요." },
    { en: "wheel", ko: "바퀴", emoji: "🛞", s: "The wheel is round.", sk: "바퀴는 둥글어요." }
  ]},
  { day: 27, theme: "신나는 점프", words: [
    { en: "trampoline", ko: "트램펄린", emoji: "🤾", s: "I jump on the trampoline.", sk: "나는 트램펄린에서 뛰어요." },
    { en: "leap", ko: "껑충 뛰다", emoji: "🐸", s: "I leap like a frog.", sk: "나는 개구리처럼 껑충 뛰어요." },
    { en: "skip", ko: "깡충깡충 가다", emoji: "🦘", s: "I skip down the path.", sk: "나는 깡충깡충 길을 가요." },
    { en: "balance", ko: "균형 잡다", emoji: "🤹", s: "I can balance well.", sk: "나는 균형을 잘 잡아요." },
    { en: "tiptoe", ko: "발끝으로 걷다", emoji: "🩰", s: "I walk on tiptoe.", sk: "나는 발끝으로 걸어요." },
    { en: "spring", ko: "폴짝 뛰다", emoji: "🦗", s: "I spring up high.", sk: "나는 폴짝 높이 뛰어요." }
  ]},
  { day: 28, theme: "겨울 놀이", words: [
    { en: "snow", ko: "눈", emoji: "❄️", s: "Let's play in the snow!", sk: "눈에서 놀아요!" },
    { en: "snowman", ko: "눈사람", emoji: "⛄", s: "I make a snowman.", sk: "나는 눈사람을 만들어요." },
    { en: "sled", ko: "썰매", emoji: "🛷", s: "I ride a sled.", sk: "나는 썰매를 타요." },
    { en: "slip", ko: "미끄러지다", emoji: "🧊", s: "I slip on the ice.", sk: "나는 얼음에서 미끄러져요." },
    { en: "skate", ko: "스케이트 타다", emoji: "⛸️", s: "I can skate.", sk: "나는 스케이트를 탈 수 있어요." },
    { en: "snowball", ko: "눈뭉치", emoji: "☃️", s: "I throw a snowball.", sk: "나는 눈뭉치를 던져요." }
  ]},
  { day: 29, theme: "박자 놀이", words: [
    { en: "music", ko: "음악", emoji: "🎵", s: "Let's play music!", sk: "음악을 틀어요!" },
    { en: "drum", ko: "북", emoji: "🥁", s: "I can play the drum.", sk: "나는 북을 칠 수 있어요." },
    { en: "sing", ko: "노래하다", emoji: "🎤", s: "I like to sing.", sk: "나는 노래하는 게 좋아요." },
    { en: "shake", ko: "흔들다", emoji: "🪇", s: "I shake my body.", sk: "나는 몸을 흔들어요." },
    { en: "stomp", ko: "쿵쿵 밟다", emoji: "👣", s: "I stomp my feet.", sk: "나는 발을 쿵쿵 굴러요." },
    { en: "beat", ko: "박자", emoji: "🎶", s: "I feel the beat.", sk: "나는 박자를 느껴요." }
  ]},
  { day: 30, theme: "최고의 놀이날", words: [
    { en: "game", ko: "게임", emoji: "🎮", s: "Let's play a game!", sk: "게임해요!" },
    { en: "fun day", ko: "즐거운 날", emoji: "🌈", s: "It is a fun day.", sk: "정말 즐거운 날이에요." },
    { en: "best", ko: "최고의", emoji: "🏅", s: "You are the best!", sk: "네가 최고예요!" },
    { en: "cheer", ko: "응원하다", emoji: "📣", s: "Let's cheer together!", sk: "함께 응원해요!" },
    { en: "again", ko: "다시", emoji: "🔁", s: "Let's play again!", sk: "다시 놀아요!" },
    { en: "thank you", ko: "고마워", emoji: "🙏", s: "Thank you for playing!", sk: "함께 놀아줘서 고마워!" }
  ]}
  ];
