import React, { useState } from 'react';
import DiabetesForm from '@/components/DiabetesForm';
import PredictionResult from '@/components/PredictionResult';
import { predictDiabetes } from '@/utils/diabetesPredictor';
import { Brain, Shield, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

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

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (data: HealthData) => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const result = predictDiabetes(data);
    setPrediction(result);
    setLoading(false);
  };

  const resetForm = () => {
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <img 
                src="/diabetes-logo.svg" 
                alt="Diabetes Predictor Logo" 
                className="h-16 w-16"
              />
            </div>
            <h1 className="text-4xl font-bold text-blue-900 mb-2">
              Diabetes Predictor
            </h1>
            <p className="text-xl text-blue-700 mb-4">
              Know Your Risk with AI-Powered Health Assessment
            </p>
            <div className="flex justify-center items-center gap-6 text-sm text-blue-600">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Clinically Inspired</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span>High Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!prediction ? (
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                <CardContent className="pt-4">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-blue-900 mb-2">AI-Powered Analysis</h3>
                  <p className="text-sm text-blue-700">Advanced machine learning algorithms trained on medical datasets</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="pt-4">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-green-900 mb-2">High Accuracy</h3>
                  <p className="text-sm text-green-700">Reliable predictions with confidence scoring and risk assessment</p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                <CardContent className="pt-4">
                  <Users className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-purple-900 mb-2">For Everyone</h3>
                  <p className="text-sm text-purple-700">Accessible health screening for individuals and healthcare providers</p>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="flex justify-center">
              <DiabetesForm onPredict={handlePredict} loading={loading} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Results */}
            <div className="flex justify-center">
              <PredictionResult prediction={prediction} />
            </div>
            
            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={resetForm}
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Assess Another Case
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              <strong>Diabetes Predictor</strong> - AI-powered health risk assessment
            </p>
            <p className="text-sm">
              Built with advanced machine learning • For educational purposes only • Not a substitute for medical advice
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
