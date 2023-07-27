import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Feather, EvilIcons, AntDesign } from "@expo/vector-icons";
import { authLogoutUser, updateUserAvatar } from "../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../config";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userId, userName, avatar } = useSelector((state) => state.auth.user);
  const [like, setLike] = useState(0);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authLogoutUser());
  };

  const takeAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(updateUserAvatar({ avatar: result.assets[0].uri }));
    }
  };

  const removeAvatar = async () => {
    dispatch(updateUserAvatar({ avatar: null }));
  };

  const getPosts = async () => {
    const q = query(
      collection(db, "posts"),
      where("userId", "==", `${userId}`)
    );
    const querySnapshot = await getDocs(q);
    const result = [];
    querySnapshot.forEach((doc) => {
      const post = { ...doc.data(), idPost: doc.id };
      result.push(post);
    });
    result.sort((a, b) => b.datePost - a.datePost);
    setPosts(result);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../images/photoBg.jpg")}
        style={styles.image}
      >
        <View style={styles.wrapper}>
          <View style={styles.logoutBtn}>
            <Feather
              name="log-out"
              color="#BDBDBD"
              size={24}
              onPress={logout}
            />
          </View>
          <View style={styles.avatarWrapper}>
            {avatar ? (
              <>
                <Image source={{ uri: avatar }} style={styles.avatar} />
                <TouchableOpacity
                  style={styles.btnAdd}
                  activeOpacity={0.7}
                  onPress={removeAvatar}
                >
                  <AntDesign name="closecircleo" size={24} color="#E8E8E8" />
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Image
                  source={require("../images/userFoto.jpg")}
                  style={{ width: 120, height: 120, borderRadius: 16 }}
                />
                <TouchableOpacity
                  style={styles.btnAdd}
                  activeOpacity={0.7}
                  onPress={takeAvatar}
                >
                  <AntDesign name="pluscircleo" size={24} color="#FF6C00" />
                </TouchableOpacity>
              </>
            )}
          </View>
          <Text style={styles.headerTitle}>{userName}</Text>
          <FlatList
            data={posts}
            keyExtractor={(item) => item.idPost}
            renderItem={({ item }) => (
              <View style={styles.listWrapper}>
                <Image
                  source={{ uri: item.photoToServer }}
                  style={styles.postPhoto}
                />
                <Text style={styles.postTitle}>
                  {item.photoTitle.photoTitle}
                </Text>
                <View style={styles.linksWrapper}>
                  <TouchableOpacity
                    style={styles.link}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("Comments", {
                        idPost: item.idPost,
                        photoToServer: item.photoToServer,
                        photoTitle: item.photoTitle,
                        comments: item.comments,
                      });
                    }}
                  >
                    <Feather
                      name="message-circle"
                      size={24}
                      color="#BDBDBD"
                      style={{
                        // ...styles.icon,
                        color: 1 > 0 ? "#FF6C00" : "#BDBDBD",
                      }}
                    />
                    <Text style={{ ...styles.count, marginLeft: 6 }}>
                      {item.comments?.length || 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ ...styles.link, marginLeft: -180 }}
                    activeOpacity={0.7}
                    onPress={() => {
                      console.log("Like");
                    }}
                  >
                    {/* <EvilIcons name="like" size={35} color="#BDBDBD" /> */}
                    <EvilIcons
                      name="like"
                      size={35}
                      color="#BDBDBD"
                      style={{
                        ...styles.icon,
                        color: like > 0 ? "#FF6C00" : "#BDBDBD",
                      }}
                      onPress={() => setLike((prev) => prev + 1)}
                    />
                    <Text style={styles.count}>{like}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.link}
                    activeOpacity={0.7}
                    onPress={() => {
                      navigation.navigate("Map", {
                        location: item.locationCoords,
                      });
                    }}
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
      </ImageBackground>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    paddingTop: 147,
  },
  logoutBtn: {
    position: "absolute",
    top: 17,
    right: 16,
  },
  wrapper: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 60,
    paddingTop: 92,

    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 32,
    flex: 1,
  },
  avatarWrapper: {
    height: 120,
    width: 120,
    borderRadius: 16,
    position: "absolute",
    top: -60,
    backgroundColor: "#F6F6F6",
  },
  avatar: { height: "100%", width: "100%", borderRadius: 16 },
  btnAdd: {
    height: 25,
    width: 25,
    backgroundColor: "#ffffff",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",

    position: "absolute",
    bottom: 19,
    left: 105,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
    textAlign: "center",
  },
  postPhoto: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
    resizeMode: "cover",
  },
  postTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  linksWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  link: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  listWrapper: {
    width: 363,
  },
});
