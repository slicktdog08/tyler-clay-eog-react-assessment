import React, {useState, useEffect} from 'react';
import { useQuery } from "urql";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as actions from '../../store/actions'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const historicDataQuery = `
        query ($input: [MeasurementQuery!]){
            getMultipleMeasurements(input: $input) {
                measurements{
                    metric
                    at
                    value
                    unit
                }
            }
        }
    `

    function isOptionPresent(options, value){
        //loop through options and return if selected
        for(var i=0; i < options.length; i++){
            if(options[i].value === value){
                return true
            }
            else{
                if(i === options.length - 1){
                    return false
                }
            }
        }
    }
    

    
    const getChartData = state => {
        const data = state.historicalData.data;
        return {
            data
        }
    }

    const getSelectedOptions = state => {
        const {selectedOptions} = state.dataOptions;
        return {
            selectedOptions
        }
    }

    function returnTimestamp(){
        return(
            Date.now() - (30 * 60 * 1000)
        )
    }

    var input = [
        {
        "metricName": "tubingPressure",
        "after": returnTimestamp()
        },
        {
        "metricName": "oilTemp",
        "after": returnTimestamp()
        },
        {
        "metricName": "flareTemp",
        "after": returnTimestamp()
        },
        {
        "metricName": "injValveOpen",
        "after": returnTimestamp()
        },
        {
        "metricName": "casingPressure",
        "after": returnTimestamp()
        },
        {
        "metricName": "waterTemp",
        "after": returnTimestamp()
        }
    ]

    

export default () => {
    const dispatch = useDispatch();
    //Here we will fetch historic data

    const [result] = useQuery({
        query: historicDataQuery,
        variables: {
            input
        }
    });

    const { fetching, error } = result;
    
    useEffect(()=>{
        if(typeof(result.data) !== 'undefined' && !fetching){            
            console.log('data was updated')
            dispatch({type: actions.HISTORICAL_DATA_RECEIVED, data: result.data.getMultipleMeasurements});
        }
    }, [result])

    const {data} = useSelector(
        getChartData
    )

    const {selectedOptions} = useSelector(
        getSelectedOptions
    )
    console.log('selectedOptions', selectedOptions)
    return (
        
      <LineChart
        width={window.innerWidth - 100}
        height={window.innerHeight - 300}
        data={data}
        margin={{
          top: 5, right: 50, left: 50, bottom: 5,
        }}
    
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis  />
        
        <Tooltip cursor={{ stroke: '#273142', strokeWidth: 2 }} active={true}/>
        <Legend iconType='diamond' />
        
        {isOptionPresent(selectedOptions, 'tubingPressure') ? 
            <Line type="linear" name='Tubing Pressure' dataKey="tubingPressure" stroke="#8884d8" activeDot={{ r: 8 }} dot={false}/> : <span/>
        }
        {isOptionPresent(selectedOptions, 'oilTemp') ?
            <Line type="linear" name='Oil Temp' dataKey="oilTemp" stroke="#0A797F" activeDot={{ r: 8 }} dot={false}/> : <span/>
        }
        {isOptionPresent(selectedOptions, 'flareTemp') ? 
            <Line type="linear" name='Flare Temp' dataKey="flareTemp" stroke="#385746" activeDot={{ r: 8 }} dot={false}/> : <span/>
        }
        {isOptionPresent(selectedOptions, 'casingPressure') ?
            <Line type="linear" name='Casing Pressure' dataKey="casingPressure" stroke="#86A05C" activeDot={{ r: 8 }} dot={false}/> : <span/>
        }
        {isOptionPresent(selectedOptions, 'waterTemp') ? 
            <Line type="linear" name='Water Temp' dataKey="waterTemp" stroke="#CA6C27" activeDot={{ r: 8 }} dot={false} /> : <span/>
        }
        {isOptionPresent(selectedOptions, 'injValveOpen') ?
            <Line type="linear" name='Inj Valve Open' dataKey="injValveOpen" stroke="#69382C" activeDot={{ r: 8 }} dot={false}/> : <span/>
        }
      </LineChart>
    );
}
