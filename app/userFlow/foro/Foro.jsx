import { View, Text, StyleSheet } from 'react-native';
import { Stack } from "expo-router";

export default function Foro() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Proyectos</Text>
            <Text style={styles.text}>Bienvenido a la pantalla de Foro.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#04233B',
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
});