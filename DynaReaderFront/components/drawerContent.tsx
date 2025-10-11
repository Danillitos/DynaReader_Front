import React from "react";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import DrawerItemSeparator from "./drawerItemSeparator";

interface TokenPayLoad {
    sub: number,
    username: string,
}

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    const { logout, token } = useAuth()

    let username = 'Leitor(a)'
    if (token) {
        const decoded = jwtDecode<TokenPayLoad>(token)
        username = decoded.username
    }

    const handleLogout = () => {
        Alert.alert(
            "Confirmação",
            "Deseja mesmo sair de sua conta?",
            [
                {
                    text: 'Não',
                    style: "cancel"
                },
                {
                    text: 'Sim',
                    style: "destructive",
                    onPress: () => {
                        logout()
                        props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'LoginScreen' }]
                        })
                    }
                }

            ]
        )
    }

    function Sair({token}: {token: string | null}) {
        if (token) {
            return  <DrawerItemSeparator label="Sair" onPress={handleLogout} color="red" />
        }
        return null
    }

    return(
        <View style={{ flex: 1}}>
            <View style={{ padding: 20, alignItems: 'center' }}>
                <Image
                    source={require('../assets/images/logo.png')}
                    style={styles.logoImage}
                />
                <Text style={styles.title}>DynaReader</Text>

                <Text style={styles.userMessage}>Olá, {username}!</Text>

                <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
                    <Image
                        source={require('../assets/images/go-back.png')}
                        style={styles.goBack}
                    />
                </TouchableOpacity>
            </View>

            <View style={{flex: 1, alignItems: 'center', width: '100%'}}>
                <DrawerItemSeparator
                    label="Pagina Inicial"
                    onPress={() => props.navigation.closeDrawer()}
                />
                <DrawerItemSeparator
                    label="Configurações"
                    onPress={() => console.log('Futuramente colocar a pagina de configurações do app.')}
                />
                <DrawerItemSeparator
                    label="Acessibilidade"
                    onPress={() => console.log('Futuramente colocar a pagina de acessibilidade do app.')}
                />
                <DrawerItemSeparator
                    label="Perfil"
                    onPress={() => console.log('Futuramente colocar a pagina de perfil do app.')}
                />
                <DrawerItemSeparator
                    label="Créditos"
                    onPress={() => console.log('Futuramente colocar a pagina de créditos do app.')}
                />
                <Sair token={token} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
    },
    logoImage: {
        marginTop: 25,
        width: 70,
        height: 70,
        alignSelf: 'center',
        tintColor: '#414A40',
    },
    goBack: {
        marginTop: 20,
        width: 40,
        height: 40
    },
    userMessage: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
    drawerItems: {
        fontFamily: 'Montserrat_400Regular',
        fontSize: 16,
    },
    separator: { 
        width: '80%',
        height: 1, 
        backgroundColor: "#ddd", 
        marginHorizontal: 10, 
        margin: 15
    }
})