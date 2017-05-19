'use strict';
import  React, {Component} from 'react';
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

var FilePickerManager = require('NativeModules').FilePickerManager;


export default class WelcomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: undefined,
            isLogin: false
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignItems: "center"}}>

                    <View style={{marginTop: 70}}>
                        <Button
                            onPress={() => this.onPress()}
                            title="Please Click To Select Pdf"
                            color="#1E88E5"
                            accessibilityLabel="Select Pdf From Device"
                        />
                    </View>

                    <Text
                        style={{marginTop: 25, color: "white", fontWeight: "bold", fontSize: 20}}>OR</Text>

                    <View style={{marginTop: 110}}>
                        <Text
                            style={{color: "white", fontWeight: "bold", fontSize: 16}}>Please Write Pdf Url Here :
                            </Text>
                        <TextInput
                            style={{height: 40}}
                            autoCorrect={false}
                            onSubmitEditing={(event) => this.onSubmitEdditing(event.nativeEvent.text)}
                            keyboardType="web-search"
                        />

                    </View>
                    <Text
                        style={{marginTop: 25, color: "white", fontWeight: "bold", fontSize: 20}}>OR</Text>

                    {this.state.isLogin===true?
                    <View style={{marginTop: 70}}>
                        <Button
                            onPress={() => this.getPdfFromDatabase()}
                            title="Select From Saved Pdf"
                            color="#1E88E5"
                            accessibilityLabel="Select Pdf From Database"
                        />
                    </View>:<View style={{marginTop: 70}}>
                            <Button
                                onPress={() => this.goLoginPage()}
                                title="Sign In - Sign Up"
                                color="#1E88E5"
                                accessibilityLabel="Select Pdf From Database"
                            />
                        </View>
                    }


                </View>


            </View>

        )
    }

    onSubmitEdditing(text) {
        let ornek = "http://www.pdf995.com/samples/pdf.pdf";

        if (text.replace(/^.*[\\\/]/, '').slice(-4) === ".pdf") {
            AsyncStorage.getItem('pdfPathFromDevice').then((user_data_json) => {
                let path = JSON.parse(user_data_json);
                if(path !== null){
                    AsyncStorage.removeItem('pdfPathFromDevice').then(() => {
                        AsyncStorage.setItem('pdfDownloadURL', JSON.stringify(text)).then(()=>{
                            Actions.pdfviewer({pdfDownloadURL: text});
                        });
                    });
                }else{
                    AsyncStorage.setItem('pdfDownloadURL', JSON.stringify(text)).then(()=>{
                        Actions.pdfviewer({pdfDownloadURL: text});
                    });
                }
            });
        }
        else {
            ToastAndroid.showWithGravity("Entered url does not contain .pdf extension", ToastAndroid.LONG, ToastAndroid.TOP);
            return null;
        }
    }

    goLoginPage(){
        Actions.login();
    }

    getPdfFromDatabase(){

    }
    onPress() {
        const options = {
            title: 'File Picker',
            chooseFileButtonTitle: 'Choose File...'
        };

        FilePickerManager.showFilePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                this.setState({
                    file: response
                });
                if (this.state.file) {
                    if ((response.path).replace(/^.*[\\\/]/, '').slice(-4) === ".pdf") {
                        AsyncStorage.getItem('pdfDownloadURL').then((user_data_json) => {
                            let path = JSON.parse(user_data_json);
                            if(path !== null){
                                AsyncStorage.removeItem('pdfDownloadURL').then(() => {
                                    AsyncStorage.setItem('pdfPathFromDevice', JSON.stringify(response.path)).then(()=>{
                                        Actions.pdfviewer({pdfPathFromDevice: response.path});
                                    });

                                });
                            }else{
                                AsyncStorage.setItem('pdfPathFromDevice', JSON.stringify(response.path)).then(()=>{
                                    Actions.pdfviewer({pdfPathFromDevice: response.path});
                                });
                            }
                        });

                    }
                    else {
                        ToastAndroid.showWithGravity("Selected file is not a pdf file", ToastAndroid.LONG, ToastAndroid.TOP);
                        return null;
                    }
                }
            }
        });
    }


    componentWillMount(){
        firebaseRef.auth().onAuthStateChanged((user1) => {
            if (user1) {
                var user = firebaseRef.auth().currentUser;
                if (user !== null) {
                    this.setState({isLogin:true});
                }
            } else {
                this.setState({isLogin:false});
            }
        });
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1565C0",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
    },
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1565C0"
    },
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    button: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        margin: 5,
        padding: 5
    },
    fileInfo: {
        borderColor: '#9B9B9B',
        borderWidth: 1 / PixelRatio.get(),
        margin: 5,
        padding: 5
    }
});