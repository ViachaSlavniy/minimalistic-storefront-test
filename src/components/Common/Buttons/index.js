import styled from 'styled-components'

export const Button = styled.button`
  padding: 16px 32px;
  
  width: 292px;
  height: 52px;
  
  background-color: ${props => props.green ? "#5ECE7B" : "#fff"};
  color: ${props => props.green ? "#fff" : "#1D1F22"};
  border: ${props => props.green ? "none" : "1px solid #1D1F22"};
  
  transition: all .2s linear;
  
  font-family: Raleway;
  font-size: 16px;
  line-height: 17px;
  font-weight: 600;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.green && "#4faf6a"};
  }
`;

export const SizeButton = styled.button`
  width: 63px;
  height: 45px;
  border: ${props => props.disabled ? "1px solid #A6A6A6" : "1px solid #1D1F22"};
  background-color: ${props => props.active ? "#1D1F22" : "#fff"};
  color: ${props => props.disabled ? "#A6A6A6" : props.active ? "#fff" : "#1D1F22"};
  
  font-family: Source Sans Pro;
  font-size: 16px;
  line-height: 22.4px;
  font-weight: 400;
  cursor: pointer;
  
  &:hover {
    background-color: #1D1F22;
    color: #fff;
  }
`;

export const ColorButton = styled(SizeButton)`
    width: 45px;
    border: ${props => props.active ? "4px solid #A6A6A6" : "1px solid #1D1F22"};
    background-color: ${props => props.color ? props.color : "#fff"};
    opacity: ${props => props.disabled ? "0.7" : 1};

    &:hover {
      background-color: ${props => props.color ? props.color : "#fff"};
      border: 4px solid #A6A6A6;
    }
`;

export const SmallColorButton = styled.button`
    width: 24px;
    height: 24px;
    border: none;
    background-color: ${props => props.color ? props.color : "#fff"};
`;

export const SmallButtonSize = styled(SizeButton)`
  height: 24px;
  font-size: 14px;
  border: ${props => props.disabled ? "1px solid #A6A6A6" : "1px solid #1D1F22"};
  background-color: ${props => props.disabled ? "#EDEDED" : "#fff"};
  color: ${props => props.disabled ? "#A6A6A6" : "#1D1F22"};
`;

export const MediumButtonCount = styled(SizeButton)`
  width: 45px;
  height: 45px;
  font-size: 30px;
  border: ${props => props.disabled ? "1px solid #A6A6A6" : "1px solid #1D1F22"};
  background-color: ${props => props.disabled ? "#EDEDED" : "#fff"};
  color: ${props => props.disabled ? "#A6A6A6" : "#1D1F22"};
`;