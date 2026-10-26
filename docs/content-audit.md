# Reference-site migration audit

Audit date: 30 September 2026. Source: WordPress public REST page collection, current page sitemap, linked public pages and documents.

Rechecked on 1 October 2026 against a fresh live page collection. The source contained 19 service pages and 28 featured project entries. Three service offerings were later retired at the owner's request; their legacy URLs redirect to `/services/`. The 16 active service pages and featured projects have distinct subject-specific/matched images. See [the coverage check](coverage-check.md) for the active inventory.

32 published WordPress pages audited; 16 active service pages remain in the new site. Retired service URLs redirect to `/services/`. Retained service content is structured except exact duplicates, malformed markup, irrelevant pasted text and unfinished editorial instructions described below.

| Original path | Page | Treatment |
|---|---|---|
| /micro-camera-inspection-service-for-drainage-lines-hvac-ducting/ | Micro Camera Inspection Service for Drainage Lines & HVAC Ducting | Full service detail page |
| /mep-health-check/ | MEP Health Check | Full service detail page |
| /electrical-third-party-cold-live-testing-services/ | Electrical Third-Party Cold & Live Testing Services | Full service detail page |
| /duct-leakage-testing-services/ | Duct Leakage Testing Services | Full service detail page |
| /electrical-3rd-party-cold/ | Electrical Third-Party Cold & Live Testing Services | Consolidated into /electrical-third-party-cold-live-testing-services/ |
| /air-permeability-test-for-windows/ | Air Permeability Test for Windows | Full service detail page |
| /re-commissioning-and-retro-commissioning/ | Re-commissioning and Retro-commissioning | Full service detail page |
| /commissioning-management/ | Commissioning Management | Full service detail page |
| /indoor-air-quality-testing-service/ | Indoor Air Quality Testing | Full service detail page |
| /facility-management/ | Facility Management System | Retired; redirects to /services/ |
| /energy-optimization-through-energy-audit/ | Energy Optimization through Energy Audit | Retired; redirects to /services/ |
| /acoustic-testing-for-interior-spaces/ | Acoustic Testing for Interior Spaces | Full service detail page |
| /sound-and-vibration-testing-of-mechanical-equipments/ | Sound and Vibration Testing of Mechanical Equipment’s | Full service detail page |
| /third-party-witness-and-verification/ | Third Party Witness and Verification | Full service detail page |
| /testing-commissioning-of-mep-system/ | Testing & Commissioning of MEP System | Full service detail page |
| /completed/ | Completed | Dedicated page / structured source content |
| /on-going/ | On-going | Dedicated page / structured source content |
| /job-openings/ | Jobs | Consolidated into /career/ |
| /career/ | Career | Dedicated page / structured source content |
| /testing-and-balancing/ | TAB (Testing and balancing | Full service detail page |
| /water-penetration-test/ | Water Penetration Test | Retired; redirects to /services/ |
| /duck-cleaning/ | Duct Cleaning | Full service detail page |
| /duct-leak-test/ | DUCT LEAKAGE TEST | Consolidated into /duct-leakage-testing-services/ |
| /u-value-testing-services/ | U VALUE TESTING | Full service detail page |
| /building-envelop-testing/ | building-envelop-testing | Full service detail page |
| /news-insight/ | News & Insight | Empty source; honest empty state |
| /markets/ | Markets | Dedicated page / structured source content |
| /contact/ | Contact | Dedicated page / structured source content |
| /project-details/ | Project Details | Consolidated into /projects/ |
| /projects/ | Projects | Dedicated page / structured source content |
| /about/ | About | Dedicated page / structured source content |
| / | Solar Spark | Home page retained |

## Additional findings

- Footer/content links also reference /u-value-testing/, /indoor-air-quality-testing/ and /duck-leak-test/. These legacy paths resolve to their complete canonical service pages.

- /our-team/ remains in the sitemap but currently returns HTTP 404. Four historical profiles were recovered from the search-indexed version. Their roles and experience require company confirmation before launch; they are presented as published company profiles.
- /dalt-leak-test/ also returns HTTP 404; its indexed content duplicates the live /duct-leak-test/ page. Both paths resolve to the expanded duct leakage page.
- /jobs/813/ currently shows Full Time, Dubai, an empty job description and an application form. It is mapped to the careers page without inventing a job title or responsibilities.
- All 101 WordPress post titles were inspected: gambling and other unrelated posts, plus the default Hello world post. No legitimate company news article was found. These were not migrated.
- /project-details/ is an unfinished solar-template example containing Lorem ipsum. It resolves to the real project catalogue instead of becoming an invented TCS project.
- Commissioning/water-testing copy contained references to AFS and BDG. These are rendered as neutral team descriptions rather than attributing third-party company names to TCS.
- Acoustic copy contained writer instructions and a case-study template without an actual case study. Explanatory topics are retained, instructions and the empty case-study template removed.
- Indoor-air FAQs contained unrelated environmental product-testing paragraphs (radiation, military and electronics environments); those unrelated tails were removed.
- Older standards and numerical claims from the source are retained as reference content, not independently recertified. Confirm applicable project standards before launch.
- Completed and ongoing PDF project lists are retained as downloadable original documents. Ongoing status reflects the source list, not independently verified construction status.
- Contact/application forms prepare an email draft and do not transmit, store data, or silently upload CVs. Application fields mirror the source. CV attachment is done by the applicant in their email app, or via the existing online form.

