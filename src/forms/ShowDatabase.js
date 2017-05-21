
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


export default class ShowDatabase extends Component {

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
            <Container>
            <Content >

            </Content>
            </Container>
        );
    }


    uploadImage(uri, mime = 'application/pdf') {

        return new Promise((resolve, reject) => {
            const uploadUri = uri;
            let uploadBlob = null;

            var user = firebaseRef.auth().currentUser;
            const imageRef = firebaseRef.storage().ref("userProfilePhoto/").child(user.uid + ".pdf");

            fs.readFile(uploadUri, 'base64')
                .then((data) => {
                    return Blob.build(data, {type: `${mime};BASE64`})
                })
                .then((blob) => {
                    uploadBlob = blob;
                    return imageRef.put(blob, {contentType: mime})
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL()
                })
                .then((url) => {
                    resolve(url)

                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    componentDidMount(){
    }
}