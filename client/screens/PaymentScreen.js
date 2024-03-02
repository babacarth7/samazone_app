import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Store } from "../utils/Store";

export default function PaymentMethodScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const navigation = useNavigation();

  useEffect(() => {
    if (!shippingAddress.address) {
      return navigation.navigate("Shipping");
    }
    setSelectedPaymentMethod(paymentMethod || "");
  }, [navigation, paymentMethod, shippingAddress.address]);

  const submitHandler = () => {
    if (!selectedPaymentMethod) {
      return alert("Payment method is required");
    }
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: selectedPaymentMethod });
    navigation.navigate("PlaceOrder");
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
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Payment Method</Text>
      {["PayPal", "Stripe", "CashOnDelivery"].map((payment) => (
        <TouchableOpacity
          key={payment}
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
          onPress={() => setSelectedPaymentMethod(payment)}
        >
          <View
            style={{
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: selectedPaymentMethod === payment ? "#5A67D8" : "#ccc",
              borderRadius: 12,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {selectedPaymentMethod === payment && (
              <View
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: "#5A67D8",
                  borderRadius: 6,
                }}
              />
            )}
          </View>
          <Text style={{ fontSize: 16 }}>{payment}</Text>
        </TouchableOpacity>
      ))}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Shipping")} style={{ flex: 1, marginRight: 10 }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#333",
              padding: 10,
              backgroundColor: "#FEBE10",
              borderRadius: 6,
            }}
          >
            Back
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={submitHandler} style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              fontSize: 16,
              textAlign: "center",
              color: "#fff",
              padding: 10,
              backgroundColor: "#5A67D8",
              borderRadius: 6,
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
