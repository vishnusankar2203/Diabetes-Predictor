
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Info, Heart } from 'lucide-react';

interface PredictionData {
  risk: 'low' | 'moderate' | 'high';
  confidence: number;
  probability: number;
  factors: string[];
  recommendation: string;
}

interface PredictionResultProps {
  prediction: PredictionData;
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-700 bg-green-100';
      case 'moderate': return 'text-yellow-700 bg-yellow-100';
      case 'high': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-6 w-6 text-green-600" />;
      case 'moderate': return <Info className="h-6 w-6 text-yellow-600" />;
      case 'high': return <AlertTriangle className="h-6 w-6 text-red-600" />;
      default: return <Info className="h-6 w-6 text-gray-600" />;
    }
  };

  const getProgressColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'high': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      {/* Main Result Card */}
      <Card className="border-2 border-blue-200">
        <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex items-center justify-center gap-3 mb-2">
            {getRiskIcon(prediction.risk)}
            <CardTitle className="text-2xl font-bold text-blue-900">
              Diabetes Risk Assessment
            </CardTitle>
          </div>
          <CardDescription className="text-blue-700">
            AI-powered prediction based on your health parameters
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Badge className={`text-lg px-4 py-2 ${getRiskColor(prediction.risk)}`}>
              {prediction.risk.toUpperCase()} RISK
            </Badge>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Risk Probability</span>
                <span className="text-sm font-bold text-gray-900">{prediction.probability}%</span>
              </div>
              <Progress 
                value={prediction.probability} 
                className="h-3"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Model Confidence</span>
                <span className="text-sm font-bold text-gray-900">{prediction.confidence}%</span>
              </div>
              <Progress 
                value={prediction.confidence} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Factors Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-gray-800">
            <Heart className="h-5 w-5 text-red-500" />
            Key Contributing Factors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {prediction.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{factor}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendation Card */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Medical Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{prediction.recommendation}</p>
          
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800 mb-1">Important Disclaimer</p>
                <p className="text-yellow-700">
                  This tool is for educational and preliminary risk assessment purposes only. 
                  It is not a substitute for professional medical advice, diagnosis, or treatment. 
                  Always consult with qualified healthcare professionals for medical concerns.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PredictionResult;
