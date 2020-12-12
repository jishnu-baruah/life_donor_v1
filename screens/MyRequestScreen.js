import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  TextInput,
  Image,
  Modal,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon, ListItem } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import MyNormalHeader from "../components/MyNormalHeader";

export default class MyRequestScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      displayName: "",
      firstName: "",
      lastName: "",
      name: "",
      isModalVisible: false,
      contact: "",
      address: "",
      request: "",
      requestList: "",
    };
  }

  async getToken(user) {
    try {
      let userId = await AsyncStorage.getItem("userId");
      let password = await AsyncStorage.getItem("password");

      if (userId !== undefined && password !== undefined) {
        this.setState({
          emailId: userId,
          password: password,
        });
      }
      this.getName();
      console.log("#home screen", userId, password, name);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidMount() {
    this.getToken();
  }

  getName = async () => {
    db.collection("users")
      .where("email_id", "==", this.state.emailId)
      .get()
      .then(async (querySnapshot) => {
        var name = querySnapshot.docs[0].data().displayName;
        var firstName = querySnapshot.docs[0].data().first_name;
        var lastName = querySnapshot.docs[0].data().last_name;
        var contact = querySnapshot.docs[0].data().contact;
        var address = querySnapshot.docs[0].data().address;

        if (name !== undefined) {
          this.setState({
            displayName: name,
            firstName: firstName,
            lastName: lastName,
            name: firstName + " " + lastName,
            contact: contact,
            address: address,
          });
          try {
            await AsyncStorage.setItem("name", name);
          } catch (error) {
            console.log("Something went wrong", error);
          }
        }
      });
  };

  getRequestList = () => {
    db.collection("request").onSnapshot((snapshot) => {
      var requestList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestList: requestList,
      });
    });
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item, i }) => {
    return (
      <ListItem
        containerStyle={{
          backgroundColor: "#fcf8f8",
          // opacity: 0.1
        }}
        titleStyle={{
          color: "#5555ff",
        }}
        key={i}
        title={"request :" + item.request}
        subtitle={
          "Contact : " +
          item.contact +
          " email : " +
          item.emailId +
          " name " +
          item.name
        }
        titleStyle={{ color: "black", fontWeight: "bold" }}
        bottomDivider
      />
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#ffff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MyNormalHeader
          title={"Hi " + this.state.displayName}
          navigation={this.props.navigation}
        />
        <Text style={{ fontSize: RFValue(20) }}>
          Feature not availabe in ths version.
        </Text>
        <ScrollView style={{ width: "100%", height: "100%" }}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.requestList}
            renderItem={this.renderItem}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                isModalVisible: true,
              });
            }}
          >
            <Text style={styles.buttonText}> Add Request </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5E0E3",
  },
  button: {
    width: "50%",
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: RFValue(5),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    margin: RFValue(10),
    marginTop: RFValue(100),
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10.32,
    elevation: 16,
  },
  buttonText: {
    color: "#fe9090",
    fontWeight: "200",
    fontSize: RFValue(20),
  },
});
