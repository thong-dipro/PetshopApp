import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { ActivityIndicator } from "react-native-paper";
import colors from "../../../shared/colors";
import { img_login, SCREENNAME } from "../../../shared";
import { useDispatch } from "react-redux";
import { SAVE_APP_TOKEN } from "../../../redux/actions/actionTypes";
import FastImage from "react-native-fast-image";
const LoginScreenComp = ({ navigation }: any) => {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleLogin = (async () => {
        setIsLoading(true);
        var body = JSON.stringify({
            email: "admin@gmail.com",
            password: "123456"
        })
        await fetch('https://petshopdut.herokuapp.com/user/login',
            {
                method: "POST",
                headers: {
                    Accept: '*/*',
                    'Content-Type': 'application/json',
                    "Connection": "keep-alive"
                },
                body: body,
            }
        ).finally(() => {
            setIsLoading(false);
        }).then((response) => {
            if (response.status === 400) {
                showPopup();
                throw new Error("Invalid email or password");
            }
            return response.json()
        })
            .then((response,) => {
                dispatch({
                    type: SAVE_APP_TOKEN,
                    payload: response.accesstoken
                })
                navigation.navigate(SCREENNAME.HOME_STACK)
            })
            .catch((error) => {
                console.error(error);
            });

        setIsLoading(false);
    })

    const showPopup = () => {
        Alert.alert(
            "Login Failed",
            "Try another password or username",
            [
                { text: "OK" }
            ]
        );
    }
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.txtLogin}>
                Login
            </Text>
            <View style={styles.wrapImage}>
                <FastImage
                    source={img_login}
                    style={styles.img}
                    resizeMode={"cover"}
                />
            </View>
            <Text style={styles.txtDetail}>Email</Text>
            <View style={styles.wrapBorderInput}  >
                <TextInput
                    style={styles.txtInput}
                    numberOfLines={1}
                    value={email}
                    placeholder={"Enter your email"}
                    onChangeText={(value) => setEmail(value)}
                />
            </View>
            <Text style={styles.txtDetail}>Password</Text>
            <View style={styles.wrapBorderInput}  >
                <TextInput
                    style={styles.txtInput}
                    numberOfLines={1}
                    placeholder={"Enter your password"}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <TouchableOpacity
                onPress={handleLogin}
            >
                <View style={styles.wrapButtonLogin}>
                    {
                        isLoading ?
                            <ActivityIndicator
                                size={20}
                                color={"white"}
                            />
                            :
                            <Text style={styles.txtButtonLogin}>
                                Log me in
                            </Text>}
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate(SCREENNAME.FORGOT_PASSWORD_SCREEN)}
                style={{ alignItems: "center" }}
            >
                <Text style={styles.txtDetailCreate}>Forgot password?
                    <Text style={styles.txtCreateAccount}>{" Reset password"}</Text>
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
export const LoginScreen = React.memo(LoginScreenComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        marginHorizontal: 80,
        marginVertical: 20,
        aspectRatio: 1,
        flex: 1,
    },
    wrapImage: {
        flexDirection: "row",
    },
    txtLogin: {
        fontSize: 40,
        fontWeight: "bold",
        color: colors.cyan,
        marginTop: 30,
        alignSelf: "center",
    },
    wrapBorderInput: {
        borderWidth: 1,
        borderColor: colors.cyan,
        borderRadius: 10,
        marginHorizontal: 20,
        marginBottom: 24,
    },
    txtInput: {
        fontSize: 20,
        color: colors.cyan,
        marginHorizontal: 10
    },
    txtButtonLogin: {
        fontSize: 20,
        color: colors.white,
        fontWeight: "bold",
    },
    wrapButtonLogin: {
        backgroundColor: colors.cyan,
        marginHorizontal: 50,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
        paddingVertical: 15,
    },
    txtDetail: {
        fontSize: 18,
        color: "gray",
        marginHorizontal: 20,
        paddingBottom: 10
    },
    txtDetailCreate: {
        fontSize: 16,
        color: "gray",
        marginVertical: 20,
    },
    txtCreateAccount: {
        fontSize: 16,
        color: colors.cyan,
        fontWeight: "bold",
    }
})
