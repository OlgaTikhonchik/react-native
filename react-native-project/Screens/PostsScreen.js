// import logOut from "../images/logOut.png";
// import user from "../images/user.png";
import userFoto from "../images/userFoto.jpg";
// import grid from "../images/grid.png";
// import union from "../images/union.png";
import Post from "../components/Post";
// import { nanoid } from "nanoid";
// import { useSelector } from "react-redux";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useEffect, useState } from "react";

export default function PostScreen({ route }) {
  const [posts, setPosts] = useState([]);

  // const photoUri = route.params && route.params.photoUri;

  const renderItem = ({ item }) => (
    <Post
      key={item.id}
      photoUri={item.photoUri}
      name={item.name}
      location={item.locationName}
      geolocation={item.geolocation}
    />
  );

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <>
      {/* <ScrollView style={{ backgroundColor: "#FFFFFF" }}> */}
      <View style={styles.posts}>
        {/* <View style={styles.container}>
        <View style={styles.TitleContainer}>
          <Text style={styles.title}>Публікації</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={logOut} style={styles.logOutBtn} />
        </View>
      </View> */}
        <View style={styles.user}>
          <View style={styles.userAvatar}>
            <Image source={userFoto} style={styles.userAvatarImg} />
          </View>
          <View style={styles.UserInfo}>
            <Text style={styles.UserName}>Natali Romanova</Text>
            <Text style={styles.UserEmail}>email@example.com</Text>
          </View>
        </View>

        {/* {route.params && (
          <Post
            photoUri={route.params.photoUri}
            name={route.params.name}
            location={route.params.locationName}
            geolocation={route.params.geolocation}
          />
        )} */}

        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <Post /> */}

        {/* <View style={styles.menu}>
        <TouchableOpacity style={styles.btnGrid}>
          <Image source={grid} style={styles.btnGridImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUnion}>
          <Image source={union} style={styles.unionImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUser}>
          <Image source={user} style={styles.btnUserImg} />
        </TouchableOpacity>
      </View>  */}
      </View>

      {/* </ScrollView>  */}
    </>
  );
}

const styles = StyleSheet.create({
  posts: {
    width: "100%",
    height: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  container: {
    height: 88,
    width: "100%",
    alignItems: "center",
    borderBottomColor: "#E5E5E5",
    borderBottomWidth: 0.5,
    paddingBottom: 11,
    paddingTop: 55,
  },

  title: {
    fontSize: 17,
    fontWeight: 500,
    color: "#212121",
  },
  logOutBtn: {
    position: "absolute",
    bottom: 0,
    left: 170,
  },
  user: {
    marginTop: 32,
    width: "100%",
    paddingLeft: 16,
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 32,
  },
  userAvatarImg: {
    marginRight: 8,
    width: 60,
    height: 60,
  },
  // userAvatar: {
  //   display: "flex",
  //   justifyContent: "flex-start",
  // },
  UserName: {
    color: "#212121",
    fontSize: 13,
    fontFamily: "Roboto-Bold",
  },
  UserEmail: {
    color: "#212121CC",
    fontSize: 11,
    fontFamily: "Roboto-Regular",
  },
  menu: {
    width: "100%",
    flexDirection: "row",
    borderColor: "#E5E5E5",
    borderTopWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 9,
    paddingBottom: 22,
    borderWidth: 1,
    position: "absolute",
    bottom: 0,
  },
  btnGrid: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnGridImg: {
    width: 24,
    height: 24,
  },
  btnUnion: {
    width: 70,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    marginLeft: 31,
    marginRight: 31,
  },

  btnUser: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  btnUserImg: {
    width: 24,
    height: 24,
  },
});
////////////////////////////////////

// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigation } from "@react-navigation/native";
// import {
//   StyleSheet,
//   Image,
//   TextInput,
//   TouchableWithoutFeedback,
//   TouchableOpacity,
//   Keyboard,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   Alert,
//   Button,
//   View,
//   Text,
//   Dimensions,
//   FlatList,
// } from "react-native";
// import { Feather, SimpleLineIcons } from "@expo/vector-icons";

// // import { MapPin, MessageCircle } from "react-native-feather";

// // import { useUser } from "../../services/userContext";

// // const { width, height } = Dimensions.get("screen");

// export default function PostsScreen({ route }) {
//   const [posts, setPosts] = useState([]);
//   const navigation = useNavigation();
//   // const { login, email } = useUser();

//   useEffect(() => {
//     if (route.params) {
//       setPosts((prevState) => [...prevState, route.params]);
//     }
//   }, [route.params]);
//   // console.log("posts--->", posts);

//   const onMapScreen = (latitude, longitude) => {
//     navigation.navigate("Map", {
//       latitude,
//       longitude,
//     });
//   };

//   const onCommentsScreen = (uri) => {
//     navigation.navigate("Comments", { uri });
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.authBox}>
//         <View style={styles.boxFoto}></View>
//         <View>
//           <Text style={styles.nameTitle}>login</Text>
//           <Text style={styles.emailTitle}>login@gmail.com</Text>
//         </View>
//       </View>

