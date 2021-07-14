import React from 'react'
import styled from "styled-components"
import {Container} from "../../components/Common"
import {CartItem} from "./components/CartItem";
import {connect} from "react-redux";
import {changeAttribute, decrement, deleteProduct, increment} from "../../redux/reducers/cartReducer";

const CartTitle = styled.p`
  padding: 80px 0 60px 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
`;
const CartContainer = styled.div`
  padding-bottom: 54px;
  max-width: 1100px;
`;


class CartPage extends React.Component {


    render() {
        const {cartProducts, currentCurrency} = this.props
        const cartProductItems = cartProducts.map((product, i) => {
            return <CartItem key={String(i)}
                             product={product}
                             index={i}
                             currentCurrency={currentCurrency}
                             increment={this.props.increment}
                             decrement={this.props.decrement}
                             deleteProduct={this.props.deleteProduct}
                             changeAttribute={this.props.changeAttribute}
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
