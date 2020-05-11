import React,{useEffect, useState} from 'react';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country}) =>{
    const [dailyData, setDailyData] = useState([]);

    useEffect(() => {
        const fetchApi = async() =>{
            setDailyData(await fetchDailyData());
        }
        fetchApi();
    }, [setDailyData]);

    const lineChart = (
        dailyData.length
        ?(
        <Line 
          data= {{
              labels: dailyData.map(({date}) => date),
              datasets: [{
                data: dailyData.map(({confirmed}) => confirmed),
                label: 'Infected', 
                borderColor: '#3333ff',
                fill: true,
              },{
                data: dailyData.map(({deaths}) => deaths),
                label: 'Death', 
                borderColor: 'red',
                backgroundColor: 'rgba(250,0,0,0.5)',
                fill: true,
              }],
          }}
        />):null
    );

    const barChart = (
    confirmed
    ?(<Bar 
     data= {{   
       labels: ['Infected', 'Recovered', 'Deaths'],
       datasets: [{
           label: 'People',
           backgroundColor: [
               'blue',
               'green',
               'red'
           ],
        data: [confirmed.value, recovered.value, deaths.value]
        }]
     }}
     options={{
         legend: {display: true},
         title: {display:true, text: 'Current State in ${country}'},
     }}
    />):null
    );
    return(
        <div className={styles.container}>
           {country ? barChart:lineChart}
        </div>
    )
}

export default Chart;