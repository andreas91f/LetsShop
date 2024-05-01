import React from 'react';
import { View, Text, Pressable, Button, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 * Item component
 */
export const Item = ({ item, onDelete, navigation, updateCompleteStatusOfItem }) => {
    const handleEdit = () => {
        // Navigate to itemDetails page
        navigation.navigate('ItemDetails', { itemName: item.itemName });
    };

    return (
        <View style={[styles.itemContainer, item.completed ? styles.completed : null]}>
            <Pressable onPress={() => updateCompleteStatusOfItem(!item.completed, item)}>
                <AntDesign name="checkcircleo" size={24} color="black" style={{ marginRight: 10 }} />
            </Pressable>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", margin: 4 }}>
                <Text style={{ color: "black" }}>
                    {item.itemName}
                </Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
                    <Pressable onPress={handleEdit}>
                        <AntDesign name="infocirlceo" size={24} color="black" />
                    </Pressable>
                    <Pressable onPress={onDelete}>
                        <AntDesign name="delete" size={24} color="black" />
                    </Pressable>
                </View>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10
    },
    completed: {
        backgroundColor: "#d8f5ce"
    }
});