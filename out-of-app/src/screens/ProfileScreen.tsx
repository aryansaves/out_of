import React, { useEffect, useState } from "react";
import { Button, ScrollView, Text, View } from "react-native";
import { getMyProfile } from "../api/user";
import { useAuth } from "../auth/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyProfile();
        setProfile(data);
      } catch (e: any) {
        setError(e?.response?.data?.message ?? "Failed to load profile");
      }
    })();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Logout" onPress={signOut} />
      <Button title="Open Diary" onPress={() => navigation.navigate("Diary")} />
      {!!error && <Text style={{ color: "red", marginTop: 12 }}>{error}</Text>}

      <ScrollView style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Profile:</Text>
        <Text style={{ marginTop: 8, fontFamily: "monospace" }}>
          {JSON.stringify(profile, null, 2)}
        </Text>
      </ScrollView>
    </View>
  );
}
