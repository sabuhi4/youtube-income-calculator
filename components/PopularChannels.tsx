'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap } from 'lucide-react';

interface PopularChannelsProps {
  onChannelSelect: (query: string, type: 'username' | 'handle') => void;
  loading: boolean;
}

const POPULAR_CHANNELS = [
  { name: 'MrBeast', handle: '@MrBeast', category: 'Entertainment', color: 'bg-red-500' },
  { name: 'PewDiePie', handle: '@pewdiepie', category: 'Gaming', color: 'bg-blue-500' },
  { name: 'Markiplier', handle: '@markiplier', category: 'Gaming', color: 'bg-purple-500' },
  { name: 'MKBHD', handle: '@mkbhd', category: 'Tech', color: 'bg-gray-700' },
  { name: 'Kurzgesagt', handle: '@kurzgesagt', category: 'Education', color: 'bg-cyan-500' },
  { name: 'Veritasium', handle: '@veritasium', category: 'Education', color: 'bg-green-500' },
  { name: 'Dude Perfect', handle: '@DudePerfect', category: 'Sports', color: 'bg-orange-500' },
  { name: 'Linus Tech Tips', handle: '@LinusTechTips', category: 'Tech', color: 'bg-yellow-600' },
];

export default function PopularChannels({ onChannelSelect, loading }: PopularChannelsProps) {
  return (
    <Card className="border-2 shadow-xl">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Popular Channels</CardTitle>
            <CardDescription className="text-base mt-1">
              Quick access to top YouTubers
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {POPULAR_CHANNELS.map((channel) => (
            <Button
              key={channel.handle}
              variant="outline"
              className="h-auto flex-col items-start p-4 hover:border-primary hover:bg-primary/5 transition-all group"
              onClick={() => onChannelSelect(channel.handle, 'handle')}
              disabled={loading}
            >
              <div className="flex items-center gap-2 w-full mb-2">
                <div className={`w-2 h-2 rounded-full ${channel.color}`} />
                <span className="font-semibold text-sm truncate text-foreground group-hover:text-primary">{channel.name}</span>
              </div>
              <Badge variant="secondary" className="text-xs">
                {channel.category}
              </Badge>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}