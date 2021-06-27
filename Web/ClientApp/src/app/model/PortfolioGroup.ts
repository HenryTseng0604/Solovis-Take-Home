import { Investment } from "./Investment";

export interface PortfolioGroup {
    id: number,
    parentId: number,
    label: string,
    totalValue: number,
    investments: Investment[],
    childGroups: PortfolioGroup[]
}