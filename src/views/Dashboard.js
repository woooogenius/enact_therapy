import { Header, Panel } from "@enact/sandstone/Panels";
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@enact/sandstone/Button';
import Slider from '@enact/sandstone/Slider';
import css from '../App/App.module.less'
import Image from '@enact/sandstone/Image';
import Icon from '@enact/sandstone/Icon';
import Popup from '@enact/sandstone/Popup';
import TabLayout, { Tab } from '@enact/sandstone/TabLayout';
import { useNavigate } from 'react-router-dom';
import { Bar, Line, Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    LineElement,
    PointElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    BarElement,
    ArcElement,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend
);

const Dashboard = (props) => {
    const [showMenuPop, setShowMenuPop] = useState(false);
    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
                label: 'Sample Data',
                data: [12, 19, 4, 6, 3, 21],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }
        ],
    }
    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };
    // const navigate = useNavigate();

    return (
        <Panel {...props}>
            <div className={css.head_title}>
                <h1 className={css.head_tit}>DashBoard</h1>
            </div>


            <div className={css.chart_cont}>
                <div className={css.chart_item}>

                    <div className={css.dash_grid}>
                        <div className={css.grid_item}>
                            <div className={css.item_desc}>
                                <h4>12.7K</h4>
                                <p style={{ marginTop: '-20px' }}>sample text</p>
                            </div>
                        </div>
                        <div className={css.grid_item}>
                            <div className={css.item_desc}>
                                <h4>38%</h4>
                                <p style={{ marginTop: '-20px' }}>sample text</p>
                            </div>
                        </div>
                        <div className={css.grid_item}>
                            <div className={css.item_desc}>
                                <h4>73</h4>
                                <p style={{ marginTop: '-20px' }}>sample text</p>
                            </div>
                        </div>
                        <div className={css.grid_item}>
                            <div className={css.item_desc}>
                                <h4>9M</h4>
                                <p style={{ marginTop: '-20px' }}>sample text</p>
                            </div>
                        </div>
                    </div>


                </div>

                <div className={css.chart_item}>
                    <div className={css.chart}>
                        <Bar data={data} options={options} />
                    </div>
                </div>

                <div className={css.chart_item}>
                    <div className={css.chart}>
                        <Pie data={data} options={options} />
                    </div>
                </div>

                <div className={css.chart_item}>
                    <div className={css.chart}>
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>





        </Panel>
    );
};

export default Dashboard;
