import {connect} from "react-redux";
import {CartPage} from "./CartPage";
import {addProduct, decrement, deleteProduct, increment} from "../../redux/reducers/cartReducer";


const mapStateToProps = (state) => {
    const {cartProducts, currentCurrency, totalPrice} = state.cart
    return {
        cartProducts,
        currentCurrency,
        totalPrice
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (prod) => {dispatch(increment(prod))},
        decrement: (prod) => {dispatch(decrement(prod))},
        addProduct: () => {dispatch(addProduct())},
        deleteProduct: () => {dispatch(deleteProduct())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)