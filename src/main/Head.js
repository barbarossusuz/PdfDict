import React, {Component} from "react";
import {TouchableOpacity, StyleSheet, Text,View} from "react-native";
import {Button, Header, Left, Right, Body, Picker,ActionSheet,Fab} from "native-base";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";


export default class Head extends Component {


    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            mode: Picker.MODE_DIALOG,
            clicked: undefined
        };
    };


    render() {
        return (
            <Header
                androidStatusBarColor="#1E88E5"
                style={{backgroundColor: "#1565C0"}}>
                <Left>
                    <Button transparent onPress={this.props.openToggle}><Icon size={25} color="white"
                                                                              name='md-bookmarks'/></Button>
                </Left>
                <Body>
                <TouchableOpacity onPress={() => this.backButton() }>
                    <Text style={{fontWeight: "bold", color: "white"}}>{(this.props.fileName).toUpperCase() || "PDFDICT"}</Text>
                </TouchableOpacity>
                </Body>
                <Right>
                    {this.renderPageCount()}
                </Right>
            </Header>
        );
    }


    //
    // renderMenuButton(){
    //     if(this.state.isLogin === true){
    //     var BUTTONS =  [
    //         'Save Pdf',
    //         'Log Out'
    //     ];
    //     }else{
    //         var BUTTONS =  [
    //             'Save Pdf',
    //             'Sign In'
    //         ];
    //     }
    //     return (
    //         <Button transparent onPress={()=> ActionSheet.show(
    //             {
    //                 options: BUTTONS,
    //                 title: 'Options'
    //             },
    //             (buttonIndex) => {
    //                 this.setState({ clicked: BUTTONS[buttonIndex] });
    //             }
    //         )}><IconFont size={25} color="white" name='ellipsis-v'/>
    //         </Button>
    //     );
    // }
    backButton() {
        setTimeout(() => {
            this.props.onChangePdf();
            Actions.welcomepage();
        }, 300);
    }

    renderPageCount() {
        if (this.props.pageDetails.isPdfDownload) {
            return (
                <View style={{
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                    <View>
                        <Text style={styles.fileName}>{this.props.pageDetails.pageCount + " /"}</Text>
                    </View>
                    <View>
                        <Picker
                            style={{width: 50, height: 20, color: "white"}}
                            selectedValue={this.state.pageNumber}
                            onValueChange={(text) => this.renderPageNumber(text)}
                            mode="dropdown">
                            {this.renderItems()}
                        </Picker>
                    </View>

                </View>

            );
        }
        else {
            return null;
        }
    }


    renderItems() {
        let args = [];
        for (let i = 1; i <= this.props.pageDetails.pageCount; i++) {
            args.push(<Picker.Item key={i.toString()} label={i.toString()} color="black" value={i}/>)
        }
        return args;
    }

    renderPageNumber(text) {
        let text1 = parseInt(text);
        if (1 <= text1 <= this.props.pageDetails.pageCount) {
            setTimeout(() => {
                this.setState({pageNumber: text1});
                this.props.onChangePageNumber(this.state.pageNumber);
            }, 500)
        }
        else return null;
    }


}

const styles = StyleSheet.create({
    fileName: {
        color: "#ffffff",
        fontSize: 14
    }
});