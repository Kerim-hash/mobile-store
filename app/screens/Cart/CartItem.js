import React from "react";
import { View, StyleSheet, Image, Text} from "react-native";

const CartItem = ({data}) => {
    const product = data.item.items[0]
console.log(data.item)
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={{justifyContent: 'space-between'}}>
        <Image
          source={{
            uri: product.image
              ? product.image
              : "https://img.icons8.com/bubbles/2x/product.png",
          }}
          style={styles.avatar}
        />
            <Text style={styles.timings}>{product.name.length > 15 ? product.name.substring(0, 15 -3) + '...': product.name}</Text>
        </View>
        <View style={styles.metaContainer}>
          <View style={{ textAlign: "right" }}>
            <Text style={styles.price}>$ {data.item.totalPrice}</Text>
            <Text style={styles.price}>things {data.item.items.length}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0891b2",
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignSelf: "center",
    width: 375,
    width: "100%",
    marginBottom: 10,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatar: {
    height: 50,
    objectFit: 'contain',
  },
  metaContainer: {
    justifyContent: 'space-between'
  },
  timings: {
    color: '#fff',
    fontSize: '14px'
  },
  price: {
    color: 'white',
    marginTop: 5,
    fontSize: 20,
    marginTop: 5,
     textAlign: 'right',
  },
});

export default CartItem;
