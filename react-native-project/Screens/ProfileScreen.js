// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default function ProfileScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>ProfileScreen Screen</Text>
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

import {
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import bgImage from "../images/photoBg.jpg";
import ProfilePost from "../components/ProfilePosts";
import rectangle from "../images/rectangle.jpg";
import { useState } from "react";

const defaultAvatar = "../images/rectangle.jpg";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const [avatar, setAvatar] = useState(null);
  const [allPostsUser, setAllPostsUser] = useState([]);

  // const renderItem = ({ item }) => (
  //   <ProfilePost
  //     key={item.id}
  //     title={item.title}
  //     comments={item.comments}
  //     like={item.like}
  //     country={item.country}
  //   />
  // );

  return (
    <ImageBackground source={bgImage} style={styles.backgroundImage}>
      {/* <> */}
      <ScrollView>
        <View style={styles.container}>
          <Feather
            onPress={() => {
              navigation.navigate("Login");
            }}
            name="log-out"
            size={24}
            color="#BDBDBD"
            style={styles.logOutIcon}
          />

          <ImageBackground
            style={styles.avatar}
            source={avatar ? { uri: avatar } : require(defaultAvatar)}
            // source={{ uri: avatar }}
          >
            {!avatar ? (
              <View style={styles.icon}>
                <TouchableOpacity>
                  <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.icon}>
                <TouchableOpacity>
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                </TouchableOpacity>
              </View>
            )}

            {/* <View style={styles.icon}>
              <TouchableOpacity>
                 <AntDesign name="closecircleo" size={25} color="#BDBDBD" />
               </TouchableOpacity>
             </View> */}
            {/* <View style={styles.icon}>
            <TouchableOpacity>
              <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
               </TouchableOpacity>
            </View> */}
          </ImageBackground>

          <Text style={styles.title}>Natali Romanova</Text>

          {/* <FlatList
            data={allPostsUser}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          /> */}
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
          <ProfilePost />
        </View>
      </ScrollView>
      {/* </> */}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    position: "relative",
    flex: 1,
    marginBottom: -83,
    height: "100%",
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },

  container: {
    position: "relative",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
    paddingHorizontal: 16,
    paddingVertical: 92,
    backgroundColor: "#FFFFFF",
  },

  logOutIcon: {
    position: "absolute",
    top: 22,
    right: 16,
  },

  avatar: {
    position: "absolute",
    top: -60,
    left: "50%",
    transform: [{ translateX: -50 }],

    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },

  icon: {
    position: "absolute",
    right: -12,
    bottom: 14,

    width: 25,
    height: 25,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontWeight: 500,
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginBottom: 32,
  },
});
////////////////
