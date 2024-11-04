import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import "./PieChart.css";

interface PieChartProps {
    data: any;
}

function PieChart({ data }: PieChartProps) {
    const statusCount: { [key: string]: number } = {};

    // Process the data to count occurrences of each status
    data.forEach((item: any) => {
        if (statusCount[item.status]) {
            statusCount[item.status]++;
        } else {
            statusCount[item.status] = 1;
        }
    });

    // Convert the counted data into an array for Highcharts
    const chartData = Object.keys(statusCount).map(status => ({
        name: status,
        y: statusCount[status],
    }));

    const options = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Incident Distribution',
        },
        series: [
            {
                name: 'Incidents',
                colorByPoint: true,
                data: chartData,
            },
        ],
        tooltip: {
            pointFormat: '<b>{point.name}: {point.y}</b>',
        },
    };

    // console.log(data);

    if (data.length == 0) {
        return (
            <h1>No Data Found</h1>
        )
    }

    return (
        <div className='row'>
            <div className='col-md-12'>

                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    );
}

export default PieChart;