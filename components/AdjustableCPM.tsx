'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sliders, DollarSign, TrendingUp } from 'lucide-react';
import { formatCurrency } from '@/app/utils/earnings';

interface AdjustableCPMProps {
  channel: {
    statistics: {
      viewCount: string;
    };
    publishedAt: string;
  };
  onEarningsChange?: (earnings: { daily: number; monthly: number; yearly: number }) => void;
}

const NICHE_PRESETS = {
  'Average': { cpm: 3, monetization: 50 },
  'Gaming': { cpm: 2, monetization: 45 },
  'Tech': { cpm: 5, monetization: 55 },
  'Finance': { cpm: 12, monetization: 60 },
  'Education': { cpm: 4, monetization: 50 },
  'Entertainment': { cpm: 2.5, monetization: 45 },
};

export default function AdjustableCPM({ channel, onEarningsChange }: AdjustableCPMProps) {
  const [cpm, setCpm] = useState(3);
  const [monetization, setMonetization] = useState(50);
  const [selectedNiche, setSelectedNiche] = useState<string>('Average');

  const views = parseInt(channel.statistics.viewCount);
  const channelAgeDays = Math.floor(
    (new Date().getTime() - new Date(channel.publishedAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const calculateCustomEarnings = () => {
    const avgDailyViews = views / channelAgeDays;
    const dailyMonetizedViews = avgDailyViews * (monetization / 100);
    const daily = (dailyMonetizedViews / 1000) * cpm;
    const monthly = daily * 30;
    const yearly = daily * 365;

    return {
      daily: Math.round(daily * 100) / 100,
      monthly: Math.round(monthly * 100) / 100,
      yearly: Math.round(yearly * 100) / 100,
    };
  };

  const earnings = calculateCustomEarnings();

  useEffect(() => {
    if (onEarningsChange) {
      onEarningsChange(earnings);
    }
  }, [cpm, monetization]);

  const handleNicheSelect = (niche: string) => {
    setSelectedNiche(niche);
    const preset = NICHE_PRESETS[niche as keyof typeof NICHE_PRESETS];
    setCpm(preset.cpm);
    setMonetization(preset.monetization);
  };

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Sliders className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Adjustable CPM Calculator</CardTitle>
            <CardDescription className="text-base mt-1">
              Customize earnings based on your niche
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div>
          <label className="text-sm font-semibold mb-3 block">Quick Niche Presets</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(NICHE_PRESETS).map((niche) => (
              <Button
                key={niche}
                variant={selectedNiche === niche ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleNicheSelect(niche)}
                className="text-xs"
              >
                {niche}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-primary" />
                CPM (Cost Per 1000 Views)
              </label>
              <Badge variant="secondary" className="text-base font-bold">
                ${cpm}
              </Badge>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="0.5"
              value={cpm}
              onChange={(e) => {
                setCpm(parseFloat(e.target.value));
                setSelectedNiche('Custom');
              }}
              className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$1</span>
              <span>$8</span>
              <span>$15</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                Monetization Rate
              </label>
              <Badge variant="secondary" className="text-base font-bold">
                {monetization}%
              </Badge>
            </div>
            <input
              type="range"
              min="30"
              max="70"
              step="5"
              value={monetization}
              onChange={(e) => {
                setMonetization(parseInt(e.target.value));
                setSelectedNiche('Custom');
              }}
              className="w-full h-2 bg-primary/20 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>30%</span>
              <span>50%</span>
              <span>70%</span>
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30">
          <CardContent className="p-6">
            <h4 className="text-sm font-semibold mb-4 text-center">
              Custom Earnings Estimate
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-background/80 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Daily</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(earnings.daily)}
                </p>
              </div>
              <div className="text-center p-3 bg-background/80 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Monthly</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(earnings.monthly)}
                </p>
              </div>
              <div className="text-center p-3 bg-background/80 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Yearly</p>
                <p className="text-xl font-bold text-primary">
                  {formatCurrency(earnings.yearly)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-xs text-muted-foreground text-center">
          <p>Adjust sliders or select a niche preset to see custom earnings</p>
        </div>
      </CardContent>
    </Card>
  );
}