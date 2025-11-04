'use client';

import { formatNumber } from '@/app/utils/earnings';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Eye, Video, ExternalLink } from 'lucide-react';

interface ChannelInfoProps {
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
}

export default function ChannelInfo({ channel }: ChannelInfoProps) {
  const subscriberCount = parseInt(channel.statistics.subscriberCount);
  const viewCount = parseInt(channel.statistics.viewCount);
  const videoCount = parseInt(channel.statistics.videoCount);

  return (
    <Card className="overflow-hidden border-2 shadow-lg">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <div className="relative">
              <Image
                src={channel.thumbnail}
                alt={channel.title}
                width={140}
                height={140}
                className="rounded-full border-4 border-primary/20 shadow-xl"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {channel.title}
            </h2>
            {channel.customUrl && (
              <a
                href={`https://youtube.com/${channel.customUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 group"
              >
                <span className="text-sm font-medium">youtube.com/{channel.customUrl}</span>
                <ExternalLink className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {formatNumber(subscriberCount)}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Subscribers
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Eye className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {formatNumber(viewCount)}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Total Views
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardContent className="p-4 text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Video className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-foreground mb-1">
                    {formatNumber(videoCount)}
                  </p>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Videos
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}