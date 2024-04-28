import { View, Text } from 'react-native';
export const List = ({ listName }) => {
    return (
        <View style={{ backgroundColor: "grey" }}>
            <Text style={{ color: "white" }}>
                {listName}
            </Text>
        </View>
    );
};