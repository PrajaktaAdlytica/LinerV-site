# LinerV Website Design QA

Date: July 10, 2026

## Source Visual Truth

- Brand and strategy: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/outputs/lineza-research-brief.md`
- Reference direction: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/outputs/linerv-reference-direction.md`
- Homepage blueprint: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/outputs/website/linerv-homepage-blueprint.md`
- Build tracker: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/i/outputs/startup-website-build-tracker.md`
- Reference images:
  - `/Users/prajaktagaikwad/Desktop/Screenshot 2026-07-09 at 23.27.47.png`
  - `/Users/prajaktagaikwad/Desktop/Screenshot 2026-07-09 at 23.27.29.png`
  - `/Users/prajaktagaikwad/Desktop/Screenshot 2026-07-09 at 22.39.53.png`
  - `/Users/prajaktagaikwad/Desktop/Screenshot 2026-07-09 at 22.39.34.png`
  - `/Users/prajaktagaikwad/Desktop/Screenshot 2026-07-09 at 22.39.31.png`
  - `/Users/prajaktagaikwad/Desktop/Screenshot 2026-07-09 at 22.38.50.png`

## Implementation Evidence

- Local URL: `http://127.0.0.1:4173/`
- Desktop homepage: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/lineza-home-desktop-final.png`
- Mobile bottleneck page: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/lineza-bottleneck-mobile-final.png`
- Board product page: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/lineza-board-desktop.png`
- Sign-in page: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/lineza-signin.png`
- Demo page: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/lineza-demo-page-final.png`
- Annotation desktop dashboard: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/desktop-dashboard-element.png`
- Annotation mobile dashboard: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/mobile-dashboard-element.png`
- Annotation desktop demo: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/desktop-demo-element.png`
- Annotation mobile demo: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/mobile-demo-element.png`
- Problem explainer: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/problem-explainer-final.png`
- Workflow explainer: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/workflow-explainer-final.png`
- Segment image cards: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/segments-image-cards.png`

Viewport states checked:

- Desktop homepage: `1440 x 1000`
- Mobile homepage: `390 x 1200`
- Desktop product/sign-in/demo routes: `1440 x 1000`
- Mobile bottleneck route: `390 x 1200`

## Findings

No P0/P1/P2 blockers remain.

Required fidelity surfaces:

- Fonts and typography: Inter/system stack is consistent with the brand system. Display headings are confident and readable, with no negative letter spacing and no visible clipping in checked desktop/mobile states.
- Spacing and layout rhythm: Desktop hero, product routes, demo, and sign-in use a stable two-column rhythm. Mobile collapses cleanly with no horizontal overflow.
- Colors and visual tokens: LinerV uses the intended mist/paper/ink base with signal green, amber, red, and blue operational accents. The page avoids generic purple AI styling.
- Image quality and asset fidelity: Generated 3D factory signal scene is integrated above the fold with a sharper, less frosted hero treatment. The live Three.js scene remains available as the motion/3D layer.
- Copy and content: Brand is aligned to LinerV, with product pages for Board, Shift, and Bottleneck, plus pricing, testimonials, integrations, about/contact, sign-in, and demo.

## Interaction Checks

- Homepage route renders with no desktop overflow.
- Mobile homepage renders with no horizontal overflow.
- Product dropdown opens on desktop hover.
- Mobile menu opens.
- Product routes render for `#board` and `#bottleneck`.
- Sign-in route renders as a complete page.
- Demo route renders as a complete page.
- Demo form accepts realistic input and reaches the success state.
- Trusted-company logo strip uses real loaded logo assets, no pill/button structure, and static hover zoom.
- Problem, integration, segment, workflow, and testimonial cards share the same signal-green hover/focus border treatment.
- Testimonials have horizontal carousel motion; hover pauses the track and individual cards do not carry their own animation transform.
- Footer logo links back to `#top`.

Console notes:

- Final annotation QA reported no console errors in desktop or mobile Chromium.

## Comparison History

