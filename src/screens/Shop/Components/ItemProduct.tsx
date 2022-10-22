import React from "react";
import { View, StyleSheet, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { cat, fonts, ic_add_shop, ic_dot_orange, ic_heart } from "../../../shared";
import colors from "../../../shared/colors";

const ItemProductComp = () => {

    const name = "Cat 123"
    const price = "20000"
    const image = cat


    return (
        <View style={styles.container}>
            <View style={styles.wrapIcon}>
                <FastImage
                    source={ic_dot_orange}
                    style={styles.imgIcon}
                    resizeMode="contain"
                />
                <FastImage
                    source={ic_heart}
                    style={styles.imgIcon}
                    tintColor={colors.orage_bg}
                    resizeMode="contain"
                />
            </View>
            <FastImage
                style={styles.wrapProductImage}
                source={image}
                resizeMode="center"
            />
            <View style={styles.wrapDetail}>
                <View style={styles.wrapTxtDetail}>
                    <Text style={styles.txtPrice}>
                        {price}
                    </Text>
                    <Text style={styles.txtName}>
                        {name}
                    </Text>
                </View>
                <FastImage
                    source={ic_add_shop}
                    resizeMode="contain"
                    style={styles.imgIcon}
                />
            </View>
        </View>
    );
}

export const ItemProduct = React.memo(ItemProductComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.gray_bg,
        margin: 10,
        backgroundColor: colors.white
    },
    imgIcon: {
        height: 24,
        aspectRatio: 1,
    },
    wrapIcon: {
        flexDirection: "row",
        padding: 20,
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
    },
    wrapProductImage: {
        height: 160,
        aspectRatio: 1,
        margin: 20,
        borderRadius: 100
    },
    wrapDetail: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    txtName: {
        fontSize: fonts.font22,
        color: colors.orage_bg
    },
    wrapTxtDetail: {
        flexDirection: "column",

    },
    txtPrice: {
        fontSize: fonts.font18,
        color: colors.black
    },
});