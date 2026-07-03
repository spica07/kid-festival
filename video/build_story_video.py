# -*- coding: utf-8 -*-
"""
그림동화 -> 영상 빌더 (언어별 버전, 스토리북 레이아웃)
- 도입부: 표지 삽화 + 동화 제목(크게) + 제목 낭독 타이틀 장면
- 본문: 한 문장씩 낭독 타이밍에 맞춰 자막 노출 (edge-tts 단어 경계 동기화)
- 본문(Gaegu) / 대사(Gaegu 이탤릭, teal)
- 한국어 / 영어 버전 분리
"""
import asyncio, subprocess, json, sys, os, re
from pathlib import Path
import edge_tts

from config import (ROOT, REPO, BUILD, LANGS, LEAD, TAIL,
                    TITLE_LEAD, TITLE_TAIL, W, H, C_BODY, C_LINE)

A = "assets"
FFDIR = (BUILD / "ffdir.txt").read_text(encoding="utf-8-sig").strip()
FFMPEG = str(Path(FFDIR) / "ffmpeg.exe")
FFPROBE = str(Path(FFDIR) / "ffprobe.exe")


def run(args):
    p = subprocess.run(args, capture_output=True, text=True, encoding="utf-8", errors="replace")
    if p.returncode != 0:
        sys.stderr.write("CMD FAILED: " + " ".join(str(a) for a in args) + "\n")
        sys.stderr.write((p.stderr or "")[-3000:] + "\n")
        raise SystemExit(1)
    return p


def probe_dur(path):
    p = run([FFPROBE, "-v", "error", "-show_entries", "format=duration",
             "-of", "default=nk=1:nw=1", str(path)])
    return float(p.stdout.strip())


async def synth_timed(text, voice, rate, out_mp3, retries=5):
    for attempt in range(retries):
        try:
            comm = edge_tts.Communicate(text, voice, rate=rate)
            bounds, audio = [], bytearray()
            async for ch in comm.stream():
                if ch["type"] == "audio":
                    audio += ch["data"]
                elif ch["type"] == "WordBoundary":
                    bounds.append((ch["offset"], ch["duration"], ch["text"]))
            if not audio:
                raise RuntimeError("empty audio")
            with open(out_mp3, "wb") as f:
                f.write(audio)
            return bounds
        except Exception as e:
            if attempt == retries - 1:
                raise
            await asyncio.sleep(2 + attempt * 2)


def split_sentences(t):
    t = t.strip()
    parts = re.findall(r'[^.!?…。]*[.!?…。]+|\S[^.!?…。]*$', t)
    return [p.strip() for p in parts if p.strip()]


def _nz(s):
    return re.sub(r'\s', '', s)


def sentence_times(read_sents, bounds, audio_dur):
    tgt, c = [], 0
    for s in read_sents:
        c += len(_nz(s)); tgt.append(c)
    bcum, cc = [], 0
    for off, dur, txt in bounds:
        cc += len(_nz(txt)); bcum.append((off / 1e7, (off + dur) / 1e7, cc))
    res = []
    for k in range(len(tgt)):
        lo = tgt[k - 1] if k > 0 else 0
        sel = [b for b in bcum if lo < b[2] <= tgt[k]]
        res.append((sel[0][0], sel[-1][1]) if sel else None)
    total = tgt[-1] if tgt else 1
    for k in range(len(res)):
        if res[k] is None:
            lo = tgt[k - 1] if k > 0 else 0
            res[k] = (audio_dur * lo / total, audio_dur * tgt[k] / total)
    return res


def cw(ch):
    return 0.55 if ord(ch) < 0x2500 else 1.0


def wrap(text, limit):
    out, line, w = [], "", 0.0
    for word in text.split(" "):
        ww = sum(cw(c) for c in word)
        if line and w + 0.55 + ww > limit:
            out.append(line); line, w = word, ww
        else:
            if line:
                line += " " + word; w += 0.55 + ww
            else:
                line, w = word, ww
    if line:
        out.append(line)
    return "\\N".join(out)


