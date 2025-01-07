"use server"
import { patchCommData } from "@/db/queries/metrics/patch";
import { BidProfileText } from "@/types/bid-profile-text";
const categories = BidProfileText.Commercials

/**
 * 
 * @param commData 
 * @param selectedValues 
 * @param bidInput 
 * @param commId 
 * @param bidInputId 
 * @param bidId 
 * @returns 
 */
export async function patchComms(
    commData: {
        budget: number;
        duration: number;
        bidDirectorCapture: number;
        bidDirectorEoi: number;
        bidDirectorTender: number;
        bidManagerCapture: number;
        bidManagerEoi: number;
        bidManagerTender: number;
        technicalLeadCapture: number;
        technicalLeadEoi: number;
        technicalLeadTender: number;
        recLeadCapture: number;
        recLeadEoi: number;
        recLeadTender: number;
        proposalWriteCapture: number;
        proposalWriteEoi: number;
        proposalWriteTender: number;
        analystCapture: number;
        analystEoi: number;
        analystTender: number;
        reviewerCapture: number;
        reviewerEoi: number;
        reviewerTender: number;
        copyWriterCapture: number;
        copyWriterEoi: number;
        copyWriterTender: number;
        recruiterAdminCapture: number;
        recruiterAdminEoi: number;
        recruiterAdminTender: number;
        commLeadCapture: number;
        commLeadEoi: number;
        commLeadTender: number;
        pmCapture: number;
        pmEoi: number;
        pmTender: number;
        graphicDesCapture: number;
        graphicDesEoi: number;
        graphicDesTender: number;
        translatorCapture: number;
        translatorEoi: number;
        translatorTender: number;
    },
    selectedValues: {
        expertLoe: number;
        historicalNetMargin: number;
        futureRevenue: number;
    },
    bidInput: number,
    commId: number,
    bidInputId: number,
    bidId: number,

): Promise<undefined | boolean> {
    // format the data.
    const { budget, duration, ...bdInputData } = commData;
    const bidData = {
        budget,
        duration
    }

    const getContractValue = () => {
        // logic for determining the score for the contract value.
        if (budget < 500000 && budget > 0) {
            return 1
        } else if (budget < 1500000 && budget > 500000) {
            return 2
        } else if (budget < 5000000 && budget > 1500000) {
            return 3
        } else if (budget < 10000000 && budget > 5000000) {
            return 4
        } else if (budget > 10000000) {
            return 5
        } else {
            return 0
        }
    }

    const getProjectDuration = () => {
        // logic for determining the score for the contract value.

        if (duration < 6 && duration > 0) {
            return 1
        } else if (duration < 12 && duration > 6) {
            return 2
        } else if (duration < 24 && duration > 12) {
            return 3
        } else if (duration < 48 && duration > 24) {
            return 4
        } else if (duration > 48) {
            return 5
        } else {
            return 0
        }
    }

    const getBdInput = () => {
        // logic for determining the score for the contract value.
        if (bidInput < 35 && bidInput > 0) {
            return 1
        } else if (bidInput < 55 && bidInput > 35) {
            return 2
        } else if (bidInput < 100 && bidInput > 55) {
            return 3
        } else if (bidInput < 150 && bidInput > 100) {
            return 4
        } else if (bidInput > 150) {
            return 5
        } else {
            return 0
        }
    }

    const reformattedCommData = {
        contractValue: getContractValue(),
        projectDuration: getProjectDuration(),
        bdInput: getBdInput(),
        ...selectedValues
    }

    // logic for the actual score.
    const getScore = () => {
        const scores = Object.keys(reformattedCommData).map((key, index) => {
            const category = categories[index];
            const level = category.levels.find((lvl) => lvl.value === reformattedCommData[key as keyof typeof reformattedCommData]);
            return level ? level.value * category.weight : 0;
        });
        const overallScore = scores.reduce((acc, score) => acc + score, 0);
        return overallScore;
    }


    // pass it to the actual transaction function in the backend

    const result = await patchCommData(
        {
            data: bdInputData,
            id: bidInputId,
        },

        {
            data: reformattedCommData,
            id: commId,
        },
        {
            data: bidData,
            id: bidId,
        },

        {
            score: getScore(),
            id: bidId,
        }

    )

    return result;
}