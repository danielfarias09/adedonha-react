/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createAppContainer } from 'react-navigation';
import AppNavigator from './routes/AppNavigator';

const AppContainer = createAppContainer(AppNavigator)

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

