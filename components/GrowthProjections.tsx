'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';
import { formatCurrency } from '@/app/utils/earnings';

interface GrowthProjectionsProps {
  currentEarnings: {
    monthly: number;
    yearly: number;
  };
}

export default function GrowthProjections({ currentEarnings }: GrowthProjectionsProps) {
  
  const generateProjections = () => {
    const monthlyGrowthRate = 1.05; 
    const data = [];

    let currentMonthly = currentEarnings.monthly;

    for (let month = 0; month <= 12; month++) {
      data.push({
        month: month === 0 ? 'Now' : `+${month}m`,
        earnings: Math.round(currentMonthly * 100) / 100,
        conservative: Math.round(currentMonthly * 0.8 * 100) / 100,
        optimistic: Math.round(currentMonthly * 1.2 * 100) / 100,
      });

      if (month < 12) {
        currentMonthly *= monthlyGrowthRate;
      }
    }

    return data;
  };

  const projectionData = generateProjections();
  const futureEarnings = {
    threeMonths: projectionData[3].earnings,
    sixMonths: projectionData[6].earnings,
    twelveMonths: projectionData[12].earnings,
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Growth Projections</CardTitle>
            <CardDescription className="text-base mt-1">
              Future earnings estimate (5% monthly growth)
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">In 3 Months</span>
              </div>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(futureEarnings.threeMonths)}
              </p>
              <p className="text-xs text-blue-700 mt-1">per month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">In 6 Months</span>
              </div>
              <p className="text-2xl font-bold text-purple-900">
                {formatCurrency(futureEarnings.sixMonths)}
              </p>
              <p className="text-xs text-purple-700 mt-1">per month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">In 1 Year</span>
              </div>
              <p className="text-2xl font-bold text-green-900">
                {formatCurrency(futureEarnings.twelveMonths)}
              </p>
              <p className="text-xs text-green-700 mt-1">per month</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/30">
          <CardContent className="p-6">
            <h4 className="text-sm font-semibold mb-4">Projected Monthly Earnings (Next 12 Months)</h4>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={projectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#888"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="optimistic"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.1}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
                <Area
                  type="monotone"
                  dataKey="earnings"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="conservative"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.1}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded opacity-30" />
                <span>Optimistic (+20%)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span>Projected (5% growth)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded opacity-30" />
                <span>Conservative (-20%)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground text-center">
          <p>
            Projections assume consistent 5% monthly growth. Actual results may vary based on
            content performance, algorithm changes, and market conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}