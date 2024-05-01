import { Modal, Button, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

/**
 * Modal for creating a list
 */
export const CreateListModal = ({ modalVisible, setModalVisible, addListHandler }) => {
    const [text, setText] = useState("");

    // Function to reset text state when modal is closed
    const handleCloseModal = () => {
        setText(""); // Reset text state to empty string
        setModalVisible(false); // Close the modal
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Create List</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={setText}
                        value={text}
                        placeholder="Enter list name"
                    />
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 15, alignItems: "center" }}>
                        <Button
                            style={styles.button}
                            title="Cancel"
                            onPress={handleCloseModal}
                        />
                        <Button
                            style={styles.button}
                            disabled={text.length === 0} // disable if text is empty
                            title="Create"
                            onPress={() => {
                                addListHandler({
                                    listName: text,
                                    completed: false,
                                    items: []
                                });
                                handleCloseModal();
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%"
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 30,
        alignItems: "center",
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
    },
    textInput: {
        borderWidth: 0.5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: "gray"
    }
});