import React from "react";
import { View, Text } from "react-native";

export default function EntryCard({ entry }: any) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginBottom: 10
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "600" }}>
        {entry.title}
      </Text>

      <Text>Rating: {entry.ratingOverall}/7</Text>

      {!!entry.remarks && (
        <Text style={{ marginTop: 4 }}>{entry.remarks}</Text>
      )}

      <Text style={{ marginTop: 6, fontSize: 12, opacity: 0.7 }}>
        {new Date(entry.dateLogged).toLocaleDateString()}
      </Text>
    </View>
  );
}
