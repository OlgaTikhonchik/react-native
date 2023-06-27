// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function CommentsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>CommentsScreen Screen</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function CommentsScreen() {
  const [inputValue, setInputValue] = useState("");

  const handleComment = () => {
    if (!inputValue) return;
    console.log(inputValue);
    setInputValue("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <ImageBackground style={styles.image}></ImageBackground>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Коментувати..."
              name="comment"
              placeholderTextColor={"#BDBDBD"}
              textContentType="name"
              value={inputValue}
              onChangeText={setInputValue}
            />
            <View style={styles.icon}>
              <TouchableOpacity onPress={handleComment}>
                <AntDesign name="arrowup" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },

  image: {
    backgroundColor: "#F6F6F6",
    height: 240,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
  },

  inputWrapper: {
    position: "relative",
    marginTop: 100,
  },

  input: {
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontSize: 16,
    lineHeight: 19,
    height: 50,
    justifyContent: "flex-end",

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 16,
  },

  icon: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    right: 8,
    top: 8,
    width: 34,
    height: 34,
    backgroundColor: "#FF6C00",
    borderRadius: 25,
  },
});
