import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Container, Header } from 'semantic-ui-react';
import agent from '../app/api/agent';
import { RenderBarChart } from '../app/layout/BarChart';
import { PortfolioGroupList } from '../app/layout/PortfolioGroupList';
import { Portfolio } from '../app/model/Portfolio';
import { PortfolioGroup } from '../app/model/PortfolioGroup';

const Home = () => {
    const [portfolioGroups, setPortfolioGroups] = useState<PortfolioGroup[]>([]);
    const [chartData, setChartData] = useState<any>([]);

    useEffect(() => {
        agent.Portfolio.result().then(response => {
            setPortfolioGroups(response.portfolioGroups);
            let output: any[] = [];
            response.portfolioGroups.map((group: any) => {
                output.push({ Group: group.label, Value: group.totalValue / 1000 });
            });
            setChartData({
                name: "Total Value($ in thousands)",
                xKey: "Group",
                yKey: "Value",
                data: output
            });
        })
    }, [])

    return (
        <Container style={{ marginTop: '4em' }}>
            <Header as='h2' icon='chart bar' content='Portfolio' />
            <RenderBarChart ChartData={chartData} />
            {portfolioGroups.map((group) => (
                <PortfolioGroupList key={group.id} GroupProps={group} />
            ))}
        </Container>
    );
}

export default Home;