def ass_time(t):
    cs = int(round(t * 100)); h = cs // 360000; cs -= h * 360000
    m = cs // 6000; cs -= m * 6000; s = cs // 100; cs -= s * 100
    return f"{h}:{m:02d}:{s:02d}.{cs:02d}"


ASS_HEAD = """[Script Info]
ScriptType: v4.00+
PlayResX: {W}
PlayResY: {H}
WrapStyle: 0
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: S,Gaegu,{fs},&H00FFFFFF,&H00FFFFFF,&H00301C0E,&HB0000000,0,0,0,0,100,100,0,0,1,3,2,2,170,170,96,1
Style: T,Gaegu,{tfs},&H00FFFFFF,&H00FFFFFF,&H00301C0E,&HB0000000,1,0,0,0,100,100,0,0,1,4,3,5,140,140,60,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
"""


def _ass_head(fs):
    return ASS_HEAD.format(W=W, H=H, fs=fs, tfs=int(fs * 1.9))


def build_ass(path, items, fs, total):
    # items: list of (display_text, kind, start, end) in scene-relative seconds
    lines = [_ass_head(fs)]
    n = len(items)
    for k, (text, kind, st, en) in enumerate(items):
        start = 0.0 if k == 0 else st
        end = items[k + 1][2] if k + 1 < n else total
        color = C_LINE if kind == "line" else C_BODY
        ital = "\\i1" if kind == "line" else ""
        ov = f"{{\\1c{color}{ital}}}"
        lines.append(f"Dialogue: 0,{ass_time(start)},{ass_time(end)},S,,0,0,0,,{ov}{text}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def build_title_ass(path, title, fs, total):
    # 표지 위 화면 중앙에 동화 제목을 크게(스타일 T) 표시
    lines = [_ass_head(fs),
             f"Dialogue: 0,{ass_time(0)},{ass_time(total)},T,,0,0,0,,{wrap(title, 14)}"]
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def make_items(sc, lang):
    d = sc[lang]
    body_sents = split_sentences(d["body"])
    line_sents = split_sentences(re.sub(r'^[“"]|[”"]$', '', d["line"]).strip())
    is_dialogue = d["line"].strip()[:1] in ('"', '“')
    disp = [(s, "body") for s in body_sents]
    for s in line_sents:
        disp.append((f"“{s}”" if is_dialogue else s, "line"))
    read_sents = body_sents + line_sents  # 타이밍용(따옴표 제외)
    return disp, read_sents


def pad_audio(voice, out_m4a, lead, tail):
    run([FFMPEG, "-y", "-i", str(voice), "-filter_complex",
         f"[0:a]adelay={int(lead*1000)}|{int(lead*1000)},apad=pad_dur={tail}[a]",
         "-map", "[a]", "-c:a", "aac", "-b:a", "192k", str(out_m4a)])


def render_scene(img, scene_audio, ass_name, total, out_name):
    # 배경: cover+블러 / 전경: 세로 꽉 차게 전체 표시(잘림 없음), 좌우는 블러로 채움
    vf = (
        f"[0:v]scale={W}:{H}:force_original_aspect_ratio=increase,"
        f"crop={W}:{H},gblur=sigma=42,eq=brightness=-0.12:saturation=1.02,setsar=1[bg];"
        f"[0:v]scale={W}:{H}:force_original_aspect_ratio=decrease,setsar=1[fg];"
        f"[bg][fg]overlay=(W-w)/2:(H-h)/2[base];"
        f"[base][1:v]overlay=0:0[wi];"
        f"[wi]ass={ass_name}:fontsdir=fonts[v]"
    )
    run([FFMPEG, "-y",
         "-loop", "1", "-framerate", "30", "-i", str(img),
         "-loop", "1", "-framerate", "30", "-i", f"{A}/scrim.png",
         "-i", str(scene_audio),
         "-filter_complex", vf, "-map", "[v]", "-map", "2:a",
         "-t", f"{total:.3f}",
         "-c:v", "libx264", "-preset", "medium", "-crf", "20",
         "-pix_fmt", "yuv420p", "-c:a", "aac", "-b:a", "192k", "-r", "30",
         out_name])


def build_title_scene(spec, lang, cfg):
    # 표지 삽화 + 동화 제목 + 제목 낭독으로 영상 도입부를 만든다
    title = (spec.get("title") or {}).get(lang, "").strip()
    if not title:
        print(f"[{lang}] ! 스펙에 title 없음 - 타이틀 장면 생략 (make_spec.py 재실행 필요)")
        return None
    print(f"[{lang}] 타이틀 장면... ({title})")
    voice = BUILD / f"{lang}_voice00.mp3"
    asyncio.run(synth_timed(title, cfg["voice"], cfg["rate"], str(voice)))
    vdur = probe_dur(voice)
    audio = BUILD / f"{lang}_audio00.m4a"
    pad_audio(voice, audio, TITLE_LEAD, TITLE_TAIL)
    total = TITLE_LEAD + vdur + TITLE_TAIL
    ass = BUILD / f"{lang}_cap00.ass"
    build_title_ass(ass, title, cfg["fs"], total)
    out_name = f"{lang}_scene00.mp4"
    render_scene(REPO / spec["scenes"][0]["image"], audio, ass.name, total, out_name)
    return out_name


def build(spec, lang, out_path):
    cfg = LANGS[lang]
    scenes = spec["scenes"]
    scene_mp4s = []

    title_mp4 = build_title_scene(spec, lang, cfg)
    if title_mp4:
        scene_mp4s.append(title_mp4)

    print(f"[{lang}] [1/3] TTS...")
    bounds_map = {}

    async def run_all():
        sem = asyncio.Semaphore(4)
        async def one(i, sc):
            async with sem:
                disp, read_sents = make_items(sc, lang)
                read = " ".join(read_sents)
                b = await synth_timed(read, cfg["voice"], cfg["rate"],
                                      str(BUILD / f"{lang}_voice{i:02d}.mp3"))
                bounds_map[i] = (b, disp, read_sents)
        await asyncio.gather(*(one(i, sc) for i, sc in enumerate(scenes, 1)))
    asyncio.run(run_all())

    for i, sc in enumerate(scenes, 1):
        print(f"[{lang}] [2/3] 장면 {i:02d}...")
        voice = BUILD / f"{lang}_voice{i:02d}.mp3"
        vdur = probe_dur(voice)
        bounds, disp, read_sents = bounds_map[i]
        times = sentence_times(read_sents, bounds, vdur)

        scene_audio = BUILD / f"{lang}_audio{i:02d}.m4a"
        pad_audio(voice, scene_audio, LEAD, TAIL)
        total = LEAD + vdur + TAIL

        items = [(disp[k][0], disp[k][1], LEAD + times[k][0], LEAD + times[k][1])
                 for k in range(len(disp))]
        ass = BUILD / f"{lang}_cap{i:02d}.ass"
        build_ass(ass, items, cfg["fs"], total)

        render_scene(REPO / sc["image"], scene_audio, ass.name, total,
                     f"{lang}_scene{i:02d}.mp4")
        scene_mp4s.append(f"{lang}_scene{i:02d}.mp4")

    print(f"[{lang}] [3/3] concat -> {out_path}")
    (BUILD / f"{lang}_scenes.txt").write_text(
        "".join(f"file '{n}'\n" for n in scene_mp4s), encoding="utf-8")
    run([FFMPEG, "-y", "-f", "concat", "-safe", "0", "-i", f"{lang}_scenes.txt",
         "-c", "copy", str(out_path)])
    print(f"[{lang}] 완료  {probe_dur(out_path):.1f}s")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("usage: build_story_video.py <spec.json> [ko|en|both]"); raise SystemExit(2)
    spec = json.loads((ROOT / "specs" / sys.argv[1]).read_text(encoding="utf-8"))
    which = sys.argv[2] if len(sys.argv) > 2 else "both"
    langs = ["ko", "en"] if which == "both" else [which]
    out_dir = ROOT / "out"; out_dir.mkdir(exist_ok=True)
    os.chdir(BUILD)
    for lg in langs:
        build(spec, lg, out_dir / f"{spec['slug']}_{lg}.mp4")
