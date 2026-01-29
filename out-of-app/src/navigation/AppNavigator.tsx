import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../screens/ProfileScreen";
import DiaryScreen from "../screens/DiaryScreen";

export type AppStackParamList = {
  Profile: undefined;
  Diary: undefined;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
      <Stack.Screen name="Diary" component={DiaryScreen} />
    </Stack.Navigator>
  );
}
