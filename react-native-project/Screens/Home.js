import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Header from "../components/Header";
import PostsScreen from "./PostsScreen";
import CreatePostScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";

const Tab = createBottomTabNavigator();

export default function Home() {
  return (
    <Tab.Navigator
      initialRouteName="Posts"
      backBehavior="none"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingBottom: 34,
          paddingHorizontal: 75,
          height: 83,
        },
        tabBarIcon: ({ focused }) => {
          if (route.name === "Posts") {
            return (
              <View
                style={{
                  ...styles.iconsNav,
                  backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                }}
              >
                <AntDesign
                  name="appstore-o"
                  size={24}
                  color={focused ? "#FFFFFF" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          }
          if (route.name === "CreatePosts") {
            return (
              <View
                style={{
                  ...styles.iconsNav,
                  backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                }}
              >
                <AntDesign
                  name="plus"
                  size={24}
                  color={focused ? "#FFFFFF" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          }
          if (route.name === "Profile") {
            return (
              <View
                style={{
                  ...styles.iconsNav,
                  backgroundColor: focused ? "#FF6C00" : "#FFFFFF",
                }}
              >
                <Feather
                  name="user"
                  size={24}
                  color={focused ? "#FFFFFF" : "rgba(33, 33, 33, 0.8)"}
                />
              </View>
            );
          }
        },
      })}
    >
      <Tab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          header: () => <Header title="Публікації" />,
          headerShown: "true",
        }}
      />

      <Tab.Screen
        name="CreatePosts"
        component={CreatePostScreen}
        options={{
          header: () => <Header title="Створити публікацію" />,
          headerShown: "true",
          tabBarStyle: {
            display: "none",
          },
        }}
      />

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconsNav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 20,
    width: 70,
    height: 40,
    padding: 8,
  },
});
