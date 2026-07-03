(function () {
  function pick(pool, day, count) {
    const start = (day * 3) % pool.length;
    return Array.from({ length: count }, (_, index) => pool[(start + index) % pool.length]);
  }

  function makeEnglishLessons(themes, words) {
    return themes.map((theme, index) => ({
      day: index + 1,
      theme,
      words: pick(words, index, 5).map((word) => ({
        en: word.en,
        ko: word.ko,
        emoji: word.emoji,
        s: word.s,
        sk: word.sk,
      })),
    }));
  }

  function makeMathLessons(themes, items) {
    return themes.map((theme, index) => ({
      day: index + 1,
      theme,
      items: pick(items, index, 5).map((item) => ({
        c: item.c,
        emoji: item.emoji,
        pic: item.pic,
        q: item.q,
        a: item.a,
      })),
    }));
  }

  function makeKoreanLessons(themes, items) {
    return themes.map((theme, index) => ({
      day: index + 1,
      theme,
      items: pick(items, index, 5).map((item) => ({
        w: item.w,
        emoji: item.emoji,
        pic: item.pic || item.emoji,
        m: item.m,
        s: item.s,
      })),
    }));
  }

  window.KID_COURSE_BUILDERS = {
    makeEnglishLessons,
    makeMathLessons,
    makeKoreanLessons,
  };
})();
