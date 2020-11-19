import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import GlobalStyle from './styles/GlobalStyle';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
            </Switch>
            <GlobalStyle/>
        </BrowserRouter>
    );
}