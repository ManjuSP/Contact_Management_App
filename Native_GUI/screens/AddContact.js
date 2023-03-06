import { useEffect, useState } from "react";
import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  ToastAndroid,
} from "react-native";
import axios from "axios";
import { Checkbox, RadioButton } from "react-native-paper";
import { Feather } from "@expo/vector-icons";

const AddContact = ({ route, navigation }) => {
  const [methodType] = useState(route.params.method);
  const [isSubmited, setSubmited] = useState(false);


  const [value, onChangeText] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    alternateNo: "",
    emailId: "",
    gender: "",
    favourite: false,
  });
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };
  const submitData = async () => {
    if (value.phoneNo == "" || value.emailId == "") {
      Alert.alert("enter phone number / emailId ");
      return;
    }
    if (methodType == "put") {
      await axios({
        method: "put",
        url: "http://192.168.1.8:9000/contacts/" + value._id,
        data: {
          firstName: value.firstName,
          lastName: value.lastName,
          phoneNo: value.phoneNo,
          alternateNo: value.alternateNo,
          emailId: value.emailId,
          gender: value.gender,
          favourite: value.favourite,
        },
      }).then(() => {
        setSubmited(true);
        showToast("successfully edited");
      });
      setTimeout(() => {
        navigation.navigate("Home", { item: Math.random() });
      }, 400);
    } else {
      await axios({
        method: "post",
        url: "http://192.168.1.8:9000/addContacts",
        data: {
          firstName: value.firstName,
          lastName: value.lastName,
          phoneNo: value.phoneNo,
          alternateNo: value.alternateNo,
          emailId: value.emailId.toLocaleLowerCase(),
          gender: value.gender,
          favourite: value.favourite,
        },
      }).then(() => {
        setSubmited(true);
        showToast("Contact added successfully");
      });
      setTimeout(() => {
        navigation.navigate("Home", { item: Math.random() });
      }, 400);
    }
  };
  useEffect(() => {
    
    if (route?.params?.item) {
      onChangeText(route.params.item);
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.formContainer}>
            <Text style={styles.label}>First Name :</Text>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="text"
                textAlign="left"
                placeholder="eg : John"
                style={styles.Input}
                onChangeText={(text) =>
                  onChangeText((prev) => {
                    return { ...prev, firstName: text };
                  })
                }
                value={value.firstName}
              />
            </View>
            <Text style={styles.label}>Last Name :</Text>
            <View style={styles.inputContainer}>
              <TextInput
                textAlign="left"
                keyboardType="text"
                placeholder="eg: cena"
                style={styles.Input}
                onChangeText={(text) =>
                  onChangeText((prev) => {
                    return { ...prev, lastName: text };
                  })
                }
                value={value.lastName}
              />
            </View>
            <Text style={styles.label}>Phone Number :</Text>
            <View style={styles.inputContainer}>
              <TextInput
                textAlign="left"
                keyboardType="numeric"
                maxLength={10}
                placeholder="    "
                style={styles.Input}
                onChangeText={(text) =>
                  onChangeText((prev) => {
                    return { ...prev, phoneNo: text };
                  })
                }
                value={value.phoneNo}
              />
            </View>
            <Text style={styles.label}>Alternate Number :</Text>
            <View style={styles.inputContainer}>
              <TextInput
                textAlign="left"
                keyboardType="numeric"
                placeholder="    "
                style={styles.Input}
                onChangeText={(text) =>
                  onChangeText((prev) => {
                    return { ...prev, alternateNo: text };
                  })
                }
                value={value.alternateNo}
              />
            </View>
            <Text style={styles.label}>Email Id :</Text>
            <View style={styles.inputContainer}>
              <TextInput
                keyboardType="text"
                textAlign="left"
                clearTextOnFocus={true}
                placeholder="   johncena@gmail.com"
                style={styles.Input}
                onChangeText={(text) =>
                  onChangeText((prev) => {
                    return { ...prev, emailId: text };
                  })
                }
                value={value.emailId}
              />
            </View>

            <View style={styles.formBottom}>
              <Text style={styles.label}> Gender :</Text>
              <View style={styles.radioBtn}>
                <RadioButton
                  color="skyblue"
                  value="MALE"
                  status={value.gender === "MALE" ? "checked" : "unchecked"}
                  onPress={() =>
                    onChangeText((prev) => {
                      return { ...prev, gender: "MALE" };
                    })
                  }
                />
                <Text style={styles.radioText}>Male</Text>
                <RadioButton
                  value="FEMALE"
                  color="skyblue"
                  status={value.gender === "FEMALE" ? "checked" : "unchecked"}
                  onPress={() =>
                    onChangeText((prev) => {
                      return { ...prev, gender: "FEMALE" };
                    })
                  }
                />
                <Text style={styles.radioText}>Female</Text>
              </View>
            </View>
            <View style={styles.checkBox}>
              <Checkbox
                status={value.favourite ? "checked" : "unchecked"}
                color="skyblue"
                onPress={() => {
                  onChangeText((prev) => {
                    return { ...prev, favourite: !prev.favourite };
                  });
                }}
              />
              <Text style={styles.labelCheckBox}> Add To Favourites</Text>
            </View>

            <TouchableOpacity onPress={() => submitData()} style={styles.btn}>
              {!isSubmited ? (
                <Text style={styles.submitText}>S U B M I T</Text>
              ) : (
                <Feather name="check-circle" size={34} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    paddingLeft: 20,
    justifyContent: "center",
    marginLeft: 0,
  },
  Input: {
    marginTop: 3,
    paddingLeft: 20,
    width: "98%",
    height: "88%",
    backgroundColor: "white",
    fontSize: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#80dfff",
  },
  btn: {
    width: "98%",
    height: 49,
    marginTop: 35,
    justifyContent: "center",
    alignItems: "center",
    border: 1,
    backgroundColor: "#99ddff",
    borderRadius: 12,
  },
  submitText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    alignItems: "center",
  },
  inputContainer: {
    marginTop: 6,
    width: "95%",
    height: 47,
    backgroundColor: "#ccf2ff",
    borderRadius: 10,
    alignItems: "center",
  },
  radioBtn: {
    marginTop: 10,
    width: "75%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  radioText: {
    fontSize: 20,
    marginTop: 6,
  },
  checkBox: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  labelCheckBox: {
    fontSize: 20,
  },
});

export default AddContact;
