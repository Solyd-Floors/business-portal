import store from "../store"

const defaultState = {
    byIds: {},
    allIds: [],
    lastSuccessGetResult: [],
    loading: false,
    error: undefined,
    singleFloorRequests: {}
} 

const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "GET_SINGLE_FLOOR_REQUEST":
            return {
                ...state,
                singleFloorRequests: {
                    ...(
                        Object.keys(state.singleFloorRequests).filter(x => x != action.pk)
                            .map(key => state.singleFloorRequests[key])
                    ),
                    [action.pk]: {
                        loading: true,
                        error: false,
                        data: undefined
                    }
                }
            }
        case "GET_SINGLE_FLOOR_FAILED":
            return {
                ...state,
                singleFloorRequests: {
                    ...(
                        Object.keys(state.singleFloorRequests).filter(x => x != action.pk)
                            .map(key => state.singleFloorRequests[key])
                    ),
                    [action.pk]: {
                        loading: false,
                        error: action.error,
                        data: undefined
                    }
                }
            }
        case "GET_SINGLE_FLOOR_SUCCESS":
            return {
                ...state,
                singleFloorRequests: {
                    ...(
                        Object.keys(state.singleFloorRequests).filter(x => x != action.pk)
                            .map(key => state.singleFloorRequests[key])
                    ),
                    [action.pk]: {
                        loading: false,
                        error: false,
                        data: action.payload.data.floor
                    }
                }
            }
        case "GET_FLOORS_REQUEST": 
            return { ...state, loading: true }
        case "GET_FLOORS_SUCCESS":
            let { floors } = action.payload.data
            
            console.log("GET_FLOORSGET_FLOORSGET_FLOORSGET_FLOORS",floors)
            for (let floor of floors) {
                state.byIds[floor.id] = floor
                if (state.allIds.indexOf(floor.id) === -1) state.allIds.push(floor.id);
            }
            return { 
                ...state,
                lastSuccessGetResult: [ ...action.payload.data.floors ],
                error: undefined, 
                loading: false, 
                allIds: [ ...state.allIds ], 
                byIds: { ...state.byIds }
            }
        case "GET_FLOORS_FAILED":
            return { ...state, error: action.error, loading: false, allIds: [ ...state.allIds ], byIds: { ...state.byIds } }
        default:
            return state;
    }
}

export default authReducer;