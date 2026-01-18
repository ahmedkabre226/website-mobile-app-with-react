import { Image } from "expo-image";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

// Mock manufacturer data
const manufacturers = [
  {
    id: "1",
    name: "Apple",
    logo: require("@/assets/images/logoApple.jpg"),
  },
  {
    id: "2",
    name: "Samsung",
    logo: require("@/assets/images/logoSamsung.jpg"),
  },
  {
    id: "3",
    name: "HP",
    logo: require("@/assets/images/logoHp.png"),
  },
  {
    id: "4",
    name: "Dell",
    logo: require("@/assets/images/logoDell.png"),
  },
  {
    id: "5",
    name: "Lenovo",
    logo: require("@/assets/images/logoLenovo.png"),
  },
  {
    id: "6",
    name: "Asus",
    logo: require("@/assets/images/logoAsus.png"),
  },
  {
    id: "7",
    name: "Acer",
    logo: require("@/assets/images/logoAcer.png"),
  },
  {
    id: "8",
    name: "Microsoft",
    logo: require("@/assets/images/logo Microsoft.png"),
  },
  {
    id: "9",
    name: "Sony",
    logo: require("@/assets/images/logoSony.png"),
  },
  {
    id: "10",
    name: "Huawei",
    logo: require("@/assets/images/logo Huawei.jpg"),
  },
  {
    id: "11",
    name: "Xiaomi",
    logo: require("@/assets/images/logoXioami.png"),
  },
  {
    id: "12",
    name: "Honor",
    logo: require("@/assets/images/logoHonor.png"),
  },
];

// Mock product data for electronic devices and smartphones
const products = [
  {
    id: "1",
    name: "iPhone 15",
    price: "$s",
    image: require("@/assets/images/iphone15.jpg"), // Placeholder image
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: "$",
    image: require("@/assets/images/SamsungGalaxyS24.jpg"), // Placeholder image
  },
  {
    id: "3",
    name: "MacBook Air M3",
    price: "$",
    image: require("@/assets/images/MacBookAirM3.jpg"), // Placeholder image
  },
  {
    id: "4",
    name: "Google Pixel 8",
    price: "$",
    image: require("@/assets/images/GooglePixel8.jpg"), // Placeholder image
  },
  {
    id: "5",
    name: "Dell XPS 13",
    price: "$",
    image: require("@/assets/images/DellXPS13.jpg"), // Placeholder image
  },
  {
    id: "6",
    name: "OnePlus 12",
    price: "$",
    image: require("@/assets/images/OnePlus12.jpg"), // Placeholder image
  },
];

export default function HomeScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const [scrollX, setScrollX] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollViewRef.current && contentWidth > 0) {
        const screenWidth = Dimensions.get("window").width;
        const step = 2; // Adjust speed here
        let newScrollX = scrollX + step;
        if (newScrollX >= contentWidth - screenWidth) {
          newScrollX = 0; // Reset to start
        }
        scrollViewRef.current.scrollTo({ x: newScrollX, animated: true });
        setScrollX(newScrollX);
      }
    }, 50); // Adjust interval for smoothness

    return () => clearInterval(interval);
  }, [scrollX, contentWidth]);

  const renderProduct = ({ item }: { item: (typeof products)[0] }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => alert(`Buy ${item.name}`)}
    >
      <Image
        source={item.image}
        style={styles.productImage}
        contentFit="contain"
      />
      <ThemedText type="subtitle" style={styles.productName}>
        {item.name}
      </ThemedText>
      <ThemedText type="defaultSemiBold" style={styles.productPrice}>
        {item.price}
      </ThemedText>
      <TouchableOpacity
        style={styles.buyButton}
        onPress={() => alert(`Added ${item.name} to cart`)}
      >
        <ThemedText style={styles.buyButtonText}>Buy Now</ThemedText>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/techmarket.png")}
          style={styles.reactLogo}
          contentFit="cover"
        />
      }
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.manufacturerScroll}
        contentContainerStyle={styles.manufacturerContainer}
        onContentSizeChange={(width) => setContentWidth(width)}
      >
        {manufacturers.map((manufacturer) => (
          <TouchableOpacity
            key={manufacturer.id}
            style={styles.manufacturerItem}
          >
            <Image
              source={manufacturer.logo}
              style={styles.manufacturerLogo}
              contentFit="contain"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Tech Market</ThemedText>
        <ThemedText type="subtitle">
          Votre référence technologique à Kinshasa !
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.productsContainer}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Featured Products
        </ThemedText>
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  manufacturerScroll: {
    height: 80,
    marginVertical: 10,
  },
  manufacturerContainer: {
    paddingHorizontal: 16,
    alignItems: "center",
  },
  manufacturerItem: {
    marginHorizontal: 10,
    alignItems: "center",
  },
  manufacturerLogo: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    alignItems: "center",
    gap: 8,
    paddingVertical: 20,
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  productList: {
    paddingBottom: 20,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  productName: {
    textAlign: "center",
    marginBottom: 4,
  },
  productPrice: {
    textAlign: "center",
    marginBottom: 8,
    color: "#007bff",
  },
  buyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  reactLogo: {
    height: "100%",
    width: "100%",
    top: 0,
    left: 0,
    position: "absolute",
  },
});
