import React, { useEffect } from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import ProductCard from './ProductCard';

var {width} = Dimensions.get('window')

const ProductList = ({item, navigation}) => {
    return (
        <TouchableOpacity style={{width: '50%'}} onPress={() => navigation.navigate('Product Detail', {item: item})}>
            <View style={{width: width / 2,   backgroundColor: 'gainsboro'}}>
                <ProductCard {...item} />
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({})

export default ProductList;
