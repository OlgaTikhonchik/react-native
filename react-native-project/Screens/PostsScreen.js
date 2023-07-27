import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

const MainStackNested = createStackNavigator();

import DefaultPostsScreen from "../Screens/DefaultPostsScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import MapScreen from "../Screens/MapScreen";
import { Feather } from "@expo/vector-icons";

const PostsScreen = ({ navigation }) => {
  return (
    <MainStackNested.Navigator>
      <MainStackNested.Screen
        name="DefaultPosts"
        component={DefaultPostsScreen}
        options={{
          headerShown: false,
        }}
      />
      <MainStackNested.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
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
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("DefaultPosts");
              }}
            />
          ),
        }}
      />
      <MainStackNested.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Мапа",
          headerStyle: {
            borderBottomWidth: 0.5,
            borderBottomColor: "rgba(0, 0, 0, 0.3)",
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
              color="#rgba(33, 33, 33, 0.8)"
              size={24}
              style={{ marginLeft: 16 }}
              onPress={() => {
                navigation.navigate("DefaultPosts");
              }}
            />
          ),
        }}
      />
    </MainStackNested.Navigator>
  );
};

export default PostsScreen;

const styles = StyleSheet.create({});
