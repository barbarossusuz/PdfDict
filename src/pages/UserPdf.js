'use strict';
import  React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {firebaseRef} from "../Firebase";
import {Left,Content,Container,Header,List,Thumbnail,Body,Right,ListItem,Button} from "native-base";
import Icon from "react-native-vector-icons/Ionicons";


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
                <Header
                    androidStatusBarColor="#1E88E5"
                    style={{backgroundColor: "#1565C0"}}>
                    <Left>
                        <Button transparent onPress={()=> Actions.pop()}><Icon size={25} color="white"
                                                                                  name='md-arrow-back'/></Button>
                    </Left>
                    <Body>
                        <Text style={{fontWeight: "bold", color: "white"}}>PDFDICT</Text>
                    </Body>
                </Header>
                <Content>
                    {this.state.renderArr}
                </Content>
            </Container>
        );
    }


    getAllPdfFiles(){
        var user = firebaseRef.auth().currentUser;
        console.log("data",user.uid);

        let arr=[];
        let data;
        let objArr;
        firebaseRef.database().ref("pdfStore/"+user.uid+"/").once("value").then((value) => {
            data=value.val();
            objArr=Object.keys(data);
            console.log("data",data[objArr[0]]);
        }).then(() => {
            for(let i=0; i<objArr.length; i++){
                    arr.push(
                            <List  key={i}>
                                <ListItem>
                                    <Thumbnail square size={100} source={require("../images/pdf.png")}/>
                                    <Body>
                                    <Text>{data[objArr[i]].pdfName}</Text>
                                    <Text note> {data[objArr[i]].pdfDesc}</Text>
                                    </Body>
                                    <Right>
                                        <TouchableOpacity onPress={() => Actions.pdfviewer({pdfDownloadURL:data[objArr[i]].pdfUrl})}>
                                            <Text style={{color: "blue", fontWeight: "400"}}>Go Page</Text>
                                        </TouchableOpacity>
                                    </Right>
                                </ListItem>
                            </List>
                    )
            }
            this.setState({renderArr:arr});

        });
    }


    componentWillMount(){
        this.getAllPdfFiles();
    }
    componentDidMount(){
        console.ignoredYellowBox = ['Setting a timer'];
    }
}