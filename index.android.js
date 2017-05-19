'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Router, Scene } from 'react-native-router-flux';

import WelcomePage from "./src/pages/WelcomePage";
import PdfViewer from "./src/pages/PdfViewer";
import Head from "./src/main/Head";
import SplashScreen from "./src/main/SplashScreen";
import Login from "./src/forms/Login";
import Register from "./src/forms/Register";




class PdfDict extends Component {


    render() {
        return (
            <Router >
                <Scene key="root" hideNavBar={true}>
                    <Scene key="welcomepage"  component={WelcomePage} />
                    <Scene key="splashscreen"  component={SplashScreen}   initial={true} />
                    <Scene key="pdfviewer"  component={PdfViewer} />
                    <Scene key="login"  component={Login} />
                    <Scene key="register"  component={Register} />
                </Scene>
            </Router>
        )
    }


}
const styles = StyleSheet.create({});

AppRegistry.registerComponent('PdfDict', () => PdfDict);

