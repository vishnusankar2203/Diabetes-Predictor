
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Heart, Scale, Ruler, Droplet, Calculator, TrendingUp, Calendar } from 'lucide-react';

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

interface DiabetesFormProps {
  onPredict: (data: HealthData) => void;
  loading: boolean;
}

const DiabetesForm: React.FC<DiabetesFormProps> = ({ onPredict, loading }) => {
  const [formData, setFormData] = useState<HealthData>({
    pregnancies: 0,
    glucose: 120,
    bloodPressure: 80,
    skinThickness: 20,
    insulin: 80,
    bmi: 25,
    diabetesPedigree: 0.5,
    age: 30
  });

  const handleInputChange = (field: keyof HealthData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPredict(formData);
  };

  const inputFields = [
    {
      key: 'pregnancies' as keyof HealthData,
      label: 'Number of Pregnancies',
      icon: Heart,
      placeholder: '0-15',
      description: 'Total number of pregnancies'
    },
    {
      key: 'glucose' as keyof HealthData,
      label: 'Glucose Level (mg/dL)',
      icon: Droplet,
      placeholder: '70-200',
      description: 'Plasma glucose concentration'
    },
    {
      key: 'bloodPressure' as keyof HealthData,
      label: 'Blood Pressure (mmHg)',
      icon: Activity,
      placeholder: '60-140',
      description: 'Diastolic blood pressure'
    },
    {
      key: 'skinThickness' as keyof HealthData,
      label: 'Skin Thickness (mm)',
      icon: Ruler,
      placeholder: '10-50',
      description: 'Triceps skin fold thickness'
    },
    {
      key: 'insulin' as keyof HealthData,
      label: 'Insulin Level (μU/mL)',
      icon: TrendingUp,
      placeholder: '15-300',
      description: '2-Hour serum insulin'
    },
    {
      key: 'bmi' as keyof HealthData,
      label: 'BMI (Body Mass Index)',
      icon: Scale,
      placeholder: '15-50',
      description: 'Weight in kg/(height in m)²'
    },
    {
      key: 'diabetesPedigree' as keyof HealthData,
      label: 'Diabetes Pedigree Function',
      icon: Calculator,
      placeholder: '0.0-2.5',
      description: 'Genetic diabetes likelihood'
    },
    {
      key: 'age' as keyof HealthData,
      label: 'Age (years)',
      icon: Calendar,
      placeholder: '18-100',
      description: 'Age in years'
    }
  ];

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-blue-900">Health Assessment Form</CardTitle>
        <CardDescription className="text-blue-700">
          Please provide your health information for diabetes risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.key} className="space-y-2">
                  <Label htmlFor={field.key} className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <Icon className="h-4 w-4 text-blue-600" />
                    {field.label}
                  </Label>
                  <Input
                    id={field.key}
                    type="number"
                    step="any"
                    placeholder={field.placeholder}
                    value={formData[field.key]}
                    onChange={(e) => handleInputChange(field.key, e.target.value)}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-200"
                    required
                  />
                  <p className="text-xs text-gray-500">{field.description}</p>
                </div>
              );
            })}
          </div>
          
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium"
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                'Predict Diabetes Risk'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DiabetesForm;
