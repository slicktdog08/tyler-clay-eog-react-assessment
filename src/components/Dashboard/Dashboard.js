//This is where Main dashboard code will go

import React, {useEffect} from "react";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import { useQuery, useSubscription } from "urql";
import LinearProgress from "@material-ui/core/LinearProgress"; //loading
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import SelectionInput from './SelectionInput'

const getTubingPressure = state => {
  const { metric, at, value, unit } = state.tubingPressure;
  return {
    metric,
    at,
    value, 
    unit
  }
}

export default (props) => { 
  return ( 
    <div>
      <SelectionInput/>
      {/*<TubingPressure/>*/}
      {/*}
       
      <FlareTemp/>
      <OilTemp/>
      <CasingPressure/>
      <WaterTemp/>
      <InjValveOpen/>
  */}
    </div>
  );
};

const tubingSubscriptionQuery = `
subscription {
  newMeasurement{
    metric,
    at,
    value,
    unit
  }
}
`

const TubingPressure = () => {
  const dispatch = useDispatch();
  const [subResult] = useSubscription({
    query: tubingSubscriptionQuery,
    variables: {}
  })
  const query = `
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
  `;

  //calculate after so you only load 30 minutes of data
  //
  //const after =  new Date() - (30 * 60 * 1000);
  const input = {
    metricName: "tubingPressure",
    //after: String(after)
  }

  const [result] = useQuery({
    query,
    variables: {
      input
    }
  })

  const { fetching, data, error } = result;

  useEffect(
    ()=>{
      console.log('use effect ran')
      if(error){
        dispatch({ type: actions.API_ERROR, error: error.message });
        return
      }
      if (!data) return;
      const { getMultipleMeasurements } = data;
      dispatch({ type: actions.TUBING_DATA_RECEIVED, getMultipleMeasurements })
    }, 
    [dispatch, data, error]
  )

  if(fetching) return <LinearProgress/>;

  return (
    <div>This is the tubing pressure component: {subResult.data.newMeasurement.value}</div>
  )
}

const FlareTemp = () => {
  const dispatch = useDispatch();
  const query = `
  query{
    getMeasurements(input: {metricName: "flareTemp"}){
      metric
      at
      value
      unit
    }
  }
  `;
  const [result] = useQuery({
    query
  })
  const { fetching, data, error } = result;
  useEffect(
    ()=>{
      if(error){
        dispatch({ type: actions.API_ERROR, error: error.message });
        return
      }
      if (!data) return;
      const { getMeasurements } = data;
      dispatch({ type: actions.FLARE_DATA_RECEIVED, getMeasurements })
    }, 
    [dispatch, data, error]
  )

  if(fetching) return <LinearProgress/>;

  return (
    <div>This is the flare temp component</div>
  )
}

const OilTemp = () => {
  const dispatch = useDispatch();
  const query = `
  query{
    getMeasurements(input: {metricName: "oilTemp"}){
      metric
      at
      value
      unit
    }
  }
  `;
  const [result] = useQuery({
    query
  })
  const { fetching, data, error } = result;
  useEffect(
    ()=>{
      if(error){
        dispatch({ type: actions.API_ERROR, error: error.message });
        return
      }
      if (!data) return;
      const { getMeasurements } = data;
      dispatch({ type: actions.OIL_TEMP_RECEIVED, getMeasurements })
    }, 
    [dispatch, data, error]
  )

  if(fetching) return <LinearProgress/>;

  return (
    <div>This is the oil temp component</div>
  )
}

const CasingPressure = () => {
  const dispatch = useDispatch();
  const query = `
  query{
    getMeasurements(input: {metricName: "casingPressure"}){
      metric
      at
      value
      unit
    }
  }
  `;
  const [result] = useQuery({
    query
  })
  const { fetching, data, error } = result;
  useEffect(
    ()=>{
      if(error){
        dispatch({ type: actions.API_ERROR, error: error.message });
        return
      }
      if (!data) return;
      const { getMeasurements } = data;
      dispatch({ type: actions.CASING_PRESSURE_RECEIVED, getMeasurements })
    }, 
    [dispatch, data, error]
  )

  if(fetching) return <LinearProgress/>;

  return (
    <div>This is the casing pressure component</div>
  )
}

const WaterTemp = () => {
  const dispatch = useDispatch();
  const query = `
  query{
    getMeasurements(input: {metricName: "waterTemp"}){
      metric
      at
      value
      unit
    }
  }
  `;
  const [result] = useQuery({
    query
  })
  const { fetching, data, error } = result;
  useEffect(
    ()=>{
      if(error){
        dispatch({ type: actions.API_ERROR, error: error.message });
        return
      }
      if (!data) return;
      const { getMeasurements } = data;
      dispatch({ type: actions.WATER_TEMP_RECEIVED, getMeasurements })
    }, 
    [dispatch, data, error]
  )

  if(fetching) return <LinearProgress/>;

  return (
    <div>This is the water temp component</div>
  )
}

const InjValveOpen = () => {
  const dispatch = useDispatch();
  const query = `
  query{
    getMeasurements(input: {metricName: "injValveOpen"}){
      metric
      at
      value
      unit
    }
  }
  `;
  const [result] = useQuery({
    query
  })
  const { fetching, data, error } = result;
  useEffect(
    ()=>{
      if(error){
        dispatch({ type: actions.API_ERROR, error: error.message });
        return
      }
      if (!data) return;
      const { getMeasurements } = data;
      dispatch({ type: actions.INJ_VALVE_OPEN_RECEIVED, getMeasurements })
    }, 
    [dispatch, data, error]
  )

  if(fetching) return <LinearProgress/>;

  return (
    <div>This is the inj Valve Open component</div>
  )
}