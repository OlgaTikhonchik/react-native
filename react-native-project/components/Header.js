import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function Header({ title }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      {title === "Публікації" ? (
        <Feather
          onPress={() => navigation.goBack()}
          name="log-out"
          size={24}
          color="#BDBDBD"
          style={styles.icon}
        />
      ) : (
        <AntDesign
          onPress={() => {
            return title === "Створити публікацію"
              ? navigation.navigate("Posts")
              : navigation.goBack();
          }}
          name="arrowleft"
          size={24}
          color="rgba(33, 33, 33, 0.8)"
          style={{ ...styles.icon, left: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    width: "100%",
  },

  title: {
    fontWeight: 500,
    fontSize: 17,
    lineHeight: 22,
    textAlign: "center",
    letterSpacing: -0.4,
    color: "#212121",
    marginTop: 44,
    padding: 11,
  },

  icon: {
    position: "absolute",
    bottom: 10,
    right: 16,
  },
});
