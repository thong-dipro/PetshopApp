import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from "react-native";
import { ItemType } from "react-native-dropdown-picker";
import FastImage from "react-native-fast-image";
import { ICart, IItemType, IListOrderItem, SCREENNAME } from "../../../../shared";
import colors from "../../../../shared/colors";

interface IProps {
    item: ICart
}

const HistoryItemComp = ({ item }: IProps) => {

    const navigation = useNavigation<any>();
    const [orderDate, setOrderDate] = React.useState<Date>(new Date(item.updatedAt));


    const renderItem = (item: IItemType) => {
        return <TouchableOpacity
            onPress={() => {
                navigation.navigate(SCREENNAME.DETAIL_PRODUCT_SCREEN, { productID: item.product_id })
            }}
        >
            <View style={styles.wrapItem}>
                <FastImage
                    source={{ uri: item.image }}
                    style={styles.wrapImage}
                    resizeMode="contain"
                />

                <View style={styles.wrapDetailProduct}>
                    <Text style={styles.txtName}>
                        {item.product_name}
                    </Text>
                    <View style={styles.wrapType}>
                        <Text
                            style={styles.txtType}
                        >{`Type: ${item.type_name}`}</Text>
                    </View>
                    <View style={styles.wrapPrice}>
                        <Text style={styles.txtDetailPrice}>
                            {`Quantity: ${item.amount}`}
                        </Text>
                        <Text style={styles.txtDetailPrice}>
                            {`Price: $${item.price}`}
                        </Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 16 }}>
                {`Order ID: ${item._id}\nAddress: ${item.address}\nPhone: ${item.phone}`}
            </Text>
            <FlatList
                data={item.listOrderItems}
                renderItem={(item) => renderItem(item.item)}
            />
            <Text style={styles.txtDate}>{`Order Date: ${orderDate.getFullYear()}/${orderDate.getMonth()}/${orderDate.getDate()}`}</Text>
            <Text style={styles.txtTotal}>{`Total: $${item.total}`}</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate(SCREENNAME.DELIVERY_STATUS_SCREEN, { deliveryID: "LLUUGA" })
                }}
            >
                <Text style={styles.wrapDelivery}>Delivery Status</Text>
            </TouchableOpacity>
        </View>
    );
}

export const HistoryItem = React.memo(HistoryItemComp)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
    },
    wrapItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 10,
    },
    wrapImage: {
        width: 100,
        aspectRatio: 1,
        marginRight: 10
    },
    wrapDetailProduct: {
        flex: 1,
        flexDirection: "column"
    },
    txtName: {
        fontSize: 24,
        color: "#2b1e1e"
    },
    wrapType: {
        paddingVertical: 5
    },
    wrapPrice: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    txtDetailPrice: {
        fontSize: 18,
        fontWeight: "bold"
    },
    txtType: {
        fontSize: 16
    },
    txtDate: {
        fontSize: 20,
        textAlign: "right",
        color: colors.orangeTabbar
    },
    txtTotal: {
        fontSize: 22,
        color: "#2b1e1e",
        textAlign: "right",
        paddingTop: 5
    },
    wrapDelivery: {
        textAlign: "right",
        color: colors.orangeTabbar,
        fontWeight: "bold",
        marginTop: 4,
        fontSize: 18
    }
});
