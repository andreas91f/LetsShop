import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';
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

    return (
        <View style={styles.container}>
            <CreateItemModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addItemHandler={addItemHandler}
            />
            <Text style={styles.listName}>{list?.listName}</Text>
            {items?.map((item, index) => (
                <Item
                    key={index}
                    itemName={item.itemName} // Pass itemName prop
                    onDelete={() => deleteItemHandler(index)}
                    navigation={navigation} // Pass navigation prop
                />
            ))}
            <View style={styles.addButtonContainer}>
                <Button
                    title="Add Item"
                    onPress={() => setModalVisible(true)}
                    disabled={items.length >= 10}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    listName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    addButtonContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
});
