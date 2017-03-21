import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native';
import {styles} from '../styles';

export class Record extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: ''
        };

        this.record = this.props.record;

        this.handleFnameChange = this.handleFnameChange.bind(this);
        this.handleLnameChange = this.handleLnameChange.bind(this);

        this.record.subscribe(value => {
            this.setState({firstname: value.firstname});
            this.setState({lastname: value.lastname});
        });
    }

    handleFnameChange(text) {
        this.setState({firstname: text});
        this.record.set('firstname', text);
    }

    handleLnameChange(text) {
        this.setState({lastname: text});
        this.record.set('lastname', text);
    }

    render() {
        return(
            <View style={{paddingTop: 30}}>
                <Text style={styles.h2}>Realtime Datastore</Text>
                <View>
                    <Text>Firstname</Text>
                    <TextInput 
                        style={styles.text}
                        value={this.state.firstname} 
                        onChangeText={this.handleFnameChange} />
                </View>
                <View style={{flex:1}}>
                    <Text>Lastname</Text>
                    <TextInput 
                        style={styles.text}
                        value={this.state.lastname} 
                        onChangeText={this.handleLnameChange} />
                </View>
            </View>
        );
    }
}