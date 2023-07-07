import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authRegisterUser } from "../redux/auth/operations";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  userName: "",
  email: "",
  password: "",
  avatar: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const subscription = Dimensions.addEventListener("change", onChange);
    return () => subscription?.remove();
  }, []);

  const takeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setState((prevstate) => ({
        ...prevstate,
        avatar: result.assets[0].uri,
      }));
    }
  };

  const removeAvatar = async () => {
    setState((prevstate) => ({
      ...prevstate,
      avatar: null,
    }));
  };

  const handleSubmit = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log("state", state);
    dispatch(authRegisterUser(state));
    setState(initialState);
  };

  return (
    <TouchableWithoutFeedback onPress={handleSubmit}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../images/photoBg.jpg")}
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              style={{
                ...styles.wrapper,
                paddingBottom: isShowKeyboard ? 32 : 78,

                paddingHorizontal: 16,
              }}
            >
              <View style={styles.wrapperText}>
                <Text style={styles.text}>Регистрация</Text>
              </View>
              <View style={styles.avatar}>
                {!state.avatar ? (
                  <>
                    <Image
                      source={require("../images/userFoto.jpg")}
                      style={{ width: 120, height: 120, borderRadius: 16 }}
                    />

                    <TouchableOpacity
                      style={styles.avatarBtn}
                      activeOpacity={0.7}
                      accessibilityLabel="add avatar"
                      onPress={takeAvatar}
                    >
                      <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Image
                      source={{ uri: state.avatar }}
                      style={{ width: 120, height: 120, borderRadius: 16 }}
                    />

                    <TouchableOpacity
                      style={styles.avatarBtn}
                      activeOpacity={0.7}
                      accessibilityLabel="delete avatar"
                      onPress={removeAvatar}
                    >
                      <AntDesign
                        name="closecircleo"
                        size={24}
                        color="#FF6C00"
                      />
                    </TouchableOpacity>
                  </>
                )}
              </View>
              <TextInput
                style={styles.input}
                placeholder="Логін"
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, userName: value }))
                }
                value={state.userName}
              />
              <TextInput
                style={styles.input}
                placeholder="Адреса електронної пошти"
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
                value={state.email}
              />
              <TextInput
                style={styles.input}
                placeholder="Пароль"
                secureTextEntry={true}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
                value={state.password}
              />

              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={handleSubmit}
              >
                <Text style={styles.textBtn}>Зареєстуватися</Text>
              </TouchableOpacity>
              <Text style={styles.textLogin}>
                Вже є акаунт?{" "}
                <Text
                  style={styles.textLogin}
                  onPress={() => navigation.navigate("Login")}
                >
                  Увійти
                </Text>
              </Text>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegistrationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapper: {
    backgroundColor: "#fff",
    borderTopRightRadius: 25,
    borderTopStartRadius: 25,
  },
  wrapperText: {
    alignItems: "center",
  },

  text: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginBottom: 33,
    paddingTop: 92,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    backgroundColor: "#F6F6F6",
    height: 50,
    paddingLeft: 16,
    marginBottom: 16,
  },
  btn: {
    backgroundColor: "#FF6C00",
    height: 51,
    borderRadius: 100,
    marginTop: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    color: "#fff",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  textLogin: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    marginTop: 16,
    textAlign: "center",
  },
  avatar: {
    position: "absolute",
    right: "50%",
    top: 0,
    transform: [{ translateX: 60 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 19,
    left: 105,
    width: 25,
    height: 25,
  },
});
