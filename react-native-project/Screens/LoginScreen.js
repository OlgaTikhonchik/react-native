import { useState } from "react";
import BgImage from "../images/photoBg.jpg";

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
  Alert,
} from "react-native";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    Alert.alert(
      "Credentials:",
      `Email: ${email} 
       Password: ${password}`
    );
    // console.log("Credentials:", `${email} + ${password}`);
    if (email === "" || password === "") {
      Alert.alert("All fields must be filled");
      // console.log("All fields must be filled");
      return;
    }

    setEmail("");
    setPassword("");
  };

  const onShow = () => {
    Alert.alert("Credentials:", `Password: ${password}`);
    // console.log("Show password:", `${password}`);
  };

  return (
    <>
      <View style={styles.containerImage}>
        <Image source={BgImage} style={styles.image} resizeMode="cover" />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={-230}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.login}>
            <Text style={styles.text}>Увійти</Text>

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
            <TouchableOpacity style={styles.loginBtn} onPress={onLogin}>
              <Text style={styles.loginBtnText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.accountBtn}>
              <Text style={styles.linkText}>Немає акаунту?</Text>
              <Text style={styles.linkRegister}>Зареєструватися</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  login: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 323,
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
    marginTop: 32,
    color: "#212121",
    fontWeight: 500,
    marginBottom: 32,
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
  loginBtn: {
    width: "92%",
    height: 51,
    backgroundColor: "#FF6C00",
    padding: 16,
    borderRadius: 100,
    margin: 16,
  },
  loginBtnText: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
  },
  accountBtn: {
    flexDirection: "row",
    justifyContent: "center",
  },
  linkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    marginRight: 8,
  },
  linkRegister: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#1B4371",
    textAlign: "center",
  },
});
