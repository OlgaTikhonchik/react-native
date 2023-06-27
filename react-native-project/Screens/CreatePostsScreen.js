// import React from "react";
// import {
//   View,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   ImageBackground,
//   Image,
// } from "react-native";

// export default function CreatePostsScreen() {
//   return (
//     <View style={styles.container}>
//       <Text>CreatePostsScreen Screen</Text>
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

import { Camera } from "expo-camera";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// import Toast from "react-native-toast-message";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

export default function CreatePostScreen() {
  const [name, setName] = useState("");
  const [photoUri, setPhotoUri] = useState("");
  const [locationName, setLocationName] = useState("");

  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  const [focused, setFocused] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    try {
      (async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        await MediaLibrary.requestPermissionsAsync();
        setHasPermission(status === "granted");
      })();

      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          Alert.alert(`Permission to access location was denied`);
        }
      })();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return Alert.alert(`No access to camera`);
  }

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      await MediaLibrary.createAssetAsync(uri);
      setPhotoUri(uri);
    }
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status === "granted") {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 2,
        });

        if (!result.canceled) {
          setPhotoUri(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createPostPublication = () => {
    try {
      // add location
      (async () => {
        setIsLoadingLocation(true);
        let location = await Location.getCurrentPositionAsync({});
        setIsLoadingLocation(false);
        const coords = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          name: locationName,
        };

        const newPost = {
          photoUri,
          name,
          locationName,
          geolocation: coords,
        };

        navigation.navigate("Posts", newPost);
        deletePost();
        // navigation.navigate("Posts", newPost);
      })();
    } catch (error) {
      console.log(error.message);
      setIsLoadingLocation(false);
    }
  };

  const deletePost = () => {
    setPhotoUri("");
    setName("");
    setLocationName("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.main}>
        {photoUri ? (
          <ImageBackground
            style={styles.image}
            source={{
              uri: photoUri,
            }}
          >
            <MaterialIcons
              name="delete"
              size={30}
              style={{
                ...styles.flipContainer,
                color: "white",
                opacity: 0.5,
              }}
              onPress={() => setPhotoUri(null)}
            />
          </ImageBackground>
        ) : (
          <Camera
            style={styles.image}
            type={type}
            ref={setCameraRef}
            ratio="1:1"
          >
            <View style={styles.icon}>
              <MaterialIcons
                name="photo-camera"
                size={24}
                style={{ color: "#BDBDBD", opacity: 0.8 }}
                onPress={takePhoto}
              />
            </View>
          </Camera>
        )}

        {photoUri ? (
          <TouchableOpacity onPress={() => setPhotoUri(null)}>
            <Text style={styles.text}>Редагувати фото</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage}>
            <Text style={styles.text}>Завантажити фото</Text>
          </TouchableOpacity>
        )}

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : ""}
          style={{ flex: 1, justifyContent: "center", zIndex: 10 }}
        >
          <TextInput
            style={
              focused === "name"
                ? {
                    ...styles.input,
                    marginTop: 32,
                    borderBottomColor: "#FF6C00",
                  }
                : { ...styles.input, marginTop: 32 }
            }
            name="name"
            textContentType="name"
            placeholder="Назва..."
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={(value) => setName(value)}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
          ></TextInput>

          <View style={styles.inputWrapper}>
            <SimpleLineIcons
              name="location-pin"
              size={24}
              style={styles.locationIcon}
            />
            <TextInput
              style={
                focused === "location"
                  ? {
                      ...styles.input,
                      paddingLeft: 28,
                      borderBottomColor: "#FF6C00",
                    }
                  : { ...styles.input, paddingLeft: 28 }
              }
              name="location"
              textContentType="location"
              placeholder="Місцевість..."
              placeholderTextColor="#BDBDBD"
              value={locationName}
              onChangeText={(value) => setLocationName(value)}
              onFocus={() => setFocused("location")}
              onBlur={() => setFocused(null)}
            ></TextInput>
          </View>

          <TouchableOpacity
            disabled={(!name && !locationName) || isLoadingLocation}
            style={{
              ...styles.button,
              backgroundColor:
                name && locationName && !isLoadingLocation
                  ? "#FF6C00"
                  : "#F6F6F6",
            }}
            onPress={createPostPublication}
          >
            <Text
              style={{
                ...styles.btnText,
                color:
                  name && locationName && !isLoadingLocation
                    ? "#FFFFFF"
                    : "#BDBDBD",
              }}
            >
              {isLoadingLocation ? "Опублікування..." : "Опублікувати"}
            </Text>
          </TouchableOpacity>

          <View style={styles.deleteIcon}>
            <Ionicons
              name="ios-trash-outline"
              size={24}
              color="#BDBDBD"
              onPress={deletePost}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 34,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },

  image: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",

    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    borderStyle: "solid",
    borderWidth: 1,
    height: 240,
    borderRadius: 8,
  },

  flipContainer: {
    position: "absolute",
    top: 16,
    left: 16,
  },

  icon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: 60,
    width: 60,
    borderRadius: 30,
    borderColor: "#BDBDBD",
    borderStyle: "solid",
    borderWidth: 1,
    backgroundColor: "inherit",
    opacity: 0.8,
  },

  text: {
    fontFamily: "Roboto",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },

  input: {
    height: 50,

    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,

    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },

  inputWrapper: {
    marginTop: 16,
    marginBottom: 32,
  },

  locationIcon: {
    position: "absolute",
    top: 10,
    left: 0,
    color: "#BDBDBD",
    opacity: 0.5,
  },

  button: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 100,
    backgroundColor: "#F6F6F6",
  },

  btnText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#BDBDBD",
  },

  deleteIcon: {
    width: 70,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",

    paddingHorizontal: 23,
    paddingVertical: 8,

    marginTop: 0,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
