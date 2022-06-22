import React from "react";
import { View, StyleSheet, Image, SafeAreaView } from "react-native";
import { Container } from "native-base";
const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={{
          uri: "https://www.freeiconspng.com/thumbs/retail-store-icon/retail-store-icon-18.png",
        }}
        resizeMode="contain"
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
    display: 'block',
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: 15
  },
  logo: {
    width: 50,
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default Header;
