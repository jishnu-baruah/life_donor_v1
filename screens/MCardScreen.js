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
  Switch,
} from "react-native";
import db from "../config";
import firebase from "firebase";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "react-native-elements";
import { RFValue } from "react-native-responsive-fontsize";
import MyNormalHeader from "../components/MyNormalHeader";
import Picker from "react-native-picker";

export default class MCardScreen extends Component {
  constructor() {
    super();
    this.state = {
      emailId: "",
      password: "",
      displayName: "",
      formVisble: false,
      info: undefined,
      firstName: "",
      lastName: "",
      address: "",
      bloodGroup: "",
      coName1: "",
      coName2: "",
      coPhone1: "",
      coPhone2: "",
      medHistory: "",
      isDiabetic: false,
      isHighBP: false,
      isLowBp: false,
      isCarrier: false,
      isThyroid: false,
      isSkin: false,
      year: "",
      month: "",
      date: "",
      action: "Create",
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
      this.getData();
      this.getMCard();
      this.getInfo();

      console.log("#home screen", userId, password);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  componentDidMount() {
    this.getToken();
  }

  getInfo = async () => {
    try {
      let infoStRing = await AsyncStorage.getItem("info");
      let info = JSON.parse(infoStRing);
      if (info !== undefined) {
        this.setState({
          info: info,
          firstName: info.first_name,
          lastName: info.last_name,
          address: info.address,
          bloodGroup: info.bloodGroup,
          coName1: info.coName1,
          coName2: info.coName2,
          coPhone1: info.coPhone1,
          coPhone2: info.coPhone2,
          medHistory: info.medHistory,
          isDiabetic: info.isDiabetic,
          isHighBP: info.isHighBP,
          isLowBp: info.isLowBp,
          isCarrier: info.isCarrier,
          isThyroid: info.isThyroid,
          isSkin: info.isSkin,
          year: info.year,
          month: info.month,
          date: info.date,
        });
      }
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

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

  getData = async () => {
    db.collection("users")
      .where("email_id", "==", this.state.emailId)
      .get()
      .then((querySnapshot) => {
        var firstName = querySnapshot.docs[0].data().first_name;
        var lastName = querySnapshot.docs[0].data().last_name;
        var address = querySnapshot.docs[0].data().address;
        if (firstName !== undefined) {
          this.setState({
            firstName: firstName,
            lastName: lastName,
            address: address,
          });
        }
      });
  };

  getMCard = async () => {
    db.collection("medicalInfo")
      .where("email_id", "==", this.state.emailId)
      .get()
      .then(async (querySnapshot) => {
        var info = querySnapshot.docs[0].data();
        if (info !== undefined) {
          this.setState({
            info: info,
            action: "Update",
          });
          await AsyncStorage.setItem("info", info);
        } else {
          this.setState({
            action: "Create",
          });
        }
      });
  };

  toYesNo(value) {
    if (value) {
      return "yes";
    } else {
      return "no";
    }
  }

  showCard = () => {
    if (this.state.info !== undefined) {
      return (
        <View style={{ backgroundColor: "#fffafa" }}>
          <Text
            style={[
              styles.saveText,
              { margin: RFValue(30), marginBottom: RFValue(0) },
            ]}
          >
            E-Medical Card
          </Text>
          <View
            style={{
              backgroundColor: "#ffffff",
              margin: RFValue(30),
              borderColor: "grey",
              borderWidth: RFValue(1),
              borderRadius: RFValue(5),
              padding: RFValue(10),
              shadowColor: "#000",
              shadowOffset: {
                width: RFValue(0),
                height: RFValue(8),
              },
              shadowOpacity: RFValue(0.84),
              shadowRadius: RFValue(10.32),
              elevation: RFValue(2),
            }}
          >
            <Text>
              Name : {this.state.firstName} {this.state.lastName}
            </Text>
            <Text>
              Date of birth : {this.state.year}/{this.state.month}/
              {this.state.date} (yy/mm/dd)
            </Text>
            <Text>Blood Group : {this.state.bloodGroup}</Text>
            <Text>Address : {this.state.address}</Text>
            <Text>Emergency contacts(call during emergency)</Text>
            <Text>CONTACT -1 </Text>
            <Text>
              Name : {this.state.coName1}
              {"\n"}phone no. : {this.state.coPhone1}
            </Text>
            <Text>CONTACT -2 </Text>
            <Text>
              Name : {this.state.coName2}
              {"\n"}phone no. : {this.state.coPhone2}
            </Text>
            <Text>Medical information:</Text>
            <Text>diabetic : {this.toYesNo(this.state.isDiabetic)}</Text>
            <Text>High BP : {this.toYesNo(this.state.isHighBP)}</Text>
            <Text>Low BP : {this.toYesNo(this.state.isLowBP)}</Text>
            <Text>Thyroid : {this.toYesNo(this.state.isThyroid)}</Text>
            <Text>
              Any major skin disease/allergy : {this.toYesNo(this.state.isSkin)}
            </Text>
            <Text>
              Any transmittable disease/infection :{" "}
              {this.toYesNo(this.state.isCarrier)}
            </Text>
            <Text>Medical history :</Text>
            <Text>{this.state.medHistory}</Text>
          </View>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 0.5,
            alignItems: "center",
            margin: RFValue(30),
            fontSize: RFValue(20),
          }}
        >
          <Text>You have not created your E-Medi card</Text>
          <Text>Create your own E-Medi card for free</Text>
        </View>
      );
    }
  };

  showForm = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.formVisble}
        onRequestClose={() => {
          this.setState({
            formVisble: false,
          });
        }}
      >
        <ScrollView style={styles.scrollview}>
          <View style={styles.saveView}>
            <Text style={styles.saveText}> E-MEDI CARD </Text>
          </View>
          <View style={{ flex: 0.95 }}>
            <Text style={styles.label}>First Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"First Name"}
              maxLength={12}
              value={this.state.firstName}
              onChangeText={(text) => {
                this.setState({
                  firstName: text,
                });
              }}
            />

