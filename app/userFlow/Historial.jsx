import { View, Text, StyleSheet } from 'react-native';
import { Stack } from "expo-router";
import NavBarDisplay from '../../components/navbarDisplay';
export default function Historial() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.contentContainer}>
                <NavBarDisplay/>
                <Text style={styles.title}>Historial</Text>
                <Text style={styles.text}>Bienvenido a la pantalla de Historial.</Text>
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
});