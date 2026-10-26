export const serviceVisuals: Record<string, { src: string; alt: string }> = {
  commissioning: {
    src: "/images/editorial/engineering.webp",
    alt: "Illustrative mechanical plant room with a commissioning engineer and building systems",
  },
  hvac: {
    src: "/images/editorial/duct-inspection.webp",
    alt: "Illustrative engineer inspecting HVAC ductwork with a pressure-testing instrument",
  },
  facilities: {
    src: "/images/editorial/facility-maintenance.webp",
    alt: "Illustrative facilities engineer inspecting a chilled-water pump and building pipework",
  },
  envelope: {
    src: "/images/editorial/window-pressure.webp",
    alt: "Illustrative blower door fan and pressure instruments used to assess building airtightness",
  },
  energy: {
    src: "/images/editorial/retro-commissioning.webp",
    alt: "Illustrative engineer assessing existing building systems for recommissioning",
  },
  air: {
    src: "/images/editorial/air-quality.webp",
    alt: "Illustrative technician measuring indoor environmental conditions in a bright modern office",
  },
};

const specificVisuals: Record<string, { src: string; alt: string }> = {
  "building-envelop-testing": {
    src: "/images/editorial/window-pressure.webp",
    alt: "Illustrative engineer conducting a blower door airtightness test in a glazed room",
  },
  "thermal-imaging": {
    src: "/images/editorial/thermal-imaging.webp",
    alt: "Illustrative thermal imaging survey showing heat patterns across a building facade",
  },
  "u-value-testing-services": {
    src: "/images/editorial/heat-flux.webp",
    alt: "Illustrative heat-flux and temperature sensors measuring thermal performance of an exterior wall",
  },
  "duct-leakage-testing-services": {
    src: "/images/editorial/duct-inspection.webp",
    alt: "Illustrative technician assessing duct leakage with a test fan and pressure instruments",
  },
  "electrical-third-party-cold-live-testing-services": {
    src: "/images/editorial/electrical.webp",
    alt: "Illustrative electrical commissioning engineer inspecting a closed switchgear cabinet",
  },
  "duck-cleaning": {
    src: "/images/editorial/duct-cleaning.webp",
    alt: "Illustrative technician operating a robotic duct-cleaning brush and extraction unit",
  },
  "testing-and-balancing": {
    src: "/images/editorial/air-balancing.webp",
    alt: "Illustrative technician measuring supply airflow using a capture hood at a ceiling diffuser",
  },
  "third-party-witness-and-verification": {
    src: "/images/editorial/witness-verification.webp",
    alt: "Illustrative independent engineers witnessing and documenting a building pump-system test",
  },
  "sound-and-vibration-testing-of-mechanical-equipments": {
    src: "/images/editorial/vibration-analysis.webp",
    alt: "Illustrative technician measuring vibration of a guarded ventilation motor",
  },
  "acoustic-testing-for-interior-spaces": {
    src: "/images/editorial/acoustics.webp",
    alt: "Illustrative acoustic testing equipment in a modern conference room with sound-absorbing panels",
  },
  "micro-camera-inspection-service-for-drainage-lines-hvac-ducting": {
    src: "/images/editorial/camera-inspection.webp",
    alt: "Illustrative technician using a push-rod camera to inspect the interior of a drainage pipe",
  },
  "indoor-air-quality-testing-service": {
    src: "/images/editorial/air-quality.webp",
    alt: "Illustrative technician measuring indoor air quality with a portable environmental instrument",
  },
  "mep-health-check": {
    src: "/images/editorial/property-inspection.webp",
    alt: "Illustrative property inspector documenting a building condition before handover",
  },
  "commissioning-management": {
    src: "/images/editorial/commissioning-planning.webp",
    alt: "Illustrative commissioning coordination meeting reviewing MEP drawings and system plans",
  },
  "re-commissioning-and-retro-commissioning": {
    src: "/images/editorial/retro-commissioning.webp",
    alt: "Illustrative engineer assessing and optimizing an existing air handling system",
  },
};

export function getServiceVisual(slug: string, group: string) {
  return specificVisuals[slug] ?? serviceVisuals[group];
}
