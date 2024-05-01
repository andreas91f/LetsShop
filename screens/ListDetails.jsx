import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateItemModal } from '../components/CreateItemModal';
import { Item } from '../components/Item';

export const ListDetails = ({ route, navigation }) => {
    const { list, saveItems } = route.params;
    const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // On mount setItems in state
        const listItems = list.items;
        setItems(listItems);
    }, []);


    /**
     * Function for adding a new item
     */
    const addItemHandler = async (itemObject) => {
        try {
            // Add new item to the current list of items
            const updatedItems = [...items, itemObject];
            // Update items in state
            setItems(updatedItems);
            // Save updated items in AsyncStorage
            await saveItems(updatedItems, list);
            // Hide the create item modal
            setModalVisible(false);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    /**
     * Function for deleting an item
     */
    const deleteItemHandler = async (index) => {
        try {
            // Get a copy of the current array of items
            const updatedItems = [...items];
            // Remove the targeted item
            updatedItems.splice(index, 1);
            // Update items in state
            setItems(updatedItems);
            // Save updated items in AsyncStorage
            await saveItems(updatedItems, list);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };
    const updateCompleteStatusOfItem = async (completedStatus, item) => {
        // Find the index of the item in the items array
        const itemIndex = items?.findIndex(i => i === item);
        if (itemIndex !== -1) {
            // Get a copy of the current array of items
            const updatedItems = [...items];
            // Updated the completed value of the specific item
            updatedItems[itemIndex].completed = completedStatus;
            // Save the updated items in Async Storage & state
            await saveItems(updatedItems, list);
            setItems(updatedItems);
        }

    };

    return (
        <ScrollView style={styles.container}>
            <CreateItemModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addItemHandler={addItemHandler}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.listName}>{list?.listName}</Text>

                <View style={styles.addButtonContainer}>
                    <Button
                        title="Add Item"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>

            {items?.map((item, index) => (
                <Item
                    key={index}
                    item={item} // Pass item prop
                    onDelete={() => deleteItemHandler(index)}
                    navigation={navigation} // Pass navigation prop
                    updateCompleteStatusOfItem={updateCompleteStatusOfItem}
                />
            ))}

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10
    },
    listName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    addButtonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
