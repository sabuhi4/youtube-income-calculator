'use client';

import { formatCurrency } from '@/app/utils/earnings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calendar, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EarningsDisplayProps {
  earnings: {
    daily: number;
    monthly: number;
    yearly: number;
  };
}

export default function EarningsDisplay({ earnings }: EarningsDisplayProps) {
  return (
    <Card className="overflow-hidden border-2 shadow-2xl bg-gradient-to-br from-primary/5 via-background to-primary/5">
      <CardHeader className="text-center pb-4 space-y-2">
        <div className="flex justify-center mb-2">
          <div className="p-3 bg-primary/10 rounded-full">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
        </div>
        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Estimated Earnings
        </CardTitle>
        <CardDescription className="text-base">
          Projected income based on channel performance
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <CardContent className="p-6 text-center relative">
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Daily
              </p>
              <p className="text-4xl font-bold text-primary mb-2">
                {formatCurrency(earnings.daily)}
              </p>
              <Badge variant="secondary" className="text-xs">
                Per Day
              </Badge>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-primary/40 bg-gradient-to-br from-primary/15 to-primary/5 hover:shadow-xl transition-all hover:scale-105 md:scale-110 z-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <CardContent className="p-6 text-center relative">
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Monthly
              </p>
              <p className="text-4xl font-bold text-primary mb-2">
                {formatCurrency(earnings.monthly)}
              </p>
              <Badge className="text-xs">
                Per Month
              </Badge>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-primary/5 hover:shadow-lg transition-all hover:scale-105">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
            <CardContent className="p-6 text-center relative">
              <div className="flex justify-center mb-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <DollarSign className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                Yearly
              </p>
              <p className="text-4xl font-bold text-primary mb-2">
                {formatCurrency(earnings.yearly)}
              </p>
              <Badge variant="secondary" className="text-xs">
                Per Year
              </Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50 border-dashed">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Calculation basis:</strong> $3 CPM with 50% monetization rate
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Actual earnings may vary based on content type, audience location, and engagement
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}