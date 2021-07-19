import styled from "styled-components";

export const CartTitle = styled.p`
  padding: 80px 0 60px 0;
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
`;
export const CartContainer = styled.div`
  padding-bottom: 54px;
  max-width: 1100px;
`;

export const ProductContainer = styled.div`
  display: flex;
  padding-top: 80px;
`;
export const Gallery = styled.div`
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
export const ProductInfo = styled.div`
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

export const CartOrder = styled.div`
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
export const BlackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 80px);
  background-color: #393748;
  opacity: 0.22;
  display: ${props => props.active ? 'block' : 'none'};
  z-index: 1;
`;