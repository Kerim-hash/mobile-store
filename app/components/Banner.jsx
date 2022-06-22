import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");
const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://photos5.appleinsider.com/gallery/product_pages/326-hero.jpg",
      "https://img.global.news.samsung.com/global/wp-content/uploads/2022/02/Galaxy-S22-S22-pr_main1.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqj9v51SD-jh-g1rfQ7_B3vrpMexSH1_SZug&usqp=CAU",
    ]);
    return () => {
      setBannerData([]);
    };
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={2}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="cover"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    // width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
