import * as actions from '../actions'

const initialState = {
    options: [
      {name: 'Flare Temp', value: 'flareTemp'},
      {name: 'Tubing Pressure', value: 'tubungPressure'},
      {name: 'Injector Valve Open', value: 'injValveOpen'},
      {name: 'Oil Temp', value: 'oilTemp'},
      {name: 'Casing Pressure' , value: 'casingPressure'},
      {name: 'Water Temp', value: 'waterTemp'}
    ],
    selectedOptions: []
}

const dataOptionReceived = (state, action) => {
    const { selected } = action;

    return{
        ...state,
        options: state.options.filter((item, index) => item.value !== selected.value),
        selectedOptions: [...state.selectedOptions, selected]
    };
};

const dataOptionRemoved = (state, action) => {
    const { removed } = action;

    return{
        ...state,
        options: [...state.options, removed],
        selectedOptions: state.selectedOptions.filter((item, index) => item.value !== removed.value)
    }
}

const handlers = {
    [actions.SET_NEW_DATA_OPTION]: dataOptionReceived,
    [actions.REMOVE_DATA_OPTION]: dataOptionRemoved
}

export default (state = initialState, action) => {
    const handler = handlers[action.type];
    if (typeof handler === 'undefined') return state
    return handler(state, action)
}