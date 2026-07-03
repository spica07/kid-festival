(function () {
  const courses = [
    { subject: "english", subjectName: "영어", title: "사자 레오", theme: "동물·알파벳 기초", url: "pages/english/english-30days.html", key: "english30_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "토끼 바니", theme: "생활 영어", url: "pages/english/english-bunny.html", key: "english_bunny_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "강아지 푸피", theme: "바깥세상 영어", url: "pages/english/english-puppy.html", key: "english_puppy_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "곰돌이 코코", theme: "맛있는 영어", url: "pages/english/english-coco.html", key: "english_coco_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "펭귄 핑", theme: "놀이·이동 영어", url: "pages/english/english-ping.html", key: "english_ping_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "부엉이 올리", theme: "모양·반대말 영어", url: "pages/english/english-owly.html", key: "english_owly_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "예비초등 파닉스", theme: "소리·이중자음·읽기", url: "pages/english/english-phonics-7.html", key: "english_phonics7_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "학교생활 영어", theme: "교실 표현·요청 말하기", url: "pages/english/english-school-7.html", key: "english_school7_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "문장 말하기", theme: "I am·I like 문장", url: "pages/english/english-sentences-7.html", key: "english_sentences7_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "리딩 첫걸음", theme: "짧은 문장 읽기", url: "pages/english/english-reading-7.html", key: "english_reading7_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "초등 준비 어휘", theme: "학교·가정·자연 단어", url: "pages/english/english-vocab-7.html", key: "english_vocab7_done", total: 30 },
    { subject: "english", subjectName: "영어", title: "알파벳 쓰기", theme: "A-Z 대문자·소문자", url: "pages/english/english-abc.html", keys: ["abc_done", "abc_upper_done", "abc_lower_done"], total: 52, strategy: "abc" },

    { subject: "math", subjectName: "수학", title: "사고력 수학", theme: "수·도형·규칙 종합", url: "pages/math/math-thinking-30days.html", key: "math_thinking_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "수와 연산", theme: "세기·가르기·모으기", url: "pages/math/math-number-30days.html", key: "math_number_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "도형과 공간", theme: "모양·입체·위치", url: "pages/math/math-shape-30days.html", key: "math_shape_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "측정", theme: "길이·무게·시간", url: "pages/math/math-measure-30days.html", key: "math_measure_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "규칙과 분류", theme: "패턴·규칙·분류", url: "pages/math/math-pattern-30days.html", key: "math_pattern_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "자료와 논리", theme: "그래프·정리·추론", url: "pages/math/math-data-30days.html", key: "math_data_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "예비초등 덧셈·뺄셈", theme: "20 안의 연산", url: "pages/math/math-addsub-7.html", key: "math_addsub7_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "100까지 수", theme: "십의 자리·일의 자리", url: "pages/math/math-placevalue-7.html", key: "math_placevalue7_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "시간과 돈", theme: "시계·달력·동전", url: "pages/math/math-time-money-7.html", key: "math_time_money7_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "예비초등 도형과 공간", theme: "변·꼭짓점·위치", url: "pages/math/math-geometry-7.html", key: "math_geometry7_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "수학 문장제", theme: "묻는 말 찾기", url: "pages/math/math-wordproblems-7.html", key: "math_wordproblems7_done", total: 30 },
    { subject: "math", subjectName: "수학", title: "숫자 쓰기", theme: "1~10 따라쓰기", url: "pages/math/math-numbers-writing.html", key: "math_numbers_done", total: 10 },

    { subject: "korean", subjectName: "한글", title: "ㄱ-ㅎ 자음 쓰기", theme: "기본 자음 14자", url: "pages/korean/korean-writing.html?group=cons", key: "korean_writing_cons_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "ㅏ-ㅣ 모음 쓰기", theme: "기본 모음 10자", url: "pages/korean/korean-writing.html?group=vowel", key: "korean_writing_vowel_done", total: 10 },
    { subject: "korean", subjectName: "한글", title: "가-하 글자 쓰기", theme: "기본 모음", url: "pages/korean/korean-writing.html?group=a", key: "korean_writing_a_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "갸-햐 글자 쓰기", theme: "ㅑ 모음", url: "pages/korean/korean-writing.html?group=ya", key: "korean_writing_ya_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "거-허 글자 쓰기", theme: "ㅓ 모음", url: "pages/korean/korean-writing.html?group=eo", key: "korean_writing_eo_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "겨-혀 글자 쓰기", theme: "ㅕ 모음", url: "pages/korean/korean-writing.html?group=yeo", key: "korean_writing_yeo_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "고-호 글자 쓰기", theme: "ㅗ 모음", url: "pages/korean/korean-writing.html?group=o", key: "korean_writing_o_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "교-효 글자 쓰기", theme: "ㅛ 모음", url: "pages/korean/korean-writing.html?group=yo", key: "korean_writing_yo_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "구-후 글자 쓰기", theme: "ㅜ 모음", url: "pages/korean/korean-writing.html?group=u", key: "korean_writing_u_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "규-휴 글자 쓰기", theme: "ㅠ 모음", url: "pages/korean/korean-writing.html?group=yu", key: "korean_writing_yu_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "그-흐 글자 쓰기", theme: "ㅡ 모음", url: "pages/korean/korean-writing.html?group=eu", key: "korean_writing_eu_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "기-히 글자 쓰기", theme: "ㅣ 모음", url: "pages/korean/korean-writing.html?group=i", key: "korean_writing_i_done", total: 14 },
    { subject: "korean", subjectName: "한글", title: "문해력 종합", theme: "어휘·반대말·문장", url: "pages/korean/korean-literacy-30days.html", key: "korean_literacy_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "기초 어휘", theme: "주제별 일상 단어", url: "pages/korean/korean-vocab-30days.html", key: "korean_vocab_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "반대말과 비슷한말", theme: "뜻 짝 맞추기", url: "pages/korean/korean-opposite-30days.html", key: "korean_opposite_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "꾸며 주는 말", theme: "형용사·의성어·의태어", url: "pages/korean/korean-describe-30days.html", key: "korean_describe_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "문장 표현", theme: "인사·질문·높임말", url: "pages/korean/korean-sentence-30days.html", key: "korean_sentence_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "이야기 말하기", theme: "상황·순서·느낌 말하기", url: "pages/korean/korean-story-30days.html", key: "korean_story_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "받침 읽기", theme: "ㄱ·ㄴ·ㄹ 받침", url: "pages/korean/korean-batchim-7.html", key: "korean_batchim7_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "읽기 이해", theme: "누가·언제·어디 찾기", url: "pages/korean/korean-reading-7.html", key: "korean_reading7_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "문장 쓰기", theme: "짧은 문장 따라쓰기", url: "pages/korean/korean-sentence-writing-7.html", key: "korean_sentence_writing7_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "초등 준비 어휘", theme: "학교·규칙·설명 단어", url: "pages/korean/korean-vocab-7.html", key: "korean_vocab7_done", total: 30 },
    { subject: "korean", subjectName: "한글", title: "일기와 이야기", theme: "하루 일 쓰기", url: "pages/korean/korean-diary-7.html", key: "korean_diary7_done", total: 30 }
  ];

  const stories = [
    { title: "별빛 연구소의 작은 과학자", description: "로켓과 로봇을 만들며 꿈을 키우는 이야기", url: "pages/family/picture-story.html" },
    { title: "바다 나라에 간 수영 소년", description: "바다 친구들과 노는 수영 이야기", url: "pages/family/swim-turtle-story.html" },
    { title: "작은 정원사와 반짝 씨앗", description: "나눔과 돌봄을 배우는 정원 이야기", url: "pages/family/seed-garden-story.html" },
    { title: "공룡 숲의 작은 탐험대", description: "길 잃은 아기 공룡을 돕는 이야기", url: "pages/family/dino-forest-story.html" },
    { title: "번개 기차를 만든 하루", description: "끈기와 협동을 배우는 기차 이야기", url: "pages/family/magic-train-story.html" },
    { title: "달나라 축구 시합", description: "팀워크를 배우는 우주 축구 이야기", url: "pages/family/space-soccer-story.html" },
    { title: "작은 소방차 대장", description: "차분하게 친구를 돕는 구조 이야기", url: "pages/family/tiny-firetruck-story.html" },
    { title: "곤충 탐정 태오", description: "정원 속 자연의 비밀을 찾는 이야기", url: "pages/family/bug-detective-story.html" },
    { title: "반짝반짝 태양계 버스", description: "태양계 친구들이 함께 빛나는 이야기", url: "pages/family/solar-system-story.html" },
    { title: "해님이 보낸 따뜻한 편지", description: "태양이 빛과 온기를 나누는 이야기", url: "pages/family/sun-story.html" },
    { title: "빠른 발 수성의 심부름", description: "수성이 서두르지 않는 법을 배우는 이야기", url: "pages/family/mercury-story.html" },
    { title: "구름 망토 금성의 비밀", description: "금성이 진짜 마음을 보여 주는 이야기", url: "pages/family/venus-story.html" },
    { title: "붉은 모래 화성의 씨앗", description: "화성이 작은 희망을 지키는 이야기", url: "pages/family/mars-story.html" },
    { title: "커다란 목성의 빨간 점", description: "목성이 폭풍을 다루는 이야기", url: "pages/family/jupiter-story.html" },
    { title: "토성의 고리 음악회", description: "토성의 고리가 만드는 우주 음악 이야기", url: "pages/family/saturn-story.html" },
    { title: "옆으로 누운 천왕성의 춤", description: "천왕성이 자기만의 춤을 찾는 이야기", url: "pages/family/uranus-story.html" },
    { title: "해왕성의 푸른 바람 우체국", description: "해왕성이 바람으로 마음을 전하는 이야기", url: "pages/family/neptune-story.html" },
    { title: "잠 못 드는 부엉이", description: "밤이 무서운 부엉이가 포근함을 찾는 이야기", url: "pages/family/sleepy-owl-story.html" },
    { title: "화가 풍선처럼 부풀 때", description: "화를 가라앉히는 법을 배우는 이야기", url: "pages/family/angry-balloon-story.html" },
    { title: "처음 가는 학교 가는 길", description: "학교 첫날의 설렘과 긴장을 그린 이야기", url: "pages/family/first-school-day-story.html" },
    { title: "무서운 천둥 치는 밤", description: "천둥이 무서운 토끼가 두려움과 마주하는 이야기", url: "pages/family/thunder-night-story.html" },
    { title: "눈물비가 내린 날", description: "슬픔을 위로받는 아기 여우 이야기", url: "pages/family/tearful-rain-story.html" },
    { title: "나랑 다른 게 좋아", description: "다름의 즐거움을 발견하는 이야기", url: "pages/family/we-are-different-story.html" },
    { title: "둘이 갖고 싶은 장난감", description: "다툼과 화해, 나눔을 배우는 이야기", url: "pages/family/shared-toy-story.html" },
    { title: "솔직한 토끼의 하루", description: "솔직함의 힘을 배우는 이야기", url: "pages/family/honest-rabbit-story.html" },
    { title: "미안하다고 말하기", description: "진심 어린 사과를 배우는 이야기", url: "pages/family/saying-sorry-story.html" },
    { title: "새 친구를 만난 날", description: "먼저 다가가는 용기를 배우는 이야기", url: "pages/family/new-friend-story.html" },
    { title: "골고루 무지개 접시", description: "골고루 먹는 즐거움을 배우는 이야기", url: "pages/family/rainbow-plate-story.html" }
    // 삽화 준비 중(이미지 미완성)으로 검색에서 제외: 스스로 척척 아침, 세 개의 동전,
    // 정리 정돈 꼬마 마법사, 약속을 지킨 하루, 호랑이와 곶감, 지구가 보낸 쪽지,
    // 해와 달이 된 오누이, 도깨비 방망이, 물을 아끼는 마을
  ];

  const pages = [
    { title: "동네 축제", description: "서울·경기·인천 행사와 물놀이, 박물관 정보", target: "festival" },
    { title: "그림동화", description: "아이와 함께 읽는 짧은 그림동화", target: "story" },
    { title: "보드게임", description: "온 가족이 즐기는 메모리 카드 게임", target: "boardgame" },
    { title: "학습 대시보드", description: "영어·수학·한글 진행률과 백업", target: "dashboard" },
    { title: "엄마 힐링", description: "육아 중 쉬어가는 짧은 휴식 콘텐츠", target: "healing" },
    { title: "학습 가이드", description: "미취학 아이 학습 흐름 안내", target: "guide" },
    { title: "진학 로드맵", description: "교육 단계와 기관 비교", target: "roadmap" },
    { title: "공모전", description: "아이와 가족이 참여할 수 있는 공모전", target: "contest" },
    { title: "사이트 소개", description: "서비스 안내와 저작권 정보", target: "about" }
  ];

  const progressKeys = [];
  courses.forEach((course) => {
    if (course.key) progressKeys.push(course.key);
    if (Array.isArray(course.keys)) progressKeys.push.apply(progressKeys, course.keys);
  });

  window.KKOMA_CATALOG = {
    courses: courses,
    stories: stories,
    pages: pages,
    progressKeys: Array.from(new Set(progressKeys))
  };
})();
