import React, {Component} from "react";
import {ColorButton, MediumButtonCount, SizeButton} from "../../../components/Common/Buttons";
import {ProductPrice, ProductTitle} from "../../../components/Common";
import styled from "styled-components";
import {Link} from "react-router-dom";


const CartOrder = styled.div`
  position: relative;
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
  .product__title {
    margin-bottom: 16px;
     a {
       text-decoration: none;
       color: #000;
       
       &:hover {
         text-decoration: underline;
       }
     }
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
  
  .delete__button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: -90px;
    width: 80px;
    height: 100%;
    cursor: pointer;
    border: 1px solid #E5E5E5;
    opacity: 0;
    transition: all .2s linear;
    
    span {
      font-weight: 500;
      transition: all .2s linear;
      transform: rotate(-90deg);
    }
  }

  .delete__button:hover {
    background-color: red;
    span {
      color: #fff;
    }
  }
  
  &:hover .delete__button {
    opacity: 1;
  }
`;
const OrderCounterBlock = styled.div`
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
    position: relative;
    width: 141px;
    height: 100%;

    img {
      object-fit: contain;
      height: 100%;
      width: 100%;
    }
    
    .arrow {
      position: absolute;
      margin-top: -15px;
      top: 50%;
      width: 20px;
      height: 20px;
      border: 2px solid #000;
      cursor: pointer;
      display: none;
      
      &:hover {
        border-color: #5ECE7B;
      }
    }

    .prev_arrow {
      border-bottom: none;
      border-right: none;
      left: 5px;
      transform: rotate(-45deg);
    }

    .next_arrow {
      border-bottom: none;
      border-left: none;
      right: 5px;
      transform: rotate(45deg);
    }
  }
  .slider:hover .arrow {
    display: block;
  }
`;


export class CartItem extends Component {
    state = {
        activeSlide: 0
    }

    increment = (prod) => {
        this.props.increment(prod);
    }
    decrement = (prod) => {
        this.props.decrement(prod);
    }
    deleteProduct = (prod) => {
        this.props.deleteProduct(prod)
    }

    showPrevSlide = () => {
        if (this.state.activeSlide !== 0) {
            this.setState({activeSlide: this.state.activeSlide - 1})
        }
    }
    showNextSlide = (prod) => {
        const gallery = prod.gallery;
        if (this.state.activeSlide !== (gallery.length - 1)) {
            this.setState({activeSlide: this.state.activeSlide + 1})
        }
    }

    setActiveAttribute = (e, attr, product) => {
        const {itemIndex, attrName} = e.target.dataset
        const newActiveAttributesItems = product.activeAttributes.map((item, index) => {
            if (attrName === item.attributeName) {
                const changedItem = attr.items.find((_, ind) => ind === +itemIndex)
                return {
                    ...changedItem,
                    attributeName: attrName
                }
            }
            return item
        })
        this.props.changeAttribute(product, newActiveAttributesItems)
    }

    render() {
        const {product, index, currentCurrency} = this.props
        const priceSign = currentCurrency.sign
        const price = product.prices?.find(price => price.currency === currentCurrency.name)
        const attributes = product.attributes.map((attr, index) => {
            const attrButtons = attr.items.map((attrItem, ind) => {
                const activeAttrItems = product.activeAttributes
                const isActiveButton = activeAttrItems.find(item => {
                    if (attr.name === item.attributeName) {
                        return item.id === attrItem.id
                    }
                    return false
                })
                if (attr.type === 'swatch') {
                    return (
                        <ColorButton active={isActiveButton}
                                     color={attrItem.value}
                                     key={attrItem.id}
                                     data-item-index={ind}
                                     data-attr-name={attr.name}>
                        </ColorButton>
                    )
                } else {
                    return (
                        <SizeButton active={isActiveButton}
                                    key={attrItem.id}
                                    data-item-index={ind}
                                    data-attr-name={attr.name}>
                            {attrItem.displayValue}
                        </SizeButton>
                    )
                }
            })
            return (
                <div key={attr.id} className="attributes__block">
                    <p className="info_title">{`${attr.name.toUpperCase()}:`}</p>
                    <div onClick={(e) => this.setActiveAttribute(e, attr, product)} className="attributes__buttons">
                        {attrButtons}
                    </div>
                </div>
            )
        })
        return (
            <CartOrder key={String(index)}>
                <div className="product">
                    <div className="product__title">
                        <Link to={`/card/:${product.name}`}>
                            <ProductTitle>{product.name}</ProductTitle>
                        </Link>
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
                        <div onClick={() => this.showPrevSlide(product)} className="arrow prev_arrow"></div>
                        <img src={product.gallery[this.state.activeSlide]} alt="img"/>
                        <div onClick={() => this.showNextSlide(product)} className="arrow next_arrow"></div>
                    </div>
                </OrderCounterBlock>
                <div onClick={() => this.deleteProduct(product)} className="delete__button">
                    <span>DELETE</span>
                </div>
            </CartOrder>
        )
    }
}