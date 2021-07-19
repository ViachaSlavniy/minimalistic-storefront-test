import styled from "styled-components";

export const StyledHeader = styled.header`
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
export const Nav = styled.nav`
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
export const NavItem = styled.div`
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
export const CartBlock = styled.div`
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
export const ActiveCurrency = styled.div`
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
export const CurrenciesBlock = styled.div`
  padding: 20px 40px 20px 20px;
  position: absolute;
  top: 33px;
  left: -15px;
  z-index: 1;
  background-color: #fff;
  box-shadow: 0 4px 35px rgba(168, 172, 176, 0.19);
`;
export const Currency = styled.div`
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
export const MiniCart = styled.div`
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
    .view_bag_btn:hover {
      color: #fff;
      background-color: #000;
    }
    .check_out_btn {
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