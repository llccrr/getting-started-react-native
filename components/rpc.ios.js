import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Button,
  Text,
  View
} from 'react-native';
import {styles} from '../styles';

export class RPC extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requestValue: '3',
            responseValue: '7',
            displayResponse: '-'
        };
        this.rpc = this.props.rpc;

        this.handlePress = this.handlePress.bind(this);
        this.handleRequestChange = this.handleRequestChange.bind(this);
        this.handleResponseChange = this.handleResponseChange.bind(this);

        // Register as a provider for multiply-number
        this.rpc.provide('multiply-number', ( data, response ) => {
            // respond to the request by multiplying the incoming number
            // with the one from the response TextInput
            response.send(data.value * parseFloat(this.state.responseValue));
        });
    }

    handlePress(e) {
        // read the value from the TextInput field
        // and convert it into a number
        var data = {
            value: parseFloat(this.state.requestValue)
        };

        // Make a request for `multiply-number` with our data object
        // and wait for the response
        this.rpc.make('multiply-number', data, function( err, resp ){

            //display the response (or an error)
            this.setState({displayResponse: resp || err.toString()});
        }.bind(this));
    }

    handleRequestChange(text) {
        this.setState({requestValue: text});
    }

    handleResponseChange(text) {
        this.setState({responseValue: text});
    }

    render() {
        return(
                <View>
                    <View>
                        <Text style={styles.h2}>Request</Text>
                        <Button 
                            title="Make multiply request"
                            onPress={this.handlePress} />
                        <View>
                            <TextInput
                                style={styles.text}
                                value={this.state.requestValue} 
                                onChangeText={this.handleRequestChange}/>
                            <Text>
                                {this.state.displayResponse}
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.h2}>Response</Text>
                        <Text style={styles.h3}>Multiply number with:</Text>
                        <TextInput
                            style={styles.text}  
                            value={this.state.responseValue} 
                            onChangeText={this.handleResponseChange} />
                    </View>
                </View>
        );
    }
}