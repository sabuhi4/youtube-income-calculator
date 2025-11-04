export interface EarningsData {
  daily: number;
  monthly: number;
  yearly: number;
}

const CPM = 3; // $3 per 1000 views
const MONETIZATION_RATE = 0.5; // 50% of views are monetized

export function calculateEarnings(viewCount: number, publishedAt: string): EarningsData {
  const channelAge = calculateChannelAgeDays(publishedAt);

  if (channelAge === 0) {
    return { daily: 0, monthly: 0, yearly: 0 };
  }

  // Calculate average daily views
  const avgDailyViews = viewCount / channelAge;

  // Calculate earnings per day
  const dailyMonetizedViews = avgDailyViews * MONETIZATION_RATE;
  const daily = (dailyMonetizedViews / 1000) * CPM;

  // Calculate monthly and yearly
  const monthly = daily * 30;
  const yearly = daily * 365;

  return {
    daily: Math.round(daily * 100) / 100,
    monthly: Math.round(monthly * 100) / 100,
    yearly: Math.round(yearly * 100) / 100,
  };
}

export function calculateChannelAgeDays(publishedAt: string): number {
  const publishDate = new Date(publishedAt);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - publishDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

export function formatNumber(num: number): string {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toString();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}