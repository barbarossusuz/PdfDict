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
            isLogin: false,
            isOpen: false,
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

                    {this.state.isLogin === true ?
                        <View style={{alignItems: "center"}}>
                        <Text
                            style={{marginTop: 25, color: "white", fontWeight: "bold", fontSize: 20}}>OR</Text>

                        <View style={{marginTop: 70}}>
                            <Button
                                onPress={() => this.getPdfFromDatabase()}
                                title="Select From Saved Pdf"
                                color="#1E88E5"
                                accessibilityLabel="Select Pdf From Database"
                            />
                        </View></View> :  <View style={{alignItems: "center"}}>
                            <Text
                                style={{marginTop: 25, color: "white", fontWeight: "bold", fontSize: 20}}>OR</Text>

                            <View style={{marginTop: 70}}>
                                <Button
                                    onPress={() => this.goLoginPage()}
                                    title="SIGN IN - SIGN UP"
                                    color="#1E88E5"
                                    accessibilityLabel="Log in or create account"
                                />
                            </View></View>
                    }

                </View>

            </View>

        )
    }

    onSubmitEdditing(text) {
        let ornek = "http://www.pdf995.com/samples/pdf.pdf";

        if (text.replace(/^.*[\\\/]/, '').slice(-4) === ".pdf") {
            Actions.pdfviewer({pdfDownloadURL: text});
        }
        else {
            ToastAndroid.showWithGravity("Entered url does not contain .pdf extension", ToastAndroid.LONG, ToastAndroid.TOP);
            return null;
        }
    }

    goLoginPage() {
        Actions.login();
    }

    getPdfFromDatabase() {
        Actions.userpdf();
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
                    if ((response.path).replace(/^.*[\\\/]/, '').slice(-4) === ".pdf"){
                        Actions.pdfviewer({pdfPathFromDevice: response.path});
                    }
                    else {
                        ToastAndroid.showWithGravity("Selected file is not a pdf file", ToastAndroid.LONG, ToastAndroid.TOP);
                        return null;
                    }
                }
            }
        });
    }


    componentWillMount() {
        firebaseRef.auth().onAuthStateChanged((user1) => {
            if (user1) {
                var user = firebaseRef.auth().currentUser;
                if (user !== null) {
                    this.setState({isLogin: true});
                }
            } else {
                this.setState({isLogin: false});
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
    },
    modal: {
        justifyContent: 'center',
        backgroundColor: "#BBDEFB",
        padding:15
    },
    modal4: {
        height: 300
    },
});