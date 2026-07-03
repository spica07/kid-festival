# 그림동화 삽화 화풍 가이드

> 2026-06-12, 실제 삽화 PNG 8장을 직접 열람해 분석한 결과.
> 샘플: sleepy-owl-01(동물·밤), swim-turtle-05(사람·수중), earth-letter-04(사람·낮 야외), tiger-gotgam-01(전래·달밤), jupiter-01(행성·우주), sun-03(사람·실내 역광), morning-routine-cover(동물·표지), rainbow-plate-06(동물·실내).

## 화풍 요약 (관찰 근거)

- **기법**: 수채 바탕에 색연필·과슈풍의 **미세 점묘(스티플) 입자 질감**이 화면 전체에 깔린 혼합 매체. 종이 결(tooth)이 비치는 따뜻한 질감. 기존 프롬프트 시트의 "투명 수채 wet-on-wet"보다 **건식 입자 질감**이 실물의 핵심이다.
- **선**: 강한 펜 외곽선 없음. 형태는 어두운 같은 계열 색으로 부드럽게 정리(soft edges). 딱딱한 검은 라인·벡터 느낌 금지.
- **디테일 밀도**: 매우 높음. 배경 소품(책장·바구니·화분·짚지붕 결·산호·풀잎 한 장)까지 꼼꼼히 묘사하고 풀블리드로 화면을 가득 채움. 여백이 많은 미니멀 구도가 아님.
- **색감**: 따뜻한 골든 옐로·크림·허니 브라운이 기조, 포인트로 데님 블루·하늘색. 채도 중간(파스텔보다 깊고 원색보다 차분). 밤·우주 장면은 깊은 남색 + 따뜻한 노란 불빛의 대비.
- **빛**: 부드러운 자연광·창문광·등불광. 광원 주변 따뜻한 글로우, 반짝이는 빛 입자(별, 물비늘, 햇살 가루)를 자주 사용. 인물에 포근하게 떨어지는 역광/사광 연출.
- **캐릭터 조형**: 둥근 얼굴·둥근 몸, 매우 크고 반짝이는 눈(흰 하이라이트 점), 발그레한 볼, 작은 입. 사람 아이는 까만 머리의 둥근 얼굴 동양 아이. 동물은 보송한 털 질감을 살리고 옷을 입히되 자연스러운 동물 형태 유지(과한 의인화 금지). 표정은 다정·온화가 기본.
- **구도**: 주인공을 중앙 또는 1/3 지점에 크게, 눈높이 시점이 기본. 표지는 주인공 단독 중심 구도.
- **분위기**: 포근하고 아늑한(cozy) 서정적 동화 감성. 무섭거나 그로테스크한 연출 없음(전래동화의 호랑이도 순한 큰 눈).

## 공통 스타일 프리셋 (모든 프롬프트 맨 앞에 붙이기)

- **EN:**
  `Warm cozy children's picture-book illustration, watercolor and colored-pencil mixed media with fine stippled grain texture, visible paper tooth, densely detailed full-bleed scene, soft muted-warm palette of golden cream, honey brown and denim blue, gentle glowing natural light with sparkling light particles, soft edges without hard outlines, lyrical storybook mood, 3:2 horizontal composition`
- **KO:** 따뜻하고 아늑한 그림책 일러스트, 수채+색연필 혼합의 미세 점묘 질감, 종이 결, 빼곡한 디테일의 풀블리드 장면, 골든 크림·허니 브라운·데님 블루의 차분한 온색 팔레트, 은은한 글로우와 빛 입자, 딱딱한 외곽선 없는 부드러운 가장자리, 서정적 동화 분위기, 3:2 가로 구도

## Negative prompt (EN, 모든 장면 공통)

`text, letters, words, watermark, signature, harsh black outline, 3D render, photorealistic, flat vector art, neon oversaturated colors, minimalist empty background, distorted hands, extra limbs, scary or grotesque expression`

## 캐릭터 공통 톤

`round face, big sparkling eyes with white highlights, rosy cheeks, small gentle smile` + (동물이면) `soft fluffy fur texture, naturally animal-shaped body wearing simple clothes` / (사람 아이면) `young Korean child with short dark hair`

## 기술 사양

- **비율/해상도**: 3:2 가로, **1536×1024 권장** (실측: 기존 자산 대부분 1536×1024 또는 1537×1023 계열. 과거 문서의 "16:10"은 폐기)
- **파일명**: 본문 장면 `{slug}-story-01.png ~ -10.png`, 허브 표지 `{slug}-story-cover.png`
- **저장 위치**: `assets/images/` — 파일명이 정확하면 사이트에 자동 반영

## 계열별 변주

| 계열 | 추가 키워드 (EN) | 비고 |
|---|---|---|
| 전래동화 | `traditional Korean folktale setting, hanbok, thatched-roof hanok, deep blue moonlit night with warm yellow window light, Korean mountain landscape` | tiger-gotgam·sun-moon-siblings·dokkaebi-club 톤. 깊은 남색 밤 + 창문 불빛 대비가 핵심 |
| 행성/우주 | `deep navy space filled with fine stippled stars, glowing celestial bodies with gentle smiling faces, warm golden glow against dark space` | 행성 표면도 동일한 점묘 질감, 천체에 순한 얼굴 |
| 밤/실내 | `cozy lamplight or moonlight glow, deep blue shadows balanced with warm amber light` | sleepy-owl 톤 |
| 낮 야외 | `dappled sunlight through leaves, lively greens with warm yellow light, tiny flowers and grass detail` | earth-letter 톤 |

## 일관성 팁

- 같은 동화 10장(+표지)은 **캐릭터 설정 문구를 한 글자도 바꾸지 말고 동일하게** 포함.
- 표지를 먼저 생성해 캐릭터를 확정하고, 그 이미지를 레퍼런스로 첨부해 나머지 장면을 생성하면 일관성이 좋아진다.
- 일부 장면만 다시 그릴 때는 기존 장면 1~2장을 스타일 레퍼런스로 함께 첨부할 것.
