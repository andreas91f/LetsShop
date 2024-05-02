import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/**
 * List component
 */
export const List = ({ list, onDelete, onEdit, updateCompleteStatusOfList }) => {
    /**
     * Every time list.items update we want to check if all of the items have been completed
     * and update the completed status of the list
     */
    useEffect(() => {
        const allItemsCompleted = list.items.length !== 0 ? list.items.every(item => item.completed) : false;
        updateCompleteStatusOfList(allItemsCompleted, list)

    }, [list.items])

    const handleEdit = () => {
        onEdit(list)
    };



    return (
        <View style={[styles.listContainer, list.completed ? styles.completed : null]}>
            <AntDesign name="checkcircleo" size={24} style={{ fontWeight: list.completed ? "bold" : "normal", marginRight: 10 }} />

            <View style={{ flex: 1, flexDirection: "row", gap: 10, justifyContent: "space-between", margin: 4 }}>
                <Text style={{ color: "black" }}>
                    {list.listName}
                </Text>
                <Text style={{ fontStyle: "italic" }}>{`${list.items.length} item${list.items.length !== 1 ? "s" : ""}`}</Text>
                <View style={{ flexDirection: "row", gap: 10 }}>
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
        alignItems: "center",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 5
    },
    completed: {
        backgroundColor: "#d8f5ce" // Change background color to when the list is completed
    }
});