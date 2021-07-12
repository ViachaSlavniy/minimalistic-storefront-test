import {combineReducers, createStore} from 'redux'
import {cartReducer} from "./reducers/cartReducer";

const rootReducer = combineReducers({
    cart: cartReducer
})

export const store = createStore(rootReducer)