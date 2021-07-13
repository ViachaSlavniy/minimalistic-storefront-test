import {connect} from "react-redux";
import {CartPage} from "./CartPage";
import {changeAttribute, decrement, deleteProduct, increment} from "../../redux/reducers/cartReducer";


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
        deleteProduct: (prod) => {dispatch(deleteProduct(prod))},
        changeAttribute: (prod, newActiveAttr) => {dispatch(changeAttribute(prod, newActiveAttr))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage)