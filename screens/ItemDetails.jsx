import { Text, View, Image } from 'react-native';
import { useEffect, useState } from 'react';
import axios from "axios"

/**
 * Item details screen
 * Fetches a photo for an item using the Unsplash Api
 */
export const ItemDetails = ({ route }) => {
    const { itemName } = route.params;
    // Set a loading state
    const [fetchingDetails, setFetchingDetails] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(null)

    useEffect(() => {
        fetchProductDetails();
    }, []);

    /**
     * Function that calls the unsplash api
     * and sets a photoUrl in state
     * 
     */
    const fetchProductDetails = async () => {
        try {
            // Set fetching to true
            setFetchingDetails(true);
            // Request a photo from unsplash
            const response = await axios.get(`https://api.unsplash.com/search/photos?query=${itemName}&client_id=1yMR4wn5loe-ZHlYgNDcVeU8bnUARdq26H3jDi25fOE`);
            if (response.data.results.length && response.data.results[0].urls && response.data.results[0].urls.small) {
                // Get the small url of the first result
                setPhotoUrl(response.data.results[0].urls.small);
                // Set fetching to false
                setFetchingDetails(false)
            } else {
                // Set fetching to false
                setFetchingDetails(false)
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };
    return (
        <View style={{ margin: 20 }}>
            {fetchingDetails ?
                <Text>
                    Fetching photo...
                </Text> :
                <View>
                    {photoUrl ? (
                        <View>
                            <Image source={{ uri: photoUrl }} style={{ width: 200, height: 200, borderRadius: 10 }} />
                        </View>
                    ) : <View>
                        <Image
                            source={require('../assets/images/noPhoto.jpg')}
                            style={{
                                height: 200,
                                width: 200,
                                marginRight: 10,
                                borderRadius: 10
                            }}
                        />
                    </View>}
                </View>}
        </View>


    );
};
