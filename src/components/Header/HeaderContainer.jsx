import Header from "./Header";
import {connect} from "react-redux";
import {decrement, increment, setCurrency} from "../../redux/reducers/cartReducer";
import {compose} from "redux";
import {withRouter} from "react-router";

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
        setCurrency: (currency) => dispatch(setCurrency(currency)),
        increment: (prod) => {dispatch(increment(prod))},
        decrement: (prod) => {dispatch(decrement(prod))},
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Header)