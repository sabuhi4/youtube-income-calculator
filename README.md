# YouTube Income Calculator

A full-stack web application that estimates YouTube channel earnings using real-time data from the YouTube Data API v3.

## Features

- Search by channel name, @handle, or channel ID
- Display comprehensive channel statistics
- Calculate estimated daily, monthly, and yearly earnings
- Compare up to 3 channels side-by-side
- Detailed analytics (avg views, upload frequency, engagement rate, etc.)
- Adjustable CPM calculator with niche presets
- 12-month growth projections with interactive charts
- Quick access to popular channels
- Dark mode support
- Fully responsive design

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Recharts
- YouTube Data API v3

## Getting Started

### Prerequisites

- Node.js 18+ installed
- YouTube Data API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your YouTube API key:
   ```
   YOUTUBE_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## How It Works

The calculator uses the following formula:

- **CPM**: $3 (average cost per 1000 views)
- **Monetization Rate**: 50% of views are monetized
- **Daily Views**: Total views ÷ channel age in days
- **Daily Earnings**: (Daily Views × 0.5 ÷ 1000) × $3

## Build Locally

```bash
npm run build
npm start
```

## Disclaimer

These are rough estimates based on industry averages. Actual YouTube earnings vary based on content type, audience demographics, engagement rates, sponsorships, and other revenue streams.

## License

MIT
