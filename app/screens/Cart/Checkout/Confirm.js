import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView, Image } from "react-native";
import { Text, Thumbnail, Button } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../../../redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import axios from "axios";
import baseURL from "../../../../assets/common/baseUrl";

var { width, height } = Dimensions.get("window");

const Confirm = (props) => {
  const finalOrder = props.route.params;

  // Add this
  const [productUpdate, setProductUpdate] = useState();
  useEffect(() => {
    if (finalOrder) {
      getProducts(finalOrder);
    }
    return () => {
      setProductUpdate();
    };
  }, [props]);

  // Add this
  const getProducts = (x) => {
    const order = x.order.order.form;
    var products = [];
    if (order) {
      setProductUpdate(order.orderItems);
      // order.orderItems.forEach((cart) => {
      //     axios
      //       .get(`${baseURL}products/${cart.product}`)
      //       .then((data) => {
      //         products.push(data.data);
      //       })
      //       .catch((e) => {
      //         console.log(e);
      //       });
      //   });
    }
  };

  const confirmOrder = () => {
    const order = finalOrder.order.order.form;
    axios
      .post(`${baseURL}orders`, order)
      .then((res) => {
        if (res.status == 200 || res.status == 201) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Order Completed",
            text1: "Order Completed",
          });
          setTimeout(() => {
            props.clearCart();
            props.navigation.navigate("Cart");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

console.log(productUpdate)
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Confirm Order</Text>
        {props.route.params ? (
          <View style={{ borderWidth: 1, borderColor: "orange" }}>
            <Text style={styles.title}>Shipping to:</Text>
            <View style={{ padding: 8 }}>
              <Text>
                Address: {finalOrder.order.order.form.ShippingAddress1}
              </Text>
              <Text>
                Address2: {finalOrder.order.order.form.ShippingAddress2}
              </Text>
              <Text>City: {finalOrder.order.order.form.city}</Text>
              <Text>Zip Code: {finalOrder.order.order.form.zip}</Text>
              <Text>Country: {finalOrder.order.order.form.country}</Text>
            </View>
            <Text style={styles.title}>Items:</Text>
            {/* CHANGE THIS */}
            {productUpdate && (
              <>
                {productUpdate.map(({product}) => {
                  return (
                    <View style={styles.wrapper}>
                      <View style={styles.topContainer}>
                        <Image
                          source={{
                            uri: product.image
                              ? product.image
                              : "https://img.icons8.com/bubbles/2x/product.png",
                          }}
                          style={styles.avatar}
                        />
                        <View style={styles.metaContainer}>
                          <View>
                            <Text style={styles.timings}>{product.name}</Text>
                            <Text style={styles.description}>
                              {product.description}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </>
            )}
          </View>
        ) : null}
        <View style={{ alignItems: "center", margin: 20 }}>
          <Button title={"Place order"} onPress={confirmOrder} />
        </View>
      </View>
    </ScrollView>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
  };
};

const styles = StyleSheet.create({
  container: {
    height: height,
    padding: 8,
    alignContent: "center",
    backgroundColor: "white",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    alignSelf: "center",
    margin: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
    width: width / 1.2,
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },

  wrapper: {
    backgroundColor: '#0891b2',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'center',
    width: 375,
    maxWidth: '100%',
    marginBottom: 10
  },
  timings: {
    color: '#fff',
    fontSize: '14px'
  },
  metaContainer: {
    justifyContent: 'space-between'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 100
  },
  description: {
    color: 'white',
    marginTop: 5,
    fontSize: 20
  },
  button: {
    backgroundColor: '#22d3ee',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 14
  }
});

export default connect(null, mapDispatchToProps)(Confirm);
