import { View, StyleSheet, Pressable, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";

/**
 * Help screen
 * shows information about each icon that's used around the app
 */
export const Help = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconColumn}>
                <View style={styles.iconRow}>
                    <View style={[styles.circle]}>
                        <AntDesign name="question" size={24} color="black" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to navigate to the Help page.</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle]}>
                        <AntDesign name="checkcircleo" size={24} color="black" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to indicate that a list or an item was bought.</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle]}>
                        <AntDesign name="edit" size={24} color="black" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to edit lists.</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle]}>
                        <AntDesign name="delete" size={24} color="black" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to delete lists or items.</Text>
                </View>
                <View style={styles.iconRow}>
                    <View style={[styles.circle]}>
                        <AntDesign name="infocirlceo" size={24} color="black" />
                    </View>
                    <Text style={styles.iconDescription}>This button is used to view information for an item.</Text>
                </View>
            </View>
            <View style={styles.centeredHomeIconContainer}>
                <Pressable onPress={() => navigation.navigate("Home")}>
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
        justifyContent: "start",
        alignItems: "center",
        gap: 10,
    },
    iconColumn: {
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "white",
        width: "100%"
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 20,
        width: "100%"
    },
    iconDescription: {
        fontSize: 16,
        color: "black",
        textAlign: "justify",
        width: "80%"
    },
    circle: {
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 10,
    },
    centeredHomeIconContainer: {
        position: "absolute",
        bottom: 20,
        left: "50%",
        transform: [{ translateX: -20 }],
        borderRadius: 10,
    },
});