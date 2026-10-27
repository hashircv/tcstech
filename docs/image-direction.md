# Editorial image direction

Created with the built-in ImageGen tool for the requested imagery refresh. Illustrative scenes, not photographs of TCS staff or named projects. Final website assets are WebP images in `public/images/editorial/`, with 640px mobile variants and 1536px large variants. Original generated PNGs are retained separately from deployed assets.

Homepage performance exports also include 960px variants for `architecture`, `engineering` and `healthy-space`. The carousel and its first-image preload advertise these intermediate sizes for high-density phones. Architecture and healthy-space exports use WebP quality 78; the scene and composition are preserved. The UI logo uses `public/tcs-logo.webp`, resized from the original supplied PNG with transparency preserved; `public/tcs-logo.png` remains the branding reference.

## Final prompts

- **Engineering:** A refined editorial photograph of a pristine modern mechanical plant room, silver HVAC ducts, insulated chilled-water pipes, a commissioning engineer in navy coveralls and a white hard hat checking a closed control cabinet with a tablet. Safe believable equipment, warm ivory and restrained sage palette. The visible uniform and helmet carry the supplied TCS emblem, accurately reproduced as a small, legible, naturally placed mark. No other readable text or watermarks.
- **Architecture:** A contemporary UAE commercial building viewed from a low angle, shaded glass facade, warm limestone fins, subtropical greenery, soft morning light, straight perspective, composed to work in both landscape and portrait crops. No named landmark or project, text, logos or watermarks.
- **Healthy space:** A daylit modern commercial office with floor-to-ceiling glazing, integrated ventilation, oak and stone finishes, greenery and understated furniture. Calm architectural photography in warm ivory and muted olive, no people, named project, text, logo or watermark.

## TCS branding for generated people imagery

Every generated image that depicts TCS staff or technicians must use the supplied `public/tcs-logo.png` as the exact branding reference. Place a small, crisp TCS emblem naturally on visible uniform chest panels, safety vests, hard hats, or relevant equipment. Preserve believable fabric folds, perspective, scale, lighting, and color; do not invent alternate marks or add gibberish text. Keep architectural or equipment-only imagery free of artificial logos. These images are illustrative, not photographs of actual TCS staff or named customer projects.

Branding pass completed with the built-in image editor on 2026-10-26. The 16 reviewed editorial masters are `engineering`, `commissioning-planning`, `electrical`, `air-balancing`, `duct-cleaning`, `thermal-imaging`, `witness-verification`, `camera-inspection`, `property-inspection`, `vibration-analysis`, `air-quality`, `duct-inspection`, `facility-maintenance`, `retro-commissioning`, `heat-flux`, and `window-pressure` in `public/images/editorial/`. Each has a matching `-640.webp` mobile asset. Both sizes were exported from the same branded source at WebP quality 84. Existing filenames and image assignments are preserved.

Branding edit prompt set: use the original photograph as the edit target and `public/tcs-logo.png` as the reference. Add the geometric emblem and uppercase TCS as modest white embroidery on dark uniforms and green decals on white helmets or light shirts. Omit the tiny tagline. Fit marks to fabric folds, surface curvature, perspective, lighting and scale. Preserve the service scene, equipment, people, framing and photographic style; avoid captions and watermarks. Target visible upper back, chest or sleeve panels and existing headwear as appropriate to each composition. Generated marks are illustrative reproductions. Real project photographs and the original video remain unchanged.

Equipment branding is optional: use a discreet TCS ownership label only when appropriate on portable company test kits. Do not label building machinery or imply TCS manufactures third-party instruments. No additional equipment branding was needed for this pass.

The mobile service layout uses one full-width photograph in a 3:2 frame. It replaces the old pair of illustrations in white contain-fit boxes. The original technical content and source documents remain available independently of the new illustrative photography.

The homepage hero shows two images, followed by the edited TCS video on slide three, then the healthy-space image. Still images advance every 6.5 seconds; the video slide lasts 8 seconds. The 7.4-second edit removes equipment collages and weak transitions, slows selected site footage slightly and applies modest color correction, denoising and sharpening. Local desktop and mobile MP4 files are in public/videos (about 1.13 MB and 0.60 MB), with a matching real-footage poster. The video autoplays muted and inline only when slide three is active. It pauses when offscreen, paused or the tab is hidden. Reduced-motion users see the poster. There is no separate watch-video button or dialog.


Each active service page now uses its own distinct subject-specific photograph. Cards and detail pages share that service’s assignment. See [the service photograph prompt set](service-image-prompts.md) and [the verified coverage inventory](coverage-check.md).


Production cleanup: original authoring media and one-time encoding/optimization scripts were moved to a local archive outside this repository. Only the final responsive website assets are shipped. Image provenance and content audits remain in docs/.

