'use client';

import { useState } from 'react';
import SearchBar from '@/components/SearchBar';
import ChannelInfo from '@/components/ChannelInfo';
import EarningsDisplay from '@/components/EarningsDisplay';
import ChannelComparison from '@/components/ChannelComparison';
import DetailedAnalytics from '@/components/DetailedAnalytics';
import AdjustableCPM from '@/components/AdjustableCPM';
import PopularChannels from '@/components/PopularChannels';
import GrowthProjections from '@/components/GrowthProjections';
import { ThemeToggle } from '@/components/ThemeToggle';
import { calculateEarnings, EarningsData } from '@/app/utils/earnings';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, Calculator, Info, PlayCircle, GitCompare, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChannelData {
  channel: {
    id: string;
    title: string;
    description: string;
    customUrl?: string;
    thumbnail: string;
    statistics: {
      subscriberCount: string;
      viewCount: string;
      videoCount: string;
    };
    publishedAt: string;
  };
  recentVideos: any[];
}

interface ComparisonChannel {
  channel: ChannelData['channel'];
  earnings: EarningsData;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [channelData, setChannelData] = useState<ChannelData | null>(null);
  const [earnings, setEarnings] = useState<EarningsData | null>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [comparisonChannels, setComparisonChannels] = useState<ComparisonChannel[]>([]);

  const handleSearch = async (query: string, type: 'channel' | 'username' | 'handle') => {
    setLoading(true);
    setError(null);

    if (!comparisonMode) {
      setChannelData(null);
      setEarnings(null);
    }

    try {
      const cleanQuery = type === 'handle' ? query.replace('@', '') : query;
      const params = new URLSearchParams();

      if (type === 'channel') {
        params.append('channelId', cleanQuery);
      } else if (type === 'handle') {
        params.append('handle', cleanQuery);
      } else {
        params.append('username', cleanQuery);
      }

      const response = await fetch(`/api/youtube?${params.toString()}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch channel data');
      }

      const viewCount = parseInt(data.channel.statistics.viewCount);
      const calculatedEarnings = calculateEarnings(viewCount, data.channel.publishedAt);

      if (comparisonMode) {
        
        if (comparisonChannels.some(c => c.channel.id === data.channel.id)) {
          setError('Channel already added to comparison');
          return;
        }

        if (comparisonChannels.length >= 3) {
          setError('Maximum 3 channels can be compared');
          return;
        }

        setComparisonChannels([...comparisonChannels, {
          channel: data.channel,
          earnings: calculatedEarnings
        }]);
      } else {
        setChannelData(data);
        setEarnings(calculatedEarnings);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleComparisonMode = () => {
    setComparisonMode(!comparisonMode);
    setError(null);
    if (!comparisonMode) {
      
      setComparisonChannels([]);
      setChannelData(null);
      setEarnings(null);
    } else {
      
      setComparisonChannels([]);
    }
  };

  const handleAddToComparison = () => {
    if (channelData && earnings) {
      setComparisonMode(true);
      setComparisonChannels([{
        channel: channelData.channel,
        earnings: earnings
      }]);
      setChannelData(null);
      setEarnings(null);
    }
  };

  const handleRemoveChannel = (channelId: string) => {
    setComparisonChannels(comparisonChannels.filter(c => c.channel.id !== channelId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.5))] -z-10" />

      <div className="container mx-auto px-4 py-8 md:py-16">
        
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>

        <div className="text-center mb-12 md:mb-16 space-y-4">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-primary/10 rounded-2xl">
              <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent leading-tight">
            YouTube Income Calculator
          </h1>
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Discover potential earnings for any YouTube channel
          </p>
        </div>

        <div className="mb-8 md:mb-12 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex justify-center">
            <Card className="inline-flex p-1 bg-muted/50">
              <Button
                variant={!comparisonMode ? 'default' : 'ghost'}
                size="sm"
                onClick={handleToggleComparisonMode}
                className="gap-2"
              >
                <PlayCircle className="h-4 w-4" />
                Single Channel
              </Button>
              <Button
                variant={comparisonMode ? 'default' : 'ghost'}
                size="sm"
                onClick={handleToggleComparisonMode}
                className="gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare Channels
                {comparisonChannels.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {comparisonChannels.length}
                  </Badge>
                )}
              </Button>
            </Card>
          </div>

          <SearchBar onSearch={handleSearch} loading={loading} />

          {comparisonMode && (
            <div className="text-center">
              <Badge variant="outline" className="text-sm py-2 px-4">
                <Plus className="h-3 w-3 mr-2" />
                Comparison Mode: Add up to 3 channels ({comparisonChannels.length}/3)
              </Badge>
            </div>
          )}

          {!comparisonMode && channelData && earnings && (
            <div className="flex justify-center">
              <Button
                onClick={handleAddToComparison}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <GitCompare className="h-4 w-4" />
                Compare with other channels
              </Button>
            </div>
          )}
        </div>

        {error && (
          <Card className="max-w-2xl mx-auto mb-8 border-destructive/50 bg-destructive/5">
            <CardContent className="flex items-start gap-3 p-6">
              <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-destructive">Error</p>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {comparisonMode && comparisonChannels.length > 0 && (
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ChannelComparison
              channels={comparisonChannels}
              onRemoveChannel={handleRemoveChannel}
            />
          </div>
        )}

        {channelData && earnings && (
          <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <ChannelInfo channel={channelData.channel} />
            <EarningsDisplay earnings={earnings} />
            <DetailedAnalytics channel={channelData.channel} recentVideos={channelData.recentVideos} />
            <AdjustableCPM channel={channelData.channel} />
            <GrowthProjections currentEarnings={{ monthly: earnings.monthly, yearly: earnings.yearly }} />

            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">How We Calculate</CardTitle>
                    <CardDescription className="text-base mt-1">
                      Understanding our estimation methodology
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                        CPM (Cost Per Mille)
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We use an average CPM of $3, meaning $3 earned per 1,000 monetized views.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                        Monetization Rate
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We estimate 50% of views are monetized, as not all viewers see ads.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/50">
                    <CardContent className="p-4">
                      <p className="font-semibold text-sm uppercase tracking-wide text-primary mb-2">
                        Average Daily Views
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Calculated by dividing total views by days since channel creation.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card className="bg-amber-50/50 border-amber-200/50">
                  <CardContent className="flex gap-3 p-4">
                    <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-1">Important Disclaimer</p>
                      <p className="text-amber-800">
                        These are rough estimates. Actual earnings vary widely based on content type,
                        audience demographics, engagement rates, sponsorships, and other revenue streams.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}

        {!channelData && !loading && (
          <div className="max-w-4xl mx-auto mt-16 md:mt-24 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <PopularChannels onChannelSelect={handleSearch} loading={loading} />

            <Card className="border-2 shadow-xl">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Info className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-3xl">How to Use This Calculator</CardTitle>
                <CardDescription className="text-base mt-2">
                  Get earnings estimates in three simple steps
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        1
                      </div>
                      <h3 className="font-semibold mb-2">Enter Channel Info</h3>
                      <p className="text-sm text-muted-foreground">
                        Type a channel name, @handle, or channel ID
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        2
                      </div>
                      <h3 className="font-semibold mb-2">Click Calculate</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll fetch the channel's statistics
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto mb-4">
                        3
                      </div>
                      <h3 className="font-semibold mb-2">View Results</h3>
                      <p className="text-sm text-muted-foreground">
                        See daily, monthly, and yearly earnings
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}