            <Text style={styles.label}>Last Name </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Last Name"}
              maxLength={12}
              value={this.state.lastName}
              onChangeText={(text) => {
                this.setState({
                  lastName: text,
                });
              }}
            />
            <Text style={styles.label}>Date of birth</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Year"}
              maxLength={4}
              value={this.state.year}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                this.setState({
                  year: text,
                });
              }}
            />
            <TextInput
              style={styles.formInput}
              placeholder={"Month"}
              maxLength={2}
              value={this.state.month}
              keyboardType={"number-pad"}
              onChangeText={(text) => {
                this.setState({
                  month: text,
                });
              }}
            />
            <TextInput
              style={styles.formInput}
              placeholder={"Date"}
              maxLength={4}
              keyboardType={"number-pad"}
              value={this.state.date}
              onChangeText={(text) => {
                this.setState({
                  date: text,
                });
              }}
            />
            {/* <View >
              <Picker
                selectedValue={
                  (this.state.grouptoBeFiltered && this.state.pickerValue) ||
                  "a"
                }
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Blood Group" value="null" />
                <Picker.Item label="A+" value="A+" />
                <Picker.Item label="A-" value="A-" />
                <Picker.Item label="B+" value="B+" />
                <Picker.Item label="B-" value="B-" />
                <Picker.Item label="AB+" value="AB+" />
                <Picker.Item label="AB-" value="AB-" />
                <Picker.Item label="O+" value="O+" />
                <Picker.Item label="O-" value="O-" />
              </Picker>
            </View> */}
            <Text style={styles.label}>Blood Group</Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Blood group"}
              maxLength={3}
              value={this.state.bloodGroup}
              onChangeText={(text) => {
                this.setState({
                  bloodGroup: text.toUpperCase(),
                });
              }}
            />
            <Text style={styles.label}>Emergency Contact</Text>
            <Text style={[styles.label, { fontSize: RFValue(10) }]}>
              (Give contacts available during emergencies)
            </Text>
            <Text
              style={[
                styles.label,
                {
                  fontSize: RFValue(12),
                  marginTop: RFValue(10),
                  paddingLeft: RFValue(30),
                },
              ]}
            >
              Contact-1
            </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Name"}
              // maxLength={12}
              value={this.state.coName1}
              onChangeText={(text) => {
                this.setState({
                  coName1: text,
                });
              }}
            />
            <TextInput
              style={styles.formInput}
              placeholder={"phone no."}
              maxLength={12}
              keyboardType={"number-pad"}
              value={this.state.coPhone1}
              onChangeText={(text) => {
                this.setState({
                  coPhone1: text,
                });
              }}
            />
            <Text
              style={[
                styles.label,
                { fontSize: RFValue(12), paddingLeft: RFValue(30) },
              ]}
            >
              Contact-2
            </Text>
            <TextInput
              style={styles.formInput}
              placeholder={"Name"}
              // maxLength={12}
              value={this.state.coName2}
              onChangeText={(text) => {
                this.setState({
                  coName2: text,
                });
              }}
            />
            <TextInput
              style={[styles.formInput, { marginBottom: RFValue(25) }]}
              placeholder={"phone no."}
              maxLength={12}
              keyboardType={"number-pad"}
              value={this.state.coPhone2}
              onChangeText={(text) => {
                this.setState({
                  coPhone2: text,
                });
              }}
            />

            <Text style={styles.label}> Address </Text>

            <TextInput
              style={[styles.formInput, { height: RFValue(70) }]}
              placeholder={"Address"}
              multiline={true}
              value={this.state.address}
              onChangeText={(text) => {
                this.setState({
                  address: text,
                });
              }}
            />
          </View>

          <Text style={styles.label}>Medical Info</Text>
          <View style={styles.statementContainer}>
            <Text
            // style={styles.statement}
            >
              Are you diabetic
            </Text>
            <View style={styles.switchContainer}>
              <Text>NO</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#aaaaaa"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ isDiabetic: !this.state.isDiabetic });
                }}
                value={this.state.isDiabetic}
              ></Switch>
              <Text>YES</Text>
            </View>
          </View>
          <View style={styles.statementContainer}>
            <Text
            // style={styles.statement}
            >
              Are you a High BP patient
            </Text>
            <View style={styles.switchContainer}>
              <Text>NO</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#aaaaaa"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ isHighBP: !this.state.isHighBP });
                }}
                value={this.state.isHighBP}
              ></Switch>
              <Text>YES</Text>
            </View>
          </View>
          <View style={styles.statementContainer}>
            <Text
            // style={styles.statement}
            >
              Are you a low BP patient
            </Text>
            <View style={styles.switchContainer}>
              <Text>NO</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#aaaaaa"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ isLowBp: !this.state.isLowBp });
                }}
                value={this.state.isLowBp}
              ></Switch>
              <Text>YES</Text>
            </View>
          </View>
          <View style={styles.statementContainer}>
            <Text
            // style={styles.statement}
            >
              Are you a carrier of{"\n"}transmittable disease
            </Text>
            <View style={styles.switchContainer}>
              <Text>NO</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#aaaaaa"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ isCarrier: !this.state.isCarrier });
                }}
                value={this.state.isCarrier}
              ></Switch>
              <Text>YES</Text>
            </View>
          </View>
          <View style={styles.statementContainer}>
            <Text
            // style={styles.statement}
            >
              Are you suffering from{"\n"}thyroid disorder
            </Text>
            <View style={styles.switchContainer}>
              <Text>NO</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#aaaaaa"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ isThyroid: !this.state.isThyroid });
                }}
                value={this.state.isThyroid}
              ></Switch>
              <Text>YES</Text>
            </View>
          </View>
          <View style={styles.statementContainer}>
            <Text
            // style={styles.statement}
            >
              Are you suffering from any{"\n"}major skin disease
            </Text>
            <View style={styles.switchContainer}>
              <Text>NO</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={"#aaaaaa"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => {
                  this.setState({ isSkin: !this.state.isSkin });
                }}
                value={this.state.isSkin}
              ></Switch>
              <Text>YES</Text>
            </View>
          </View>

          <Text style={[styles.label, { marginTop: RFValue(20) }]}>
            {" "}
            Medical History{" "}
          </Text>

          <TextInput
            style={[styles.formInput, { height: RFValue(70) }]}
            placeholder={
              "mention any important medical information eg. heart patient or any recent operation or surgery"
            }
            multiline={true}
            value={this.state.medHistory}
            onChangeText={(text) => {
              this.setState({
                medHistory: text,
              });
            }}
          />

          <View style={{ flex: 0.2, alignItems: "center" }}>
            <TouchableOpacity
              style={styles.createButton}
              onPress={() => {
                if (this.state.action === "Create") {
                  this.saveInfo();
                } else {
                  this.updateInfo();
                }
                Alert.alert("saving info...", "", [
                  {
                    text: "OK",
                    onPress: () =>
                      this.setState({
                        formVisble: false,
                      }),
                  },
                ]);
              }}
            >
              <Text style={styles.createButtonText}>
                Save and {this.state.action}
              </Text>
            </TouchableOpacity>
            <Text
              style={styles.cancelButtonText}
              onPress={() => {
                this.setState({ formVisble: false });
              }}
            >
              Cancel
            </Text>
          </View>
        </ScrollView>
      </Modal>
    );
  };

  saveInfo = () => {
    var info = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
      address: this.state.address,
      bloodGroup: this.state.bloodGroup,
      coName1: this.state.coName1,
      coName2: this.state.coName2,
      coPhone1: this.state.coPhone1,
      coPhone2: this.state.coPhone2,
      medHistory: this.state.medHistory,
      isDiabetic: this.state.isDiabetic,
      isHighBP: this.state.isHighBP,
      isLowBp: this.state.isLowBp,
      isCarrier: this.state.isCarrier,
      isThyroid: this.state.isThyroid,
      isSkin: this.state.isSkin,
      email_id: this.state.emailId,
    };
    db.collection("medicalInfo")
      .add(info)
      .then(async () => {
        try {
          await AsyncStorage.setItem("info", JSON.stringify(info));
        } catch (error) {
          console.log("Something went wrong", error.message);
        }
        Alert.alert("Data saved succesfully", "", [
          {
            text: "OK",
            onPress: () =>
              this.setState({
                formVisble: false,
              }),
          },
        ]).then(() => {
          this.getToken();
        });
      });
  };

  updateInfo = () => {
    var info = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
      address: this.state.address,
      bloodGroup: this.state.bloodGroup,
      coName1: this.state.coName1,
      coName2: this.state.coName2,
      coPhone1: this.state.coPhone1,
      coPhone2: this.state.coPhone2,
      medHistory: this.state.medHistory,
      isDiabetic: this.state.isDiabetic,
      isHighBP: this.state.isHighBP,
      isLowBp: this.state.isLowBp,
      isCarrier: this.state.isCarrier,
      isThyroid: this.state.isThyroid,
      isSkin: this.state.isSkin,
      email_id: this.state.emailId,
    };
    db.collection("medicalInfo")
      .where("email_id", "==", this.state.emailId)

      .get()
      .then((querySnapshot) => {
        var id = querySnapshot.docs[0].id;
        db.collection("medicalInfo")
          .doc(id)
          .update(info)
          .then(async () => {
            try {
              await AsyncStorage.setItem("info", JSON.stringify(info));
            } catch (error) {
              console.log("Something went wrong", error.message);
            }
            Alert.alert("Data updated succesfully", "", [
              {
                text: "OK",
                onPress: () =>
                  this.setState({
                    formVisble: false,
                  }),
              },
            ]).then(() => {
              this.this.getToken();
            });
          });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.showForm()}
        <MyNormalHeader
          title={"Hi " + this.state.displayName}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <View>{this.showCard()}</View>
          <View style={{ flex: 0.5, alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.button, { margin: RFValue(80) }]}
              onPress={() => {
                this.setState({
                  formVisble: true,
                });
              }}
            >
              <Text style={styles.buttonText}>{this.state.action}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#F5E0E3",
    backgroundColor: "#fffafa",
  },
  button: {
    width: "50%",
    height: RFValue(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(5),
    backgroundColor: "#ffff",
    shadowColor: "#000",
    margin: RFValue(10),

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
  saveView: {
    flex: 0.05,
    justifyContent: "center",
    alignItems: "center",
    margin: RFValue(20),
  },
  saveText: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    color: "#fe9090",
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
  createButton: {
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
  createButtonText: {
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
  picker: {
    borderWidth: 1,
    borderColor: "#848484",
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 10,
  },
  statementContainer: {
    alignItems: "center",
    // backgroundColor: '#29b6f6',
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
    backgroundColor: "#fafafa",
    marginRight: RFValue(30),
    marginLeft: RFValue(30),
    marginTop: RFValue(10),
  },
  switchContainer: {
    alignItems: "center",
    // backgroundColor: '#29b6f6',
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  switch: {},
  // statement: {},
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
//
