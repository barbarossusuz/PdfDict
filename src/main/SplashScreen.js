'use strict';
import  React,{Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ToastAndroid,
    TouchableOpacity,
    PixelRatio,
    Image,
    NativeModules,
    AsyncStorage
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {firebaseRef} from "../Firebase";


export default class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }

    }

    render() {
        return (
            <Text>Deneme</Text>

        )
    }


    componentDidMount(){
        //Check if userData is stored on device else open Login
        setTimeout(()=>{
            firebaseRef.auth().onAuthStateChanged((user1) => {
                if (user1) {
                    var user = firebaseRef.auth().currentUser;
                    if (user !== null) {
                        Actions.welcomepage();

                    }
                } else {
                    Actions.login();
                }
            });
        },2000);
    }

}