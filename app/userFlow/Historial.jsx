import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import  { Alert } from 'react-native';
export default function Historial() {
    const [donations, setDonations] = useState([]);
    const [userID, setUserID] = useState(0);

    useEffect(() => {
        const handleGetUserData = async () => {
            const id = await AsyncStorage.getItem('userID');
            if (id) {
                setUserID(parseInt(id, 10));
            }
            const parsedUserID = parseInt(id, 10);
            const storedUrl = await AsyncStorage.getItem('API_URL');
            try{
                const response = await axios.get(`${storedUrl}/users/donation?userID=${parsedUserID}`);
                setDonations(response.data);
            }catch(error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            }
        }
        handleGetUserData();
    }, []);

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay/>
                {/* <Text style={styles.title}>Historial</Text>
                <Text style={styles.text}>Bienvenido a la pantalla de Historial.</Text> */}
                <ScrollView style={styles.historialContainer}>
                    { donations.length > 0 ? (donations.map((donation) => (
                            <View style={styles.historialItem} key={donation.DonationID}>
                                <Image
                                    style={styles.historialImage}
                                    source={ {uri:'https://scontent.fsjo10-1.fna.fbcdn.net/v/t39.30808-1/447462029_7509873185757609_8697984359719734285_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=nfAnNnqcq2kQ7kNvgHJRClu&_nc_zt=24&_nc_ht=scontent.fsjo10-1.fna&_nc_gid=AW1gDXCqQuhoYZWQBUFzfYU&oh=00_AYDGDgTp6qbD8zQBJDTBwOFOEXkZfa0rVn0YZE9-nmMQuQ&oe=672B9487'}}

                                />
                                <View style={styles.historialTextContainer}>
                                    <Text style={styles.providerText}>¡Has donado a {donation.OwnerFirstName} {donation.OwnerLastName}!</Text>
                                    <Text style={styles.amountText}>{donation.Amount} goofycoins al proyecto: {donation.ProjectName}</Text>
                                </View>
                            </View>
                    ))): (
                        <View style={styles.noDonationsContainer}>
                            <Text style={styles.noDonationsText}>No hay donaciones :(</Text>
                        </View>
                    )}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 20,
        color: '#04233B',
    },
    text: {
        fontSize: 16,
        fontFamily: 'SpaceGrotesk',
        color: 'black',
    },
    historialContainer: {
        flex: 1,
        width: '100%',
        padding: 16,
        marginTop: 70,
    },
    historialImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
    historialItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
    },
    historialTextContainer: {
        flex: 1,
    },
    providerText: {
        fontSize: 16,
        fontFamily: 'SpaceGroteskBold',
        marginBottom: 10,
    },
    amountText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
    },
    noDonationsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noDonationsText: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
    }
});