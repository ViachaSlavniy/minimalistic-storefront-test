import React, {PureComponent} from 'react'
import {Card} from "./components/Card/Card";
import {Container} from "../../components/StyledComponents/components/Common";
import {NavLink} from "react-router-dom";
import {Redirect, withRouter} from "react-router";
import {CardContainer, Header} from "../../components/StyledComponents";


class MainPage extends PureComponent {

    render() {
        const {match, categoriesName} = this.props;
        const category = match.params?.category
        const {products} = this.props.category
        const isAvailableCategory = categoriesName.some(cat => cat === category)
        if (!isAvailableCategory) {
            return <Redirect to="/"/>
        }
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
                        <NavLink key={String(ind)}
                                 to={`/card/:${product.name}`}>
                            <Card disabled={!product.inStock}
                                  {...product}/>
                        </NavLink>
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