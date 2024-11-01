import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useGetTasksQuery } from '../../api/taskApi';

const TaskSemiCircleChart: React.FC = () => {
    const { data: tasks, error, isLoading } = useGetTasksQuery();

    if (isLoading) return <CircularProgress />;
    if (error) return <Typography color="error">Failed to load tasks</Typography>;

    const statusCounts = tasks?.reduce(
        (acc, task) => {
            acc[task.status] = (acc[task.status] || 0) + 1;
            return acc;
        },
        { TODO: 0, DOING: 0, DONE: 0, WARNING: 0, PENDING: 0, FAILED: 0 }
    );

    const todayDate = new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    const chartData = [
        { name: 'TODO', y: statusCounts?.TODO || 0, color: '#3093cf' },
        { name: 'DOING', y: statusCounts?.DOING || 0, color: '#14537e' },
        { name: 'DONE', y: statusCounts?.DONE || 0, color: '#2ecc71' },
        { name: 'WARNING', y: statusCounts?.WARNING || 0, color: '#e74c3c' },
        { name: 'PENDING', y: statusCounts?.PENDING || 0, color: '#4093ca' },
        { name: 'FAILED', y: statusCounts?.FAILED || 0, color: '#9b59b6' },
    ];

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            plotBackgroundColor: undefined,
            plotBorderWidth: undefined,
            plotShadow: false,
            height: '50%',
        },
        title: {
            text: todayDate,
            align: 'center',
            verticalAlign: 'middle',
            y: 90,
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}',
                },
            },
        },
        series: [
            {
                type: 'pie',
                innerSize: '50%',
                data: chartData,
            },
        ],
    };

    return (
        <Box sx={{ maxWidth: 600, margin: 'auto' }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </Box>
    );
};

export default TaskSemiCircleChart;
