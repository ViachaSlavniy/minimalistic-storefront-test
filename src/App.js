import React from 'react';
import {MainWithRouter} from "./pages/MainPage/MainPage";
import {Redirect, Route, Switch, withRouter} from "react-router";
import {graphql} from "@apollo/client/react/hoc";
import CartPageContainer from "./pages/CartPage/CartPageContainer";
import CardPageContainer from "./pages/CardPage/CardPageContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import {GET_CATEGORIES_QUERY} from "./api/queries";
import styled from "styled-components";
import './App.css';
import {compose} from "redux";

const BlackContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #393748;
  opacity: 0.22;
  display: ${props => props.active ? 'block' : 'none'};
  z-index: 1;
`;

class App extends React.Component {

    render() {
        const {loading, category} = this.props.data;
        const search = this.props.location?.search.substr(1);
        return (
            <div className="App">
                {loading
                    ? 'LOADING...'
                    : (
                        <>
                            <BlackContainer active={search === 'openMiniCart'}/>
                            <HeaderContainer category={category}/>
                            <Switch>
                                <Route path={`/card/:productName`}
                                       render={() => <CardPageContainer category={category}/>}/>
                                <Route path="/cart" render={() => <CartPageContainer/>}/>
                                <Route path="/:category" render={() => <MainWithRouter category={category}/>}/>
                                <Redirect from="/" to="/all"/>/>
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
