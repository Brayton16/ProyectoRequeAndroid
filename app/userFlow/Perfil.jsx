import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import axios from "axios";


export default function Profile() {

    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState(0);

    // Simulación de datos de usuario
    const simData = {
        UserID: 9,
        FirstName: "Brayton",
        LastName: "Solano",
        Cedula: "118640057",
        Email: "bsolano@estudiantec.cr",
        WorkArea: "computación",
        DigitalMoney: 500,
        PhoneNumber: "62668621",
        IsActive: true,
        CreatedAt: "2024-09-17T22:35:59.417Z",
        Rol: 'Usuario',
        ProfilePhoto: 'https://scontent.fsjo10-1.fna.fbcdn.net/v/t39.30808-1/447462029_7509873185757609_8697984359719734285_n.jpg?stp=dst-jpg_s200x200&_nc_cat=111&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=nfAnNnqcq2kQ7kNvgHJRClu&_nc_zt=24&_nc_ht=scontent.fsjo10-1.fna&_nc_gid=AW1gDXCqQuhoYZWQBUFzfYU&oh=00_AYDGDgTp6qbD8zQBJDTBwOFOEXkZfa0rVn0YZE9-nmMQuQ&oe=672B9487'
    }

    useEffect(() => {
        const handleGetUserData = async () => {
            const id = await AsyncStorage.getItem('userID');
            const parsedUserID = parseInt(id, 10);
            const storedUrl = await AsyncStorage.getItem('API_URL');
        
            try {
                const response = await axios.get(`${storedUrl}/users/id`, {
                    params: { userID: parsedUserID }
                });
        
                if (response.status === 200) {
                    setUserData(response.data[0]);
                } else {
                    Alert.alert('Error', 'No se han podido recibir los proyectos');
                }
            } catch (error) {
                Alert.alert('Error', 'Algo ha salido mal');
                console.error(error);
            } 
        };

        handleGetUserData();
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <NavBarDisplay/>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: simData?.ProfilePhoto }}
                />
                <Text style={styles.profileName}>{userData?.FirstName} {userData?.LastName}</Text>
                <View style={styles.moneyContainer}>
                    <Text style={styles.moneyText}>Saldo: {userData?.DigitalMoney}</Text>
                    <Image style={styles.moneyImage} source={require('../../assets/goofycoin.png')}/>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoLabel}>Correo</Text>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoText}>{userData?.Email}</Text>
                    <TouchableOpacity><Text style={styles.editLink}>Cambiar correo</Text></TouchableOpacity>
                </View>
                <Text style={styles.infoLabel}>Contraseña</Text>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoText}>**************</Text>
                    <TouchableOpacity><Text style={styles.editLink}>Cambiar contraseña</Text></TouchableOpacity>
                </View>
                <Text style={styles.infoLabel}>Cédula</Text>
                <Text style={styles.infoText}>{userData?.Cedula}</Text>
                <Text style={styles.infoLabel}>Teléfono</Text>
                <View style={styles.infoGroup}>                    
                    <Text style={styles.infoText}>{userData?.PhoneNumber}</Text>
                    <TouchableOpacity><Text style={styles.editLink}>Cambiar teléfono</Text></TouchableOpacity>
                </View>
                <Text style={styles.infoLabel}>Rol</Text>
                <Text style={styles.infoText}>{userData?.Rol}</Text>
                <Text style={styles.infoLabel}>Área de conocimiento</Text>
                <View style={styles.infoGroup}>
                    <Text style={styles.infoText}>{userData?.WorkArea}</Text>
                    <TouchableOpacity><Text style={styles.editLink}>Cambiar área</Text></TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Recargar GoofyCoins</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#ffffff',
        padding: 20,
    },
    menuButton: {
        marginRight: 10,
    },
    menuIcon: {
        fontSize: 24,
        fontFamily: 'SpaceGrotesk'
    },
    title: {
        fontSize: 20,
        fontFamily: 'SpaceGrotesk',
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 70,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 22,
        fontFamily: 'SpaceGrotesk'
    },
    infoContainer: {
        marginBottom: 20,
    },
    infoLabel: {
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginTop: 10,
    },
    infoText: {
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 5,
    },
    infoGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editLink: {
        color: '#1E90FF',
        fontSize: 14,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 15,
    },
    button: {
        backgroundColor: '#F75657',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    moneyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 30,
        backgroundColor: '#04233B',
        paddingVertical: 10,
        paddingHorizontal: 50,
        borderRadius: 50,
    },
    moneyText: {
        color: '#ffffff',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk',
        marginLeft: 10,
    },
    moneyImage: {
        marginLeft: 10,
        width: 50,
        height: 50,
    }
});
