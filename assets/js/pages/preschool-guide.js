  // Tab switching
  function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-content`).classList.add('active');
  }

  // 허브 바로가기: 메인 안(iframe)에서는 해당 탭으로 전환, 단독으로 열렸을 때는 페이지 이동
  function goToHub(e, opener) {
    try {
      if (window.top !== window.self && typeof window.top[opener] === 'function') {
        window.top[opener]();
        e.preventDefault();
        return false;
      }
    } catch (err) { /* 교차 출처 등 접근 불가 시 기본 이동 */ }
    return true;
  }
  function goToEnglishHub(e) { return goToHub(e, 'openEnglishHub'); }
  function goToMathHub(e) { return goToHub(e, 'openMathHub'); }
  function goToKoreanHub(e) { return goToHub(e, 'openKoreanHub'); }

  // Checklist
  const checklistData = [
    { id: 'c1', category: '생활', cat: 'life', text: '혼자 화장실 다녀오기, 신발끈 묶기, 가방 정리하기' },
    { id: 'c2', category: '생활', cat: 'life', text: '40분 동안 자리에 앉아 집중하기' },
    { id: 'c3', category: '생활', cat: 'life', text: '본인 이름, 부모님 전화번호, 집 주소 외우기' },
    { id: 'c4', category: '영어', cat: 'english', text: '알파벳 대소문자 읽고 쓰기' },
    { id: 'c5', category: '영어', cat: 'english', text: '간단한 영어 인사와 자기소개 (Hi, I am...)' },
    { id: 'c6', category: '수학', cat: 'math', text: '1부터 100까지 수 세기' },
    { id: 'c7', category: '수학', cat: 'math', text: '10 이하의 덧셈과 뺄셈' },
    { id: 'c8', category: '수학', cat: 'math', text: '평면도형 (원, 삼각형, 사각형) 구분' },
    { id: 'c9', category: '문해력', cat: 'literacy', text: '한글 받침 있는 글자 읽고 쓰기' },
    { id: 'c10', category: '문해력', cat: 'literacy', text: '짧은 동화책 혼자 읽기' },
    { id: 'c11', category: '문해력', cat: 'literacy', text: '하루 있었던 일 그림일기로 표현하기' },
    { id: 'c12', category: '사회성', cat: 'social', text: '친구와 사이좋게 놀기, 양보하기' },
    { id: 'c13', category: '사회성', cat: 'social', text: '선생님 말씀 끝까지 듣고 따르기' },
    { id: 'c14', category: '사회성', cat: 'social', text: '자신의 감정을 말로 표현하기 (속상해, 기뻐)' },
    { id: 'c15', category: '창의력', cat: 'creative', text: '자유롭게 그림 그리고 설명하기' },
    { id: 'c16', category: '창의력', cat: 'creative', text: '가위로 선 따라 자르기, 종이접기' },
    { id: 'c17', category: '신체', cat: 'physical', text: '연필 바르게 잡고 글씨 쓰기' },
    { id: 'c18', category: '신체', cat: 'physical', text: '줄넘기 또는 한 발 서기 10초 이상' },
    { id: 'c19', category: '습관', cat: 'habit', text: '정해진 시간에 자고 일어나기' },
    { id: 'c20', category: '습관', cat: 'habit', text: '놀이 후 스스로 정리정돈하기' },
  ];

  const checkedState = {};

  function renderChecklist() {
    const container = document.getElementById('checklist');
    container.innerHTML = checklistData.map(item => `
      <button class="check-item ${checkedState[item.id] ? 'checked' : ''}" onclick="toggleCheck('${item.id}')">
        <div class="check-circle"></div>
        <span class="check-category cat-${item.cat}">${item.category}</span>
        <span class="check-text">${item.text}</span>
      </button>
    `).join('');
    updateProgress();
  }

  function toggleCheck(id) {
    checkedState[id] = !checkedState[id];
    renderChecklist();
  }

  function updateProgress() {
    const checked = Object.values(checkedState).filter(Boolean).length;
    const total = checklistData.length;
    const percent = Math.round((checked / total) * 100);
    document.getElementById('checked-count').textContent = checked;
    document.getElementById('total-count').textContent = total;
    document.getElementById('progress-num').textContent = percent;
    document.getElementById('progress-fill').style.width = percent + '%';
  }

  renderChecklist();
