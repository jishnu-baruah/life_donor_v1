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
import { Card, Icon, ListItem } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import MyNormalHeader from "../components/MyNormalHeader";
import MyCard from "../components/MyCard";
import { WebView } from "react-native-webview";

export default class HomeScreen extends Component {
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
      title: "",
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
      // let name = await AsyncStorage.getItem("password");

      if (userId !== undefined && password !== undefined) {
        this.setState({
          emailId: userId,
          password: password,
        });
      }
      this.getName();
      // this.getData();
      console.log("#home screen", userId, password, name);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidMount() {
    this.getToken();
    this.getRequestList();
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

  getData = async () => {
    db.collection("users")
      .where("email_id", "==", this.state.emailId)
      .get()
      .then((querySnapshot) => {
        var contact = querySnapshot.docs[0].data().contact;
        var address = querySnapshot.docs[0].data().address;
        if (firstName !== undefined) {
          this.setState({
            address: address,
            contact: contact,
          });
        }
      });
  };

  showCovidProtocls = () => {
    return (
      <WebView
        source={{
          uri:
            "https://www.who.int/campaigns/connecting-the-world-to-combat-coronavirus/healthyathome?gclid=Cj0KCQiA8dH-BRD_ARIsAC24umZlI8ytGqbY1UHsR4S4YRucKKkcZDJX9WroqB2E0AjKPSb6nsHv_54aAgFhEALw_wcB",
        }}
      />
      // <View>
      // <ScrollView style={styles.scrollview}>
      //   <Text>Covid Protocols</Text>
      // </ScrollView>
      /* </View> */
    );
  };

  showPlasmaDonation = () => {
    return (
      // <View>
      <ScrollView style={styles.scrollview}>
        <TouchableOpacity
          style={styles.template}
          onPress={() => {
            this.setState({
              title: "moreAboutPlasma",
              isSecondModalVisible: true,
            });
          }}
        >
          <MyCard
            title={""}
            titleColor="#000000"
            titleSize={RFValue(20)}
            image={require("../assets/plasma.jpg")}
            margin={RFValue(10)}
          />
          <View style={styles.templateTextContainer}>
            <Text style={styles.templateHeader}>
              Know more about plasma dontion and how it works.
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.template}
          onPress={() => {
            this.setState({
              title: "plasmaNearMe",
              isSecondModalVisible: true,
            });
          }}
        >
          <MyCard
            title={""}
            titleColor="#000000"
            titleSize={RFValue(20)}
            image={require("../assets/knoPla.jpeg")}
            margin={RFValue(10)}
          />
          <View style={styles.templateTextContainer}>
            <Text style={styles.templateHeader}>
              Donation centers near you.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  showMoreAboutPlasma = () => {
    return (
      <WebView
        source={{
          uri:
            "https://www.redcrossblood.org/donate-blood/dlp/plasma-information.html",
        }}
      />
    );
  };

  showNgosNearMe = () => {
    return (
      <WebView
        source={{
          uri: "https://www.google.co.in/maps/search/plasma_donation_centers",
        }}
      />
    );
  };

  showPlasmaNearMe = () => {
    return (
      <WebView
        source={{
          uri: "https://www.google.co.in/maps/search/ngos",
        }}
      />
    );
  };

  showRedCross = () => {
    return (
      <WebView
        source={{
          uri: "https://www.icrc.org/en",
        }}
      />
    );
  };

  showRequestForm = () => {
    return (
      <ScrollView style={styles.scrollview}>
        <View style={styles.requestFormView}>
          <Text style={styles.requestFormText}> REQUEST FORM </Text>
        </View>
        <View style={{ flex: 0.95 }}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.formInput}
            placeholder={"Name"}
            // maxLength={12}
            value={this.state.name}
            onChangeText={(text) => {
              this.setState({
                name: text,
              });
            }}
          />

          <Text style={styles.label}>Contact </Text>
          <TextInput
            style={styles.formInput}
            placeholder={"Contact"}
            maxLength={12}
            keyboardType={"numeric"}
            value={this.state.contact}
            onChangeText={(text) => {
              this.setState({
                contact: text,
              });
            }}
          />
          <Text style={styles.label}>Email </Text>
          <TextInput
            style={styles.formInput}
            placeholder={"Email"}
            keyboardType={"email-address"}
            value={this.state.emailId}
            onChangeText={(text) => {
              this.setState({
                emailId: text,
              });
            }}
          />
          <Text style={styles.label}> Address </Text>
          <TextInput
            style={styles.formInput}
            placeholder={"Address"}
            multiline={true}
            value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                address: text,
              });
            }}
          />
          <Text style={styles.label}> Your Request </Text>
          <TextInput
            style={[styles.formInput, { height: RFValue(100) }]}
            placeholder={"what do you need?"}
            multiline={true}
            // value={this.state.address}
            onChangeText={(text) => {
              this.setState({
                request: text,
              });
            }}
          />
        </View>

        <View style={{ flex: 0.2, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => this.addRequest()}
          >
            <Text style={styles.requestButtonText}>Request</Text>
          </TouchableOpacity>
          <Text
            style={styles.cancelButtonText}
            onPress={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            Cancel
          </Text>
        </View>
      </ScrollView>
    );
  };

  getRequestList = () => {
    db.collection("request").onSnapshot((snapshot) => {
      var requestList = snapshot.docs.map((document) => document.data());
      this.setState({
        requestList: requestList,
      });
    });
  };

  showCancer = () => {
    return (
      <WebView
        source={{
          uri:
            "https://www.cancer.net/coping-with-cancer/talking-with-family-and-friends/supporting-friend-who-has-cancer",
        }}
      />
    );
  };

  showPlastic = () => {
    return (
      <WebView
        source={{
          uri:
            "https://www.iberdrola.com/environment/how-to-reduce-plastic-use",
        }}
      />
    );
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

  showModalContent = () => {
    if (this.state.title === "covid") {
      return this.showCovidProtocls();
    } else if (this.state.title === "plasma") {
      return this.showPlasmaDonation();
    } else if (this.state.title === "redCross") {
      return this.showRedCross();
    } else if (this.state.title === "moreAboutPlasma") {
      return this.showMoreAboutPlasma();
    } else if (this.state.title === "plasmaNearMe") {
      return this.showPlasmaNearMe();
    } else if (this.state.title === "requestDonation") {
      return this.showRequestForm();
    } else if (this.state.title === "ngos") {
      return this.showNgosNearMe();
    } else if (this.state.title === "cancer") {
      return this.showCancer();
    } else if (this.state.title === "plastic") {
      return this.showPlastic();
    }
  };

  showModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isModalVisible}
        onRequestClose={() => {
          this.setState({
            isModalVisible: false,
          });
        }}
      >
        {this.showModalContent()}
      </Modal>
    );
  };

  addRequest = () => {
    db.collection("request").add({
      name: this.state.name,
      contact: this.state.contact,
      address: this.state.address,
      emailId: this.state.emailId,
      request: this.state.request,
    });
    Alert.alert("Request added succesfully", "", [
      {
        text: "OK",
        onPress: () =>
          this.setState({
            isModalVisible: false,
          }),
      },
    ]);
    // .than(() => {
    // });
  };

  l;

  render() {
    return (
      <View style={styles.container}>
        {this.showModal()}
        {/* {this.showSecondModal()} */}

        <MyNormalHeader
          title={"Hi " + this.state.displayName}
          navigation={this.props.navigation}
        />
        <View
          style={{
            backgroundColor: "#ffffff",
            margin: RFValue(1.5),
            marginBottom: RFValue(10),
            // borderWidth: RFValue(1.5),
            // borderColor: "#aaaaaa",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isModalVisible: true,
                title: "requestDonation",
              });
            }}
          >
            <MyCard
              title={"Need an urgent donation??  Tap to request"}
              titleColor="#ffffff"
              width={"96%"}
              height={RFValue(50)}
              margin={RFValue(10)}
              titleSize={RFValue(13)}
              image={require("../assets/request.jpg")}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: RFValue(180), backgroundColor: "#ffffff" }}>
          <ScrollView
            style={{ flex: 0.5, backgroundColor: "ffefee" }}
            horizontal={true}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Medical_Card");
              }}
            >
              <MyCard
                borderColor={"#00aaaa"}
                title={"EMedi-card"}
                titleColor="#ffffff"
                titleSize={RFValue(20)}
                image={require("../assets/emedi.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  title: "covid",
                  isModalVisible: true,
                });
              }}
            >
              <MyCard
                borderColor={"#ff2222"}
                titleSide={"inverse"}
                title={"Covid-19 \nprotocols"}
                titleColor="#ffffff"
                titleSize={RFValue(20)}
                image={require("../assets/coproto.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  title: "plasma",
                  isModalVisible: true,
                });
              }}
            >
              <MyCard
                borderColor={"#aaaaaa"}
                title={""}
                titleColor="#000000"
                titleSize={RFValue(20)}
                image={require("../assets/plado.jpg")}
                margin={RFValue(10)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  title: "redCross",
                  isModalVisible: true,
                });
              }}
            >
              <MyCard
                borderColor={"#aaaaaa"}
                title={""}
                titleColor="#000000"
                titleSize={RFValue(20)}
                image={require("../assets/redCross.jpg")}
                margin={RFValue(10)}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View
          style={{
            margin: RFValue(10),
            padding: RFValue(5),
            backgroundColor: "#ffffff",
            height: RFValue(150),
          }}
        >
          <Text style={{ margin: RFValue(5), fontSize: RFValue(10) }}>
            Latest request
          </Text>
          <ScrollView style={{ width: "100%", height: "100%" }}>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.requestList}
              renderItem={this.renderItem}
            />
          </ScrollView>
        </View>

        <View style={{ height: RFValue(180), backgroundColor: "#ffffff" }}>
          <ScrollView
            style={{ flex: 0.5, backgroundColor: "ffefee" }}
            horizontal={true}
          >
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Donor_Card");
              }}
            >
              <MyCard
                borderColor={"#aaaaaa"}
                title={"EDonor-card"}
                // titleColor="#ffffff"
                titleSize={RFValue(20)}
                image={require("../assets/donor.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  isModalVisible: true,
                  title: "ngos",
                });
              }}
            >
              <MyCard
                borderColor={"#eeeeee"}
                titleSide={"inverse"}
                title={"NGOs"}
                titleColor="#000000"
                titleSize={RFValue(20)}
                image={require("../assets/ngos.jpg")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  title: "cancer",
                  isModalVisible: true,
                });
              }}
            >
              <MyCard
                borderColor={"#aaaaaa"}
                title={"Support Cancer Patients"}
                titleColor="#000000"
                // titleSide={"inverse"}
                titleSize={RFValue(20)}
                image={require("../assets/cancer.jpeg")}
                margin={RFValue(10)}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  title: "plastic",
                  isModalVisible: true,
                });
              }}
            >
              <MyCard
                borderColor={"#aaaaaa"}
                title={""}
                titleColor="#000000"
                titleSize={RFValue(20)}
                image={require("../assets/plastic.png")}
                margin={RFValue(10)}
              />
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeeeee",
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
  scrollview: {
    flex: 1,
    backgroundColor: "#fff",
  },
  template: {
    flex: 1,
    flexDirection: "row",
    borderColor: "#0a0a0a",
    borderWidth: RFValue(1),
  },
  templateTextContainer: {
    padding: RFValue(5),
    paddingTop: RFValue(15),
    margin: RFValue(0.5),
    width: RFValue(180),
    // alignContent: "center",
    // justifyContent: "center",
    // borderColor: "#0a0a0a",
    // borderWidth: RFValue(0.5),
  },
  templateHeader: {
    fontSize: RFValue(20),
  },
  label: {
    fontSize: RFValue(13),
    color: "#717D7E",
    fontWeight: "bold",
    paddingLeft: RFValue(10),
    marginLeft: RFValue(20),
  },
  formInput: {
    width: "90%",
    height: RFValue(45),
    padding: RFValue(10),
    borderWidth: 1,
    borderRadius: 2,
    borderColor: "grey",
    paddingBottom: RFValue(10),
    marginLeft: RFValue(20),
    marginBottom: RFValue(14),
  },
  requestButton: {
    width: "75%",
    height: RFValue(50),
    marginTop: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(3),
    backgroundColor: "#fe9090",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    marginTop: RFValue(10),
  },
  requestButtonText: {
    fontSize: RFValue(23),
    fontWeight: "bold",
    color: "#fff",
  },
  cancelButtonText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fe9090",
    margin: RFValue(15),
  },
  requestFormView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(20),
  },
  requestFormText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fe9090",
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
