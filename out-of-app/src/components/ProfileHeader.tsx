import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ProfileHeaderProps {
    username: string;
    mediaWatched: number;
}

export default function ProfileHeader({ username, mediaWatched }: ProfileHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.avatar} />
            <View style={styles.info}>
                <Text style={styles.username}>{username}</Text>
                <Text style={styles.stat}>{mediaWatched} films</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 20,
    },
    avatar: {
        width: 70,
        height: 70,
        backgroundColor: "#2a2a2a",
        borderWidth: 1,
        borderColor: "#3a3a3a",
        borderRadius: 35,
    },
    info: {
        marginLeft: 16,
    },
    username: {
        color: "#ffffff",
        fontSize: 22,
        fontWeight: "600",
    },
    stat: {
        color: "#888888",
        fontSize: 14,
        marginTop: 4,
    },
});
