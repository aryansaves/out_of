import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMyProfile } from "../api/user";
import { useAuth } from "../auth/AuthContext";
import ProfileHeader from "../components/ProfileHeader";
import PosterRow from "../components/PosterRow";
import MenuButton from "../components/MenuButton";

interface MediaEntry {
  _id: string;
  title: string;
  type: string;
  ratingOverall?: number;
}

interface ProfileData {
  username: string;
  bio?: string;
  mediaWatched: number;
  top: MediaEntry[];
  recentLogs: MediaEntry[];
}

export default function ProfileScreen() {
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getMyProfile();
        setProfile(res.data);
      } catch (e: any) {
        setError(e?.response?.data?.message ?? "Failed to load profile");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <ActivityIndicator color="#ffffff" size="large" />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <MenuButton onLogout={signOut} />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {profile && (
          <>
            <ProfileHeader
              username={profile.username}
              mediaWatched={profile.mediaWatched}
            />
            <PosterRow title="Top 4" entries={profile.top.slice(0, 4)} />
            <PosterRow title="Recent" entries={profile.recentLogs.slice(0, 4)} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  error: {
    color: "#ff6b6b",
    fontSize: 14,
  },
});
