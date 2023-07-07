import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../hooks/useRoute";
import { authStateChangeUser } from "../redux/auth/operations";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispach = useDispatch();

  useEffect(() => {
    dispach(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange);

  return <NavigationContainer>{routing}</NavigationContainer>;
};

export default Main;
