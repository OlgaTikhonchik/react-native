import { View } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const MainTab = createBottomTabNavigator();

import PostsScreen from "../Screens/PostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";

import { AntDesign, Feather } from "@expo/vector-icons";
import { authLogoutUser } from "../redux/auth/operations";

const Home = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(authLogoutUser());
  };

  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          null,
        ],

        headerTitleAlign: "center",
        headerTitleStyle: {
          fontFamily: "Roboto-Medium",
          fontSize: 17,
          lineHeight: 22,
        },
        headerStyle: {
          backgroundColor: "#ffffff",
          borderBottomWidth: 0.5,
          borderBottomColor: "#21212120",
        },
        tabBarOptions: {
          tabBarHideOnKeyboard: true,
        },
      }}
      // tabBarOptions={{ showLabel: false }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={({ route }) => {
          const activeRoute = getFocusedRouteNameFromRoute(route);
          return {
            tabBarIcon: ({ focused, size, color }) => (
              <AntDesign name="appstore-o" size={size} color={color} />
            ),
            title: "Публікації",
            headerTitleStyle: {
              fontFamily: "Roboto-Medium",
              color: "#212121",
              fontSize: 17,
              lineHeight: 22,
            },
            headerRight: () => (
              <Feather
                name="log-out"
                color="#BDBDBD"
                size={24}
                style={{ marginRight: 10 }}
                onPress={logout}
              />
            ),

            headerShown:
              activeRoute === "Map" || activeRoute === "Comments"
                ? false
                : true,
          };
        }}
      />

      <MainTab.Screen
        name="Create"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused, size, color }) => (
            <View
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#FF6C00",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="plus" size={size} color={"#fff"} />
            </View>
          ),
          title: "Створити публікацію",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "#212121CC",
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontFamily: "Roboto-Medium",
            color: "#212121",
            fontSize: 17,
            lineHeight: 22,
          },
          headerLeft: () => (
            <Feather
              name="arrow-left"
              color="#212121CC"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("Posts");
              }}
            />
          ),
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, size, color }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
      />
    </MainTab.Navigator>
  );
};

export default Home;
