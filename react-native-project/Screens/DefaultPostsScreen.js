import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config";
import { useSelector } from "react-redux";
import { Feather } from "@expo/vector-icons";

const DefaultPostsScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userName, email, avatar } = useSelector((state) => state.auth.user);

  const getAllPosts = async () => {
    onSnapshot(collection(db, "posts"), (doc) => {
      const result = [];
      doc.docs.forEach((doc) => {
        const post = { ...doc.data(), idPost: doc.id };
        result.push(post);
      });
      result.sort((a, b) => b.datePost - a.datePost);
      setPosts(result);
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        {avatar && <Image style={styles.userPhoto} source={{ uri: avatar }} />}
        <View>
          <Text style={styles.userName}>{userName}</Text>
          <Text style={styles.userEmail}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.idPost}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image source={{ uri: item.photoToServer }} style={styles.image} />
            <Text style={styles.photoTitle}>{item.photoTitle.photoTitle}</Text>
            <View style={styles.wrapper}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Comments", {
                    idPost: item.idPost,
                    photoToServer: item.photoToServer,
                    // comments: item.comment,
                  })
                }
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.countComments, marginLeft: 6 }}>
                  {item.comments?.length || 0}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.7}
                onPress={() =>
                  navigation.navigate("Map", {
                    location: item.locationCoords,
                  })
                }
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>
                  {item.photoLocation.photoLocation}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default DefaultPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    paddingBottom: 32,

    flexDirection: "row",
    alignItems: "center",
  },
  userPhoto: {
    marginRight: 8,
    borderRadius: 16,
    height: 60,
    width: 60,
    resizeMode: "cover",
  },
  userName: {
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    color: "#212121CC",
  },

  image: { height: 240, marginBottom: 8, borderRadius: 8, resizeMode: "cover" },
  photoTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  wrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countComments: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});
