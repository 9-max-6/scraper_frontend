import { create } from 'zustand';
import {
  BidType,
} from '@/types/types';

/**
 * Bid Store
 * Handles the list of bids and allows initialization and adding new bids.
 */
export const bidStore = create<{
  bids: BidType[];
  bidsInit: (bidsServed: BidType[]) => void;
  setBid: (newBid: BidType) => void;
  getBids: () => BidType[];
}>((set, get) => ({
  bids: [],
  bidsInit: (bidsServed = []) =>
    set((state) => ({
      bids: bidsServed.length === 0 ? state.bids : [...bidsServed],
    })),
  setBid: (newBid) =>
    set((state) => ({
      bids: [...state.bids, newBid],
    })),
  getBids: () => get().bids,
}));
