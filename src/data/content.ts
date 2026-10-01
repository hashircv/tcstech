export interface Service {
  id: string;
  title: string;
  category: string;
  description: string;
  items: string[];
}
export const services: Service[] = [
  {
    id: "commissioning",
    title: "Testing & commissioning",
    category: "MEP systems",
    description:
      "Confidence in every system. Verify that your building performs as it was designed to.",
    items: [
      "MEP system testing and commissioning",
      "Commissioning management",
      "Third-party witness and verification",
      "Electrical cold and live testing",
    ],
  },
  {
    id: "energy",
    title: "Energy & sustainability",
    category: "Energy performance",
    description:
      "Understand your energy use. Uncover practical opportunities for a more efficient building.",
    items: [
      "Energy audits and optimization",
      "Re-commissioning and retro-commissioning",
      "Building system performance assessment",
    ],
  },
  {
    id: "envelope",
    title: "Building envelope testing",
    category: "Building integrity",
    description:
      "A better barrier between inside and outside. Identify leaks, heat loss, and performance gaps.",
    items: [
      "Thermal imaging and blower door testing",
      "U-value testing",
      "Window air permeability testing",
      "Water penetration testing",
    ],
  },
  {
    id: "hvac",
    title: "HVAC testing & balancing",
    category: "MEP systems",
    description:
      "Bring air and water systems into balance for dependable comfort and efficient operation.",
    items: [
      "Air and hydronic testing, adjusting and balancing",
      "Seasonal and performance testing",
      "Duct leakage air and smoke testing",
      "Mechanical equipment sound and vibration testing",
    ],
  },
  {
    id: "air",
    title: "Indoor environmental quality",
    category: "Healthy spaces",
    description:
      "Create spaces that feel better, with cleaner air and a more comfortable indoor environment.",
    items: [
      "Indoor air quality testing",
      "Duct assessment, cleaning and restoration",
      "Interior acoustic testing",
      "Micro-camera inspection of ducts and drainage",
    ],
  },
  {
    id: "facilities",
    title: "Facility & property services",
    category: "Building integrity",
    description:
      "Support your building beyond handover with practical care and detailed system inspections.",
    items: [
      "Facility management",
      "MEP pre-handover inspection and snagging",
      "Integrated mechanical, electrical and plumbing solutions",
    ],
  },
];
export const projects = [
  {
    name: "W Hotel, Yas Island",
    location: "Abu Dhabi, UAE",
    work: "Fresh air handling unit rebalancing & duct leakage",
    type: "Hospitality",
  },
  {
    name: "Jumeirah Emirates Towers",
    location: "Dubai, UAE",
    work: "HVAC system validation",
    type: "Commercial",
  },
  {
    name: "BEEAH Headquarters",
    location: "Sharjah, UAE",
    work: "Seasonal testing & commissioning",
    type: "Commercial",
  },
  {
    name: "Madinat Jumeirah Resort",
    location: "Dubai, UAE",
    work: "HVAC system validation",
    type: "Hospitality",
  },
  {
    name: "Dubai Holding HQ",
    location: "Dubai, UAE",
    work: "MEP testing & commissioning for office refurbishment",
    type: "Commercial",
  },
  {
    name: "Marina Apartments",
    location: "UAE",
    work: "MEP system validation",
    type: "Residential",
  },
];
export const contact = {
  email: "info@tcstech.me",
  phone: "+971 56 409 0854",
  phoneLink: "+971564090854",
  secondaryPhone: "+971 56 969 4333",
  secondaryPhoneLink: "+971569694333",
  whatsappNumber: "971555289611",
  address:
    "Hamad Ahmad Bin Suqat, Al Qusais Industrial First, Plot No. 44-0, Warehouse No. 17w, Dubai, UAE",
};

export function whatsappLink(
  message = "Hello TCS, I would like to discuss your building services and my project.",
) {
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
