import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, ScrollView } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from '../components/List';
import { CreateListModal } from '../components/CreateListModal';

/**
 * Home screen
 * Main screen of the app
 * Renders a scrollable list of shop lists
 * Users can create/delete lists
 */
export const Home = ({ navigation }) => {
    const [lists, setLists] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // Load lists from AsyncStorage when component mounts
        loadLists();
    }, []);

    /**
     * Function for loading lists from async storage
     */
    const loadLists = async () => {
        try {
            // Fetch lists from AsyncStorage
            const storedLists = await AsyncStorage.getItem('lists');
            if (storedLists !== null) {
                // If lists exist, parse and set them in state
                const parsedLists = JSON.parse(storedLists);
                setLists(parsedLists);
            }
        } catch (error) {
            console.error('Error loading lists:', error);
        }
    };

    /**
     * Function for saving lists in async storage
     */
    const saveLists = async (updatedLists) => {
        try {
            // Convert updated lists to JSON and save in AsyncStorage
            await AsyncStorage.setItem('lists', JSON.stringify(updatedLists));
        } catch (error) {
            console.error('Error saving lists:', error);
        }
    };

    /**
     * Function for adding a new list 
     */
    const addListHandler = async (listObject) => {
        try {
            // Add a listObject to the lists
            const newList = [...lists, listObject];
            // Set the new list in state
            setLists(newList);
            // Save the updated lists to AsyncStorage
            await saveLists(newList);
            // Hide the create list modal
            setModalVisible(false);
        } catch (error) {
            console.error('Error adding list:', error);
        }
    };

    /**
     * Function for deleting a list
     */
    const deleteListHandler = async (index) => {
        try {
            // Get a copy of the current array of lists
            const updatedLists = [...lists];
            // Remove the targeted list
            updatedLists.splice(index, 1);
            // Set the updated lists in state
            setLists(updatedLists);
            // Save the updated lists to AsyncStorage
            await saveLists(updatedLists);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    /**
     * Function for saving items in AsyncStorage under a specific list
     */
    const saveItems = async (updatedItems, list) => {
        try {
            // Find the index of the list in the lists array
            const listIndex = lists?.findIndex(item => item.listName === list.listName);
            if (listIndex !== -1) {
                // Get a copy of the current array of lists
                const updatedLists = [...lists];
                // Update the items array of the specific list
                updatedLists[listIndex].items = updatedItems;
                // Save the updated lists array to AsyncStorage
                await saveLists(updatedLists);
                // Save in state
                setLists(updatedLists);
            } else {
                console.error('List not found.');
            }
        } catch (error) {
            console.error('Error saving items:', error);
        }
    };

    /**
     * Function for updating the completed status of a specific list
     * in Async storage and state
     */
    const updateCompleteStatusOfList = async (completedStatus, list) => {
        // Find the index of the list in the lists array
        const listIndex = lists?.findIndex(l => l === list);
        if (listIndex !== -1) {
            // Get a copy of the current array of lists
            const updatedLists = [...lists];
            // Update the complete value of the specific list
            updatedLists[listIndex].completed = completedStatus;
            // Save the updpated lists in AsyncStorage & state
            await saveLists(updatedLists);
            setLists(updatedLists);
        }
    }

    return (
        <View style={styles.container}>
            <CreateListModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addListHandler={addListHandler}
            />
            <View style={styles.titleContainer}>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{`Your lists (${lists.length})`}</Text>
                <View style={styles.createButtonContainer}>
                    <Button
                        title="Create list"
                        onPress={() => setModalVisible(true)}
                    />
                </View>
            </View>
            <ScrollView style={{ backgroundColor: "white", width: "100%", flex: 1 }}>

                {lists?.map((listObj, idx) =>
                    <List
                        key={`list_${idx}`}
                        list={listObj}
                        onDelete={() => deleteListHandler(idx)} // Call deleteListHandler with the list idx
                        onEdit={() => {
                            navigation.navigate("ListDetails", { list: listObj, saveItems });
                        }}
                        updateCompleteStatusOfList={updateCompleteStatusOfList}
                    />)
                }
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
    },
    titleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 10
    },
    createButtonContainer: {
        alignItems: 'center',
        marginTop: 20,
    }
});

export default Home;
