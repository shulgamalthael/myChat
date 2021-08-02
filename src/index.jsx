import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './redux-store/store.js';
import App from './components/App.jsx';

//ws://10.217.153.98:8082/
//wss://echo.websocket.org/
const ws = new WebSocket('wss://echo.websocket.org/');
ws.onopen = () => console.log('Opened');
ws.onclose = () => console.log('Closed');
ws.onerror = e => console.log(e.data);

const Wrapper = () => {
    const loginnedUser = 'shulgamalthael';

    return(
            <Switch>
                <Route 
                    exact path="/" 
                    render={() => <Redirect to={`/${loginnedUser}/conversations/Example`} />} 
                />
                <Route 
                    path={`/${loginnedUser}/conversations/:id`}
                >
                    <App ws={ws} />
                </Route>
            </Switch>
    )

}
ReactDOM.render(
    <HashRouter>
        <Provider store={store}>
            <Wrapper />
        </Provider>
    </HashRouter>,
    document.getElementById('root')
);