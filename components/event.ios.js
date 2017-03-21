import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  Button,
  ListView,
  View
} from 'react-native';
import {styles} from '../styles';

export class Events extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            value: '',
            eventsReceived: dataSource.cloneWithRows([])
        };
        this.event = this.props.event;

        this.handlePress = this.handlePress.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.event.subscribe('event-data', data => {
            this.setState({eventsReceived: dataSource.cloneWithRows([...this.state.eventsReceived, data])})
            this.setState({value: ''});
        });
    }

    handlePress(e) {
        this.event.emit('event-data', this.state.value);
    }

    handleChange(text) {
        this.setState({value: text});
    }

    render() {
        return(
            <View>
                <View>
                    <Text style={styles.h2}>Publish</Text>
                    <TextInput 
                        placeholder="Event data..."
                        style={styles.text} 
                        value={this.state.value} 
                        onChangeText={this.handleChange} />
                    <Button onPress={this.handlePress} title="Send" color="#841584" />
                </View>
                <View>
                    <Text style={styles.h3}>Subscriptions</Text>
                    <ListView
                        dataSource={this.state.eventsReceived}
                        enableEmptySections={true}
                        renderRow={(rowData) => <Text>Received event data: {rowData}</Text>}
                        />
                </View>
            </View>
        );
    }
}