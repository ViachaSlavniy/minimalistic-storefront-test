import React from 'react'
import styled from "styled-components"
import {Container, ProductPrice, ProductTitle} from "../../components/Common"
import {ColorButton, MediumButtonCount, SizeButton} from "../../components/Common/Buttons"

const CartTitle = styled.p`
    padding: 80px 0 60px 0;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
`;
export const CartOrder = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 21px 0;
    width: 100%;
    border-top: 1px solid #E5E5E5;
    border-bottom: 1px solid #E5E5E5;
    .product {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .attributes__block {
      margin: 20px 0;
    }
    .attributes__buttons {
      margin-top: 10px;
      display: flex;
      
      button + button {
        margin-left: 12px;
      }
    }
    .size__buttons_wrapper {
      margin-right: 12px;
    }
`;
export const OrderCounterBlock = styled.div`
    display: flex;
  
    .counter {
      margin-right: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .count {
      font-size: 24px;
      font-weight: 500;
      line-height: 38.4px;
      text-align: center;
    }
  
    .slider {
      width: 141px;
      height: 100%;
        img {
          object-fit: contain;
          height: 100%;
          width: 100%;
        }
    }
`;
const CartContainer = styled.div`
    max-width: 1100px;
`;


export class CartPage extends React.Component {

    increment = (prod) => {
        this.props.increment(prod);
    }
    decrement = (prod) => {
        this.props.decrement(prod);
    }

    render() {
        const {cartProducts} = this.props
        const priceSign = this.props.currentCurrency.sign
        const cartProductItems = cartProducts.map((product, i) => {
            const price = product.prices?.find(price => price.currency === this.props.currentCurrency.name)
            const attributes = product.attributes.map((attr, index) => {
                const attrButtons = attr.items.map((attrItem, ind) => {
                    const activeAttrItems = product.activeAttributes
                    const isActiveButton = activeAttrItems.find(item => item.id === attrItem.id)
                    if (attr.type === 'swatch') {
                        return (
                            <ColorButton active={isActiveButton}
                                         disabled={!isActiveButton}
                                         color={attrItem.value}
                                         key={attrItem.id}
                                         data-item-index={ind}
                                         data-attr-index={index}>
                            </ColorButton>
                        )
                    } else {
                        return (
                            <SizeButton active={isActiveButton}
                                        disabled={!isActiveButton}
                                        key={attrItem.id}
                                        data-item-index={ind}
                                        data-attr-index={index}>
                                {attrItem.displayValue}
                            </SizeButton>
                        )
                    }
                })
                return (
                    <div key={attr.id} className="attributes__block">
                        <p className="info_title">{`${attr.name.toUpperCase()}:`}</p>
                        <div onClick={(e) => this.setActiveAttribute(e, attr)} className="attributes__buttons">
                            {attrButtons}
                        </div>
                    </div>
                )
            })
            return (
                <CartOrder key={String(i)}>
                    <div className="product">
                        <div>
                            <ProductTitle>{product.name}</ProductTitle>
                        </div>
                        <ProductPrice>{priceSign}{price?.amount}</ProductPrice>
                        <div className="size__buttons">
                            {attributes}
                        </div>
                    </div>
                    <OrderCounterBlock>
                        <div className="counter">
                            <MediumButtonCount onClick={() => this.increment(product)}>+</MediumButtonCount>
                            <p className="count">{product.count}</p>
                            <MediumButtonCount onClick={() => this.decrement(product)}>-</MediumButtonCount>
                        </div>
                        <div className="slider">
                            <img src={product.gallery[0]} alt="img"/>
                        </div>
                    </OrderCounterBlock>
                </CartOrder>
            )
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
