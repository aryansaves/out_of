import React, { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import { useAuth } from "../auth/AuthContext";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("aryan@test.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      setError("");
      await signIn(email, password);
    } catch (e: any) {
      setError(e?.response?.data?.message ?? "Login failed");
    }
  };

  return (
    <View style={{ flex: 1, padding: 16, gap: 12, justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "600" }}>out of</Text>

      {!!error && <Text style={{ color: "red" }}>{error}</Text>}

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

      <Button title="Login" onPress={onLogin} />
    </View>
  );
}
