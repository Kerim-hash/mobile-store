import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";
import { useSelector } from "react-redux";

const CartIcon = () => {

  const cartItems = useSelector(({ cartItems }) => cartItems);
  return (
    <>
      {cartItems.totalCount ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{cartItems.totalCount}</Text>
        </Badge>
      ) : null}
    </>
  );
};


const styles = StyleSheet.create({
  badge: {
    width: 25,
    height: 25,
    flex: 1,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -4,
    right: -15,
    borderRadius: '50%',
  },
  text: {
    width: 25,
    height: 25,
    flex: 1,
    position: 'absolute',
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -10,
    right: -20,
    borderRadius: '50%',
  },
});

export default CartIcon
