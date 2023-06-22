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
} from "react-native";

export default function LoginScreen() {
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
            />
            <TextInput
              placeholder="Пароль"
              placeholderTextColor={"#BDBDBD"}
              style={styles.input}
              autoCompleteType="off"
            />
            <TouchableOpacity style={styles.showTxt}>
              <Text style={styles.showText}>Показати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginBtnText}>Увійти</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>
                Немає акаунту? Зареєструватися
              </Text>
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
  linkText: {
    fontSize: 16,
    color: "#1B4371",
    textAlign: "center",
    // marginTop: 16,
  },
});
