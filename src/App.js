import React from 'react';
import {MainWithRouter} from "./pages/MainPage/MainPage";
import {Redirect, Route, Switch, withRouter} from "react-router";
import {graphql} from "@apollo/client/react/hoc";
import {GET_CATEGORIES_QUERY} from "./api/queries";
import styled from "styled-components";
import './App.css';
import {compose} from "redux";
import CartPage from "./pages/CartPage/CartPage";
import CardPage from "./pages/CardPage/CardPage";
import Header from "./components/Header/Header";

const BlackContainer = styled.div`
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

class App extends React.Component {

    getCategories = (uniqueCategories) => {
        let stack = ['all']
        for (let cat of uniqueCategories) {
            stack.push(cat);
        }
        return stack
    }

    render() {
        const {loading, category} = this.props.data;
        const search = this.props.location?.search.substr(1);
        const uniqueCategories = new Set(category?.products.map(product => {
            return product.category
        }))
        const categories = this.getCategories(uniqueCategories)
        return (
            <div className="App">
                {loading
                    ? 'LOADING...'
                    : (
                        <>
                            <BlackContainer active={search === 'openMiniCart'}/>
                            <Header categoriesName={categories} category={category}/>
                            <Switch>
                                <Route path={`/card/:productName`}
                                       render={() => <CardPage category={category}/>}/>
                                <Route path="/cart" render={() => <CartPage/>}/>
                                <Route path="/:category" render={() => <MainWithRouter categoriesName={categories}
                                                                                       category={category}/>}/>
                                <Redirect from="/*" to="/all"/>
                            </Switch>
                        </>
                    )
                }
            </div>
        );
    }
}

export default compose(
    withRouter,
    graphql(GET_CATEGORIES_QUERY)
)(App)
