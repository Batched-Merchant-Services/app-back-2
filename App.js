import React, { useEffect, useState, useRef } from 'react';
import { YellowBox, StatusBar, AppState } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import UserInactivity from 'react-native-user-inactivity';
import AppContainer from '@navigation';
import NavigationService from './NavigationService';
import store from '@store';
import { ModalInactive } from '@components';
import LocalStorage from '@utils/localStorage';
import { getValidateSession } from './src/utils/api/graph_api/sesion.service';

const timer = require('react-native-timer');

YellowBox.ignoreWarnings(['Remote debugger', 'Module RNSecureKeyStore']); // We know, use remote debugger might slow down app performance...


class App extends React.Component {
    state = {
        ready: false,
        store: null,
        active: true,
        isRechargeUserModalOpened: false,
        appState: AppState.currentState,
        timePassed: false,
        timeValid: false,
        validateToken: false,
    };


    async componentDidMount() {
        this.setState({ ready: true, store: await store, isRechargeUserModalOpened: false });
        AppState.addEventListener('change', this._handleAppStateChange);
        timer.clearTimeout(this, 'timePassed');
        timer.setTimeout(
            this, 'timeValid', () => this.setState({
                validateToken: true,
            }), 250000
        );
    }

    async componentDidUpdate() {
        const ModalOpen = global.store.getState().app.modalState === 'closing' ? false : true;
        const sinIn = global.store.getState().app.navigationIn;
        if (this.state.validateToken && sinIn) {
            const token = await LocalStorage.get('auth_token');
            const response = await getValidateSession(token);
            if (!response.getValidateSession) {
                this.setState({ validateToken: false });
                timer.clearTimeout(this, 'timeValid');
            }
            timer.setTimeout(
                this, 'timeValid', () => this.setState({
                    validateToken: true,
                }), 250000
            );
        }
    }

    async handleExitPress() {

        global.store.dispatch({
            type: 'SET_IS_MODAL_OPEN',
            payload: 'closing'
        });
        global.store.dispatch({
            type: 'SET_IS_NAVIGATION_IN',
            payload: false
        });

        NavigationService.navigate.navigate('Login');

        NavigationService.dispatch(NavigationService.closeDrawer());
    }


    _handleAppStateChange = async (nextAppState) => {
        const ModalOpen = global.store.getState().app.modalState === 'closing' ? false : true;
        const sinIn = global.store.getState().app.navigationIn;
        if (nextAppState.match(/inactive|background/)) {

            timer.setTimeout(
                this, 'timePassed', () => this.setState({
                    isRechargeUserModalOpened: ModalOpen,
                }), 270000
            );
        } else if (nextAppState === 'active' || this.state.appState === 'active') {
            timer.clearTimeout(this, 'timePassed');
        }
        this.setState({ appState: nextAppState });

    };

    onAction = async (active) => {
        const ModalOpen = global.store.getState().app.modalState === 'closing' ? false : true;
        const sinIn = global.store.getState().app.navigationIn;
        setTimeout(() => {
            if (!active) {
                this.setState({
                    isRechargeUserModalOpened: ModalOpen,
                });
            }
        }, 1000);
    }


    render() {
        const { isRechargeUserModalOpened } = this.state;
        if (this.state.ready) {
            global.store = this.state.store;
            const theme = { colors: {}, images: {} };
            return (
                <ReduxProvider store={this.state.store}>
                    <UserInactivity
                        timeForInactivity={270000}
                        onAction={this.onAction}
                    >
                        <StatusBar
                            translucent={true} backgroundColor={'transparent'}
                        />
                        <AppContainer screenProps={theme} ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef); }} />
                        <ModalInactive
                            isOpen={isRechargeUserModalOpened}
                            onEnter={() => {
                                this.setState({ isRechargeUserModalOpened: false });
                            }}
                            onClose={() => {
                                this.setState({ isRechargeUserModalOpened: false });
                                NavigationService.navigate('Login', { page: 'modalUser' });
                                global.store.dispatch({
                                    type: 'SET_IS_NAVIGATION_IN',
                                    payload: false
                                });
                                global.store.dispatch({
                                    type: 'SET_IS_MODAL_OPEN',
                                    payload: 'closing',
                                });
                            }}
                        />
                    </UserInactivity>
                </ReduxProvider>
            );
        }
        return null;
    }
}

export default App;