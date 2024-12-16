import axios from "axios";
import { AggregatedBidArrayType } from "@/types/types";
/**
 * Bid Store
 * Handles the list of bids and allows initialization and adding new bids.
 */
import { create } from "zustand";

/**
 * Bid Store
 * Tracks the count of bids and allows incrementing the count on submissions.
 */
export const bidStore = create<{
  bidCount: number;
  incrementBid: () => void;
  getBidCount: () => number;
}>((set, get) => ({
  bidCount: 0, // Initialize the count to 0
  incrementBid: () => set((state) => ({ bidCount: state.bidCount + 1 })), // Increment count
  getBidCount: () => get().bidCount, // Retrieve the current count
}));



export const aggregatedBidsStore = create<{
  aggregatedBids: AggregatedBidArrayType;
  getAggregatedBids: () => AggregatedBidArrayType;
  aggregatedBidsInit: () => Promise<void>;
}>((set, get) => ({
  // Initial state
  aggregatedBids: [],

  // Getter to return the current state of aggregatedBids
  getAggregatedBids: () => get().aggregatedBids,

  // Function to initialize and fetch aggregated bids from the API
  aggregatedBidsInit: async () => {
    try {
      const response = await axios.get('/api/search');
      set({ aggregatedBids: response.data.data }); // Set the fetched bids to the store
    } catch (error) {
      console.error('Error fetching aggregated bids:', error);
    }
  },
}));
