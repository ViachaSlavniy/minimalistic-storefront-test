import React, {PureComponent} from 'react'
import styled from "styled-components";
import {Card} from "./components/Card/Card";
import {Container} from "../../components/Common";
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";


const Header = styled.h1`
  padding: 80px 0 103px;
  font-weight: 400;
`;
const CardContainer = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    
    a {
      text-decoration: none;
      cursor: auto;
    }
`;

class MainPage extends PureComponent {

    render() {
        const {match} = this.props;
        const category = match.params?.category || 'all'
        const {products} = this.props.category
        const categoryName = () => {
            const firstLetter = category[0].toUpperCase();
            return firstLetter + category.substr(1);
        }
        const cards = products.map((product, ind) => {
            if (product.category === category || category === 'all') {
                if (product.inStock) {
                    return (
                        <NavLink key={String(ind)}
                                 to={`/card/:${product.name}`}>
                            <Card {...product}/>
                        </NavLink>
                    )
                } else {
                    return (
                        <Card key={String(ind)}
                              disabled={!product.inStock}
                              {...product}/>
                    )
                }
            }

        })
        return (
            <Container>
                <Header>{categoryName()}</Header>
                <CardContainer>
                    {cards}
                </CardContainer>
            </Container>
        )
    }
}

export const MainWithRouter = withRouter(MainPage)