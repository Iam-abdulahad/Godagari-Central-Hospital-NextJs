import { DiagnosticTest } from "./types";

export const diagnosticTests: DiagnosticTest[] = [
  { name: "Complete Blood Count (CBC)", category: "Hematology", price: 500 },
  { name: "Blood Glucose (Fasting)", category: "Biochemistry", price: 200 },
  { name: "Blood Glucose (Random)", category: "Biochemistry", price: 200 },
  { name: "HbA1c", category: "Biochemistry", price: 800 },
  { name: "Lipid Profile", category: "Biochemistry", price: 1000 },
  { name: "Liver Function Test (LFT)", category: "Biochemistry", price: 1200 },
  { name: "Kidney Function Test (KFT)", category: "Biochemistry", price: 1000 },
  { name: "Thyroid Function Test (TFT)", category: "Biochemistry", price: 1500 },
  { name: "Urine R/M/E", category: "Microbiology", price: 200 },
  { name: "Widal Test", category: "Serology", price: 350 },
  { name: "Ultrasonography (Abdomen)", category: "Imaging", price: 1500 },
  { name: "ECG (Electrocardiogram)", category: "Cardiology", price: 500 },
];

// Note: All prices are demo placeholders in BDT. Replace with actual prices.
