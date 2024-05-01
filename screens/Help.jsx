import { View, StyleSheet, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

export const Help = ({ navigation }) => {
    const handleHome = () => {
        // Navigate back to Home 
        navigation.navigate("Home");
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconColumn}>
                <View style={styles.iconRow}>
                    <View style={[styles.circle, { backgroundColor: "green" }]}>
                        <AntDesign name="question" size={24} color="white" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to navigate to the Help page</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle, { backgroundColor: "green" }]}>
                        <AntDesign name="checkcircleo" size={24} color="white" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to indicate that a list or an item was bought</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle, { backgroundColor: "blue" }]}>
                        <AntDesign name="edit" size={24} color="white" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to edit lists or items</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle, { backgroundColor: "red" }]}>
                        <AntDesign name="delete" size={24} color="white" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to delete lists or items</Text>
                </View>
            </View>
            <View style={styles.centeredHomeIconContainer}>
                <Pressable onPress={handleHome}>
                    <View style={[styles.circle, { backgroundColor: "green" }]}>
                        <AntDesign name="home" size={24} color="white" />
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        paddingLeft: 20, // Adjust left padding as needed
    },
    iconColumn: {
        flexDirection: "column",
        alignItems: "flex-start",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    circle: {
        backgroundColor: "green",
        borderRadius: 50,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    iconDescription: {
        fontSize: 16,
        color: "black",
        textAlign: "justify",
        flex: 1,
        flexWrap: "wrap"
    },
    centeredHomeIconContainer: {
        position: "absolute",
        bottom: 20, // Adjust bottom distance as needed
        left: "50%", // Center horizontally
        transform: [{ translateX: -20 }], // Adjust for half of the icon's width
    },
});