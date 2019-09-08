import * as actions from '../actions'

const initalState = {
   tubingPressure: [],
   flareTemp: [],
   oilTemp: [],
   casingPressure: [],
   waterTemp:[],
   injValveOpen: []
}

const tubingDataReceived = (state, action) => {
    const { getMeasurements } = action;
  
    return {
        ...state,
        tubingPressure: {...getMeasurements}
    };
};

const flareDataReceived = (state, action) => {
    const {getMeasurements} = action;

    return{
        ...state,
        flareTemp: {...getMeasurements}
    }
}

const oilTempReceived = (state, action) => {
    const {getMeasurements} = action;
    
    return{
        ...state,
        oilTemp: {...getMeasurements}
    }
}

const casingPressureReceived = (state, action) => {
    const {getMeasurements} = action;

    return {
        ...state,
        casingPressure: {...getMeasurements}
    }
}

const waterTempReceived = (state, action) => {
    const {getMeasurements} = action;

    return {
        ...state,
        waterTemp: {...getMeasurements}
    }
}

const injValveOpenReceived = (state, action) => {
    const {getMeasurements} = action;
    
    return {
        ...state,
        injValveOpen: {...getMeasurements}
    }
}

const handlers = {
    [actions.TUBING_DATA_RECEIVED]: tubingDataReceived,
    [actions.FLARE_DATA_RECEIVED]: flareDataReceived,
    [actions.OIL_TEMP_RECEIVED]: oilTempReceived,
    [actions.CASING_PRESSURE_RECEIVED]: casingPressureReceived,
    [actions.WATER_TEMP_RECEIVED]: waterTempReceived,
    [actions.INJ_VALVE_OPEN_RECEIVED]: injValveOpenReceived
};

export default (state = initalState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === 'undefined') return state
    return handler(state, action)
}