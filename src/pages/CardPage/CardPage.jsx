import React, {PureComponent} from 'react'
import {withRouter} from "react-router";
import {Container, ProductPrice, ProductTitle} from "../../components/StyledComponents/components/Common";
import {Button, ColorButton, SizeButton} from "../../components/StyledComponents/components/Common/Buttons";
import {addProduct, deleteProduct} from "../../redux/reducers/cartReducer";
import {connect} from "react-redux";
import {compose} from "redux";
import {Gallery, ProductContainer, ProductInfo} from "../../components/StyledComponents";


class CardPage extends PureComponent {

    state = {
        activeAttributesItems: [],
        availableAttributes: [],
        currentSize: null,
        currentProduct: null,
        activeImage: null,
        gallery: null
    }

    componentDidMount() {
        const {products} = this.props.category;
        const {match} = this.props;
        const currentProduct = products.find(product => product.name === match.params.productName.substr(1))
        const gallery = currentProduct.gallery.map(pic => {
            return (
                <figure key={pic}>
                    <img src={pic} alt=""/>
                </figure>
            )
        })
        const activeAttributesItems = currentProduct.attributes.map(attr => {
            const activeAttr = attr.items.find((item, index) => index === 0 && item)
                return {
                    ...activeAttr,
                    attributeName: attr.name
                }
        })
        this.setState({
            activeAttributesItems,
            availableAttributes: currentProduct.attributes,
            currentProduct,
            gallery,
            activeImage: currentProduct.gallery[0]
        })
    }

    setActiveImage = (e) => {
        if (e.target.src) {
            this.setState({
                activeImage: e.target.src
            })
        }
    }
    setActiveAttribute = (e, attr) => {
        const {itemIndex, attrName} = e.target.dataset
        const newActiveAttributesItems = this.state.activeAttributesItems.map((item, index) => {
            if (attrName === item.attributeName) {
                const changedItem = attr.items.find((_, ind) => ind === +itemIndex)
                return {
                    ...changedItem,
                    attributeName: attrName
                }
            }
            return item
        })

        this.setState({
            activeAttributesItems: newActiveAttributesItems
        })
    }
    addProduct = () => {
        if (this.state.currentProduct.inStock) {
            this.props.addProduct(this.state.currentProduct, this.state.activeAttributesItems)
        }
    }

    render() {
        const {currentCurrency} = this.props
        const {currentProduct, activeImage, gallery, availableAttributes, activeAttributesItems} = this.state
        const inStock = currentProduct && currentProduct.inStock
        const attributes = availableAttributes.map((attr, index) => {
            const attrButtons = attr.items.map((attrItem, ind) => {
                const isActiveButton = activeAttributesItems.find((item, i) => {
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
                                     data-attr-name={attr.name}
                                     data-item-index={ind}>
                        </ColorButton>
                    )
                } else {
                    return (
                        <SizeButton active={isActiveButton}
                                    key={attrItem.id}
                                    data-attr-name={attr.name}
                                    data-item-index={ind}>
                            {attrItem.displayValue}
                        </SizeButton>
                    )
                }
            })
            return (
                <div key={attr.id} className="attributes__block">
                    <p className="info_title">{`${attr.name.toUpperCase()}:`}</p>
                    <div onClick={(e) => this.setActiveAttribute(e, attr)}
                         className="attributes__buttons">
                        {attrButtons}
                    </div>
                </div>
            )
        })
        const price = currentProduct?.prices.find(price => price.currency === currentCurrency.name);
        const priceSign = currentCurrency.sign
        return (
            <Container>
                <ProductContainer>
                    <Gallery>
                        <div onClick={this.setActiveImage} className="gallery">
                            {gallery}
                        </div>
                        <div className="main_picture">
                            <img src={activeImage} alt=""/>
                        </div>
                    </Gallery>
                    <ProductInfo>
                        <ProductTitle>{currentProduct?.name}</ProductTitle>
                        {attributes}
                        <div className="price__block">
                            <p className="info_title">PRICE:</p>
                            <ProductPrice>{priceSign}{price?.amount}</ProductPrice>
                        </div>
                        <Button onClick={this.addProduct}
                                disabled={!inStock}
                                green>ADD TO CART</Button>
                        <div className="product__about" dangerouslySetInnerHTML={{__html:
                            currentProduct?.description}}>
                        </div>
                    </ProductInfo>
                </ProductContainer>
            </Container>
        );
    }
}

const mapStateToPros = (state) => {
    const {cartProducts, currentCurrency} = state.cart
    return {
        cartProducts,
        currentCurrency
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (product, activeAttributesItems) => {dispatch(addProduct(product, activeAttributesItems))},
        deleteProduct: (productName) => {dispatch(deleteProduct(productName))}
    }
}

export default compose(
    withRouter,
    connect(mapStateToPros, mapDispatchToProps)
)(CardPage)