import BgImage from "../images/photoBg.jpg";
import add from "../images/add.png";
import {
  Image,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Keyboard,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";

export default function RegistrationScreen() {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = () => {
    Alert.alert(
      "Credentials:",
      `Login: ${login} 
       Email: ${email} 
       Password: ${password}`
    );
    // console.log("Credentials:", `${login} + ${email} + ${password}`);
    if (login === "" || email === "" || password === "") {
      Alert.alert("All fields must be filled");
      // console.log("All fields must be filled");
      return;
    }
    setLogin("");
    setEmail("");
    setPassword("");
  };

  const onShow = () => {
    Alert.alert("Credentials:", `Password: ${password}`);
    // console.log("Show password:", `${password}`);
  };

  const onRegisteredAccount = () => {
    Alert.alert(
      "Show registered account:",
      `Login: ${login} 
       Email: ${email} 
       Password: ${password}`
    );
    // console.log("Show registered account");
  };
  return (
    <>
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.containerImage}>
          <Image source={BgImage} style={styles.image} resizeMode="cover" />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : ""}
          style={styles.container}
          keyboardVerticalOffset={-240}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.register}>
              <Image style={styles.imageAvatar} />
              <Image source={add} style={styles.imageAdd} />
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                placeholder="Логін"
                placeholderTextColor={"#BDBDBD"}
                style={styles.input}
                autoCompleteType="off"
                value={login}
                onChangeText={setLogin}
              />
              <TextInput
                placeholder="Адреса електронної пошти"
                placeholderTextColor={"#BDBDBD"}
                style={styles.input}
                autoCompleteType="off"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                placeholder="Пароль"
                placeholderTextColor={"#BDBDBD"}
                style={styles.input}
                autoCompleteType="off"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.showTxt} onPress={onShow}>
                <Text style={styles.showText}>Показати</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerBtn} onPress={onRegister}>
                <Text style={styles.registerBtnText}>Зареєстуватися</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onRegisteredAccount}>
                <Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
  },
  container: {
    flex: 1,
    width: "100%",
  },
  image: {
    // flex: 1,
    width: "100%",
  },
  register: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 263,
  },
  imageAvatar: {
    position: "absolute",
    backgroundColor: "#F6F6F6",
    width: 120,
    height: 120,
    borderRadius: 16,
    top: -60,
    right: 150,
  },
  imageAdd: {
    position: "absolute",
    width: 25,
    height: 25,
    left: 250,
    top: 21,
  },
  text: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    textAlign: "center",
    marginTop: 92,
    color: "#212121",
    fontWeight: 500,
    marginBottom: 33,
  },
  input: {
    width: "92%",
    height: 50,
    backgroundColor: "#F6F6F6",
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    fontSize: 16,
  },
  showText: {
    fontSize: 16,
    color: "#1B4371",
    position: "absolute",
    textAlign: "right",

    right: 32,
    bottom: 30,
  },
  registerBtn: {
    width: "92%",
    height: 51,
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
    margin: 16,
  },
  registerBtnText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    // marginTop: 16,
  },
});
