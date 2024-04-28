import { Modal, Button, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";
export const CreateListModal = ({ modalVisible, setModalVisible, addListHandler }) => {
    const [text, setText] = useState("");
    /**
     * Modal 
     *    [Create list]
     *   [Text Input]
     *  [Cancel] [Create]
     */
    return (
        <View style={styles.centeredView}>
            <Modal
                style={styles.modalView}
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}>
                <View style={{ flexDirection: "column", backgroundColor: "white", margin: 10, padding: 30, alignItems: "center" }}>
                    <Text>
                        Create List
                    </Text>
                    <TextInput
                        style={{ borderWidth: 0.5, paddingHorizontal: 3, marginVertical: 10 }}
                        onChangeText={setText}
                        value={text}
                        placeholder="Enter list name"
                    />
                    <View style={{ flexDirection: "row", gap: 5 }}>
                        <Button style={styles.button}
                            title="Cancel"
                            onPress={() => setModalVisible(false)}
                        />
                        <Button style={styles.button}
                            title="Create"
                            onPress={() => {
                                addListHandler(text);
                                setModalVisible(false);
                            }}
                        />
                    </View>

                </View>
            </Modal>
        </View>
    );

};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    }
});