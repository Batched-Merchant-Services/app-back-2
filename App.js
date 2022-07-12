import React from 'react';
import { YellowBox, StatusBar,AppState} from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import UserInactivity from 'react-native-user-inactivity';
import AppContainer from '@navigation';
import NavigationService from './NavigationService';
import store from '@store';
import {ModalInactive} from '@components';
const timer = require('react-native-timer');


YellowBox.ignoreWarnings(['Remote debugger', 'Module RNSecureKeyStore']); // We know, use remote debugger might slow down app performance...


class App extends React.Component {
  
  state = { 
    ready                    : false,
    store                    : null,
    active                   : true,
    isRechargeUserModalOpened: false,
    appState                 : AppState.currentState,
    timePassed               : false
  };

  
  async componentDidMount() {

    this.setState({ ready: true, store: await store,isRechargeUserModalOpened: false });
    AppState.addEventListener('change',this._handleAppStateChange);
    timer.clearTimeout(this,'timePassed');

  }

  
  _handleAppStateChange = async(nextAppState) =>{

    const ModalOpen = global.store.getState().app.modalState === 'closing'? false:  true;
    if (nextAppState.match(/inactive|background/)) {

      timer.setTimeout(
        this, 'timePassed', () =>  this.setState({
          isRechargeUserModalOpened: ModalOpen,
        }), 250000
      );
    }else if(nextAppState === 'active' || this.state.appState === 'active' ){
      timer.clearTimeout(this,'timePassed');
    }
    
    this.setState({appState: nextAppState});

  };

  onAction = (active) => {
    console.log('onAction')
    const ModalOpen =global.store.getState().app.modalState === 'closing'? false:  true;
    if (!active ) {
      this.setState({
        isRechargeUserModalOpened: ModalOpen,
      });
    }else{
      this.setState({
        isRechargeUserModalOpened: ModalOpen,
      });
    }
  }  

  render() {
    const {isRechargeUserModalOpened}= this.state;
    if (this.state.ready) {
      global.store = this.state.store; 
      const theme = this.state.store.getState().user?.Theme;
      return (
        <ReduxProvider store={this.state.store}>
          <UserInactivity
            timeForInactivity={250000}
            onAction={this.onAction}
          >
            <StatusBar
                translucent={true} backgroundColor={'transparent'}
            />
            <AppContainer  screenProps={ theme } ref={navigatorRef => { NavigationService.setTopLevelNavigator(navigatorRef);}} />
            <ModalInactive
              isOpen={isRechargeUserModalOpened}
              onEnter={() => {
                this.setState({isRechargeUserModalOpened: false});
              }}
              onClose={() => {
                this.setState({isRechargeUserModalOpened: false});
                NavigationService.navigate('Login',{page: 'modalUser'});
                
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