import { Modal, Button, View, Text, TextInput, StyleSheet } from "react-native";
import { useState } from "react";

export const CreateItemModal = ({ modalVisible, setModalVisible, addItemHandler }) => {
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
                    <Text>Create Item</Text>
                    <TextInput
                        style={{ borderWidth: 0.5, paddingHorizontal: 3, marginVertical: 10 }}
                        onChangeText={setText}
                        value={text}
                        placeholder="Enter item name"
                    />
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 15, alignItems: "center" }}>
                        <Button
                            style={styles.button}
                            title="Cancel"
                            onPress={handleCloseModal}
                        />
                        <Button
                            style={styles.button}
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
    }
});