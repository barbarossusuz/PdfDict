'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Picker,
    TouchableOpacity,
    ToastAndroid,
    BackAndroid,
    AsyncStorage,
    Keyboard
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from "../main/Menu"
import {Content, Fab, Button} from "native-base";
import {firebaseRef} from "../Firebase";
import Modal from 'react-native-modalbox';


export default class PdfViewer extends Menu {

    constructor(props) {
        super(props);

        this.state = {
            pageCount: 0,
            isPdfDownload: false,
            pageNumber: 1,
            active: false,
            isLogin: false,
            isOpen: false,
            pdfName: "",
            pdfDesc:"",
            pdfUrl:""

        };
        this.pdfPathFromDevice = this.props.pdfPathFromDevice || undefined;
        this.pdfDownloadURL = this.props.pdfDownloadURL || undefined;
        this.fileName = (this.props.pdfPathFromDevice ? this.props.pdfPathFromDevice : this.props.pdfDownloadURL).replace(/^.*[\\\/]/, '').slice(0, -4);
        this.pdfPathFromUrl = RNFS.DocumentDirectoryPath + "/" + this.fileName + ".pdf";

        this.path = this.pdfPathFromDevice === undefined ? this.pdfPathFromUrl : this.pdfPathFromDevice;
        this.pdfView = null;

    }

    renderContent() {
        var BContent = <Button transparent onPress={() => this.setState({isOpen: false})}><Text>X</Text></Button>;

        return (
            <View style={{flex: 1}}>
                {this.state.isPdfDownload ?

                    <PDFView ref={(pdf) => {
                        this.pdfView = pdf;
                    }}
                             key="sop"
                             path={this.path}
                             pageNumber={this.state.pageNumber}
                             onLoadComplete={(pageCount) => {
                                 this.setState({pageCount: pageCount});
                                 this.zoom();
                             }}
                             style={styles.pdf}/> :

                    <View style={styles.loading}>
                        <Text>Waiting For Pdf</Text>
                    </View>}

                <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})}
                       style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
                    <TextInput
                        placeholder="Pdf Name"
                        value={this.state.pdfName}
                        returnKeyType="next"
                        onChangeText={(text) => this.setState({pdfName: text})}
                        keyboardType="email-address"
                        placeholderTextColor="#CBCBCB"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}/>
                    <TextInput
                        placeholder="Pdf Description"
                        value={this.state.pdfDesc}
                        returnKeyType="done"
                        onChangeText={(text) => this.setState({pdfDesc: text})}
                        keyboardType="email-address"
                        placeholderTextColor="#CBCBCB"
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}/>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => this.uploadPdf()}>
                        <Text style={styles.loginButton}>SAVE PDF</Text>
                    </TouchableOpacity>
                </Modal>

                {this.renderFabButton()}
            </View>
        )
    }


    renderFabButton() {
        return (
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{marginLeft: 10}}
                style={{backgroundColor: '#1565C0'}}
                position="bottomRight"
                onPress={() => this.setState({active: !this.state.active})}>
                <Icon name="md-albums"/>
                {this.state.isLogin === true ?
                    <Button onPress={() => this.logOut()} style={{backgroundColor: '#DD5144'}}>
                        <Icon size={25} color="white" name="md-log-out"/>
                    </Button>
                    :
                    <Button onPress={() => Actions.login()} style={{backgroundColor: '#DD5144'}}>
                        <Icon size={25} color="white" name="md-log-in"/>
                    </Button>}

                {this.state.isLogin === true ?
                    <Button style={{backgroundColor: '#3B5998'}}>
                        <Icon size={25} color="white" name="md-cloud-download"/>
                    </Button> : null}

                {this.state.isLogin === true && this.pdfPathFromDevice === undefined ?
                    <Button onPress={() => this.upload()} style={{backgroundColor: '#3B5998'}}>
                        <Icon size={25} color="white" name="md-cloud-upload"/>
                    </Button> : null}


            </Fab>
        );
    }


    uploadPdf() {
        var user = firebaseRef.auth().currentUser;
        firebaseRef.database().ref("pdfStore/" + user.uid + "/").push({
            pdfName: this.state.pdfName,
            pdfDesc: this.state.pdfDesc,
            pdfUrl: this.state.pdfUrl
        }).then(() => {
            this.setState({isOpen:false,pdfName:"",pdfDesc:""});
            Keyboard.dismiss();
            ToastAndroid.showWithGravity("Pdf successfully saved", ToastAndroid.SHORT, ToastAndroid.CENTER);
        });
    }

    upload() {
        this.setState({isOpen: true, active: false});
    }

    logOut() {

        firebaseRef.auth().signOut().then(function () {
            Actions.login();
        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            ToastAndroid.showWithGravity(errorCode, ToastAndroid.SHORT, ToastAndroid.CENTER);
        });

    }

    zoom(val = 1.1) {
        // this.pdfView && setTimeout(() => {
        //     this.pdfView.setNativeProps({zoom: val});
        // }, 1500);
    }


    downloadFileToDevice() {
        if (this.pdfDownloadURL !== undefined) {
            const options = {
                fromUrl: this.pdfDownloadURL,
                toFile: this.pdfPathFromUrl
            };
            RNFS.downloadFile(options).promise.then(res => {
                this.setState({isPdfDownload: true,pdfUrl:this.pdfDownloadURL});
                this.pdfDownloadURL = "";
            }).catch(err => {
                ToastAndroid.showWithGravity("Invalid Url", ToastAndroid.LONG, ToastAndroid.CENTER);
            });
        }
        if (this.pdfPathFromDevice !== undefined)
            this.setState({isPdfDownload: true});

    }


    componentDidMount() {
        this.downloadFileToDevice();
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
        console.ignoredYellowBox = ['Setting a timer'];
    }

    componentWillMount() {

    }
}
const styles = StyleSheet.create({
    loading: {
        flex: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pdf: {
        flex: 14
    },
    headerItems: {
        flexDirection: "row",
        alignItems: "center",
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: "#1E88E5",
        paddingVertical: 15,
        borderWidth: 0.8,
        borderRadius: 30
    },
    loginButton: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700"
    },
    modal: {
        justifyContent: 'center',
        backgroundColor: "#BBDEFB",
        padding:15
    },
    input: {
        height: 40,
        color: "#ffffff",
        paddingHorizontal: 10
    },
    modal4: {
        height: 300
    },
    text: {
        color: "black",
        fontSize: 22
    }
});