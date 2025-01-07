export function formatRevenue(budget: number): string {
    if (budget >= 1000000) {
        const formattedbudget = budget / 1000000;
        return `${Math.ceil(formattedbudget)}M`
    } else if (budget >= 1000) {
        const formattedbudget = budget / 1000;
        return `${Math.ceil(formattedbudget)}K`
    } else {
        return `${budget}`
    }

}