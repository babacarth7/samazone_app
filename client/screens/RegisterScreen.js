import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    // send a POST  request to the backend API to register the user
    axios
      .post("http://192.168.1.111:3000/api/auth/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert("Registration successful", "You have been registered Successfully");
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Registration Error", "An error occurred while registering");
        console.log("registration failed", error);
      });
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
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>Register</Text>

      <View style={{ marginBottom: 10, width: "100%" }}>
        <TextInput
          value={name}
          onChangeText={(text) => setName(text)}
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
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
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
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="Password"
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

      <TouchableOpacity
        onPress={handleRegister}
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
          Register
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
        <Text style={{ color: "blue" }}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