- Initial demo page QA found the standalone demo form needed polish when rendered as `#demo`.
- Browser annotation superseded the earlier shell direction: the homepage, product, and standalone demo forms are now intentionally unframed with improved spacing and field rhythm.
- Demo evidence: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/desktop-demo-element.png`
- Browser annotation pass requested: sharper hero visual, real logo assets without button wrappers, shared card hover borders, more credible dashboard UI, testimonial carousel, unframed demo form, and footer logo home navigation.
- Annotation fixes applied: removed leftover logo marquee motion, replaced failed logo sources with valid Simple Icons assets, rewrote the dashboard as a dense plant command surface, strengthened dashboard contrast, unframed the homepage/product demo cards, added carousel motion, and linked the footer logo to `#top`.
- Final scripted QA: desktop `1440 x 1000` and mobile `664 x 814` both had no horizontal overflow, 8/8 logos loaded, 0 logo pills, 4 dashboard line rows, 4 dashboard event rows, transparent demo container, footer logo `#top`, active testimonial carousel, no console errors, working demo success state, and working product route.
- Second annotation pass requested clearer meaning for late-discovery, platform, integration, and workflow sections, plus generated manufacturing imagery and backgrounds for demo/about.
- Updates applied: generated eight segment-card backgrounds with Imagegen, rewrote late-discovery into a fragmented-signals-to-LinerV visual, rewrote platform copy as three connected products, added integration matrix explaining what LinerV adds, added workflow section heading/descriptions/icons/motion, added backgrounds to homepage demo and EU-native operations intelligence sections, added scroll margins for fixed nav anchors, and made testimonial hover pause deterministic.
- Final desktop verification: no horizontal overflow, no console errors, 4 problem fragment nodes, 3 integration rows, 4 workflow descriptions, 8 segment images, active demo/about backgrounds, testimonial track paused on hover, and testimonial cards have no independent animation.
- Third annotation pass requested: align the product-platform subheading, align the workflow explainer text, fix workflow-card spacing, add pricing-card hover states, and replace the company-section image background with a solid branded line background.
- Updates applied: converted shared section headings to a two-column grid, tightened workflow-card padding and moved the animated rail below the body copy, added pricing-card lift/border/shadow hover states, and replaced the EU-native company image treatment with a solid pale LinerV background plus fine grid lines.
- Third pass evidence:
  - Platform alignment: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/platform-alignment-final.png`
  - Workflow spacing: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/workflow-spacing-final.png`
  - Pricing hover: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/pricing-hover-final.png`
  - Company solid line background: `/Users/prajaktagaikwad/Documents/Codex/2026-07-09/le/work/linerv-site/qa/annotations/about-solid-lines-final.png`
- Third desktop verification: production build passed, no horizontal overflow, no console errors, pricing hover transform/border/shadow active, and company-section background contains no image URL.
- Fourth annotation pass requested: move right-column section copy to the left across homepage and product/detail pages, and make every section badge visually highlighted in the same style as the late-discovery badge.
- Updates applied: section headings now use a left-stacked layout instead of a right explanatory column, the company/about body copy and contact card move left, the sign-in card is no longer hard-aligned right, and all `.eyebrow` section labels use a consistent highlighted pill treatment with dark-section variants.
- Fourth route verification: homepage, Board, Shift, Bottleneck, sign-in, and demo routes had no horizontal overflow, no console errors, no remaining right-column section-heading offsets, and all section badges passed the highlighted-pill check.
- Brand correction pass requested: company name is `LinerV`, not `Lineza`.
- Updates applied: visible website copy, product names, nav labels, title/meta copy, form labels, footer/contact text, SVG logo text/metadata, favicon metadata, and email display changed to LinerV/`hello@linerv.io`.
- Brand verification: homepage, Board, Shift, Bottleneck, sign-in, and demo routes had zero rendered `Lineza` matches in body text, title, alt text, or aria labels; all routes showed `LinerV` and had no console errors or horizontal overflow.

## Follow-Up Polish

- Add dedicated legal/privacy pages before public launch.
- Consider a lighter mobile hero crop if the generated 3D image needs more product detail above the fold.

final result: passed
