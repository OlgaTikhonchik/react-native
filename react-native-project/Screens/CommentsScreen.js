import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableOpacity,
  FlatList,
  Text,
  Dimensions,
} from "react-native";

import { db } from "../config";
import { doc, updateDoc, arrayUnion, onSnapshot } from "firebase/firestore";

import { Feather } from "@expo/vector-icons";

const CommentsScreen = ({ route }) => {
  const { userName, userId, avatar } = useSelector((state) => state.auth.user);
  const { idPost, photoToServer } = route.params;
  const [comment, setComment] = useState("");
  // console.log(comment);
  const [comments, setComments] = useState([]);
  //console.log(comments);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const [dimensions, setDimension] = useState(Dimensions.get("window").width);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimension(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener?.("change", onChange);
    };
  }, []);

  useEffect(() => {
    Keyboard.addListener("keyboardDidHide", () => {
      keyboardHide();
    });
    return () => {
      Keyboard.removeAllListeners("keyboardDidHide");
    };
  }, [keyboardHide]);

  useEffect(() => {
    getAllComments();
  }, []);

  const createComments = async () => {
    const result = {
      userId,
      userName,
      comment,

      dateComment: Date.now(),
      avatar: avatar ? avatar : null,
    };
    setComment("");

    await updateDoc(doc(db, "posts", `${idPost}`), {
      comments: arrayUnion(result),
    });
    keyboardHide();

    setComment("");
  };

  const getAllComments = async () => {
    onSnapshot(doc(db, "posts", `${idPost}`), (doc) => {
      const postComments = doc.data().comments;
      console.log(postComments);
      postComments && setComments(postComments);
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <Image
            source={{ uri: photoToServer }}
            style={{ ...styles.postPhoto, width: dimensions - 16 * 2 }}
          />
        </KeyboardAvoidingView>

        {comments.length > 0 && (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.dateComment.toString()}
            renderItem={({ item }) => {
              const newDate = new Date(item.dateComment);
              const date = newDate.toLocaleString();

              return (
                <View style={styles.commentWrapper}>
                  <View style={styles.commentIcon}>
                    {item.avatar && (
                      <Image
                        source={{ uri: item.avatar }}
                        style={styles.commentPhoto}
                      />
                    )}
                  </View>
                  <View style={styles.commentTextWrapper}>
                    <Text style={styles.commentText}>{item.comment}</Text>
                    <Text style={styles.commentDate}>{date}</Text>
                  </View>
                </View>
              );
            }}
          />
        )}
        <View>
          <TextInput
            style={styles.input}
            placeholder={"Коментувати..."}
            placeholderTextColor={"#BDBDBD"}
            onChangeText={(value) => {
              setComment(value);
            }}
            value={comment}
          />

          <TouchableOpacity
            onPress={createComments}
            activeOpacity={0.7}
            style={styles.inputBtn}
          >
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 32,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },

  postPhoto: {
    height: 240,
    marginBottom: 32,
  },
  input: {
    height: 50,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
    marginBottom: 16,
    marginTop: 16,
    borderRadius: 100,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    paddingLeft: 16,
    paddingRight: 50,
  },
  inputBtn: {
    position: "absolute",
    top: 24,
    right: 8,
    justifyContent: "center",
    alignItems: "center",
    width: 34,
    height: 34,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  commentWrapper: {
    flexDirection: "row",
    marginBottom: 24,
  },
  commentIcon: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1B4371",
    borderRadius: 14,
    marginRight: 16,
    overflow: "hidden",
  },
  commentPhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 14,
  },
  commentTextWrapper: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 16,
    borderRadius: 6,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    color: "#212121",
    marginBottom: 8,
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
    color: "rgba(189, 189, 189, 1)",
  },
});
