import React, { useContext } from "react";
import { ScrollView, View, Text, Image, Pressable, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../utils/Store";

export default function ProductInfoScreen({ route }) {
  const { state, dispatch } = useContext(Store);
  const navigation = useNavigation();
  const { product } = route.params;

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }
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
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <Image
        style={{
          width: 400,
          height: 400,
          resizeMode: "cover",
          borderRadius: 20,
          alignSelf: "center",
          marginTop: 55,
        }}
        source={{ uri: `http://192.168.1.18:3000/images/${product.image}` }}
      />
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
          {product.name}
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>
          Category: {product.category}
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 5 }}>
          Brand: {product.brand}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          Rating: {product.rating} ({product.numReviews} reviews)
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 5 }}>
          Description: {product.description}
        </Text>
        <Text style={{ fontSize: 16 }}>
          Status: {product.countInStock > 0 ? "In stock" : "Unavailable"}
        </Text>
      </View>
      <Pressable
        onPress={addToCartHandler}
        style={{
          backgroundColor: "#FFC72C",
          padding: 15,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 20,
          marginVertical: 20,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Add to Cart
        </Text>
      </Pressable>
    </ScrollView>
  );
}
