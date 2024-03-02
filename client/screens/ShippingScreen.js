import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../utils/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ShippingScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;

  const [fullName, setFullName] = useState(shippingAddress?.fullName || "");
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");

  const navigation = useNavigation();

  useEffect(() => {
    setFullName(shippingAddress?.fullName || "");
    setAddress(shippingAddress?.address || "");
    setCity(shippingAddress?.city || "");
    setPostalCode(shippingAddress?.postalCode || "");
    setCountry(shippingAddress?.country || "");
  }, [shippingAddress]);

  const handleSubmit = async () => {
    if (!fullName || !address || !city || !postalCode || !country) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    const updatedAddress = {
      fullName,
      address,
      city,
      postalCode,
      country,
    };

    try {
      await AsyncStorage.setItem("fullName", fullName);
    } catch (error) {
      console.error("Error saving fullName to AsyncStorage:", error);
    }

    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: updatedAddress });
    navigation.navigate("Payment");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Shipping Address</Text>
      <TextInput
        placeholder="Full Name"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          width: "100%",
          fontSize: 16,
          color: "#333",
        }}
        value={fullName}
        onChangeText={setFullName}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Address"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          width: "100%",
          fontSize: 16,
          color: "#333",
        }}
        value={address}
        onChangeText={setAddress}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="City"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          width: "100%",
          fontSize: 16,
          color: "#333",
        }}
        value={city}
        onChangeText={setCity}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Postal Code"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          width: "100%",
          fontSize: 16,
          color: "#333",
        }}
        value={postalCode}
        onChangeText={setPostalCode}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Country"
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 5,
          padding: 10,
          marginBottom: 10,
          width: "100%",
          fontSize: 16,
          color: "#333",
        }}
        value={country}
        onChangeText={setCountry}
        placeholderTextColor="#999"
      />
      <TouchableOpacity
        onPress={handleSubmit}
        style={{
          backgroundColor: "#FEBE10",
          width: "100%",
          borderRadius: 6,
          padding: 15,
          marginTop: 20,
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}>Next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
