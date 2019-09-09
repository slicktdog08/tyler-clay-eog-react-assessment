import * as actions from '../actions'

//this is going to hold "live" data coming from the subscriptions
const initialState = {
    "flareTemp": {
        value: 0
    },
    "tubingPressure": {
        value: 0
    },
    "injValveOpen": {
        value: 0
    },
    "oilTemp": {
        value: 0
    },
    "casingPressure": {
        value: 0
    },
    "waterTemp": {
        value: 0
    },
}

const subscriptionDataReceived = (state, action) => {
    const {metric, value} = action.data;
    if(metric !== 'undefined'){
        return {
            ...state,
            [metric]: {
                value
            }
        }
    }
}

const handlers = {
    [actions.SUBSCRIPTION_DATA_RECEIVED]: subscriptionDataReceived
}

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if(typeof handler === 'undefined') return state
    return handler(state, action)
}

