import React from 'react';
import classes from './chart-component.module.css';
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2';
import {ChartTypes} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import PropTypes from "prop-types";

const ChartComponent = ({type, data, color, layout, title, customStyle, graphLabels}) => {

    const datasets = {
        labels: graphLabels,
        datasets: [
            {
                label: title,
                backgroundColor: color,
                borderColor: color,
                borderWidth: 2,
                data: data,
            }
        ]
    }

    const options = type === ChartTypes.bar ? {
        indexAxis: layout,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                ticks: {
                    color: 'lightgray',
                },
            },
        },
    } : type === ChartTypes.customLine ? {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                ticks: {
                    color: 'lightgray',
                },
            },
        },
    } : type === ChartTypes.pie ? {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                },
            },
        }
    } : type === ChartTypes.radar ? {
        locale: 'en-US',
        scale: {},
        scales: {
            r: {
                angleLines: {
                    color: 'black'
                },
                grid: {
                    color: 'black'
                },
                pointLabels: {
                    color: 'lightgray'
                },
                ticks: {
                    color: 'transparent',
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
        }
    } : type === ChartTypes.doughnut ? {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                },
            },
        }
    } : type === ChartTypes.polarArea ? {
        locale: 'en-US',
        scale: {},
        scales: {
            r: {
                angleLines: {
                    color: 'black'
                },
                grid: {
                    color: 'black'
                },
                pointLabels: {
                    color: 'black'
                },
                ticks: {
                    color: 'transparent',
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray'
                }
            }
        }
    } : null;

    const CustomLine = (props) => {
        return <Line {...props} />;
    };

    CustomLine.propTypes = {
        backgroundcolor: PropTypes.string,
        bordercolor: PropTypes.string,
        borderwidth: PropTypes.number,
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    const chart = type === ChartTypes.bar ? (
        <Bar
            data={datasets}
            width={"100%"}
            className={classes.chart}
            options={options}
        />
    ) : type === ChartTypes.customLine ? (
        <CustomLine
            data={datasets}
            width={"100%"}
            className={classes.chart}
            options={options}
            backgroundcolor={color}
            bordercolor={color}
            borderwidth={2}
        />
    ) : type === ChartTypes.pie ? (
        <Pie
            data={datasets}
            width={"100%"}
            className={classes.chart}
            options={options}
        />
    ) : type === ChartTypes.radar ? (
        <Radar
            data={datasets}
            width={"100%"}
            className={classes.chart}
            options={options}
        />
    ) : type === ChartTypes.doughnut ? (
        <Doughnut
            data={datasets}
            width={"100%"}
            className={classes.chart}
            options={options}
        />
    ) : type === ChartTypes.polarArea ? (
        <PolarArea
            data={datasets}
            width={"100%"}
            className={classes.chart}
            options={options}
        />
    ) : null;

    return (
        <div className={classes.chartStyle} style={customStyle}>
            {chart}
        </div>
    );
};

export default ChartComponent;
