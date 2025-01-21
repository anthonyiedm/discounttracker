import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Sparkles, Clock, TrendingUp } from 'lucide-react';

const EnhancedCreditsDisplay = ({ 
  credits = {
    available: 0,
    total: 0,
    daysUntilReset: 0,
    usageTrend: 0
  }
}) => {
  // Ensure we have valid numbers to work with
  const available = Number(credits.available) || 0;
  const total = Number(credits.total) || 1; // Prevent division by zero
  const percentage = (available / total) * 100;

  const getProgressColor = (percentage) => {
    if (percentage < 20) return 'from-red-500 to-red-600';
    if (percentage < 40) return 'from-yellow-500 to-yellow-600';
    return 'from-green-500 to-green-600';
  };

  return (
    <Card className="backdrop-blur-sm bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Sparkles className="mr-2 h-5 w-5 text-indigo-500" />
          Available Credits
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Credits Counter */}
          <div className="flex items-end">
            <span className="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 
                           bg-clip-text text-transparent">
              {available.toLocaleString()}
            </span>
            <span className="text-gray-500 ml-2 mb-1">
              / {total.toLocaleString()}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="h-2 relative rounded-full overflow-hidden">
              <Progress 
                value={percentage}
                className={`bg-gradient-to-r ${getProgressColor(percentage)}`}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{Math.round(percentage)}% remaining</span>
              <span>{available.toLocaleString()} credits</span>
            </div>
          </div>

          {/* Reset Timer */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r 
                         from-gray-50 to-gray-100 rounded-lg">
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Resets in</span>
            </div>
            <span className="text-sm font-medium">
              {credits.daysUntilReset || 0} days
            </span>
          </div>

          {/* Usage Trend */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r 
                         from-indigo-50 to-purple-50 rounded-lg">
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-indigo-500 mr-2" />
              <span className="text-sm text-gray-600">Usage Trend</span>
            </div>
            <span className="text-sm font-medium text-indigo-600">
              {credits.usageTrend || 0}% this week
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Example usage:
const ExampleUsage = () => {
  const sampleCredits = {
    available: 450,
    total: 1000,
    daysUntilReset: 14,
    usageTrend: 23
  };

  return <EnhancedCreditsDisplay credits={sampleCredits} />;
};

export default EnhancedCreditsDisplay;