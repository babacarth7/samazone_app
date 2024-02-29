import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export default function EditProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Update Profile
      </Text>
      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          placeholder="Enter name"
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
          placeholder="Enter email"
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
          placeholder="Enter password"
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
          Update
        </Text>
      </TouchableOpacity>
    </View>
  );
}
