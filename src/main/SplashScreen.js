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

var FilePickerManager = require('NativeModules').FilePickerManager;



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

            AsyncStorage.getItem('pdfPathFromDevice').then((user_data_json) => {
                let path = JSON.parse(user_data_json);
                if(path !== null){
                    console.log(path);
                    Actions.pdfviewer({pdfPathFromDevice:path});
                }else{
                    AsyncStorage.getItem('pdfDownloadURL').then((user_data_json) => {
                        let path = JSON.parse(user_data_json);
                        if(path !== null){
                            console.log(path);
                            Actions.pdfviewer({pdfDownloadURL: path});
                        }else{
                            Actions.welcomepage();
                        }
                    });
                }
            });
        },2000);

    }



}