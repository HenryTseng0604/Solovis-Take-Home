import React from "react";
import NumberFormat from "react-number-format";
import { List } from "semantic-ui-react";

export const PortfolioGroupList = ({ GroupProps }: any) => {
    const hasChildren = GroupProps.childGroups && GroupProps.childGroups.length > 0

    return (
        <List>
            <List.Item key={GroupProps.id}>
                <List.Icon name='tags' />
                <List.Content>
                    {GroupProps.label} : <NumberFormat value={GroupProps.totalValue} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} />
                </List.Content>
                <List.List key={GroupProps.label}>
                    {GroupProps.investments.map((investment: any) => (
                        <List.Item key={investment.id}>
                            <List.Icon name='tag' />
                            <List.Content>
                                {investment.label} : <NumberFormat value={investment.currentValue} displayType={'text'} thousandSeparator={true} decimalScale={2} prefix={'$'} />
                            </List.Content>
                        </List.Item>
                    ))}
                </List.List>
                {hasChildren && GroupProps.childGroups.map((group: any) => (
                    <PortfolioGroupList key={group.id} GroupProps={group} />
                ))}
            </List.Item>
        </List>
    )
}
