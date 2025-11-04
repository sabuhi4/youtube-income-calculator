'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string, type: 'channel' | 'username' | 'handle') => void;
  loading: boolean;
}

export default function SearchBar({ onSearch, loading }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    let searchType: 'channel' | 'username' | 'handle' = 'username';

    if (query.startsWith('@')) {
      searchType = 'handle';
    } else if (query.startsWith('UC') && query.length === 24) {
      searchType = 'channel';
    }

    onSearch(query, searchType);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter YouTube channel name, @handle, or channel ID"
            className="pl-11 h-14 text-lg"
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          disabled={loading || !query.trim()}
          size="lg"
          className="h-14 px-8 text-lg font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Searching...
            </>
          ) : (
            'Calculate'
          )}
        </Button>
      </div>
      <p className="text-sm text-muted-foreground mt-3 text-center">
        Try: <span className="font-medium text-foreground">@MrBeast</span>, <span className="font-medium text-foreground">PewDiePie</span>, or any channel ID
      </p>
    </form>
  );
}