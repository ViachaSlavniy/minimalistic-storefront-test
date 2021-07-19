import React, {PureComponent} from 'react'
import {Cart} from "../../../../assets/images";
import {connect} from "react-redux";
import {addProduct} from "../../../../redux/reducers/cartReducer";
import {Figcaption, Figure, OutOfStockBlock, Price, StyledCard} from "../../../../components/StyledComponents";


class CardItem extends PureComponent {

    addProduct = (e, product) => {
        e.preventDefault();
        const activeAttributes = product.attributes.map(attr => {
            return {
                ...attr.items[0],
                attributeName: attr.name
            }
        })
        this.props.addProduct(product, activeAttributes)
    }

    render() {
        const {name, gallery, prices, currentCurrency, disabled} = this.props
        const price = prices.find(price => price.currency === currentCurrency.name)
        const priceSign = currentCurrency.sign
        const image = gallery[0];
        return (
            <StyledCard disabled={disabled}>
                <Figure>
                    <img src={image} alt={name}/>
                    <Figcaption disabled={disabled}>{name}</Figcaption>
                    {disabled
                        ? (
                            <OutOfStockBlock>
                                OUT OF STOCK
                            </OutOfStockBlock>
                        )
                        : ''
                    }
                </Figure>
                <div onClick={(e) => this.addProduct(e, this.props)} className='cart__button'>
                    {Cart("#FFF")}
                </div>
                <Price disabled={disabled}>{priceSign}{price?.amount}</Price>
            </StyledCard>
        )
    }
}

const mapStateToPros = (state) => {
    const {currentCurrency} = state.cart
    return {
        currentCurrency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (prod, activeAttr) => {dispatch(addProduct(prod, activeAttr))},
    }
}

export const Card = connect(mapStateToPros, mapDispatchToProps)(CardItem)