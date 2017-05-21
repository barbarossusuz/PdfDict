'use strict';
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { Router, Scene, ActionConst } from 'react-native-router-flux';

import WelcomePage from "./src/pages/WelcomePage";
import PdfViewer from "./src/pages/PdfViewer";
import SplashScreen from "./src/main/SplashScreen";
import Login from "./src/forms/Login";
import Register from "./src/forms/Register";
import UserPdf from "./src/pages/UserPdf";





class PdfDict extends Component {


    render() {
        return (
            <Router >
                <Scene key="root" hideNavBar={true}>
                    <Scene key="welcomepage"  component={WelcomePage} initial={true} type={ActionConst.RESET}/>
                    <Scene key="pdfviewer"  component={PdfViewer}  type={ActionConst.RESET} />
                    <Scene key="login"  component={Login} />
                    <Scene key="register"  component={Register}  />
                    <Scene key="userpdf"  component={UserPdf}  />
                </Scene>
            </Router>
        )
    }


}
const styles = StyleSheet.create({});

AppRegistry.registerComponent('PdfDict', () => PdfDict);

