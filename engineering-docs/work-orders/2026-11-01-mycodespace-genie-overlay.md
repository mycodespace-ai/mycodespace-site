# Work Order: MyCodeSpace Genie Joke and Replay Lamp

Date: 2026-11-01
Status: accepted, deployed and verified on 2026-11-01
Requested by: Costin Cozianu
Scope: `site/` (then `mycodespace-site/` in the original repository); local preview accepted; owner authorized live deployment on 2026-11-01

## Outcome

Create a playful SVG animation over the MyCodeSpace landing page, on desktop and mobile
browsers. A transparent overlay contains an Aladdin-style lamp character
rendered in thin wireframe/outline strokes, with outlined speech bubbles and
smoke. The page remains visible behind the performance.

This work order preserves the discussion so work can resume after an
interruption. Saving it does not start, cancel, pause, or assert completion of
any implementation already underway in the main conversation.

## Owner-requested sequence

1. On desktop the character starts small at the bottom-left of the viewport.
   On mobile he rises from below; the character, smoke, and readable bubbles
   must fit strictly within the visible screen, including safe-area insets.
2. He grows larger as he moves toward the center.
3. He performs an expressive eyebrow gesture and wink.
4. An outlined speech bubble says: **“Because myspace.com flopped”**.
5. He rubs his lamp.
6. A comic “poof” smoke explosion reveals the final announcement:
   **“!!! We now have MyCodeSpace.AI !!!”**

7. After the joke, the genie folds/shrinks into a persistent lamp button.
   Clicking, tapping, or keyboard-activating it replays the whole sequence.

Keep the character, bubbles, and smoke as line art, with transparent interiors
rather than opaque panels. Preserve the humorous timing and clear readability.
Use an original Aladdin-inspired character design appropriate for the site's
simple visual style.

## Copy decision

The owner explicitly preferred **“Because myspace.com flopped”** as short and
to the point. Keep it. The alternative “MySpace was taken. So we added code.”
was suggested by the assistant and was not selected.

The final announcement above normalizes the owner's typing to the existing
brand spelling, MyCodeSpace.AI. Exact punctuation and lettering can be refined
during local visual review; do not silently replace the first joke.

## Suggested implementation defaults, subject to review

These were assistant recommendations, not separately accepted owner requirements:

- A short cameo of about 10 seconds, then fold into the replay lamp.
- Play once per visit; define the visit/session behavior when implementing.
- Include a small accessible dismiss control.
- Allow clicks through the overlay apart from its controls.
- Respect reduced-motion preferences; prefer a still, unobtrusive version or
  suppress the animation, and record the chosen behavior.
- Use native SVG with CSS and only the JavaScript needed for sequencing,
  dismissal, and replay policy. Keep the static site lightweight.

## Mobile and replay amendment (owner request, 2026-11-01)

Supersede the desktop-only eligibility and text-only replay control. Support
phones and touch tablets with a bottom-up entrance and responsive composition.
Fit within both viewport dimensions, account for device safe areas, and keep
all joke text readable. Maintain the accepted 4px silhouette/bubble-only blur
and increased transparency; no page-wide blur. After the scene ends, fold the
genie into a fixed lamp button. Keep this lamp available on subsequent visits
within the tab session, and allow repeated playback without reloading. Pause
or dismiss animations without trapping focus or blocking links/scrolling.
Respect reduced motion: suppress automatic motion and use a short static joke
on explicit lamp activation, with an accessible close control.

## Acceptance and evidence

- Local preview demonstrates every beat in order, including the eyebrow/wink,
  exact first joke, lamp rubbing, and smoke reveal.
- Character, bubbles, and smoke remain legible at representative desktop and phone sizes, including short/rotated screens.
- Animation ends cleanly; no invisible layer blocks page links or scrolling.
- Dismissal works by keyboard and pointer; reduced-motion and repeat-visit
  behavior match the documented choices.
- Mobile layout, contact card, owner photo framing, and existing page copy
  remain intact. Check viewport resizing/orientation changes and ensure the full art stays in bounds.
- Lamp remains usable after automatic completion and dismissal; verify pointer,
  touch and keyboard replay, session reload, and reduced-motion behavior.
- Run `npm run build` in `site/`, inspect browser errors, and record
  responsive visual checks and any unfinished animation details.
- Present the local preview for owner review before any live deployment.

## Pickup instructions

Read the repository workflow and current live state before editing. Inspect the
current branch and any existing overlay implementation first; do not duplicate
or overwrite work done after this discussion. Follow the repository workstream
routing for the actual implementation.

The contact refinements currently have their own
delivery record (`engineering-docs/archive/2026-11-01-mycodespace-contact/CURRENT-STATUS.md` in the original repository, `ccozianu/devcapsule-chessclub-website`).
Use the [site guide](../../site/README.md) for local commands
(port 4329) and hosting context. Owner separately authorized production deployment after accepting the mobile/lamp preview; deployed and verified on 2026-11-01.
