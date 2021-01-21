
const defaultState = {} 
const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
const validationErrorsReducer = ({phase1}) => (state = defaultState, action) => {
    if (action.type.indexOf("_FAILED") !== -1){
        let phase1_key = Object.keys(phase1).find(key => {
            if (action.type.indexOf(key) !== -1) {
                return true;
            }
        })
        let reducer_key = phase1[phase1_key]
        let reducer_key_sub_key = 
        action.type
            .replace("_FAILED","")
            .split("_")
            .map((x,i) => i === 0 ? x.toLowerCase() : capitalizeFirstLetter(x.toLowerCase()))
            .join("")
        if (
            action.error &&
            action.error.response && 
            [401,403, 400].indexOf(action.error.response.status) !== -1
        ){
            console.log("action.error.response.data",action.error.response.data)
            // state[reducer_key_sub_key] = {
            //   _reducer_key: reducer_key,  
            //   list: nextState.error.response.data.errors,
            //   message: nextState.error.response.data.message 
            // }
            state = { ...state, [reducer_key_sub_key]: {
                _reducer_key: reducer_key,  
                list: action.error.response.data.errors,
                message: action.error.response.data.message 
            }}
        }
    }
    return state
}

export default validationErrorsReducer;