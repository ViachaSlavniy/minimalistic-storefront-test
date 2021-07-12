import {CardPageWithRouter} from "./CardPage";
import {connect} from "react-redux";
import {addProduct, deleteProduct} from "../../redux/reducers/cartReducer";

const mapStateToPros = (state) => {
    return {
        cartProducts: state.cart.cartProducts,
        currentCurrency: state.cart.currentCurrency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product, activeAttributesItems) => {dispatch(addProduct(product, activeAttributesItems))},
        deleteProduct: (productName) => {dispatch(deleteProduct(productName))}
    }
}

export default connect(mapStateToPros, mapDispatchToProps)(CardPageWithRouter)