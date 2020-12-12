import React, { Component } from "react";
import { Alert, Text, TextInput, View, StyleSheet } from "react-native";
import { Header, Icon, Badge } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";

import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class MyNormalHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: false,
    };
  }

  searchBox = () => {
    return (
      <View
        style={{
          width: RFValue(350),
          height: RFValue(28),

          alignContent: "center",
          borderColor: "#000000",
          // justifyContent: "center",
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          // paddingRight: RFValue(30),
          // paddingleft: RFValue(30),
        }}
      >
        <View
          style={{
            height: RFValue(28),
            alignSelf: "center",
            justifyContent: "center",
            paddingLeft: RFValue(20),
            borderColor: "#000000",
            fontSize: 2,
          }}
        >
          <Icon
            name="search"
            type="font-awesome"
            color="#ffffff"
            onPress={() => {
              this.setState({
                showSearch: true,
              });
            }}
          />
        </View>
        <TextInput
          style={[styles.searchBox]}
          // secureTextEntry={true}
          placeholder="search is not working"
          placeholderTextColor="#ffffff"
          onChangeText={(text) => {
            // this.setState({
            //   password: text,
            // });
          }}
        />
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <Icon
            name="close"
            type="font-awesome"
            color="#ffffff"
            onPress={() => {
              this.setState({
                showSearch: false,
              });
            }}
          />
        </View>
      </View>
    );
  };

  showDefault = () => {
    return (
      <View
        style={{
          // backgroundColor: "#ffaaaa",
          width: RFValue(350),
          height: RFValue(30),
          alignContent: "center",
          justifyContent: "center",
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: RFValue(15),
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#ffffff",
            fontSize: RFValue(20),
            fontWeight: "bold",
            paddingRight: RFValue(180),
          }}
        >
          {this.props.title}
        </Text>
        <View
          style={{
            alignSelf: "center",
          }}
        >
          <Icon
            name="search"
            type="font-awesome"
            color="#ffffff"
            onPress={() => {
              this.setState({
                showSearch: true,
              });
            }}
          />
        </View>
      </View>
    );
  };

  showCenterComponent = () => {
    if (this.state.showSearch) {
      return this.searchBox();
    } else return this.showDefault();
  };

  render() {
    return (
      <Header
        leftComponent={
          <View
            style={{
              backgroundColor: "#ffaaaa",
              width: RFValue(30),
              height: RFValue(28),
              alignContent: "center",
              justifyContent: "center",
              borderRadius: 5,
            }}
          >
            <Icon
              name="bars"
              type="font-awesome"
              color="#ffffff"
              onPress={() => {
                this.props.navigation.toggleDrawer();
                console.log("after pressed");
              }}
            />
          </View>
        }
        centerComponent={<this.showCenterComponent />}
        // rightComponent={<this.BellIconWithBadge {...this.props} />}
        backgroundColor="#fe9090"
      />
    );
  }
}
const styles = StyleSheet.create({
  searchBox: {
    width: RFValue(200),
    height: RFValue(28),
    borderBottomWidth: RFValue(1.5),
    borderColor: "#fe9090",
    // borderColor: "#000000",
    backgroundColor: "#ffaaaa",
    color: "#ffffff",
    fontSize: RFValue(15),
    paddingLeft: RFValue(7),
    margin: RFValue(10),
  },
});
