/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// const deepstream = require('deepstream.io-client-js');
import createDeepstream from 'deepstream.io-client-js';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { Record } from './components/record.ios'
import { Events } from './components/event.ios'
import { RPC } from './components/rpc.ios'
import { styles } from './styles';


export default class DsReactNative extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };

    this.ds = createDeepstream('wss://154.deepstreamhub.com?apiKey=97a397bd-ccd2-498f-a520-aacc9f67373c');

    this.ds.on( 'connectionStateChanged', this.handleConnectionState.bind(this));
    this.ds.on('error', error => console.log(error));

    this.client = this.ds.login();

    this.record = this.client.record.getRecord('test/johndoe');
    this.event = this.client.event;
    this.rpc = this.client.rpc;
  }

  handleConnectionState( connectionState ){
      this.setState({connectionState: connectionState});
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Record record={this.record}></Record>
        </View>
        <View style={styles.container}>
          <Events event={this.event}></Events>
        </View>
        <View style={styles.container}>
          <RPC rpc={this.rpc}></RPC>
        </View>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('DsReactNative', () => DsReactNative);
