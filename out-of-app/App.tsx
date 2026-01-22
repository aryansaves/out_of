import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text, TextInput, View, ScrollView } from "react-native";
import { login } from "./src/api/auth";
import { saveToken, deleteToken, getToken } from "./src/auth/tokenStore";
import { getMyProfile } from "./src/api/user";

export default function App() {
  const [email, setEmail] = useState("aryan@test.com");
  const [password, setPassword] = useState("password123");
  const [status, setStatus] = useState<string>("");
  const [profile, setProfile] = useState<any>(null);
  const [hasToken, setHasToken] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const t = await getToken();
      setHasToken(!!t);
      if (t) {
        const p = await getMyProfile();
        setProfile(p);
      }
    })();
  }, []);

  const handleLogin = async () => {
    try {
      setStatus("Logging in...");
      const data = await login(email, password);
      await saveToken(data.token);
      setHasToken(true);
      setStatus("Logged in. Fetching profile...");
      const p = await getMyProfile();
      setProfile(p);
      setStatus("Done.");
    } catch (e: any) {
      setStatus(e?.response?.data?.message ?? "Login failed");
    }
  };

  const handleLogout = async () => {
    await deleteToken();
    setHasToken(false);
    setProfile(null);
    setStatus("Logged out");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>out of</Text>
      <Text style={{ marginTop: 8 }}>{status}</Text>

      {!hasToken ? (
        <View style={{ marginTop: 16, gap: 12 }}>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            autoCapitalize="none"
            style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            style={{ borderWidth: 1, padding: 12, borderRadius: 8 }}
          />
          <Button title="Login" onPress={handleLogin} />
        </View>
      ) : (
        <View style={{ marginTop: 16 }}>
          <Button title="Logout" onPress={handleLogout} />
          <ScrollView style={{ marginTop: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>Profile response:</Text>
            <Text style={{ marginTop: 8, fontFamily: "monospace" }}>
              {JSON.stringify(profile, null, 2)}
            </Text>
          </ScrollView>
        </View>
      )}
    </SafeAreaView>
  );
}
