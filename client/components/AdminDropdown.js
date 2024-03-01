import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const Dropdown = ({ loggedIn }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={{ position: "relative" }}>
      <TouchableOpacity onPress={toggleDropdown}>
        <Text>{loggedIn ? "User Name" : "Login"}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            position: "absolute",
            top: 20,
            right: 0,
            backgroundColor: "white",
            borderRadius: 5,
            padding: 10,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          {loggedIn ? (
            <>
              <TouchableOpacity>
                <Text>Dashboard</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Orders</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Products</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text>Users</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity>
              <Text>Login</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Dropdown;
