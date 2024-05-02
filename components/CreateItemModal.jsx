import { Modal, Button, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

/**
 * Modal for creating an item
 */
export const CreateItemModal = ({ modalVisible, setModalVisible, addItemHandler }) => {
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    // Function to reset text state when modal is closed
    const handleCloseModal = () => {
        setText(""); // Reset text state to empty string
        setModalVisible(false); // Close the modal
        setError(""); // Clear error message
    };

    // Function to handle text change in TextInput
    const handleTextChange = (inputText) => {
        // Check if the input contains only letters using regular expression
        if (/^[a-zA-Z\s]+$/.test(inputText) || inputText === "") {
            setError(""); // Clear error message
        } else {
            setError("Invalid character, only letters allowed"); // Set error message
        }
        setText(inputText); // Set text state if it contains only letters or is empty
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={handleCloseModal}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text>Create Item</Text>
                    <TextInput
                        style={styles.textInput}
                        onChangeText={handleTextChange}
                        value={text}
                        placeholder="Enter item name"
                    />
                    {error.length ? <Text style={styles.errorText}>{error}</Text> : null}
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 15, alignItems: "center" }}>
                        <Button
                            style={styles.button}
                            title="Cancel"
                            onPress={handleCloseModal}
                        />
                        <Button
                            style={styles.button}
                            disabled={text.length === 0 || error.length !== 0} // disable if text is empty
                            title="Create"
                            onPress={() => {
                                addItemHandler({
                                    itemName: text,
                                    completed: false,
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
    },
    errorText: {
        color: "red",
        marginVertical: 5,
    }
});