import { Department } from "./types";

export const departments: Department[] = [
  {
    slug: "general-medicine",
    name: "General Medicine",
    icon: "Stethoscope",
    description:
      "Comprehensive diagnosis and treatment of common diseases, fever, diabetes, hypertension, and general health conditions.",
    services: ["General Consultation", "Chronic Disease Management", "Health Screening", "Preventive Care"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    icon: "Baby",
    description:
      "Complete care for women's health including pregnancy, delivery, and gynecological conditions.",
    services: ["Prenatal Care", "Normal Delivery", "C-Section", "Gynecological Consultation", "Family Planning"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "pediatrics",
    name: "Pediatrics",
    icon: "HeartPulse",
    description:
      "Specialized healthcare for infants, children, and adolescents including vaccination and growth monitoring.",
    services: ["Child Consultation", "Vaccination", "Growth Monitoring", "Newborn Care"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "orthopedics",
    name: "Orthopedics",
    icon: "Bone",
    description:
      "Treatment of bone fractures, joint problems, arthritis, and musculoskeletal disorders.",
    services: ["Fracture Treatment", "Joint Care", "Physiotherapy Referral", "Orthopedic Consultation"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "cardiology",
    name: "Cardiology",
    icon: "Heart",
    description:
      "Diagnosis and management of heart conditions including ECG, echocardiography, and cardiac consultation.",
    services: ["ECG", "Echocardiography", "Cardiac Consultation", "Blood Pressure Management"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "ent",
    name: "ENT (Ear, Nose & Throat)",
    icon: "Ear",
    description:
      "Treatment of ear, nose, throat, and related head and neck disorders.",
    services: ["ENT Consultation", "Hearing Assessment", "Throat Examination", "Nasal Treatment"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "eye",
    name: "Eye (Ophthalmology)",
    icon: "Eye",
    description:
      "Complete eye care including vision testing, eye disease treatment, and prescription glasses.",
    services: ["Eye Examination", "Vision Testing", "Cataract Assessment", "Eye Disease Treatment"],
    timing: "9:00 AM – 9:00 PM",
  },
  {
    slug: "dental",
    name: "Dental",
    icon: "Smile",
    description:
      "Dental care including tooth extraction, filling, scaling, and oral health consultation.",
    services: ["Dental Consultation", "Tooth Extraction", "Filling", "Scaling & Cleaning"],
    timing: "9:00 AM – 9:00 PM",
  },
];
