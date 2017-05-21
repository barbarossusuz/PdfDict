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
import {Content,Container} from "native-base";


var FilePickerManager = require('NativeModules').FilePickerManager;


export default class UserPdf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            renderArr:[]
        }

    }

    render() {
        return (
            <Container>
                <Content>

                </Content>
            </Container>
        );
    }


    getAllPdfFiles(){
        var user = firebaseRef.auth().currentUser;
        let arr=[];
        let data;
        firebaseRef.database().ref(user.uid+"/").once("value").then((value) => {
            data=value.val();
            console.log("data",data);
        }).then(() => {
            arr.push(
                <View key={searchData[i].content.key}>
                    <List>
                        <ListItem>
                            <Thumbnail square size={80} source={{uri: searchData[i].content.url}}/>
                            <Body>
                            <Text>{(searchData[i].cityName).toUpperCase()}</Text>
                            <Text note> {searchData[i].content.hotelName}</Text>
                            </Body>
                            <Right>
                                <TouchableOpacity onPress={() => this.goPage(searchData[i], i)}>
                                    <Text style={{color: "blue", fontWeight: "400"}}>Go Page</Text>
                                </TouchableOpacity>
                            </Right>
                        </ListItem>
                    </List>
                </View>
            )
        });
        this.setState({renderArr:arr});
    }

    componentWillMount(){
        this.getAllPdfFiles();
    }
}