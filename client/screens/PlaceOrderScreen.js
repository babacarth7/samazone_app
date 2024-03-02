import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from "react-native";
import { Store } from "../utils/Store";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cartItems, shippingAddress, paymentMethod } = state.cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(cartItems.reduce((a, c) => a + c.quantity * c.price, 0));

  const shippingPrice = itemsPrice > 200 ? 0 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const order = {
        user: shippingAddress.fullName,
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      };

      const response = await axios.post("http://192.168.1.111:3000/api/order", order);
      console.log(JSON.stringify(response));
      console.log(JSON.stringify(order));
      const orderIdFromResponse = response.data._id;
      dispatch({ type: "CART_CLEAR_ITEMS" });
      navigation.navigate("OrderConfirmation", {
        orderId: orderIdFromResponse,
      });
    } catch (error) {
      console.error("Error placing order:", JSON.stringify(error));
      Alert.alert("Error", "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, marginTop: 55 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Place Order</Text>

      {/* Shipping Address */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Shipping Address</Text>
        <Text>{shippingAddress.fullName}</Text>
        <Text>{shippingAddress.address}</Text>
        <Text>
          {shippingAddress.city}, {shippingAddress.postalCode}
        </Text>
        <Text>{shippingAddress.country}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Shipping")}>
          <Text style={{ color: "blue", marginTop: 10 }}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Method */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Payment Method</Text>
        <Text>{paymentMethod}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Payment")}>
          <Text style={{ color: "blue", marginTop: 10 }}>Edit</Text>
        </TouchableOpacity>
      </View>

      {/* Order Items */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Order Items</Text>
        {cartItems.map((item) => (
          <View
            key={item.slug}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <Image
              source={{ uri: `http://192.168.1.111:3000/images/${item.image}` }}
              style={{ width: 80, height: 80, marginRight: 10 }}
            />
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
              <Text style={{ fontSize: 14 }}>Price: ${item.price}</Text>
              <Text style={{ fontSize: 14 }}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Order Summary */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>Order Summary</Text>
        <Text>Subtotal: ${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}</Text>
        {/* Add more summary details like tax, shipping, etc. */}
      </View>

      <TouchableOpacity
        onPress={placeOrderHandler}
        style={{
          backgroundColor: "#FFC72C",
          padding: 10,
          borderRadius: 5,
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Place Order</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
