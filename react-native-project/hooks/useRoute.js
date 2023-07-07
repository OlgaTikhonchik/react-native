import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import Home from "../Screens/Home";

const useRoute = (isAuth) => {
  return (
    <Stack.Navigator>
      {!isAuth ? (
        <>
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Register"
            component={RegistrationScreen}
          />
        </>
      ) : (
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={Home}
        />
      )}
    </Stack.Navigator>
  );
};

export default useRoute;
