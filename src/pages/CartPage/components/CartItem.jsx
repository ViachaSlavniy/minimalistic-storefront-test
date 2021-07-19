import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import {ColorButton, MediumButtonCount, SizeButton} from "../../../components/StyledComponents/components/Common/Buttons";
import {ProductPrice, ProductTitle} from "../../../components/StyledComponents/components/Common";
import {CartOrder, OrderCounterBlock} from "../../../components/StyledComponents";


export class CartItem extends PureComponent {
    state = {
        activeSlideIndex: 0
    }

    increment = (prod) => {
        this.props.increment(prod);
    }
    decrement = (prod) => {
        if (prod.count === 1) {
            this.props.deleteProduct(prod)
        }
        this.props.decrement(prod);
    }
    showPrevSlide = () => {
        const {activeSlideIndex} = this.state
        if (activeSlideIndex !== 0) {
            this.setState({activeSlideIndex: activeSlideIndex - 1})
        }
    }
    showNextSlide = (prod) => {
        const gallery = prod.gallery;
        const {activeSlideIndex} = this.state
        if (activeSlideIndex !== (gallery.length - 1)) {
            this.setState({activeSlideIndex: activeSlideIndex + 1})
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
        const {activeSlideIndex} = this.state
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
                        <img src={product.gallery[activeSlideIndex]} alt="img"/>
                        <div onClick={() => this.showNextSlide(product)} className="arrow next_arrow"></div>
                    </div>
                </OrderCounterBlock>
            </CartOrder>
        )
    }
}