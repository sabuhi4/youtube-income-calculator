'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Calendar, BarChart3, Heart, ThumbsUp, Eye } from 'lucide-react';
import { formatNumber } from '@/app/utils/earnings';

interface DetailedAnalyticsProps {
  channel: {
    statistics: {
      subscriberCount: string;
      viewCount: string;
      videoCount: string;
    };
    publishedAt: string;
  };
  recentVideos: any[];
}

export default function DetailedAnalytics({ channel, recentVideos }: DetailedAnalyticsProps) {
  const subscribers = parseInt(channel.statistics.subscriberCount);
  const views = parseInt(channel.statistics.viewCount);
  const videos = parseInt(channel.statistics.videoCount);

  const publishDate = new Date(channel.publishedAt);
  const today = new Date();
  const ageInDays = Math.floor((today.getTime() - publishDate.getTime()) / (1000 * 60 * 60 * 24));
  const ageInYears = (ageInDays / 365).toFixed(1);
  const ageInMonths = Math.floor(ageInDays / 30);

  const avgViewsPerVideo = Math.round(views / videos);

  const videosPerMonth = (videos / ageInMonths).toFixed(1);
  const videosPerYear = Math.round(videos / parseFloat(ageInYears));

  let totalEngagement = 0;
  let totalRecentViews = 0;

  if (recentVideos && recentVideos.length > 0) {
    recentVideos.forEach(video => {
      const videoViews = parseInt(video.viewCount || 0);
      const likes = parseInt(video.likeCount || 0);
      totalRecentViews += videoViews;
      if (videoViews > 0) {
        totalEngagement += (likes / videoViews) * 100;
      }
    });
  }

  const avgEngagementRate = recentVideos.length > 0
    ? (totalEngagement / recentVideos.length).toFixed(2)
    : '0.00';

  const subsToViewRatio = (subscribers / views * 100).toFixed(2);

  const avgViewsPerDay = Math.round(views / ageInDays);
  const subsPerVideo = Math.round(subscribers / videos);

  return (
    <Card className="border-2">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <BarChart3 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <CardTitle className="text-2xl">Detailed Analytics</CardTitle>
            <CardDescription className="text-base mt-1">
              In-depth performance metrics
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <Eye className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-900">Avg Views/Video</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-900 mb-1">
                {formatNumber(avgViewsPerVideo)}
              </p>
              <p className="text-xs text-blue-700">
                Total: {formatNumber(views)} views
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Calendar className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-purple-900">Upload Frequency</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-purple-900 mb-1">
                {videosPerMonth}
              </p>
              <p className="text-xs text-purple-700">
                videos per month ({videosPerYear}/year)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100/50 border-pink-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-pink-500/10 rounded-lg">
                    <ThumbsUp className="h-4 w-4 text-pink-600" />
                  </div>
                  <span className="text-sm font-medium text-pink-900">Engagement Rate</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {recentVideos.length} videos
                </Badge>
              </div>
              <p className="text-2xl font-bold text-pink-900 mb-1">
                {avgEngagementRate}%
              </p>
              <p className="text-xs text-pink-700">
                Likes per view (recent)
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <Calendar className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-sm font-medium text-green-900">Channel Age</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-green-900 mb-1">
                {ageInYears} years
              </p>
              <p className="text-xs text-green-700">
                {formatNumber(ageInDays)} days active
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-orange-500/10 rounded-lg">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-orange-900">Avg Daily Views</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-orange-900 mb-1">
                {formatNumber(avgViewsPerDay)}
              </p>
              <p className="text-xs text-orange-700">
                views per day
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 border-cyan-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-cyan-500/10 rounded-lg">
                    <Heart className="h-4 w-4 text-cyan-600" />
                  </div>
                  <span className="text-sm font-medium text-cyan-900">Subs per Video</span>
                </div>
              </div>
              <p className="text-2xl font-bold text-cyan-900 mb-1">
                {formatNumber(subsPerVideo)}
              </p>
              <p className="text-xs text-cyan-700">
                {subsToViewRatio}% subs/views ratio
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-4">
            <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Performance Insights
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="font-medium">Upload Consistency:</span>{' '}
                <Badge variant="outline" className="ml-1">
                  {parseFloat(videosPerMonth) > 4 ? 'Very Active' :
                   parseFloat(videosPerMonth) > 2 ? 'Active' :
                   parseFloat(videosPerMonth) > 1 ? 'Moderate' : 'Low'}
                </Badge>
              </div>
              <div>
                <span className="font-medium">Engagement Level:</span>{' '}
                <Badge variant="outline" className="ml-1">
                  {parseFloat(avgEngagementRate) > 5 ? 'Excellent' :
                   parseFloat(avgEngagementRate) > 3 ? 'Good' :
                   parseFloat(avgEngagementRate) > 1 ? 'Average' : 'Low'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}