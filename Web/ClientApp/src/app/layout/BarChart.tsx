import React from 'react';
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

export const RenderBarChart = ({ ChartData }: any) => {
    return (
        < BarChart width={730} height={400} data={ChartData.data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={ChartData.xKey} />
            <YAxis dataKey={ChartData.yKey} />
            <Legend verticalAlign="top" height={36} />
            <Tooltip formatter={(value: any) =>
                new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
            <Legend />
            <Bar dataKey={ChartData.yKey} name={ChartData.name} fill="#8884d8" />
        </BarChart >
    );
}




