export function formatRevenue(budget: number): string {
    if (budget >= 1000000) {
        const formattedbudget = budget / 1000000;
        return `${formattedbudget}M`
    } else if (budget >= 1000) {
        const formattedbudget = budget / 1000;
        return `${formattedbudget}K`
    } else {
        return `${budget}`
    }

}