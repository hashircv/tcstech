# Editorial image direction

Created with the built-in ImageGen tool for the requested imagery refresh. Illustrative scenes, not photographs of TCS staff or named projects. Final website assets are WebP images in `public/images/editorial/`, with 640px mobile variants and 1536px large variants. Original generated PNGs are retained separately from deployed assets.

## Final prompts

- **Engineering:** A refined editorial photograph of a pristine modern mechanical plant room, silver HVAC ducts, insulated chilled-water pipes, a commissioning engineer in navy coveralls and a white hard hat checking a closed control cabinet with a tablet. Safe believable equipment, warm ivory and restrained sage palette, no logos, text or watermarks.
- **Architecture:** A contemporary UAE commercial building viewed from a low angle, shaded glass facade, warm limestone fins, subtropical greenery, soft morning light, straight perspective, composed to work in both landscape and portrait crops. No named landmark or project, text, logos or watermarks.
- **Healthy space:** A daylit modern commercial office with floor-to-ceiling glazing, integrated ventilation, oak and stone finishes, greenery and understated furniture. Calm architectural photography in warm ivory and muted olive, no people, named project, text, logo or watermark.

The mobile service layout uses one full-width photograph in a 3:2 frame. It replaces the old pair of illustrations in white contain-fit boxes. The original technical content and source documents remain available independently of the new illustrative photography.

The homepage hero shows two images, followed by the edited TCS video on slide three, then the healthy-space image. Still images advance every 6.5 seconds; the video slide lasts 8 seconds. The 7.4-second edit removes equipment collages and weak transitions, slows selected site footage slightly and applies modest color correction, denoising and sharpening. Local desktop and mobile MP4 files are in public/videos (about 1.13 MB and 0.60 MB), with a matching real-footage poster. The video autoplays muted and inline only when slide three is active. It pauses when offscreen, paused or the tab is hidden. Reduced-motion users see the poster. There is no separate watch-video button or dialog.


Each active service page now uses its own distinct subject-specific photograph. Cards and detail pages share that service’s assignment. See [the service photograph prompt set](service-image-prompts.md) and [the verified coverage inventory](coverage-check.md).


Production cleanup: original authoring media and one-time encoding/optimization scripts were moved to a local archive outside this repository. Only the final responsive website assets are shipped. Image provenance and content audits remain in docs/.

