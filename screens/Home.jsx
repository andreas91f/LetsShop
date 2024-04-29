import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Button, Text } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { List } from '../components/List';
import { CreateListModal } from '../components/CreateListModal';

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
                setLists(JSON.parse(storedLists));
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
    const addListHandler = async (listName) => {
        try {
            // Add a listName to the lists
            const newList = [...lists, listName];
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

    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/images/logo.jpg')}
                style={styles.logo}
            />
            <CreateListModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addListHandler={addListHandler}
            />
            <View style={{ backgroundColor: "grey", width: "100%", flex: 1 }}>
                <Text style={{ padding: 5 }}>Your lists</Text>
                {lists.map((listName, idx) =>
                    <List
                        key={`list_${idx}`}
                        listName={listName}
                        onDelete={() => deleteListHandler(idx)} // Call deleteListHandler with the list idx
                        navigation={navigation}
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
    logo: {
        height: 140,
        width: 145,
    },
});
