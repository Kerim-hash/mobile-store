import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { Button } from "native-base";
import { useDispatch } from "react-redux";
import * as actions from '../../../redux/Actions/cartActions';
var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const dispatch = useDispatch()


  const addToCart = (product) => {
    dispatch(actions.addToCart(product))
  }
  return (
    <View style={styles.container}>
      <Image
       style={styles.img}
       resizeMode="contain"
       source={{uri: props.image ? props.image : 'https://img.icons8.com/bubbles/2x/product.png'}}
        />
      <View style={styles.card} />
      <View style={styles.title} >
          <Text>{props.name.length > 15 ? props.name.substring(0, 15 -3) + '...': props.name }</Text>
      </View>
      <Text style={styles.price}>${props.price}</Text>
      { props.counterInStock > 0 ? (
                <View style={{ marginBottom: 60 }}>
                    <Button 
                    primary
                    medium
                    onPress={() => addToCart(props)}
                    >
                        <Text style={{ color: "white"}}>Add</Text>
                    </Button>
                </View>
            ) : <Text style={{ marginTop: 20 }}>Currently Unavailable</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 20,
    height: 250,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    elevation: 8,
    alignItems: "center",
    marginLeft: "auto", marginRight: "auto",
    backgroundColor: 'white'
  }, 
  img: {
    width: width / 2 - 20 - 10,
    height: 150,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: -45,
  },
  card: {
      marginBottom: 10,
      height: width / 3 - 20,
      backgroundColor: 'transparent',
      width: width / 2 - 20 -10
  },
  title: {
      fontWeight: 'bold',
      fontSize: 14,
      textAlign: 'center'
  },
  price: {
      fontSize: 22,
      color: 'orange',
      marginTop: 5,
      marginBottom: 5,
  }
});

export default ProductCard
