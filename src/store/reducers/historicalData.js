import * as actions from '../actions'
import Moment from 'moment'

const initialState = {
    data: []
}

const historicalDataReceived = (state, action)=> {
    
    var results = []; //this array will hold end result
    
    const {data} = action;

    for(var i=0; i < data[0].measurements.length; i++){
        var result = {//reset to blank result each iteration
            time: null,
            tubingPressure: null,
            oilTemp: null,
            flareTemp: null,
            injValveOpen: null,
            casingPressure: null,
            waterTemp: null
        }; 

        result.time = Moment(data[0].measurements[i].at).format("LTS"); //always trust time from first array
        result.tubingPressure = data[0].measurements[i].value;
        result.oilTemp = data[1].measurements[i].value;
        result.flareTemp = data[2].measurements[i].value;
        result.injValveOpen = data[3].measurements[i].value;
        result.casingPressure = data[4].measurements[i].value;
        result.waterTemp = data[5].measurements[i].value;

        results.push(result)
    }

    //console.log('results ', results)

    return {
        data: results
    }
}

const handlers = {
    [actions.HISTORICAL_DATA_RECEIVED]: historicalDataReceived
}

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if(typeof handler === 'undefined') return state;
    return handler(state, action)
}