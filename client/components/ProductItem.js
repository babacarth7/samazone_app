// ProductItem.js
import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../utils/Store";

export default function ProductItem({ product }) {
  const { state, dispatch } = useContext(Store);
  const navigation = useNavigation();

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);

    if (existItem) {
      if (existItem.quantity + 1 > product.countInStock) {
        Alert.alert("Sorry", "Product is out of stock");
        return;
      }
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          ...existItem,
          quantity: existItem.quantity + 1,
        },
      });
    } else {
      dispatch({
        type: "CART_ADD_ITEM",
        payload: {
          ...product,
          quantity: 1,
        },
      });
    }

    Alert.alert("Product", "Added to the cart");
    navigation.navigate("Cart", { product });
  };

  return (
    <Pressable
      onPress={() => navigation.navigate("Info", { product })}
      style={{ marginHorizontal: 13, marginVertical: 20, paddingLeft: 15 }}
    >
      <Image
        style={{
          width: 150,
          height: 150,
          resizeMode: "contain",
          borderRadius: 20,
        }}
        source={{ uri: `http://192.168.1.111:3000/images/${product.image}` }}
      />
      <Text
        style={{
          width: 150,
          marginTop: 10,
          fontSize: 15,
          fontWeight: "bold",
          marginLeft: 7,
        }}
      >
        {product.name}
      </Text>
      <Text
        style={{
          width: 150,
          marginTop: 2,
          fontSize: 15,
          fontWeight: "bold",
          marginLeft: 7,
        }}
      >
        {product.brand}
      </Text>
      <Text
        style={{
          width: 150,
          marginTop: 2,
          fontSize: 15,
          fontWeight: "bold",
          marginLeft: 7,
        }}
      >
        ${product.price}
      </Text>
      <Pressable
        onPress={addToCartHandler}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold" }}>Add to Cart</Text>
        </View>
      </Pressable>
    </Pressable>
  );
}
