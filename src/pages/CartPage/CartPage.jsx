import React, {PureComponent} from 'react'
import {Container} from "../../components/StyledComponents/components/Common"
import {CartItem} from "./components/CartItem";
import {connect} from "react-redux";
import {changeAttribute, decrement, deleteProduct, increment} from "../../redux/reducers/cartReducer";
import {CartContainer, CartTitle} from "../../components/StyledComponents";


class CartPage extends PureComponent {


    render() {
        const {cartProducts, currentCurrency} = this.props
        const cartProductItems = cartProducts.map((product, i) => {
            const {increment, decrement, deleteProduct, changeAttribute} = this.props
            return <CartItem key={String(i)}
                             product={product}
                             index={i}
                             currentCurrency={currentCurrency}
                             increment={increment}
                             decrement={decrement}
                             deleteProduct={deleteProduct}
                             changeAttribute={changeAttribute}
                    />
        })
        return (
            <Container>
                <CartContainer>
                    <CartTitle>CART</CartTitle>
                    {cartProductItems.length
                        ? cartProductItems
                        : <h1>Your cart is empty</h1>
                    }
                </CartContainer>
            </Container>
        )
    }
}


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
