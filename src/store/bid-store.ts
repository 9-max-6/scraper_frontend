
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

