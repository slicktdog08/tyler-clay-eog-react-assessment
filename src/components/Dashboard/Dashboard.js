//This is where Main dashboard code will go

import React from "react";
import {  useSubscription } from "urql";
import * as actions from "../../store/actions";
import { useDispatch } from "react-redux";
import SelectionInput from './SelectionInput'
import LiveDataTiles from './LiveDataTiles'
import Chart from './Chart'

//Subscription is not filtered by type - No argument for this in schema - We will let Redux Handle this :(
const subscriptionQuery = `
  subscription {
    newMeasurement{
      metric,
      at,
      value,
      unit
    }
  }
`

export default (props) => { 
  //Real Time Data
  const dispatch = useDispatch();

  const [subResult] = useSubscription({
    query: subscriptionQuery,
    variables: {}
  })

  if(typeof(subResult.data) != 'undefined'){
    dispatch({type: actions.SUBSCRIPTION_DATA_RECEIVED, data: subResult.data.newMeasurement})
  }
  
  
  return ( 
    <div>
      <SelectionInput/>
      <LiveDataTiles/>
      <Chart/>
    </div>
  );
};