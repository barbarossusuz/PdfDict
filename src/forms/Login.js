import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ToastAndroid,
    Image,
    AsyncStorage,
    Keyboard
} from 'react-native';
import {firebaseRef} from "../Firebase";
import {Actions} from "react-native-router-flux";
import {Button} from "native-base";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <TextInput
                    placeholder="EMAIL"
                    value={this.state.email}
                    returnKeyType="next"
                    onChangeText={(text) => this.setState({email: text})}
                    keyboardType="email-address"
                    placeholderTextColor="#ffffff"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}/>
                <TextInput
                    placeholder="PASSWORD"
                    value={this.state.password}
                    returnKeyType="done"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholderTextColor="#ffffff"
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}/>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.login()}>
                    <Text style={styles.loginButton}>SIGN IN</Text>
                </TouchableOpacity>

                <View style={{alignItems: "center"}}>
                    <TouchableOpacity onPress={() => this.goRegisterPage()}>
                        <Text style={styles.registerButton}>Create Account?</Text>
                    </TouchableOpacity>
                </View>
            </View>

        );
    }

    login() {
        if (this.state.password && this.state.email) {
            firebaseRef.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
                {
                    Keyboard.dismiss();
                    Actions.welcomepage();
                }
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === "auth/invalid-email") {
                    ToastAndroid.showWithGravity("Email address is not valid", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                if (errorCode === "auth/wrong-password") {
                    ToastAndroid.showWithGravity("Wrong password", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                if (errorCode === "auth/user-disabled") {
                    ToastAndroid.showWithGravity("This email has been disabled", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                if (errorCode === "auth/user-not-found") {
                    ToastAndroid.showWithGravity("There is no user to the given email", ToastAndroid.SHORT, ToastAndroid.CENTER);
                }
                console.log(error);
            });
        } else {
            ToastAndroid.showWithGravity("Email or password can not be empty", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    goRegisterPage() {
        Actions.register();
    }

    backtoMainPage() {
        Actions.welcomepage();
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#1565C0"
    },
    buttonContainer: {
        marginTop: 20,
        backgroundColor: "#1E88E5",
        paddingVertical: 15,
        borderWidth: 0.8,
        borderRadius: 30
    },
    title: {
        color: "#ffffff",
        marginTop: 10,
        width: 160,
        textAlign: "center",
        opacity: 0.9
    },
    input: {
        height: 40,
        marginBottom: 10,
        color: "#ffffff",
        paddingHorizontal: 10
    },
    loginButton: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700"
    },
    registerButton: {
        color: "#ffffff",
        marginTop: 50,
        opacity: 0.5
    },
});