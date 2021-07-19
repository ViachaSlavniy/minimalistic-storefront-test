import styled from "styled-components";

export const StyledCard = styled.div`
    position: relative;
    z-index: 0;
    margin-bottom: 103px;
    width: 386px;
    height: 444px;
    padding: 16px;
    opacity: ${props => props.disabled ? 0.5 : 1};

    &:hover {
      box-shadow: 0 4px 35px rgba(168, 172, 176, 0.19);
    }
    &:hover .cart__button {
      opacity: ${props => props.disabled ? 0 : 1};
    }

    .cart__button {
      position: absolute;
      bottom: 52px;
      right: 31px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background-color: #5ECE7B;
      opacity: 0;

      &:hover {
        cursor: ${props => props.disabled ? "auto": 'pointer'};
      }

    }
`;
export const OutOfStockBlock = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  font-weight: 400;
  line-height: 38.4px;
  color: #8D8F9A;
`;
export const Figure = styled.figure`
    width: 350px;
    height: 350px;
    position: relative;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
`;
export const Figcaption = styled.figcaption`
    margin-top: 10px;
    font-weight: 300;
    font-size: 18px;
    line-height: 28.8px;
    color: ${props => props.disabled ? "#8D8F9A" : "#1D1F22"};;
`;
export const Price = styled.div`
    padding-top: 40px;
    font-weight: 500;
    line-height: 28.8px;
    color: ${props => props.disabled ? "#8D8F9A" : "#1D1F22"};
`;