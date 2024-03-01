import React, { useContext } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Store } from "../utils/Store";
import { useNavigation } from "@react-navigation/native";
export default function CartScreen() {
  const { state, dispatch } = useContext(Store);
  const { cartItems } = state.cart;
  const navigation = useNavigation();

  const removeItemHandler = (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
    Alert.alert("Item removed from cart");
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 10 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 10,
          marginVertical: 55,
        }}
      >
        Shopping Cart
      </Text>
      {cartItems.length === 0 ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 50,
          }}
        >
          <Text>Cart is empty.</Text>
        </View>
      ) : (
        <>
          {cartItems.map((item) => (
            <View
              key={item.slug}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                borderBottomWidth: 1,
                borderBottomColor: "#ccc",
                paddingBottom: 10,
              }}
            >
              <Image
                source={{
                  uri: `http://192.168.1.111:3000/images/${item.image}`,
                }}
                style={{ width: 80, height: 80, marginRight: 10 }}
              />
              <View style={{ flex: 1, marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 14 }}>Price: ${item.price}</Text>
                <Text style={{ fontSize: 14 }}>Quantity: {item.quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => removeItemHandler(item)}>
                <AntDesign
                  name="close"
                  size={24}
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          ))}
          <View
            style={{
              marginTop: 20,
              borderTopWidth: 1,
              borderTopColor: "#ccc",
              paddingTop: 10,
            }}
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}): $
              {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFC72C",
                padding: 10,
                borderRadius: 5,
                alignItems: "center",
              }}
              onPress={() => navigation.navigate("Shipping")}
            >
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                Check Out
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
}
