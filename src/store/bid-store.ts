import { create } from 'zustand'


export const bidStore = create((set) => ({
    bids: [],
    setBid: (newBid: any) => {
        console.log(newBid)
    }
}))