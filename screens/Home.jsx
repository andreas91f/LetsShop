import React, { useState } from 'react';
import { View, Image, StyleSheet, Button, Text } from 'react-native';
import { List } from '../components/List';
import { CreateListModal } from '../components/CreateListModal';

export const Home = ({ navigation }) => {

    const [lists, setLists] = useState(["List 1", "List 2"]);
    const [modalVisible, setModalVisible] = useState(false);

    const addListHandler = (listName) => {
        const newList = [...lists, listName];
        setLists(newList);
        setModalVisible(false);
    };

    const deleteListHandler = (index) => {
        const updatedLists = [...lists];
        updatedLists.splice(index, 1);
        setLists(updatedLists);
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
                        onDelete={() => deleteListHandler(idx)} // Pass deleteListHandler with index
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