---
name: update-festivals
description: Refresh the C:\kid festival event data in assets/data/festivals.js. Use when asked to update the "동네 축제" or "페스티벌" page, verify existing event schedules, add new Seoul/Gyeonggi/Incheon child-friendly events for the current 3-month window, or port the Claude update-festivals workflow to Codex.
---

# Update Festivals

Maintain `assets/data/festivals.js` for the "동네 축제" page. The target audience is families in Seoul, Gyeonggi, and Incheon with preschool children around ages 5-7.

## Files

- Edit event data in `C:\kid\assets\data\festivals.js`, specifically `window.KID_FESTIVALS`.
- Usually do not edit `C:\kid\assets\js\pages\kid-festival.js`. Only update `VENUE_OVERRIDE` when a new event's indoor/outdoor value differs from the category default.
- Usually do not edit `C:\kid\pages\family\kid-festival.html`.

## Scope

Use today's date from the environment. Unless the user specifies a different month or quarter, cover the current month plus the next two months.

For example, if today is June 22, 2026, update the June, July, and August 2026 window.

## Workflow

1. Read `assets/data/festivals.js` and `assets/js/pages/kid-festival.js` before editing.
2. Determine the target date window and current selected month. Update `currentYear` or `currentMonth` only if the page default is stale.
3. Verify existing events with official or high-trust sources before changing dates, fees, links, locations, or operating notes.
4. Search for new child-friendly events in Seoul, Gyeonggi, and Incheon. Prefer official/jurisdictional event portals and direct official pages over general web results.
5. Check for duplicates by title and venue before adding an event.
6. Add each event using the existing one-line object style in `festivals.js`.
7. If a new event is mixed indoor/outdoor or otherwise differs from category defaults, add a `VENUE_OVERRIDE` entry in `kid-festival.js`.
8. Run validation:

```powershell
node -e "global.window={}; require('C:/kid/assets/data/festivals.js'); console.log(window.KID_FESTIVALS.length)"
node --check C:\kid\assets\js\pages\kid-festival.js
```

Run `node --check` for `kid-festival.js` only if it was edited.

## Source Strategy

Use direct official pages first:

- Seoul festivals: `https://festival.seoul.go.kr/`
- Seoul culture events: `https://culture.seoul.go.kr/culture/culture/cultureEvent/list.do?searchCate=FESTIVAL&menuNo=200010`
- Korea festival calendar: `https://korean.visitkorea.or.kr/kfes/`
- Gyeonggi tourism: `https://www.ggtour.or.kr/`
- Incheon tourism and city/district sites: `https://www.itour.incheon.go.kr/`, `incheon.go.kr`, and district `go.kr` sites
- Seasonal facility sources such as Hangang Park, Seoul Facilities Corporation, and city/district notices

Web search can miss Korean local events. Use it as support, but rely on direct list pages and official detail pages for dates and fees.

## Data Rules

- Use confirmed dates only. If a date is officially marked "예정", include that uncertainty in `extraInfo` or `detail.hoursNote`.
- Do not invent fees, eligibility, or registration rules. If unclear, set `price: '미정'` or `detail.reservationStatus: 'check'`.
- Do not delete ended or canceled events automatically. Report deletion or large-status changes to the user first.
- Keep existing formatting and avoid broad reordering.
- Use categories from the existing set: `festival`, `museum`, `themepark`, `nature`, `library`, `marathon`.
- Use `dates` for the relevant days in the visible month, but remember rendering is calculated from `startDate`, `endDate`, and `recur`.
- For events running 30 days or longer, consider `hideCalendar:true` to avoid crowding the calendar.
- Add `detail.sourceUrl` and `detail.verifiedAt` for new or substantially updated events.

## Reporting

Summarize:

- Updated existing events, including old value to new value when meaningful.
- Added events with title, region, period, fee, and source URL.
- Items left uncertain or skipped because the official source was insufficient.
