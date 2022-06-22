import React from "react";
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Image, Dimensions } from "react-native";
import { connect, useDispatch, useSelector } from "react-redux";
import Header from "../../components/header";
import  {Button} from 'native-base'
import { SwipeListView } from 'react-native-swipe-list-view'

import * as actions from '../../../redux/Actions/cartActions';
import CartItem from "./CartItem";

import Icon from "react-native-vector-icons/FontAwesome";

var { height, width } = Dimensions.get("window");
const Cart = (props) => {
  const dispatch = useDispatch()

  const cartItems = useSelector(({ cartItems }) => cartItems);


  const clearCart = () => {
    dispatch(actions.clearCart())
  }

  const removeFromCart = (item) => {
    dispatch(actions.removeFromCart(item))
  }

  const cartContent = Object.values(
    typeof cartItems.items === "object" &&  cartItems.items
  );

  
  return (
    <View style={{position: 'relative', height: '100%'}}>
      <Header />
      
      {cartContent.length > 0 ? (
        <>
          <SwipeListView data={cartContent} 
          renderItem={(data) => <CartItem data={data} /> } 
          renderHiddenItem={(data) => (
              <View style={styles.hiddenContainer}>
                <TouchableOpacity 
                style={styles.hiddenButton}
                onPress={() => removeFromCart(data.item.items[0].id)}
                >
                  <Icon name="trash" color={"white"} size={30} />
                </TouchableOpacity>
              </View>
            )}
            disableRightSwipe={true}
            previewOpenDelay={3000}
            friction={1000}
            tension={40}
            leftOpenValue={75}
            stopLeftSwipe={75}
            rightOpenValue={-75}
          />
        <View style={styles.bottomContainer}>
            <View>
                <Text >$ {cartItems.totalPrice.toFixed( 2 )}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Button
                  danger
                  medium
                  onPress={clearCart}
                >
                  <Text style={{ color: 'white' }}>Clear</Text>
                </Button>
                <Button
                  primary
                  medium
                  style={{marginLeft: 10}}
                  onPress={() => props.navigation.navigate('Checkout', cartItems)}
                >
                <Text style={{ color: 'white' }}>Checkout</Text>
                </Button>
            </View>
          </View>
        </>
      ) : (
        <View style={styles.center}>
          <Text style={styles.description}>Looks like your cart is empty</Text>
          <Text style={styles.description}>Add products to your cart to get started</Text>
        </View>
      )}
      

     
    </View>

  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
},
hiddenContainer: {
  flex: 1,
  justifyContent: 'flex-end',
  flexDirection: 'row'
},
hiddenButton: {
  backgroundColor: 'red',
  justifyContent: 'center',
  alignItems: 'flex-end',
  paddingRight: 25,
  height: '90.5%',
  width: width / 1.2
}
});

export default Cart;
