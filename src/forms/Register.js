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
    Keyboard,
    Button
} from 'react-native';
import {firebaseRef} from "../Firebase";
import {Actions} from "react-native-router-flux";

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: ""
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
                    onFocus={this.onFocus}
                    autoCorrect={false}/>
                <TextInput
                    placeholder="PASSWORD"
                    value={this.state.password}
                    returnKeyType="next"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password: text})}
                    placeholderTextColor="#ffffff"
                    style={styles.input}
                    autoCapitalize="none"
                    onFocus={this.onFocus}
                    autoCorrect={false}/>
                <TextInput
                    placeholder="VERIFY PASSWORD"
                    value={this.state.password2}
                    returnKeyType="done"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({password2: text})}
                    placeholderTextColor="#ffffff"
                    style={styles.input}
                    autoCapitalize="none"
                    onFocus={this.onFocus}
                    autoCorrect={false}/>

                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.register()}>
                    <Text style={styles.loginButton}>CREATE ACCOUNT</Text>
                </TouchableOpacity>

                <View style={{alignItems: "center",flexDirection:"row",justifyContent:"space-around"}}>
                    <TouchableOpacity onPress={() => this.backToLogin()}>
                        <Text style={styles.registerButton}>Back to Sign In?</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

    register() {
        if (this.state.password && this.state.email && this.state.password2) {
            if (this.state.password === this.state.password2) {
                firebaseRef.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((userData) => {
                    {
                        Keyboard.dismiss();
                        Actions.welcomepage();
                        ToastAndroid.showWithGravity("Account succesfuly created", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }
                }).catch((error) => {

                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === 'auth/weak-password') {
                        ToastAndroid.showWithGravity("The password is too weak.", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }
                    if (errorCode === "auth/invalid-email") {
                        ToastAndroid.showWithGravity("Email address is not valid", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }
                    if (errorCode === "auth/email-already-in-use") {
                        ToastAndroid.showWithGravity("There already exists an account with the given email", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }
                    if (errorCode === "auth/operation-not-allowed") {
                        ToastAndroid.showWithGravity("Email/Password accounts are not enabled", ToastAndroid.SHORT, ToastAndroid.CENTER);
                    }
                    console.log(error);
                });
            }
            else {
                ToastAndroid.showWithGravity("Passwords did not match", ToastAndroid.SHORT, ToastAndroid.CENTER);
            }
        } else {
            ToastAndroid.showWithGravity("Email or password can not be empty", ToastAndroid.SHORT, ToastAndroid.CENTER);
        }
    }

    backToLogin() {
        Actions.pop();
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
        color: "#fbfaff",
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
        color: "#fbfaff",
        fontWeight: "700"
    },
    registerButton: {
        color: "#fbfaff",
        marginTop: 50,
        opacity: 0.5
    },
});