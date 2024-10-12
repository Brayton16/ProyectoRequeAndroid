import { TextInput, View, Text, StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker'; 
export default function LogIn(){
    const router = useRouter();
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedOption, setSelectedOption] = useState();
    const [dineroInicial, setDineroInicial] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = (action) => {
        if(action === 'registro'){
            router.push('/registro/Registro');
        }
    };


    return(
        <View style={{flex: 1}}>
            <Stack.Screen
                options={{
                    headerShown: false, 
                }}
            >
            </Stack.Screen>
            <ImageBackground 
                source={require('../../assets/background.png')}
                style={styles.background}
            >
                <View style={styles.container}>
                    <Text
                        style={styles.titleText}
                    >
                        Iniciar Sesión
                    </Text>
                    <View>
                        <TextInput
                            style={styles.Items} 
                            placeholder="Correo"
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.Button}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handlePress('registro')}
                        >
                        <Text style={styles.text}>¿No tienes cuenta? Regístrate</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        width: 'auto',
        height: 500,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 120,
        marginTop: 400,
    },
    containerText: {
        fontFamily: 'SpaceGrotesk',
        fontSize: 15,
        fontWeight: '400',
        textAlign: 'center',
        color: 'white'
    },
    Items:{
        width: 320,
        height: 45,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopWidth: 1,  
        borderRightWidth: 1,  
        borderBottomWidth: 1, 
        borderLeftWidth: 1,  
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 10,
        paddingLeft: 15,
        justifyContent: 'center'
    },
    Picker:{
        width: 320,
        height: 45,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderTopWidth: 1,  
        borderRightWidth: 1,  
        borderBottomWidth: 1, 
        borderLeftWidth: 1,  
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 10,
        justifyContent: 'center'
    },
    Item:{
        height: "100%",
        width:  "100%"
    },
    Button: {
        width: 320,
        height: 45,
        backgroundColor: '#04233B',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,  
        borderRightWidth: 2,  
        borderBottomWidth: 2, 
        borderLeftWidth: 2,  
        borderColor: '#04233B', 
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20, 
        borderBottomLeftRadius: 20,  
        borderBottomRightRadius: 20,
        marginBottom: 20,
        marginTop: 50
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        fontFamily: 'SpaceGrotesk',
        textAlign: 'center',
        textTransform: 'none'
    },
    text: {
        color: 'black',
        fontSize: 18,
        fontFamily: 'SpaceGrotesk'
    },
    titleText:{
        color: 'black',
        fontSize: 30,
        fontFamily: 'SpaceGrotesk',
        marginBottom: 40
    }
})


