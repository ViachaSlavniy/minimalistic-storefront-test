import React from 'react'
import styled from "styled-components";
import {Cart, Logo} from '../../assets/images'
import {graphql} from "@apollo/client/react/hoc";
import {Link} from "react-router-dom";
import {GET_CURRENCIES} from "../../api/queries";
import {Button, SmallButtonSize, SmallColorButton} from "../Common/Buttons";

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  font-weight: 400;
  width: 100%;
  box-shadow: 0 4px 35px rgb(168 172 176 / 19%);

  background-color: #fff;

  .header__wrapper {
    max-width: 1240px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 240px;
  height: 60px;

  a {
    width: 100px;
    text-align: center;
    text-decoration: none;

  }
`;
const NavItem = styled.div`
  position: relative;
  text-decoration: none;
  width: 100%;
  color: ${props => props.active ? "#5ECE7B" : "#1D1F22"};
  font-weight: ${props => props.active ? 600 : 400};
  font-size: 16px;
  line-height: 19.2px;

  &:after {
    display: ${props => props.active ? 'block' : 'none'};
    position: absolute;
    content: '';
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #5ECE7B;
  }

  &:hover {
    font-weight: 600;
    color: #5ECE7B;
  }
`;
const CartBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 60px;
  cursor: pointer;

  .minicart__wrapper {
    position: relative;
  }

  .cart__wrapper {
    position: relative;
  }

  .cart__wrapper_circle {
    display: flex;
    align-items: center;
    justify-content: center;

    position: absolute;
    top: -10px;
    left: 13px;

    width: 20px;
    height: 20px;
    border-radius: 50%;

    background-color: #000;
    font-family: Roboto;
    font-weight: 700;
    font-size: 14px;
    line-height: 16.4px;
    color: #fff;
  }
`;
const ActiveCurrency = styled.div`
  width: 25px;
  position: relative;
  cursor: pointer;

  &:after {
    position: absolute;
    top: 0;
    right: -5px;
    content: '>';
    transition: all .2s ease-in-out;
    transform: ${props => props.activeCurrencyBLock ? 'rotate(-90deg)' : 'rotate(90deg)'};
  }
`;
const CurrenciesBlock = styled.div`
  padding: 20px 40px 20px 20px;
  position: absolute;
  top: 33px;
  left: -15px;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 4px 35px rgba(168, 172, 176, 0.19);
`;
const Currency = styled.div`
  font-weight: 500;
  font-size: 18px;
  line-height: 28.8px;
  color: ${props => props.active && '#5ECE7B'};

  .currency__sign {
    margin-right: 5px;
  }

  &:hover {
    color: #5ECE7B;
  }
`;
const MiniCart = styled.div`
  padding: 8px 16px 20px;
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1000;
  display: ${props => props.isOpenMiniCart ? 'block' : 'none'};
  cursor: auto;

  width: 325px;
  max-height: calc(100vh - 80px);
  overflow-y: auto;
  background-color: #fff;
  

  .minicart__title {
    font-weight: 700;
    font-size: 16px;
    line-height: 25.6px;
  }

  .minicart__text {
    font-weight: 500;
    font-size: 16px;
    line-height: 25.6px;
  }

  .minicart__buttons {
    display: flex;

    button {
      padding: 0;
      width: 143px;
      height: 43px;
      font-size: 14px;
      line-height: 16.8px;
    }

    .right_btn {
      margin-left: 12px;
    }
  }

  .minicart__total_price {
    margin: 50px 0 35px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .total_price__title {
      font-family: Roboto;
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
    }

    .total_price__cash {
      font-weight: 700;
      font-size: 16px;
      line-height: 25.6px;
    }
  }

  .minicart__items {
    margin: 25px 0 40px 0;

    .minicart__item {
      margin-bottom: 40px;
      display: flex;
      justify-content: space-between;
      
      .item__info {
        width: 125px;

        .item__title {
          margin-bottom: 5px;
          font-weight: 300;
          font-size: 16px;
          line-height: 25.6px;
        }

        .item__attributes_buttons {
          display: flex;
          flex-direction: column;
          
          .attributes__block {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .info_title {
              margin-right: 10px;
            }
          }
          .attributes__block + .attributes__block {
            margin-top: 10px;
          }
        }

        .item__price {
          margin-bottom: 15px;
          font-weight: 500;
          font-size: 16px;
          line-height: 25.6px;
        }
      }

      .item__gallery {
        display: flex;
        justify-content: space-between;

        .counter {
          margin-right: 10px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          
          button {
            width: 24px;
          }
        }

        .gallery {
          width: 105px;
          height: 137px;

          img {
            object-fit: contain;
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
`;


class Header extends React.Component {
    state = {
        activeCurrencyBLock: false,
        availableCurrencies: [],
        activeCurrency: {},
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
                        default: return getCurrencyObj(curr, '$')
                    }
                })
                this.setState({availableCurrencies})
                this.props.setCurrency(availableCurrencies[0])
            }
        }

    }


    setCurrency = (curr) => {
        this.props.setCurrency(curr)
    }
    increment = (prod) => {
        this.props.increment(prod);
    }
    decrement = (prod) => {
        this.props.decrement(prod);
    }
    openMiniCart = () => {
        const {history, location} = this.props
        const search = location.search
        history.push({
            search: search ? '' : 'openMiniCart',
        });
    }

    getCategories = (uniqueCategories) => {
        let stack = []
        for (let cat of uniqueCategories) {
            stack.push(cat);
        }
        return stack
    }

    render() {
        const currencies = this.state.availableCurrencies
        const {cartProducts, currentCurrency, totalPrice, location} = this.props
        const activeNav = location.pathname.substr(1)
        const search = location.search.substr(1)
        const priceSign = currentCurrency.sign
        const cartProductItems = cartProducts.map((product, i) => {
                const price = product.prices?.find(price => price.currency === currentCurrency.name)
                const attributes = product.attributes.map((attr, index) => {
                    const attrButtons = attr.items.map((attrItem, ind) => {
                        const activeAttrItems = product.activeAttributes
                        const isActiveButton = activeAttrItems.find(item => item.id === attrItem.id)
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
            }
        )
        const
            uniqueCategories = new Set(this.props.category.products.map(product => {
                return product.category
            }))
        const
            categories = this.getCategories(uniqueCategories)


        return (

            <StyledHeader>
                <div className="header__wrapper">
                    <Nav>
                        <Link to={
                            `/all`
                        }

                        >
                            <NavItem active={activeNav === 'all'}>ALL</NavItem>
                        </Link>
                        {
                            categories.map(cat => {
                                const firstLetter = cat[0].toUpperCase();
                                const newName = firstLetter + cat.substr(1).toUpperCase()
                                return (
                                    <Link key={cat} to={`/${cat}`}>
                                        <NavItem active={activeNav === cat}>{newName}</NavItem>
                                    </Link>
                                )
                            })
                        }
                    </Nav>
                    <div>
                        {Logo()}
                    </div>
                    <CartBlock>
                        <ActiveCurrency
                            onClick={() => this.setState({activeCurrencyBLock: !this.state.activeCurrencyBLock})}
                            activeCurrencyBLock={this.state.activeCurrencyBLock}
                        >
                            {this.state.activeCurrency.sign}
                            {this.state.activeCurrencyBLock
                                ? (
                                    <CurrenciesBlock>
                                        {currencies?.map(curr => {
                                            return (
                                                <Currency onClick={() => this.setCurrency(curr)}
                                                          key={curr.sign}
                                                          active={curr.name === this.state.activeCurrency.name}
                                                >
                                                    <span className="currency__sign">{curr.sign}</span>
                                                    <span>{curr.name}</span>
                                                </Currency>
                                            )
                                        })}
                                    </CurrenciesBlock>
                                )
                                : ''
                            }
                        </ActiveCurrency>
                        <div className="minicart__wrapper">
                            <div className="cart__wrapper"
                                 onClick={this.openMiniCart}>
                                {cartProducts.length
                                    ? <div className="cart__wrapper_circle">{cartProducts.length}</div>
                                    : ''
                                }
                                {Cart()}
                            </div>
                            <MiniCart isOpenMiniCart={search}>
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
                                        <Button>VIEW BAG</Button>
                                    </Link>
                                    <Button className="right_btn" green>CHECK OUT</Button>
                                </div>
                            </MiniCart>
                        </div>
                    </CartBlock>
                </div>
            </StyledHeader>
        )
    }
}

export default graphql(GET_CURRENCIES)(Header)