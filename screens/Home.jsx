import React, { useState } from 'react';
import { View, Image, StyleSheet, Button } from 'react-native';
import { List } from '../components/List';
import { CreateListModal } from '../components/CreateListModal';

export const Home = ({ navigation }) => {

    const [lists, setLists] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    // Function for adding lists in state
    const addListHandler = (listName) => {
        const newList = [...lists, listName];
        setLists(newList);
    };

    const clearLists = () => {
        setLists([]);
    };
    return (
        <>

            <View style={styles.container}>

                <View style={[styles.section, styles.firstSection]}>
                    <Image
                        source={require('../assets/images/logo.jpg')}
                        style={styles.logo}
                    />
                    <Button
                        title="Create list"
                        disabled={lists.length >= 10}
                        onPress={() => setModalVisible(true)}
                    />
                    <Button
                        title="Clear Lists"
                        onPress={clearLists}
                    />


                </View>
                <View style={[styles.section, { flexDirection: "col" }]}>
                    {lists?.map((listName, idx) =>
                        <List
                            key={`list_${idx}`}
                            listName={listName}
                        />)
                    }
                </View>
                <View style={[styles.section, styles.thirdSection]}>

                </View>
            </View>
            <CreateListModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                addListHandler={addListHandler}
            />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    section: {
        backgroundColor: '#f2f2f2',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'gray',
    },
    firstSection: {
        flex: 1,
    },
    secondSection: {
        flex: 3,
    },
    thirdSection: {
        flex: 1,
    },
    logo: {
        height: 140,
        width: 145,
    },
});