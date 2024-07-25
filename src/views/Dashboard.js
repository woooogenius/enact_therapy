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

                {/* <div onClick={() => setShowMenuPop(true)} className={css.menu_btn}>
                    <Icon>list</Icon>
                </div> */}
            </div>

            {/* <Popup position='center' open={showMenuPop} style={{ width: '450px', height: '450px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '0', right: '-20px' }}>
                    <Icon onClick={() => setShowMenuPop(false)} style={{ width: '80px', height: '80px', fontSize: '30px', cursor: 'pointer' }} size={'tiny'}>closex</Icon>
                </div>
                <div className={css.menu_flex}>
                    <Button onClick={() => navigate('/')} size='small' style={{ width: '300px' }}>Home</Button>
                    <Button onClick={() => navigate('/dashboard')} size='small' style={{ width: '300px', marginTop: '30px' }}>Dashboard</Button>
                    <Button size='small' style={{ width: '300px', marginTop: '30px' }}>Account</Button>
                </div>
            </Popup> */}

            <div className={css.chart_cont}>
                <div className={css.chart}>
                    <Bar data={data} options={options} />
                </div>

                <div className={css.chart}>
                    <Pie data={data} options={options} />
                </div>

                <div className={css.chart}>
                    <Line data={data} options={options} />
                </div>
            </div>



        </Panel>
    );
};

export default Dashboard;