//       <FlatList
//         data={posts}
//         keyExtractor={(item, indx) => indx.toString()}
//         renderItem={({ item }) => {
//           return (
//             <View
//               style={{
//                 marginBottom: 32,
//                 justifyContent: "center",
//               }}
//             >
//               <Image
//                 source={{ uri: item.photoUri }}
//                 style={{
//                   height: 299,
//                   borderRadius: 8,
//                   marginBottom: 8,
//                 }}
//               />
//               <Text style={styles.fotoTitle}>{item.name}</Text>

//               <View style={styles.fotoDetails}>
//                 <TouchableOpacity
//                   style={styles.comments}
//                   onPress={() => {
//                     onCommentsScreen(item.photoUri);
//                   }}
//                 >
//                   <Feather
//                     onPress={() => navigation.navigate("Comments")}
//                     name="message-circle"
//                     size={24}
//                     style={styles.icon}
//                   />
//                   <Text style={styles.commentsNumber}>0</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   style={styles.fotoMap}
//                   onPress={() =>
//                     onMapScreen((item.locationLatitude, item.locationLongitude))
//                   }
//                 >
//                   <SimpleLineIcons
//                     name="location-pin"
//                     size={24}
//                     style={styles.icon}
//                   />
//                   <Text style={styles.fotoLocation}>{item.location}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           );
//         }}
//       />
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingTop: 32,
//     justifyContent: "center",
//   },
//   authBox: {
//     flex: 0,
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//     marginBottom: 32,
//   },
//   boxFoto: {
//     width: 60,
//     height: 60,
//     backgroundColor: "#F6F6F6",
//     borderRadius: 16,
//   },
//   nameTitle: {
//     color: "#212121",
//     fontFamily: "Roboto-Bold",
//     fontSize: 13,
//     lineHeight: 15,
//   },
//   emailTitle: {
//     color: "rgba(33, 33, 33, 0.8)",
//     fontFamily: "Roboto-Regular",
//     fontSize: 11,
//     lineHeight: 13,
//   },
//   fotoTitle: {
//     color: "#212121",
//     fontFamily: "Roboto-Medium",
//     fontSize: 16,
//     lineHeight: 19,
//     marginBottom: 8,
//   },
//   fotoDetails: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   comments: {
//     flexDirection: "row",
//     gap: 6,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   commentsNumber: {
//     color: "#BDBDBD",
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     lineHeight: 19,
//   },
//   fotoMap: {
//     flexDirection: "row",
//     gap: 3,
//   },

//   fotoLocation: {
//     color: "#212121",
//     fontFamily: "Roboto-Regular",
//     fontSize: 16,
//     lineHeight: 19,
//     textDecorationLine: "underline",
//   },
// });
