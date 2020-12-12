import React, { Component } from "react";
import { Header, Icon, Badge } from "react-native-elements";
import { View, Text, StyeSheet, Alert, ImageBackground } from "react-native";
import db from "../config";
import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";

export default class MyCard extends Component {
  constructor(props) {
    super(props);
  }

  getBorderColor = () => {
    if (this.props.borderColor !== undefined) {
      return this.props.borderColor;
    } else {
      return "#ffffff";
    }
  };

  getHeight = () => {
    if (this.props.height !== undefined) {
      return this.props.height;
    } else {
      return RFValue(150);
    }
  };

  getWidth = () => {
    if (this.props.width !== undefined) {
      return this.props.width;
    } else {
      return RFValue(200);
    }
  };

  getMargin = () => {
    if (this.props.margin !== undefined) {
      return this.props.margin;
    } else {
      return RFValue(0);
    }
  };

  getTitleSide = () => {
    if (this.props.titleSide === undefined) {
      return "flex-start";
    } else {
      return "flex-end";
    }
  };

  render() {
    return (
      <View
        style={{
          //   justifyContent: "flex-start",
          //   alignSelf: "center",
          margin: RFValue(10),
          //   marginBottom: RFValue(0),
          marginRight: this.getMargin(),
          borderColor: this.getBorderColor(),
          backgroundColor: "#ffaeae",
          borderWidth: RFValue(2),
          borderRadius: RFValue(5),
          //   padding: RFValue(10),
          width: this.getWidth(),
          height: this.getHeight(),
          //   shadowColor: "#ffaaaa",
          //   shadowOffset: {
          //     width: RFValue(180),
          //     height: RFValue(1800),
          //   },
          shadowOpacity: RFValue(100),
          shadowRadius: RFValue(10.32),
          //   elevation: RFValue(2),
        }}
      >
        <ImageBackground
          source={this.props.image}
          style={{
            flex: 1,
            resizeMode: "cover",
            padding: RFValue(10),
            borderRadius: RFValue(8),
            // alignSelf: "center",
          }}
        >
          <Text
            style={{
              color: this.props.titleColor,
              fontSize: this.props.titleSize,
              margin: RFValue(10),
              alignSelf: this.getTitleSide(),
            }}
          >
            {this.props.title}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}
