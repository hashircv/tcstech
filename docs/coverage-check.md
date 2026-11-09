# Content and image coverage check

Checked 1 October 2026 against the freshly fetched WordPress page collection at https://tcstech.me/. All 32 source pages match the previous snapshot after ignoring dynamic careers-form IDs and security tokens.

All 15 active services have detail blocks, section navigation and responsive imagery. Five service URLs redirect to the services directory following the owner's service changes. Project content was replaced on 7 November 2026 by the owner's ordered spreadsheet: 32 retained entries, three yellow rows excluded, and one Projects page. See [project-content.md](project-content.md) for the current project source and imagery, and [project-image-prompts.json](project-image-prompts.json) for generated architectural image prompts.

## Services

| Service | Detail content | Image | Standards shown |
|---|---|---|---|
| Commissioning management (CxA) | Preserved reference content | commissioning-planning.webp | ASHRAE, CIBSE, NEBB, BSRIA, CSA |
| Testing, adjusting & balancing (TAB) | Preserved reference content | air-balancing.webp | ASHRAE, CIBSE, NEBB, BSRIA, CSA |
| Electrical cold & live testing | Preserved reference content | electrical.webp | DEWA, ADDC, IEEE |
| Third-party witness & verification | Preserved reference content | witness-verification.webp | ASHRAE, CIBSE, NEBB, BSRIA, CSA |
| Duct leakage testing (DALT) | Preserved reference content | duct-inspection.webp | SMACNA, DW144 |
| Duct cleaning & restoration | Preserved reference content | duct-cleaning.webp | NADCA |
| Sound & vibration testing | Preserved reference content | vibration-analysis.webp | — |
| Interior acoustic testing | Preserved reference content | acoustics.webp | — |
| Indoor air quality testing (IAQ) | Preserved reference content | air-quality.webp | DM-HSD-GU119-IAQ, LEED v5/v4, WELL |
| Re-commissioning & retro-commissioning | Preserved reference content | retro-commissioning.webp | — |
| Blower door / room integrity test (FM 200) | Preserved reference content | window-pressure.webp | — |
| Thermal Imaging | New standalone detail page based on existing TCS thermal imaging references | thermal-imaging.webp | — |
| U-value testing | Preserved reference content | heat-flux.webp | — |
| Micro-camera inspections | Preserved reference content | camera-inspection.webp | — |
| Property Inspection and Snagging | Existing inspection content under the updated service name | property-inspection.webp | — |

All active service images have 1536px and 640px WebP variants.

## Projects

The current inventory is the single ordered array in `src/data/projects.json`. It contains 32 projects with source numbers 1–15, 18–20 and 22–35. Five matching project photographs are retained at their native dimensions; 27 new architectural illustrations have 1000px/640px WebP variants and are explicitly labelled. Every card has a distinct image. Completed/ongoing categories and the obsolete PDF lists have been retired. See [project-content.md](project-content.md).

## Content cleanup

Source blocks were compared with the imported technical content. Differences are the documented duplicate cleanup, typo repairs, removal of unfinished acoustic case-study instructions, unrelated air-quality FAQ tails and neutralization of pasted third-party company names. No additional service was missing. The project inventory now follows the later owner-supplied spreadsheet. See [the migration audit](content-audit.md) for the full exclusion record.
