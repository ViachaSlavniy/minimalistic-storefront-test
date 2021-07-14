import React from 'react'
import styled from "styled-components";
import {withRouter} from "react-router";
import {Container, ProductPrice, ProductTitle} from "../../components/Common";
import {Button, ColorButton, SizeButton} from "../../components/Common/Buttons";
import {addProduct, deleteProduct} from "../../redux/reducers/cartReducer";
import {connect} from "react-redux";
import {compose} from "redux";

const ProductContainer = styled.div`
  display: flex;
  padding-top: 80px;
`;
const Gallery = styled.div`
  display: flex;
  width: 720px;

  .gallery {
    display: flex;
    flex-direction: column;

    figure {
      margin: 0 40px 30px 0;
      width: 80px;
      height: 80px;
      border: 1px solid #000;
      cursor: pointer;

      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
    }
  }

  .main_picture {
    width: 100%;
    height: 700px;

    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;
const ProductInfo = styled.div`
  width: 292px;
  margin-left: 100px;

  .attributes__block {
    margin-top: 43px;
  }
  .attributes__buttons {
    display: flex;
    
    button + button {
      margin-left: 12px;
    }
  }

  .info_title {
    margin-bottom: 10px;
    font-family: "Roboto Condensed";
    font-weight: 700;
    font-size: 18px;
    line-height: 18px;
  }

  .price__block {
    margin: 40px 0 20px 0;
  }

  .product__about {
    margin-top: 40px;
    font-family: Roboto;
    font-weight: 400;
    font-size: 16px;
    line-height: 25.6px;
    
    h3 {
      margin-top: 15px;
    }
    
    p {
      margin-top: 20px;
    }
  }
`;


class CardPage extends React.Component {

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
        this.props.addProduct(this.state.currentProduct, this.state.activeAttributesItems)
    }


    render() {
        const {currentProduct, activeImage, gallery, availableAttributes, activeAttributesItems} = this.state
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
                    <div onClick={(e) => this.setActiveAttribute(e, attr)} className="attributes__buttons">
                        {attrButtons}
                    </div>
                </div>
            )
        })
        const price = currentProduct?.prices.find(price => price.currency === this.props.currentCurrency.name);
        const priceSign = this.props.currentCurrency.sign
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
                        <Button onClick={this.addProduct} green>ADD TO CART</Button>
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

export default compose(
    withRouter,
    connect(mapStateToPros, mapDispatchToProps)
)(CardPage)