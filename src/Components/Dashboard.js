import React, { Component } from 'react';
import { Chart, Pie } from 'react-chartjs-2';
import { connect } from 'react-redux';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.latestHitsChartRef = React.createRef();
        this.performanceChartRef = React.createRef();
        this.state = {
            orders: [],
            color: 'blue',
            borderColor: '#435c70',
            title: 'Latest Hits',
            notificationList: [],
            storageChartData: {},
            performanceChartData: {}
        }
    }

    componentDidMount() {
        let dashboardDetail = this.props.dashboardDetail;
        dashboardDetail = dashboardDetail === undefined || dashboardDetail === '' || dashboardDetail === null ? {} : dashboardDetail
        let latestHits = dashboardDetail.latestHits;
        let months = latestHits.months;
        let featured = latestHits.featured;
        let latest = latestHits.latest;
        let popular = latestHits.popular;
        let storageObj = { label: [], data: [] };
        let performanceObj = { label: [], data: [] }
        Object.keys(dashboardDetail.storage).map(function (key) {
            storageObj.label.push(key + " Storage (" + dashboardDetail.storage[key] + "0GB)");
            storageObj.data.push(dashboardDetail.storage[key]);
        });
        Object.keys(dashboardDetail.performance).map(function (key) {
            performanceObj.label.push(key);
            performanceObj.data.push(dashboardDetail.performance[key]);
        });

        //latestHits Chart
        this.myChart = new Chart(this.latestHitsChartRef.current, {
            type: 'line',
            options: {
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 16
                    }
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "white",
                                fontSize: 13,
                                stepSize: 10,
                                beginAtZero: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            stepSize: 10,
                            maxTicksLimit: 10,
                            ticks: {
                                fontColor: "white",
                                fontSize: 13,
                                stepSize: 10,
                                beginAtZero: false
                            }
                        }
                    ]
                }
            },
            data: {
                labels: months.map(d => d),
                datasets: [{
                    label: 'Latest Hits',
                    data: latest.map(d => d),
                    fill: false,
                    backgroundColor: 'rgb(67,92,112)',
                    pointRadius: 1,
                    borderColor: 'rgb(70,130,180)',
                    borderWidth: 4,
                    lineTension: 0.5
                },
                {
                    label: 'Popular Hits',
                    data: popular.map(d => d),
                    fill: false,
                    backgroundColor: 'rgb(67,92,112)',
                    pointRadius: 1,
                    borderColor: 'rgb(240,128,128)',
                    borderWidth: 4,
                    lineTension: 0.5
                },
                {
                    label: 'Featured',
                    data: featured.map(d => d),
                    fill: false,
                    backgroundColor: 'rgb(67,92,112)',
                    pointRadius: 1,
                    borderColor: 'rgb(159, 0, 197)',
                    borderWidth: 4,
                    lineTension: 0.5
                }]
            }
        });

        //performanceChart
        this.myChart = new Chart(this.performanceChartRef.current, {
            type: 'horizontalBar',
            options: {
                legend: {
                    labels: {
                        fontColor: "white",
                        fontSize: 16
                    }
                },
                scales: {
                    xAxes: [
                        {
                            ticks: {
                                fontColor: "white",
                                fontSize: 13,
                                stepSize: 10,
                                beginAtZero: false,
                                barPercentage: 0.1
                            }
                        }
                    ],
                    yAxes: [
                        {
                            stepSize: 10,
                            ticks: {
                                fontColor: "white",
                                fontSize: 13,
                                stepSize: 1,
                                beginAtZero: false,
                                barPercentage: 0.1
                            }
                        }
                    ]
                }
            },
            data: {
                labels: performanceObj.label.map(d => d),
                datasets: [{
                    label: '# of Hits',
                    data: performanceObj.data.map(d => d),
                    fill: false,
                    backgroundColor: ['rgb(0, 255, 255)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)', 'rgb(255, 127, 0)', 'rgb(159, 0, 197)', 'rgb(255, 0, 0)', 'rgb(255, 255, 0)'],
                    pointRadius: 1,
                    lineTension: 0.5,
                    barPercentage: 0.3
                }]
            }
        });

        //Storage Pie Chart
        var storageChartData = {
            labels: storageObj.label,
            color: 'white',
            datasets: [
                {
                    data: storageObj.data,
                    backgroundColor: ['rgb(34,139,34)', 'rgb(64,224,208)', 'rgb(220,20,60)']
                }]
        };

        this.chartOptions = {
            legend: {
                display: true,
                labels: {
                    fontColor: 'white',
                    padding: 10,
                    fontSize: 15
                }
            }
        }

        this.setState({ storageChartData: storageChartData, orders: dashboardDetail.orders, notificationList: dashboardDetail.notifications });

    }

    render() {

        const orders = this.state.orders.map((item, index) => {
            return <tr><td>{item.orderNo}</td><td>{item.status}</td><td>{item.operators}</td><td>{item.location}</td><td>{item.distance}</td><td>{item.startDate}</td><td>{item.deliveryDate}</td></tr>
        })

        const notifications = this.state.notificationList.map((item, index) => {
            return <div style={{ width: '90%', fontWeight: 'normal' }}>
                <div style={{ display: 'inline-block', width: '25%' }}><img src={item.pic} style={{ width: '80px', height: '80px', borderRadius: '50%' }} /></div>
                <div style={{ display: 'inline-block', width: '70%' }}><span>{item.message}</span>
                    <p>{item.time} ago</p></div>
            </div>
        })

        return (
            <div className="dashboardContent">
                <h1>Welcome back, Admin</h1>
                <div className="dashboardCard"><canvas ref={this.latestHitsChartRef} /></div>
                <div className="dashboardCard"><canvas ref={this.performanceChartRef} /></div>
                <div className="dashboardCard"><Pie data={this.state.storageChartData} options={this.chartOptions} /></div>
                <div className="dashboardCard">{notifications}</div>

                <div className="OrderDiv">
                    <table className="tableP">
                        <tr className="Table_headerRow">
                            <td>Order No</td>
                            <td>Status</td>
                            <td>Operators</td>
                            <td>Location</td>
                            <td>Distance</td>
                            <td>Start Date</td>
                            <td>EST Delivery Date</td>
                        </tr>
                        {orders}
                    </table>
                </div>
            </div>
        )
    }
}

const mapGlobalStateToProps = (globalState) => {
    return {
        dashboardDetail: globalState.dashboard.dashboardDetails
    }
}

export default connect(mapGlobalStateToProps)(Dashboard);