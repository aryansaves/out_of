import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Pressable,
} from "react-native";

interface MenuButtonProps {
    onLogout: () => void;
}

export default function MenuButton({ onLogout }: MenuButtonProps) {
    const [visible, setVisible] = useState(false);

    const handleLogout = () => {
        setVisible(false);
        onLogout();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setVisible(true)} style={styles.button}>
                <Text style={styles.dots}>⋮</Text>
            </TouchableOpacity>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
                    <View style={styles.menu}>
                        <TouchableOpacity onPress={handleLogout} style={styles.menuItem}>
                            <Text style={styles.menuText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        right: 0,
        zIndex: 10,
    },
    button: {
        padding: 12,
    },
    dots: {
        color: "#ffffff",
        fontSize: 24,
        fontWeight: "bold",
    },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 60,
        paddingRight: 16,
    },
    menu: {
        backgroundColor: "#2a2a2a",
        borderRadius: 8,
        paddingVertical: 8,
        minWidth: 120,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuText: {
        color: "#ffffff",
        fontSize: 16,
    },
});
