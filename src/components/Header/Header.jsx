import React, {PureComponent} from 'react'
import {Cart, Logo} from '../../assets/images'
import {graphql} from "@apollo/client/react/hoc";
import {Link} from "react-router-dom";
import {GET_CURRENCIES} from "../../api/queries";
import {Button, SmallButtonSize, SmallColorButton} from "../StyledComponents/components/Common/Buttons";
import {decrement, deleteProduct, increment, setCurrency} from "../../redux/reducers/cartReducer";
import {compose} from "redux";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {
    ActiveCurrency,
    CartBlock,
    CurrenciesBlock,
    Currency,
    MiniCart,
    Nav,
    NavItem,
    StyledHeader
} from "../StyledComponents";

class Header extends PureComponent {
    state = {
        activeCurrencyBLock: false,
        availableCurrencies: [],
        activeCurrency: {},
    }

    componentDidMount() {
        document.body.addEventListener('click', this.hideAllModal)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({activeCurrency: this.props.currentCurrency})
        }
        if (prevState === this.state) {
            const {loading, currencies} = this.props.data;
            let availableCurrencies = []
            const getCurrencyObj = (curr, sign) => {
                return availableCurrencies.push({
                    name: curr,
                    sign: `${sign}`
                })
            }
            if (!loading && this.state.availableCurrencies.length === 0) {
                currencies.forEach(curr => {
                    switch (curr) {
                        case 'USD':
                            return getCurrencyObj(curr, '$')
                        case 'RUB':
                            return getCurrencyObj(curr, '₽')
                        case 'GBP':
                            return getCurrencyObj(curr, '£')
                        case 'AUD':
                            return getCurrencyObj(curr, 'A$')
                        case 'JPY':
                            return getCurrencyObj(curr, '¥')
                        default:
                            return getCurrencyObj(curr, '$')
                    }
                })
                this.setState({availableCurrencies})
                this.props.setCurrency(availableCurrencies[0])
            }
        }
    }

    hideAllModal = () => {
        const {history} = this.props
        history.push({
            search: '',
        });
    }

    componentWillUnmount() {
        document.body.removeEventListener('click', this.hideAllModal)
    }


    setCurrency = (curr) => {
        this.props.setCurrency(curr)
    }
    increment = (prod) => {
        this.props.increment(prod);
    }
    decrement = (prod) => {
        if (prod.count === 1) this.props.deleteProduct(prod)
        this.props.decrement(prod);
    }

    toggleVisibilityMiniCart = () => {
        const {history, location} = this.props
        const search = location.search
        history.push({
            search: search !== '?openMiniCart' ? 'openMiniCart' : '',
        });
    }

    toggleVisibilityCurrencyBlock = (e) => {
        e.stopPropagation()
        const {history, location} = this.props
        const search = location.search
        history.push({
            search: search !== '?openCurrencyBlock' ? 'openCurrencyBlock' : '',
        });
    }

    checkOut = () => {
        alert('Your order is accepted!')
    }

    render() {
        const {availableCurrencies, activeCurrency} = this.state
        const {cartProducts, currentCurrency, totalPrice, location, categoriesName} = this.props
        const activeNav = location.pathname.substr(1)
        const searchQuery = location.search.substr(1)
        const isOpenMiniCart = searchQuery === 'openMiniCart'
        const isOpenCurrencyBlock = searchQuery === 'openCurrencyBlock'
        const priceSign = currentCurrency.sign
        const cartProductItems = cartProducts.map((product, i) => {
                const price = product.prices?.find(price => price.currency === currentCurrency.name)
                const attributes = product.attributes.map((attr, index) => {
                    const attrButtons = attr.items.map((attrItem, ind) => {
                        const activeAttrItems = product.activeAttributes
                        const isActiveButton = activeAttrItems.find(item => {
                            if (attr.name === item.attributeName) {
                                return item.id === attrItem.id
                            }
                        })
                        if (attr.type === 'swatch') {
                            if (isActiveButton) {
                                return (
                                    <SmallColorButton
                                        color={attrItem.value}
                                        key={attrItem.id}
                                        data-item-index={ind}
                                        data-attr-index={index}>
                                    </SmallColorButton>
                                )
                            }
                        } else {
                            if (isActiveButton) {
                                return (
                                    <div key={attrItem.id}>
                                        {attrItem.displayValue}
                                    </div>
                                )
                            }
                        }
                    })
                    return (
                        <div key={attr.id} className="attributes__block">
                            <p className="info_title">{`${attr.name}:`}</p>
                            <div className="attributes__buttons">
                                {attrButtons}
                            </div>
                        </div>
                    )
                })
                return (
                    <div key={String(i)} className="minicart__item">
                        <div className="item__info">
                            <div className="item__title">
                                <p>{product.name}</p>
                            </div>
                            <div className="item__price">
                                <p>{priceSign}{price?.amount}</p>
                            </div>
                            <div className="item__attributes_buttons">
                                {attributes}
                            </div>
                        </div>
                        <div className="item__gallery">
                            <div className="counter">
                                <SmallButtonSize onClick={() => this.increment(product)}>+</SmallButtonSize>
                                <p className="count">{product.count}</p>
                                <SmallButtonSize onClick={() => this.decrement(product)}>-</SmallButtonSize>
                            </div>
                            <div className="gallery">
                                <img src={product.gallery[0]} alt=""/>
                            </div>
                        </div>
                    </div>
                )
            })
        const navCategories = categoriesName.map(cat => {
            const firstLetter = cat[0].toUpperCase();
            const newName = firstLetter + cat.substr(1).toUpperCase()
            return (
                <Link key={cat} to={`/${cat}`}>
                    <NavItem active={activeNav === cat}>{newName}</NavItem>
                </Link>
            )
        })
        const curriencies = availableCurrencies?.map(curr => {
            return (
                <Currency onClick={() => this.setCurrency(curr)}
                          key={curr.sign}
                          active={curr.name === activeCurrency.name}
                >
                    <span className="currency__sign">{curr.sign}</span>
                    <span>{curr.name}</span>
                </Currency>
            )
        })
        return (
            <StyledHeader>
                <div className="header__wrapper">
                    <Nav>
                        {navCategories}
                    </Nav>
                    <div>
                        {Logo()}
                    </div>
                    <CartBlock>
                        <ActiveCurrency
                            onClick={(e) => this.toggleVisibilityCurrencyBlock(e)}
                            activeCurrencyBLock={isOpenCurrencyBlock}
                        >
                            {activeCurrency.sign}
                            {isOpenCurrencyBlock
                                ? (
                                    <CurrenciesBlock>
                                        {curriencies}
                                    </CurrenciesBlock>
                                )
                                : ''
                            }
                        </ActiveCurrency>
                        <div className="minicart__wrapper" onClick={(e) => e.stopPropagation()}>
                            <div className="cart__wrapper"
                                 onClick={this.toggleVisibilityMiniCart}>
                                {cartProducts.length
                                    ? <div className="cart__wrapper_circle">{cartProducts.length}</div>
                                    : ''
                                }
                                {Cart()}
                            </div>
                            <MiniCart isOpenMiniCart={isOpenMiniCart}>
                                <div>
                                    <span className="minicart__title">My Bag</span>
                                    <span className="minicart__text">, {cartProducts.length} items</span>
                                </div>
                                <div className="minicart__items">
                                    {cartProductItems}
                                </div>
                                <div className="minicart__total_price">
                                    <span className="total_price__title">Total</span>
                                    <span className="total_price__cash">{priceSign}{totalPrice}</span>
                                </div>
                                <div className="minicart__buttons">
                                    <Link to="/cart">
                                        <Button className="view_bag_btn">VIEW BAG</Button>
                                    </Link>
                                    <Button onClick={() => this.checkOut(cartProducts)} className="check_out_btn" green>CHECK OUT</Button>
                                </div>
                            </MiniCart>
                        </div>
                    </CartBlock>
                </div>
            </StyledHeader>
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
        setCurrency: (currency) => dispatch(setCurrency(currency)),
        increment: (prod) => {
            dispatch(increment(prod))
        },
        decrement: (prod) => {
            dispatch(decrement(prod))
        },
        deleteProduct: (prod) => {
            dispatch(deleteProduct(prod))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter,
    graphql(GET_CURRENCIES)
)(Header)