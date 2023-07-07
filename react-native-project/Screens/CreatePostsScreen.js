import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import * as Location from "expo-location";
import { storage, db } from "../config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const CreatePostsScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState("");
  const [photoTitle, setPhotoTitle] = useState("");
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [flesh, setFlesh] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef(null);
  const [photoLocation, setPhotoLocation] = useState("");
  const [locationCoords, setLocationCoords] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { userId, userName } = useSelector((state) => state.auth.user);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      setIsCameraActive(true);
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const { uri } = await cameraRef.current.takePictureAsync(options);
      setPhoto(uri);

      setIsCameraActive(false);
      getLocation();
    }
  };

  const switchCamera = () => {
    setCameraType((prevCameraType) =>
      prevCameraType === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const switchFlashMode = () => {
    setFlesh(
      flashMode === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.on
        : Camera.Constants.FlashMode.off
    );
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }

      let location = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      };
      setLocationCoords(coords);
    })();
  }, []);

  const getLocation = async () => {
    const placePhoto = await Location.reverseGeocodeAsync(locationCoords);
    const place = `${placePhoto[0].region}, ${placePhoto[0].country}`;
    setPhotoLocation((prev) => ({ ...prev, place }));
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const pathPhoto = `postImage/${uniquePostId}.jpg`;

    const photoRef = ref(storage, pathPhoto);

    const uploadPhoto = await uploadBytes(photoRef, file, {
      contentType: "image/jpeg",
    });

    const processedPhoto = await getDownloadURL(uploadPhoto.ref);

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photoToServer = await uploadPhotoToServer();
    const datePost = Date.now();
    const docRef = await addDoc(collection(db, "posts"), {
      photoToServer,
      datePost,
      photoLocation,
      locationCoords,
      photoTitle,
      userId,
      userName,
    });
  };

  const sendPost = () => {
    uploadPostToServer();
    navigation.navigate("DefaultPosts");
    setPhoto("");
    setPhotoTitle("");
    setPhotoLocation("");
    setIsCameraActive(true);
  };

  const deletePost = () => {
    setPhoto("");
    setPhotoTitle("");
    setPhotoLocation("");
    setIsCameraActive(true);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : ""}>
          <View>
            {isCameraActive ? (
              <Camera
                switchCamera={switchCamera}
                switchFlashMode={switchFlashMode}
                style={{
                  ...styles.camera,
                  marginTop: isShowKeyboard ? 7 : 32,
                }}
                type={cameraType}
                flashMode={flesh}
                ref={cameraRef}
                onCameraReady={onCameraReady}
              />
            ) : (
              <View style={styles.takePhotoContainer}>
                <Image source={{ uri: photo }} style={{ height: 240 }} />
              </View>
            )}
            <TouchableOpacity
              onPress={takePicture}
              style={{
                height: 60,
                width: 60,
                backgroundColor: "rgba(255, 255, 255, 0.3)",

                borderRadius: 50,
                top: "50%",
                left: (Dimensions.get("window").width - 32 - 30) / 2,
                zIndex: 10,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialIcons name="photo-camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          {!photo ? (
            <Text style={styles.uploadEditText}>Завантажте фото</Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setPhoto("");
                setIsCameraActive(true);
              }}
            >
              <Text style={styles.uploadEditText}>Редагувати фото</Text>
            </TouchableOpacity>
          )}

          <View style={styles.wrapper}>
            <TextInput
              style={{
                ...styles.inputName,
                marginTop: isShowKeyboard ? 20 : 48,
              }}
              placeholder="Назва..."
              placeholderTextColor={{
                color: "#BDBDBD",
              }}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setPhotoTitle((prevState) => ({
                  ...prevState,
                  photoTitle: value,
                }))
              }
              value={photoTitle}
            />
          </View>
          <View style={styles.wrapper}>
            <View style={{ position: "absolute", bottom: 16 }}>
              <AntDesign name="enviromento" size={24} color="#BDBDBD" />
            </View>
            <TextInput
              style={styles.inputLocale}
              placeholder="Місцевість..."
              placeholderTextColor={{
                color: "#BDBDBD",
              }}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setPhotoLocation((prevState) => ({
                  ...prevState,
                  photoLocation: value,
                }))
              }
              value={photoLocation}
            />
          </View>
          <TouchableOpacity
            style={{
              ...styles.btn,
              backgroundColor:
                !photo || !photoTitle || !photoLocation ? "#F6F6F6" : "#FF6C00",
            }}
            activeOpacity={0.7}
            onPress={() => {
              sendPost();
            }}
          >
            <Text
              style={{
                ...styles.textBtn,
                color:
                  !photo || !photoTitle || !photoLocation
                    ? "#BDBDBD"
                    : "#FFFFFF",
              }}
            >
              Опублікувати
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", paddingTop: 120 }}>
            <TouchableOpacity
              style={{
                width: 70,
                height: 40,
                backgroundColor: "#F6F6F6",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={deletePost}
            >
              <AntDesign name="delete" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    height: 240,
    marginHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoContainer: {
    height: 240,
    marginHorizontal: 16,
    marginTop: 32,
  },
  uploadEditText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    paddingLeft: 16,
    marginTop: 8,
  },
  inputName: {
    marginBottom: 15,
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  inputLocale: {
    marginTop: 32,
    marginBottom: 15,
    marginLeft: 32,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  wrapper: {
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
    marginHorizontal: 16,
    position: "relative",
  },
  btn: {
    height: 51,
    borderRadius: 100,
    marginTop: 32,
    marginHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  textBtn: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  keyboard: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
