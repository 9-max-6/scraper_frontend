'use client';
import React, { useEffect, useState } from 'react';
import Fuse from 'fuse.js'; // Import Fuse.js for fuzzy search
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { aggregatedBidsStore } from '@/store/bid-store';
import { AggregatedBid, AggregatedBidArrayType } from '@/types/types';
import { useRouter } from 'next/navigation'; // Import the router for navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function SearchBarDeprecated() {
  const getAggregatedBids = aggregatedBidsStore((state) => state.getAggregatedBids);
  const aggregatedBids = aggregatedBidsStore((state) => state.aggregatedBids);
  const router = useRouter(); // Initialize the router for navigation

  const [query, setQuery] = useState('');
  const [items, setItems] = useState<AggregatedBidArrayType>(() => {
    return getAggregatedBids();
  });
  const [results, setResults] = useState<AggregatedBid[]>([]);

  // Fuse.js options for fuzzy search
  const fuseOptions = {
    keys: ['title', 'des'], // Fields to search within
    threshold: 0.3, // Adjust sensitivity: lower = stricter matches
  };

  // Initialize Fuse.js with the items list
  const fuse = new Fuse(items, fuseOptions);

  // Update items whenever aggregatedBids change
  useEffect(() => {
    setItems(aggregatedBids);
  }, [aggregatedBids]);

  // Handle search input change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === '') {
      setResults([]);
    } else {
      // Perform fuzzy search using Fuse.js
      const searchResults = fuse.search(value).map((result) => result.item);
      setResults(searchResults);
    }
  };

  // Handle result click to navigate to the specific opportunity
  const handleResultClick = (id: number) => {
    router.push(`/bids/${id}`); // Navigate to the opportunity details page
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <Input
          placeholder="Search by title or description of bid"
        />
      </DialogTrigger>
      <DialogContent className="max-w-[1024px]  h-[600px] ml-12">
        {/* Show results */}
        <Card className='shadow-none border-none'>
          <CardHeader>
            <CardTitle>
              Seeker
            </CardTitle>
            <CardDescription>
              Search for opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className='overflow-scroll scrollbar-hide'>
            <Input
              placeholder="Search by title or description of bid"
              value={query}
              onChange={handleSearch}
            />
            <div className='mt-4 overflow-scroll scrollbar-hide max-h-[400px]'>
              {results.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {results.map((result) => (
                    <Card
                      key={result.id}
                      onClick={() => handleResultClick(result.id)}
                      className="rounded hover:bg-muted cursor-pointer"
                    >
                      <CardHeader>
                        <CardTitle>{result.title}</CardTitle>
                        <CardDescription>{result.des}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                // Show a "No results" message if the query is non-empty and no results are found
                query && <Card className="shadow-none border-none text-gray-500 text-sm">
                  <CardDescription>
                    No results found.
                  </CardDescription>
                </Card>
              )}
            </div>
          </CardContent>

        </Card>


      </DialogContent>
    </Dialog>
  );
}
