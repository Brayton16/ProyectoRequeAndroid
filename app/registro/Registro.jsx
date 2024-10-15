import { TextInput, View, Text, StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import React, { useState } from "react";
import { Stack, useRouter } from "expo-router";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { Alert } from "react-native";

export default function Registro(){
    
    const router = useRouter()
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [cedula, setCedula] = useState('');
    const [correo, setCorreo] = useState('');
    const [selectedOption, setSelectedOption] = useState();
    const [dineroInicial, setDineroInicial] = useState('');
    const [telefono, setTelefono] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handlePress = (action) => {
        if(action === 'login'){
            router.push('/login/LogIn');
        }
    };

    const handleRegister = async () => {
        try {

            if(password != confirmPassword){
                Alert.alert('Error', 'Las contraseñas no coinciden');
                return;
            }

            if (!correo.includes("@estudiantec.cr")) {
                Alert.alert("Error", "El correo no corresponde al dominio estudiantec.cr");
                return; 
            }

            const response = await axios.post('http://localhost:3001/users', {
                nombre: name,
                apellidos: lastName,
                cedula: cedula,
                email: correo,
                area: selectedOption,
                dinero: dineroInicial,
                telefono: telefono,
                contrasena: password
            });
        
            console.log("registro existoso")
            router.push('/login/LogIn');

            
        } catch (error) {
            Alert.alert('Error', 'Hubo un problema al registrar el usuario');
            console.error(error);
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
                        Registrarse
                    </Text>
                    <View>
                        <TextInput   
                            style={styles.Items} 
                            placeholder="Nombre"
                            value={name}
                            onChangeText={setName}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Apellidos"
                            value={lastName}
                            onChangeText={setLastName}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Cédula"
                            value={cedula}
                            onChangeText={setCedula}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Correo"
                            value={correo}
                            onChangeText={setCorreo}
                        />
                        <View style={styles.Picker}>
                            <Picker
                                style={styles.Item}
                                mode={"dropdown"}
                                selectedValue={selectedOption}
                                onValueChange={(itemValue) => setSelectedOption(itemValue)} // Cambiado de onChangeText a onValueChange
                            >
                                <Picker.Item label="Área de trabajo" value=""/>
                                <Picker.Item label="Tecnología" value="tecnología"/>
                                <Picker.Item label="Arte" value="arte"/>
                                <Picker.Item label="Entretenimiento" value="entretenimiento"/>
                                <Picker.Item label="Investigación" value="investigación"/>
                            </Picker>
                        </View>

                        <TextInput
                            style={styles.Items} 
                            placeholder="Dinero inicial"
                            value={dineroInicial}
                            onChangeText={setDineroInicial}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Teléfono"
                            value={telefono}
                            onChangeText={setTelefono}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Contraseña"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.Items} 
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.Button}
                        onPress={handleRegister}
                    >
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => handlePress('login')}
                        >
                        <Text style={styles.text}>¿Ya tienes cuenta? Inicia sesión</Text>
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
        height: 730,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 120,
        marginTop: 150,
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
        backgroundColor: '#EF5356',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 2,  
        borderRightWidth: 2,  
        borderBottomWidth: 2, 
        borderLeftWidth: 2,  
        borderColor: '#EF5356', 
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


