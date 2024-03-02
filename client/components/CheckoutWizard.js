import React from "react";
import { View, Text } from "react-native";

export default function CheckoutWizard({ activeStep = 0 }) {
  const steps = ["User Login", "Shipping Address", "Payment Method", "Place Order"];

  return (
    <View style={{ flexDirection: "row", marginBottom: 20 }}>
      {steps.map((step, index) => (
        <View
          key={step}
          style={{
            flex: 1,
            borderBottomWidth: 2,
            borderColor: index <= activeStep ? "#5A67D8" : "#ccc",
            alignItems: "center",
            paddingBottom: 5,
          }}
        >
          <Text style={{ color: index <= activeStep ? "#5A67D8" : "#ccc" }}>{step}</Text>
        </View>
      ))}
    </View>
  );
}
