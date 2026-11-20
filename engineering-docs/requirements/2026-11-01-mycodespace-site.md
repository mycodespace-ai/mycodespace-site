# R-MYCODESPACE-001: MyCodeSpace website

Status: accepted
Priority: gating
Accepted: 2026-11-01, by owner instruction in chat.

- Deliver in `mycodespace-site/`; preserve existing club sites. (Since the
  2026-11-20 move to this repository the directory is `site/`.)
- Target domain: https://mycodespace.ai.
- Clearly identify https://devcapsule.mycodespace.ai as the first product,
  with more to follow; make that link the primary action.
- Owner refined the focus on 2026-11-01: a personal google3-like codespace
  for students, hobbyists and professionals. Use the approved headline "Your
  code. Your projects. Your own space." and explain a home for projects, tools,
  and knowledge. Returning to old code is one benefit, not the main pitch.
  DevCapsule is the first step. No broad security or Google affiliation claims.
- Keep copy concise and conversational. Do not promise future products,
  release dates, or permanent compatibility with all historical programs.
- Follow the existing Astro static build and shared GCS deployment approach.
- Provide a readable responsive page, keyboard focus and a custom 404 page.
- Owner authorized live deployment on 2026-11-01 after accepting the page.
  Serve both apex and www over valid HTTPS, using an apex A record and a www
  CNAME. Preserve existing chess websites and DevCapsule DNS.

Validation: static build, browser checks on mobile and desktop, accessibility
scan, primary link verification, and deployment wrapper plan/failure checks.

Contact refinement (owner instruction, 2026-11-01): remove the outbound LinkedIn
post link. Add “Get in touch with Costin”, prominent but subordinate to the
opening paragraph, with email rendered as SVG outlines and links to GitHub and
LinkedIn profiles. This slice must stop before production deployment.

Contact review refinement (2026-11-01): on wide screens, place the contact
invitation beside the explanation in two columns so it does not interrupt the
reading flow. Introduce it with “Curious? Want to find out more? Want to
contribute?” followed by “Get in touch with Costin!” on a separate line.
Use the owner's supplied JPG portrait, moved from the repository root into a
descriptively named site asset. Keep mobile stacked and stop before deployment.

Header refinement (2026-11-01): keep the header band close to its existing
text/wordmark height, remove the redundant “A home for everything you build”
intro announcement, and reduce empty space above the headline on desktop.

Body-flow refinement (2026-11-01): keep contact as a right-hand body column,
beginning beside the lead paragraph, so the paragraph never stretches above
the card. Text may reclaim the full body width below the card; keep the card
out of the header and preserve the stacked mobile reading order.

Alignment refinement (2026-11-01): align the desktop contact card's top edge
with the headline's top, retaining body placement and stacked mobile order.

Portrait refinement (2026-11-01): owner identifies himself as the player on the
left. Crop around him in an oval, preserving sharpness and excluding the partner
on the right from generated public images. This supersedes the full-scene crop.

Portrait positioning refinement (2026-11-01): retain the owner's left-side
position within the card's photo area, using an asymmetric egg-shaped oval
rather than centering the portrait. Keep partner excluded.

Scene framing correction (2026-11-01): use the original full-resolution source
from Git and retain both the player on the left and foreground chessboard in
a wider asymmetric egg. Exclude the partner on the right. Supersedes the
narrow headshot framing; preserve the source unchanged.

Publication approval (2026-11-01): owner accepted the current contact/layout
refinements and explicitly requested production deployment before any genie
overlay. This supersedes the local-only restriction for these changes.

Desktop genie preview (2026-11-01): implement the six beats and exact copy in
the [work order](../work-orders/2026-11-01-mycodespace-genie-overlay.md). Owner
requested a fresh branch/implementation, preserving the earlier attempt.
Use transparent SVG line art, keep existing page/photo intact, support
dismissal and click-through, suppress on mobile/touch-only and reduced motion,
and offer local replay. Production deployment is not authorized.

Genie legibility refinement (2026-11-01): owner reported line art tangled with
underlying text. During playback, soften/fade main content and use a feathered
translucent spotlight behind the moving art. Keep SVG/bubble interiors
transparent, links operable, and restore page appearance on all exit paths.

Accepted local legibility refinement (2026-11-01): owner approved limiting
soft focus to the character silhouette and visible bubbles, leaving the rest
of the page sharp. Use 4px backdrop blur, feathered masks, and 56% paper tint
(increased transparency from 86%). Remove page-wide blur/fading. Owner called
this version perfect; deployment has not been authorized.

Mobile and replay-lamp amendment (2026-11-01): owner superseded desktop-only
eligibility. Make the same joke available on phones/touch tablets, rising from
the bottom and bounded by both screen dimensions. After the announcement the
genie folds into a persistent, touch/keyboard-accessible lamp replay button.
Preserve desktop composition and accepted localized 4px/56% softening. Keep
reduced-motion autoplay disabled; explicit lamp activation shows a static joke.
The amended work order remains local-preview-only; no deployment authorized.

Genie publication approval (2026-11-01): owner accepted the mobile joke and
folding replay lamp and explicitly requested deployment. This supersedes the
preview-only restriction for the completed genie implementation.
