'use client';

import { formatNumber, formatCurrency } from '@/app/utils/earnings';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Video, TrendingUp, X } from 'lucide-react';

interface ChannelData {
  channel: {
    id: string;
    title: string;
    thumbnail: string;
    customUrl?: string;
    statistics: {
      subscriberCount: string;
      viewCount: string;
      videoCount: string;
    };
  };
  earnings: {
    daily: number;
    monthly: number;
    yearly: number;
  };
}

interface ChannelComparisonProps {
  channels: ChannelData[];
  onRemoveChannel: (channelId: string) => void;
}

export default function ChannelComparison({ channels, onRemoveChannel }: ChannelComparisonProps) {
  if (channels.length === 0) return null;

  const getMaxValue = (key: keyof ChannelData['channel']['statistics']) => {
    return Math.max(...channels.map(c => parseInt(c.channel.statistics[key])));
  };

  const getMaxEarnings = (period: keyof ChannelData['earnings']) => {
    return Math.max(...channels.map(c => c.earnings[period]));
  };

  const getPercentage = (value: number, max: number) => {
    return max > 0 ? (value / max) * 100 : 0;
  };

  return (
    <div className="space-y-8">
      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Channel Comparison</CardTitle>
            </div>
            <Badge variant="secondary" className="text-sm">
              {channels.length} {channels.length === 1 ? 'Channel' : 'Channels'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {channels.map((channelData) => {
              const subs = parseInt(channelData.channel.statistics.subscriberCount);
              const views = parseInt(channelData.channel.statistics.viewCount);
              const videos = parseInt(channelData.channel.statistics.videoCount);

              return (
                <Card key={channelData.channel.id} className="relative overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-background/80 hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => onRemoveChannel(channelData.channel.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <Image
                        src={channelData.channel.thumbnail}
                        alt={channelData.channel.title}
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-primary/20 mb-4"
                      />
                      <h3 className="font-bold text-lg mb-1 line-clamp-2">
                        {channelData.channel.title}
                      </h3>
                      {channelData.channel.customUrl && (
                        <p className="text-xs text-muted-foreground">
                          {channelData.channel.customUrl}
                        </p>
                      )}
                    </div>

                    <div className="space-y-4">
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Subscribers</span>
                          </div>
                          <span className="text-sm font-bold">{formatNumber(subs)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
                            style={{ width: `${getPercentage(subs, getMaxValue('subscriberCount'))}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Total Views</span>
                          </div>
                          <span className="text-sm font-bold">{formatNumber(views)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-500"
                            style={{ width: `${getPercentage(views, getMaxValue('viewCount'))}%` }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Video className="h-4 w-4 text-primary" />
                            <span className="text-sm font-medium">Videos</span>
                          </div>
                          <span className="text-sm font-bold">{formatNumber(videos)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                            style={{ width: `${getPercentage(videos, getMaxValue('videoCount'))}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">Avg per video</span>
                          <span className="text-xs font-semibold">
                            {formatNumber(Math.round(views / videos))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="border-2">
        <CardHeader>
          <CardTitle className="text-2xl">Earnings Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Earnings
              </h3>
              <div className="space-y-4">
                {channels.map((channelData, index) => {
                  const percentage = getPercentage(
                    channelData.earnings.monthly,
                    getMaxEarnings('monthly')
                  );
                  const isTop = channelData.earnings.monthly === getMaxEarnings('monthly');

                  return (
                    <div key={channelData.channel.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Image
                            src={channelData.channel.thumbnail}
                            alt={channelData.channel.title}
                            width={40}
                            height={40}
                            className="rounded-full flex-shrink-0"
                          />
                          <span className="font-medium truncate">
                            {channelData.channel.title}
                          </span>
                          {isTop && (
                            <Badge className="flex-shrink-0">Highest</Badge>
                          )}
                        </div>
                        <span className="text-lg font-bold flex-shrink-0 ml-4">
                          {formatCurrency(channelData.earnings.monthly)}
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isTop
                              ? 'bg-gradient-to-r from-primary to-primary/60'
                              : 'bg-gradient-to-r from-primary/60 to-primary/40'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Yearly Earnings
              </h3>
              <div className="space-y-4">
                {channels.map((channelData) => {
                  const percentage = getPercentage(
                    channelData.earnings.yearly,
                    getMaxEarnings('yearly')
                  );
                  const isTop = channelData.earnings.yearly === getMaxEarnings('yearly');

                  return (
                    <div key={channelData.channel.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <Image
                            src={channelData.channel.thumbnail}
                            alt={channelData.channel.title}
                            width={40}
                            height={40}
                            className="rounded-full flex-shrink-0"
                          />
                          <span className="font-medium truncate">
                            {channelData.channel.title}
                          </span>
                          {isTop && (
                            <Badge className="flex-shrink-0">Highest</Badge>
                          )}
                        </div>
                        <span className="text-lg font-bold flex-shrink-0 ml-4">
                          {formatCurrency(channelData.earnings.yearly)}
                        </span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${
                            isTop
                              ? 'bg-gradient-to-r from-green-600 to-green-500'
                              : 'bg-gradient-to-r from-green-500 to-green-400'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}