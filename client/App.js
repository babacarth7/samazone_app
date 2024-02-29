import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./navigations/StackNavigator";
import { StoreProvider } from "./utils/Store";

export default function App() {
  return (
    <>
      <StoreProvider>
        <StackNavigator />
      </StoreProvider>
    </>
  );
}

const styles = StyleSheet.create({});
