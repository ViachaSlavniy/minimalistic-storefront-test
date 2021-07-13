import styled from "styled-components";

export const Container = styled.div`
  margin: 80px auto 0;
  max-width: 1240px;
`;

export const ProductTitle = styled.p`
  font-size: 30px;
  font-weight: 600;
  line-height: 27px;
`;

export const ProductSubTitle = styled(ProductTitle)`
  margin: 0;
  font-weight: 400;
`;

export const ProductPrice = styled(ProductTitle)`
  margin: 0;
  padding: 10px 0;
  font-weight: 700;
  font-size: 24px;
  line-height: 18px;
`;