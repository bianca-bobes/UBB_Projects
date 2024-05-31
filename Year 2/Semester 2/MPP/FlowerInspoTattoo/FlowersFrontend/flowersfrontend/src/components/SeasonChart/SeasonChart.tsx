import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { Flower } from '../../../../../Flowers Backend/Flowers Backend/model/Flower';


const PieChart = ({ flowers }: { flowers: Flower[] }) => {
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstanceRef = useRef<Chart<"pie", number[], string> | null>(null);

    useEffect(() => {
        renderChart();

        return () => {
            destroyChart();
        };
    }, [flowers]);

    const renderChart = () => {
        const seasonDistribution: { [key: string]: number } = {};
        flowers.forEach(flower => {
            seasonDistribution[flower.season] = (seasonDistribution[flower.season] || 0) + 1;
        });

        const labels = Object.keys(seasonDistribution);
        const data = Object.values(seasonDistribution);

        const backgroundColors = generateColors(labels.length);

        const chartData = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: backgroundColors,
                hoverBackgroundColor: backgroundColors
            }]
        };

        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d');
            if (ctx) {
                chartInstanceRef.current = new Chart(ctx, {
                    type: 'pie',
                    data: chartData,
                });
            }
        }
    };

    const destroyChart = () => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }
    };

    const generateColors = (numColors: number): string[] => {
        const colors: string[] = [];
        for (let i = 0; i < numColors; i++) {
            colors.push(getRandomColor());
        }
        return colors;
    };

    const getRandomColor = (): string => {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    };

    return (
        <div>
            <h2>Season Distribution</h2>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PieChart;
