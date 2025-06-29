
interface HealthData {
  pregnancies: number;
  glucose: number;
  bloodPressure: number;
  skinThickness: number;
  insulin: number;
  bmi: number;
  diabetesPedigree: number;
  age: number;
}

interface PredictionData {
  risk: 'low' | 'moderate' | 'high';
  confidence: number;
  probability: number;
  factors: string[];
  recommendation: string;
}

export const predictDiabetes = (data: HealthData): PredictionData => {
  // Simulate ML model prediction with realistic scoring
  let riskScore = 0;
  const factors: string[] = [];

  // Glucose level assessment (most important factor)
  if (data.glucose >= 140) {
    riskScore += 30;
    factors.push('Elevated glucose levels (≥140 mg/dL)');
  } else if (data.glucose >= 110) {
    riskScore += 15;
    factors.push('Moderately high glucose levels');
  }

  // BMI assessment
  if (data.bmi >= 30) {
    riskScore += 20;
    factors.push('Obesity (BMI ≥30)');
  } else if (data.bmi >= 25) {
    riskScore += 10;
    factors.push('Overweight (BMI 25-29.9)');
  }

  // Age factor
  if (data.age >= 65) {
    riskScore += 15;
    factors.push('Advanced age (≥65 years)');
  } else if (data.age >= 45) {
    riskScore += 8;
    factors.push('Middle age (45-64 years)');
  }

  // Blood pressure
  if (data.bloodPressure >= 90) {
    riskScore += 10;
    factors.push('High blood pressure (≥90 mmHg)');
  }

  // Diabetes pedigree function
  if (data.diabetesPedigree >= 1.0) {
    riskScore += 12;
    factors.push('Strong family history of diabetes');
  } else if (data.diabetesPedigree >= 0.5) {
    riskScore += 6;
    factors.push('Moderate family history of diabetes');
  }

  // Pregnancies (for women)
  if (data.pregnancies >= 4) {
    riskScore += 8;
    factors.push('Multiple pregnancies (≥4)');
  }

  // Insulin levels
  if (data.insulin >= 200 || data.insulin <= 30) {
    riskScore += 8;
    factors.push('Abnormal insulin levels');
  }

  // Skin thickness
  if (data.skinThickness >= 40) {
    riskScore += 5;
    factors.push('Increased skin thickness');
  }

  // Determine risk level and probability
  let risk: 'low' | 'moderate' | 'high';
  let probability: number;
  let confidence: number;

  if (riskScore >= 50) {
    risk = 'high';
    probability = Math.min(85 + Math.random() * 10, 95);
    confidence = 88 + Math.random() * 7;
  } else if (riskScore >= 25) {
    risk = 'moderate';
    probability = 40 + Math.random() * 35;
    confidence = 82 + Math.random() * 8;
  } else {
    risk = 'low';
    probability = Math.max(5 + Math.random() * 20, 5);
    confidence = 85 + Math.random() * 10;
  }

  // Add some variability to make it more realistic
  probability = Math.round(probability * 10) / 10;
  confidence = Math.round(confidence * 10) / 10;

  // Generate recommendations
  const recommendations = {
    low: "Your current health parameters suggest a low risk for diabetes. Continue maintaining a healthy lifestyle with regular exercise, balanced nutrition, and routine health check-ups. Keep monitoring your health parameters annually.",
    moderate: "Your assessment indicates a moderate risk for diabetes. Consider lifestyle modifications including regular physical activity, weight management, and dietary improvements. Schedule a consultation with your healthcare provider for comprehensive evaluation and personalized prevention strategies.",
    high: "Your health parameters suggest a high risk for diabetes. Immediate consultation with a healthcare professional is strongly recommended. Consider comprehensive medical evaluation, potential glucose tolerance testing, and development of a personalized health management plan."
  };

  // Ensure we have at least some factors
  if (factors.length === 0) {
    factors.push('Overall health parameters within normal ranges');
  }

  return {
    risk,
    confidence: Math.round(confidence),
    probability: Math.round(probability),
    factors,
    recommendation: recommendations[risk]
  };
};
