import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../screens/ProfileScreen";
import DiaryScreen from "../screens/DiaryScreen";
import UnderConstructionScreen from "../screens/UnderConstructionScreen";

export type MainTabsParamList = {
    Profile: undefined;
    Diary: undefined;
    Search: undefined;
    Watchlist: undefined;
};

const Tab = createBottomTabNavigator<MainTabsParamList>();

export default function MainTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Profile"
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#1a1a1a",
                    borderTopColor: "#2a2a2a",
                },
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: "#888888",
            }}
        >
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Diary" component={DiaryScreen} />
            <Tab.Screen name="Search" component={UnderConstructionScreen} />
            <Tab.Screen name="Watchlist" component={UnderConstructionScreen} />
        </Tab.Navigator>
    );
}
