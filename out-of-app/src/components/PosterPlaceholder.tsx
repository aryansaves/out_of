import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PosterPlaceholderProps {
    title?: string;
    size?: number;
}

export default function PosterPlaceholder({ title, size = 80 }: PosterPlaceholderProps) {
    return (
        <View style={styles.container}>
            <View style={[styles.poster, { width: size, height: size }]} />
            {title !== undefined && (
                <Text style={styles.title} numberOfLines={1}>
                    {title || " "}
                </Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    poster: {
        backgroundColor: "#2a2a2a",
        borderWidth: 1,
        borderColor: "#3a3a3a",
        borderRadius: 4,
    },
    title: {
        color: "#ffffff",
        fontSize: 11,
        marginTop: 6,
        textAlign: "center",
        maxWidth: 80,
    },
});
