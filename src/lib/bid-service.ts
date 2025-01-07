/* eslint-disable @typescript-eslint/no-explicit-any */
import { InsertBid } from "@/db/schema/bids";

export function reformatBid(data: any): InsertBid | undefined {
	const client = Number(data.client);

	// convert the deadline to a date
	try {
		const deadline = new Date(data.deadline);

		if (!client) {
			console.error('client is not a number');
			return undefined;
		}

		const phase = () => {
			if (data.phase === 'Expression of Interest') {
				return "eoi";
			} else if (data.phase === 'Capture') {
				return "capture";
			} else {
				return "tender";
			}
		}

		const reformattedData = {
			...data,

			client: client,
			deadline: deadline,
			phase: phase(),
		}
		return reformattedData;
	} catch (error: any) {
		console.error('Deadline is not a date', error);
		return undefined;
	}
}
