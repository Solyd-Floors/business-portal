import store from "../store"

const defaultState = {
    myCart: {
        loading: true,
        error: undefined,
        cart: undefined,
        cachedCart: undefined
    },
    removeFromCart: {
        ["COMMENT"]: {
            loading: true,
            error: undefined,
            success: undefined
        },
    },
    addFloorBoxesToCart: {
        loading: false,
        error: undefined
    },
    loading: false,
    error: undefined
} 

const meReducer = (state = defaultState, action) => {
    switch(action.type) {
        case "GET_MY_CART_REQUEST": 
            return { 
                ...state,
                myCart: {
                    loading: true,
                    cachedCart: state.myCart.cachedCart
                }
            }
        case "GET_MY_CART_SUCCESS":
            let { cart: myCart } = action.payload.data
            return { 
                ...state,
                myCart: {
                    cart: myCart,
                    cachedCart: myCart
                } 
            }
        case "GET_MY_CART_FAILED":
            return { 
                ...state,
                myCart: {
                    error: action.error,
                }
            }

        case "REMOVE_FROM_CART_REQUEST": 
            return { 
                ...state,
                removeFromCart: {
                    ...state.removeFromCart,
                    [action.CartFloorItemId]: {
                        loading: true
                    }
                }
            }
        case "REMOVE_FROM_CART_SUCCESS":
            return { 
                ...state,
                myCart: {
                    cart: action.payload.data.cart,
                    cachedCart: action.payload.data.cart
                },
                removeFromCart: {
                    ...state.removeFromCart,
                    [action.CartFloorItemId]: {
                        success: true
                    }
                }
            }
        case "REMOVE_FROM_CART_FAILED":
            return { 
                ...state,
                removeFromCart: {
                    ...state.removeFromCart,
                    [action.CartFloorItemId]: {
                        error: action.error
                    }
                }
            }


        case "ADD_FLOOR_BOXES_TO_CART_REQUEST": 
            return { 
                ...state,
                addFloorBoxesToCart: {
                    loading: true
                }
            }
        case "ADD_FLOOR_BOXES_TO_CART_SUCCESS": 
            return { 
                ...state,
                addFloorBoxesToCart: {
                    cart: action.payload.data.cart,
                    cachedCart: action.payload.data.cart
                }
            }
        case "ADD_FLOOR_BOXES_TO_CART_FAILED":
            return { 
                ...state,
                addFloorBoxesToCart: {
                    error: action.error,
                }
            }

        case "DISCARD_CART_REQUEST": 
            return { 
                ...state,
                myCart: {
                    loading: true
                }
            }
        case "DISCARD_CART_SUCCESS":
            let { cart: newCart } = action.payload.data
            return { 
                ...state,
                myCart: {
                    cart: newCart,
                    cachedCart: newCart
                } 
            }

        default:
            return state;
    }
}

export default meReducer;