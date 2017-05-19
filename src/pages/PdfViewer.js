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
    AsyncStorage
} from 'react-native';

import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from "../main/Menu"
import {Content, Fab, Button} from "native-base";
import {firebaseRef} from "../Firebase";


export default class PdfViewer extends Menu {

    constructor(props) {
        super(props);

        this.state = {
            pageCount: 0,
            isPdfDownload: false,
            pageNumber: 1,
            active: false,
            isLogin: false

        };
        this.pdfPathFromDevice = this.props.pdfPathFromDevice || undefined;
        this.pdfDownloadURL = this.props.pdfDownloadURL || undefined;
        this.fileName = (this.props.pdfPathFromDevice ? this.props.pdfPathFromDevice : this.props.pdfDownloadURL).replace(/^.*[\\\/]/, '').slice(0, -4);
        this.pdfPathFromUrl = RNFS.DocumentDirectoryPath + "/" + this.fileName + ".pdf";

        this.path = this.pdfPathFromDevice === undefined ? this.pdfPathFromUrl : this.pdfPathFromDevice;
        this.pdfView = null;

    }

    renderContent() {

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

                {this.renderDeneme()}
            </View>
        )
    }


    renderDeneme() {
        return (
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{marginLeft: 10}}
                style={{backgroundColor: '#1565C0'}}
                position="bottomRight"
                onPress={() => this.setState({active: !this.state.active})}>
                <Icon name="md-albums"/>
                <Button style={{backgroundColor: '#3B5998'}}>
                    <Icon size={25} color="white" name="md-add"/>
                </Button>
                {this.state.isLogin === true ?
                    < Button style={{backgroundColor: '#3B5998'}}>
                        <Icon size={25} color="white" name="md-log-out"/>
                    </Button> :
                    <Button style={{backgroundColor: '#DD5144'}}>
                        <Icon size={25} color="white" name="md-log-in"/>
                    </Button>}


            </Fab>
        );
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
                this.setState({isPdfDownload: true});
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
    header: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E88E5",
        justifyContent: "space-between",
    },
    footer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#1E88E5",
        justifyContent: "space-around",
    },
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
    }
});