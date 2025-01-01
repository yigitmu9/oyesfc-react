import React from 'react';
import classes from './chart-component.module.css';
import {Bar, Doughnut, Line, Pie, PolarArea, Radar} from 'react-chartjs-2';
import {ChartTypes} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import PropTypes, {any} from "prop-types";

interface ChartComponentProps {
    type?: any;
    data?: any;
    color?: any;
    layout?: any;
    title?: any;
    customStyle?: any;
    graphLabels?: any;
    maxValueBarGraph?: any;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
                                                           type,
                                                           data,
                                                           color,
                                                           layout,
                                                           title,
                                                           customStyle,
                                                           graphLabels,
                                                           maxValueBarGraph
                                                       }) => {

    const datasets: any = {
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

    const options: any = type === ChartTypes.bar ? {
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
                suggestedMax: layout === 'y' ? maxValueBarGraph : null,
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                suggestedMax: layout === 'x' ? maxValueBarGraph : null,
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
                beginAtZero: true,
                suggestedMax: layout === 'y' ? maxValueBarGraph : null,
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                beginAtZero: true,
                suggestedMax: layout === 'x' ? maxValueBarGraph : null,
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

    const CustomLine = (props?: any) => {
        return <Line {...props} />;
    };

    CustomLine.propTypes = {
        backgroundcolor: PropTypes.string,
        bordercolor: PropTypes.string,
        borderwidth: PropTypes.number,
        data: PropTypes.any,
        width: any,
        className: any,
        options: any
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
