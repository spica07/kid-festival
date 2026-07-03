  // Interest → Track scoring matrix
  const interestScores = {
    robots:     { science: 1, ivy: 0, medical: 0, engineering: 3, humanities: 0 },
    nature:     { science: 3, ivy: 0, medical: 1, engineering: 0, humanities: 0 },
    people:     { science: 0, ivy: 1, medical: 3, engineering: 0, humanities: 1 },
    art:        { science: 0, ivy: 2, medical: 0, engineering: 0, humanities: 2 },
    math:       { science: 2, ivy: 0, medical: 1, engineering: 2, humanities: 0 },
    english:    { science: 0, ivy: 2, medical: 0, engineering: 0, humanities: 2 },
    making:     { science: 1, ivy: 0, medical: 0, engineering: 3, humanities: 0 },
    experiment: { science: 3, ivy: 0, medical: 1, engineering: 0, humanities: 0 },
    literature: { science: 0, ivy: 1, medical: 1, engineering: 0, humanities: 3 },
    culture:    { science: 0, ivy: 1, medical: 0, engineering: 0, humanities: 3 }
  };

  const trackInfo = {
    science:     { emoji: '🔬', name: '과학고·영재학교' },
    ivy:         { emoji: '🇺🇸', name: '아이비리그' },
    medical:     { emoji: '🩺', name: '의대' },
    engineering: { emoji: '🚀', name: '공대·이공계' },
    humanities:  { emoji: '📚', name: '인문학' }
  };

  const selected = new Set();
  const buttons = document.querySelectorAll('.interest-btn');
  const resultEl = document.getElementById('interest-result');

  buttons.forEach(btn => {
    if (btn.dataset.default === 'true') {
      selected.add(btn.dataset.interest);
      btn.classList.add('selected');
    }
    btn.addEventListener('click', () => {
      const id = btn.dataset.interest;
      if (selected.has(id)) {
        selected.delete(id);
        btn.classList.remove('selected');
      } else {
        selected.add(id);
        btn.classList.add('selected');
      }
      update();
    });
  });

  function update() {
    if (selected.size === 0) {
      resultEl.innerHTML = '💡 관심사를 골라주세요 — 우리 아이에게 맞는 길을 추천해 드려요';
      clearBadges();
      return;
    }

    const totals = { science: 0, ivy: 0, medical: 0, engineering: 0, humanities: 0 };
    selected.forEach(id => {
      const s = interestScores[id];
      for (const k in s) totals[k] += s[k];
    });

    let max = 0;
    let top = [];
    for (const k in totals) {
      if (totals[k] > max) { max = totals[k]; top = [k]; }
      else if (totals[k] === max && max > 0) top.push(k);
    }

    if (max === 0) {
      resultEl.innerHTML = '💡 관심사를 골라주세요 — 우리 아이에게 맞는 길을 추천해 드려요';
      clearBadges();
      return;
    }

    const topNames = top.map(t => trackInfo[t].emoji + ' ' + trackInfo[t].name).join(' + ');
    const tieNote = top.length > 1 ? ' (동점)' : '';
    const topScore = top.map(t => trackInfo[t].emoji + ' ' + max + '점').join(' · ');

    const others = Object.entries(totals)
      .filter(([k, v]) => v > 0 && !top.includes(k))
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => trackInfo[k].emoji + ' ' + trackInfo[k].name + ' ' + v + '점')
      .join(' · ');

    resultEl.innerHTML = '🎯 추천 트랙' + tieNote + ': <span class="reco-name">' + topNames + '</span>' +
      '<div class="reco-detail">점수 ' + topScore + (others ? ' &nbsp;·&nbsp; 다른 옵션 ' + others : '') + '</div>';

    updateBadges(top);
  }

  function clearBadges() {
    document.querySelectorAll('.path-recommend-badge.js-badge').forEach(b => b.remove());
    document.querySelectorAll('.mc-recommend.js-badge').forEach(b => b.remove());
  }

  function updateBadges(tracks) {
    clearBadges();
    tracks.forEach(t => {
      const card = document.querySelector('.path-' + t);
      if (card) {
        const b = document.createElement('div');
        b.className = 'path-recommend-badge js-badge';
        b.textContent = '⭐ 추천';
        card.appendChild(b);
      }
      const mc = document.querySelector('.mc-' + t);
      if (mc) {
        const b = document.createElement('div');
        b.className = 'mc-recommend js-badge';
        b.textContent = '⭐ 추천';
        mc.appendChild(b);
      }
    });
  }

  update();
