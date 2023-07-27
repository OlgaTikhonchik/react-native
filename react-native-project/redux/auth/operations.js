import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  updateUserProfile,
  authStateChange,
  authSignOut,
  updateAvatarUser,
} from "./authSlice";
import { auth } from "../../config";
import { updateProfile } from "firebase/auth";
import { uploadPhotoToServer } from "../../uploadPhoto";
import { Alert } from "react-native";

const authRegisterUser =
  ({ userName, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userAvatarUrl = await uploadPhotoToServer(avatar);
      console.log("userName", userName);
      await updateProfile(auth.currentUser, {
        displayName: userName,
        photoURL: userAvatarUrl,
      });

      dispatch(
        updateUserProfile({
          userId: user.uid,
          userName,
          email,
          avatar: userAvatarUrl,
        })
      );
    } catch (error) {
      Alert.alert("Oops, something went wrong");
      // console.log(error);
      console.log(error.massege);
    }
  };

const authLoginUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      const userUpdateProfile = {
        userId: user.uid,
        userName: user.displayName,
        email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    } catch (error) {
      Alert.alert(`"Email or password invalid"`);
      // console.log(error);
      console.log(error.massege);
    }
  };

const authLogoutUser = () => async (dispatch, getState) => {
  try {
    signOut(auth);
    dispatch(authSignOut());
  } catch (error) {
    Alert.alert("Oops, something went wrong");
    console.log(error);
    console.log(error.massege);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        userName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

const updateUserAvatar =
  ({ avatar }) =>
  async (dispatch, getState) => {
    try {
      await updateProfile(auth.currentUser, {
        photoURL: avatar,
      });

      dispatch(updateAvatarUser(avatar));
    } catch (error) {
      Alert.alert("Oops, something went wrong");
      console.log(error);
      console.log(error.massege);
    }
  };

export {
  authRegisterUser,
  authLoginUser,
  authLogoutUser,
  authStateChangeUser,
  updateUserAvatar,
};
