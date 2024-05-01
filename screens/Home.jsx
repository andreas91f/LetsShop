import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button, Text, Pressable } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from '../components/List';
import { CreateListModal } from '../components/CreateListModal';
import { AntDesign } from '@expo/vector-icons';

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
        console.warn("in saveLists", updatedLists)
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

    const handleHelp = () => {
        // Navigate to Help page
        navigation.navigate('Help');
    };

    /**
     * Function for saving items in AsyncStorage under the corresponding list
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

    return (
        <View style={styles.container}>
            <View style={styles.helpContainer}>
                <Image
                    source={require('../assets/images/logo.jpg')}
                    style={styles.logo}
                />
                <Pressable onPress={handleHelp}>
                    <AntDesign name="question" size={24} color="green" />
                </Pressable>
            </View>
            <CreateListModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addListHandler={addListHandler}
            />
            <View style={{ backgroundColor: "grey", width: "100%", flex: 1 }}>
                <Text style={{ padding: 5 }}>Your lists</Text>
                {lists?.map((listObj, idx) =>
                    <List
                        key={`list_${idx}`}
                        list={listObj}
                        onDelete={() => deleteListHandler(idx)} // Call deleteListHandler with the list idx
                        onEdit={() => {
                            navigation.navigate("ListDetails", { list: listObj, saveItems });
                        }}
                    />)
                }
            </View>

            <View style={{ flexDirection: "row", justifyContent: "center", gap: 20 }}>
                <Button
                    title="Create list"
                    disabled={lists.length >= 10}
                    onPress={() => setModalVisible(true)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "space-between"
    },
    helpContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 260,
    },
    logo: {
        height: 50,
        width: 50,
        marginRight: 10,
    },
});

export default Home;
