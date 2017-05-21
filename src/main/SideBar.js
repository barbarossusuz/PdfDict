'use strict';
import React, {Component} from 'react';
import {
    AsyncStorage,
    View,
    ToastAndroid,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    Switch,
    TextInput,
    WebView
} from 'react-native';
import {Button, Container,Content} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";
import {Actions} from "react-native-router-flux";
import Dimensions from "Dimensions";

const {height, width} = Dimensions.get('window');

const tureng= "http://tureng.com/tr/turkce-ingilizce";
const google= "https://translate.google.com.tr/?hl=tr&tab=wT";
const dictionary= "http://www.dictionary.com/browse/gray?s=t";
export default class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            photoUrl: null,
            switch: false
        }
    }
    render() {

        return (
            <View style={{backgroundColor: "#BBDEFB", width: width / 1.2, height: height, flexDirection: "column"}}>
                <WebView
                    scalesPageToFit={true}
                    source={{uri: tureng}}
                />

            </View>
        );
    }


    componentDidMount(){
    }
}

const styles = StyleSheet.create({
    footer: {
        flex: 4,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#337ab7",
        justifyContent: "flex-start",
    },
    backButton: {
        marginTop: -6
    },
    // For the container View
    parent: {
        flexDirection: "row"
    },
    // For the Text label
    label: {
        color: "#fbfff6",
        fontWeight: 'bold'
    },
    label2: {
        fontWeight: 'bold'
    },

    // For the Text meaning
    word: {
        fontSize: 12,
        fontStyle: 'italic'
    }
});