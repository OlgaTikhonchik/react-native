import logOut from "../images/logOut.png";
import user from "../images/user.png";
import userFoto from "../images/userFoto.jpg";
import grid from "../images/grid.png";
import union from "../images/union.png";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PostScreen() {
  return (
    <View style={styles.posts}>
      <View style={styles.container}>
        <View style={styles.TitleContainer}>
          <Text style={styles.title}>Публікації</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={logOut} style={styles.logOutBtn} />
        </View>
      </View>
      <View style={styles.user}>
        <View style={styles.userAvatar}>
          <Image source={userFoto} style={styles.userAvatarImg} />
        </View>
        <View style={styles.UserInfo}>
          <Text style={styles.UserName}>Natali Romanova</Text>
          <Text style={styles.UserEmail}>email@example.com</Text>
        </View>
      </View>
      <View style={styles.menu}>
        <TouchableOpacity style={styles.btnGrid}>
          <Image source={grid} style={styles.btnGridImg} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnUnion}>
          <Image source={union} style={styles.unionImg} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.btnPlus}>
            <Text style={styles.btnNewText}>+</Text>
          </TouchableOpacity> */}
        <TouchableOpacity style={styles.btnUser}>
          <Image source={user} style={styles.btnUserImg} />
        </TouchableOpacity>
      </View>
    </View>
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
  },
  userAvatarImg: {
    marginRight: 8,
    width: 60,
    height: 60,
  },
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
