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
} from "react-native";
import db from "../config";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import MyNormalHeader from "../components/MyNormalHeader";

export default class ChatScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      displayName: "",
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
    try {
      let name = await AsyncStorage.getItem("name");

      if (name !== undefined) {
        this.setState({
          displayName: name,
        });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MyNormalHeader
          title={"Hi " + this.state.displayName}
          navigation={this.props.navigation}
        />
        <View>
          <Text style={{ fontSize: RFValue(20) }}>
            Sorry, Chat Feature is not added for now.
          </Text>
        </View>
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
    borderRadius: RFValue(25),
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

// addToTable = (name) => {
//     this.getWeight();
//     this.updateBg();
//     var Class = this.props.navigation.state.params.class;
//     var section = this.props.navigation.state.params.section;
//     var address = this.props.navigation.state.params.schoolAddress;
//     db.collection("all_books")
//       .where("school_address", "==", address)
//       .where("class", "==", Class)
//       .where("section", "==", section)
//       .where("name", "==", name)
//       .get()
//       .then((querySnapshot) => {
//         var id = querySnapshot.docs[0].id;
//         var required = querySnapshot.docs[0].data().required;

//         if (required) {
//           db.collection("all_books")
//             .doc(id)
//             .update({
//               required: false,
//             })
//             .then(() => {
//               setTimeout(() => {
//                 this.updateBg();
//               }, 1500);
//             });
//           this.getWeight();
//         } else {
//           db.collection("all_books")
//             .doc(id)
//             .update({
//               required: true,
//             })
//             .then(() => {
//               setTimeout(() => {
//                 this.updateBg();
//               }, 1500);
//             });
//           this.getWeight();
//         }
//       });
//   };
