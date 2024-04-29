import React, { useState } from 'react';
import { View, Text, Pressable, Button, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const Item = ({ itemName, onDelete, onEdit, navigation }) => {
    const [completed, setCompleted] = useState(false);

    const handleComplete = () => {
        setCompleted(!completed);
    };

    const handleEdit = () => {
        // Navigate to itemDetails page
        navigation.navigate('ItemDetails', { itemName });
    };

    return (
        <View style={[styles.itemContainer, completed ? styles.completed : null]}>
            <Pressable onPress={handleComplete}>
                <AntDesign name="checkcircleo" size={24} color="black" style={{ marginRight: 10 }} />
            </Pressable>
            <View style={{ flex: 1, flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
                <Text style={{ color: "black" }}>
                    {itemName}
                </Text>
                <View style={{ flexDirection: "row", gap: 35 }}>
                    <Pressable onPress={handleEdit}>
                        <AntDesign name="edit" size={24} color="black" />
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
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
        alignItems: "center"
    },
    completed: {
        backgroundColor: "lightgreen"
    }
});