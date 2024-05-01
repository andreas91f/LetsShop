import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export const List = ({ list, onDelete, onEdit, updateCompleteStatusOfList }) => {

    const handleEdit = () => {
        onEdit(list)
    };

    return (
        <View style={[styles.listContainer, list.completed ? styles.completed : null]}>
            <Pressable onPress={() => updateCompleteStatusOfList(!list.completed, list)}>
                <AntDesign name="checkcircleo" size={24} color="black" style={{ marginRight: 10 }} />
            </Pressable>
            <View style={{ flex: 1, flexDirection: "row", gap: 10, justifyContent: "space-between" }}>
                <Text style={{ color: "black" }}>
                    {list.listName}
                </Text>
                <Text style={{ fontStyle: "italic" }}>{`${list.items.length} items`}</Text>
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
    listContainer: {
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 5,
        margin: 5,
        alignItems: "center"
    },
    completed: {
        backgroundColor: "lightgreen" // Change background color to when the list is completed
    }
});