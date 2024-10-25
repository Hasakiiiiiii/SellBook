
import React from "react";
import ReactApexChart from "react-apexcharts";

class ApexChartTop extends React.Component {

    constructor(props) {
        super(props);

        // Dữ liệu bán chạy của 3 cuốn sách (thay bằng dữ liệu thực của bạn nếu có)
        const book1 = [
            [new Date('06/10/2024').getTime(), 100], // ngày 1, bán 120 quyển
            [new Date('07/10/2024').getTime(), 350], // ngày 2, bán 150 quyển
            [new Date('08/10/2024').getTime(), 160], // ngày 3, bán 170 quyển
            [new Date('09/10/2024').getTime(), 170], // ngày 3, bán 170 quyển
            [new Date('10/10/2024').getTime(), 210], // ngày 3, bán 170 quyển
            [new Date('11/10/2024').getTime(), 370], // ngày 3, bán 170 quyển
        ];

        const book2 = [
            [new Date('06/10/2024').getTime(), 80], 
            [new Date('07/10/2024').getTime(), 90], 
            [new Date('08/10/2024').getTime(), 10], 
            [new Date('09/10/2024').getTime(), 270], // ngày 3, bán 170 quyển
            [new Date('10/10/2024').getTime(), 200], // ngày 3, bán 170 quyển
            [new Date('11/10/2024').getTime(), 60], // ngày 3, bán 170 quyển
        ];

        const book3 = [
            [new Date('06/10/2024').getTime(), 60], 
            [new Date('07/10/2024').getTime(), 70], 
            [new Date('08/10/2024').getTime(), 85], 
            [new Date('09/10/2024').getTime(), 20], // ngày 3, bán 170 quyển
            [new Date('10/10/2024').getTime(), 70], // ngày 3, bán 170 quyển
            [new Date('11/10/2024').getTime(), 120], // ngày 3, bán 170 quyển
        ];

        this.state = {
            series: [
                {
                    name: 'Top 1',
                    data: book1 // Dữ liệu cho sách 1
                },
                {
                    name: 'Top 2',
                    data: book2 // Dữ liệu cho sách 2
                },
                {
                    name: 'Top 3',
                    data: book3 // Dữ liệu cho sách 3
                }
            ],
            options: {
                chart: {
                    type: 'line', // Biểu đồ dạng line
                    height: 350,
                    stacked: false, // Đặt stacked thành false để không xếp chồng lên nhau
                    events: {
                        selection: function (chart, e) {
                            console.log(new Date(e.xaxis.min));
                        }
                    },
                },
                colors: ['#EA0000', '#6600E3', '#FFC300'], // Màu sắc của từng đường
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'monotoneCubic' // Đường cong mượt
                },
                legend: {
                    position: 'top',
                    horizontalAlign: 'left'
                },
                xaxis: {
                    type: 'datetime' // Trục x là thời gian
                }
            }
        };
        
    }

    render() {
        return (
            <div>
                <div id="chart">
                    <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
                </div>
                <div id="html-dist"></div>
            </div>
        );
    }
}

export default ApexChartTop;
