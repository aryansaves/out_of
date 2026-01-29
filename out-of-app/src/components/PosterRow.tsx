import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PosterPlaceholder from "./PosterPlaceholder";

interface MediaEntry {
    _id: string;
    title: string;
    type: string;
    ratingOverall?: number;
}

interface PosterRowProps {
    title: string;
    entries: MediaEntry[];
    count?: number;
}

export default function PosterRow({ title, entries, count = 4 }: PosterRowProps) {
    const slots = Array.from({ length: count }, (_, i) => entries[i] || null);

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <View style={styles.row}>
                {slots.map((entry, index) => (
                    <PosterPlaceholder
                        key={entry?._id || `empty-${index}`}
                        title={entry?.title}
                    />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },
    sectionTitle: {
        color: "#666666",
        fontSize: 12,
        fontWeight: "600",
        letterSpacing: 1,
        textTransform: "uppercase",
        marginBottom: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
