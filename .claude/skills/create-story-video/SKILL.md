---
name: create-story-video
description: 사이트의 기존 그림동화(삽화 10장 완비)를 유튜브용 낭독 영상으로 만든다. 동화 HTML(한국어)·story-reader.js(영어)에서 텍스트를 자동 추출해 16:9 영상으로 한국어/영어 버전을 각각 생성한다(신경망 TTS + 한 문장씩 자막). "동화 영상 만들어줘", "○○ 동화 비디오로 만들어", "나머지 동화 영상 제작해줘" 같은 요청에 사용.
---

# 그림동화 영상 만들기

기존 동화(삽화 PNG 10장 완비)를 **유튜브용 낭독 영상**으로 제작하는 스킬이다. 한 동화당 **한국어 버전 / 영어 버전**을 별도 mp4로 만든다. 실제 작업은 **`story-video-maker` 에이전트**에 위임한다.

## 산출물 표준 (확정)
- **16:9 (1920×1080)**, 삽화는 세로 꽉 차게 전체 표시(위아래 안 자름) + 좌우는 흐림 채움
- **제목 없이 한 문장씩** 낭독에 맞춰 자막(문장 동기화), 대사는 teal 이탤릭
- 음성: 한국어 SunHi / 영어 Ava (edge-tts 신경망), 글꼴 Gaegu
- 한/영은 한 영상에 섞지 않고 파일 분리: `video/out/<slug>_ko.mp4`, `<slug>_en.mp4`

## 절차
1. **대상 확인**: 어떤 동화인지(slug) 또는 "나머지 전체"인지 확인. 삽화 10장이 다 있는 동화만 가능(미완성은 제외).
2. **에이전트 실행**: `story-video-maker` 에이전트를 Agent 도구로 실행한다. 프롬프트에 대상 slug 목록(또는 "all")을 전달한다.
   - 한 편: `py -3 video\make_spec.py <slug>` → `py -3 video\build_story_video.py <slug>.json both`
   - 여러 편: `py -3 video\build_all.py <slug...>` 또는 `py -3 video\build_all.py all`
3. **오래 걸리는 일괄 작업**은 background 로 돌리고 진행상황을 보고한다(동화당 한/영 2개, 각 1~2분).
4. **검증**: 산출 mp4 1개에서 프레임을 뽑아(ffmpeg `-frames:v 1`) 삽화·자막이 정상인지 확인.
5. **보고**: 만든 동화·파일 경로·길이, 건너뛴 동화(사유)를 표로 정리.

## 참고
- 도구·경로·트러블슈팅은 `.claude/agents/story-video-maker.md` 에 상세히 있음.
- 스크립트 위치: `C:\blog_writing\kid-festival\video\` (make_spec.py, build_story_video.py, build_all.py, gen_assets.py).
- 영상 파일은 용량이 커서 git 에 커밋하지 않는다(`video/out/` 은 .gitignore).
