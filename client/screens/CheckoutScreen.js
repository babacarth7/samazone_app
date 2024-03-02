import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutScreen() {
  const navigation = useNavigation();
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
      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="Full Name"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="Mobile Number"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="Address"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="City"
          secureTextEntry
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>
      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="Postal Code"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="Country"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            padding: 10,
            marginBottom: 5,
          }}
        />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#FEBE10",
          width: "100%",
          borderRadius: 6,
          marginLeft: "auto",
          marginRight: "auto",
          padding: 15,
        }}
        title="Login"
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Next
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}
