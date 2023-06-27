import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ route }) {
  const latitude = route.params?.latitude ?? 46.4775;
  const longitude = route.params?.longitude ?? 30.7326;

  return (
    <View style={styles.main}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.082,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        minZoomLevel={15}
        onMapReady={() => console.log("Map is ready")}
        onRegionChange={() => console.log("Region change")}
      >
        {/* {route.params && ( */}
        <Marker
          title={route.params?.name ?? "Моя локація"}
          coordinate={{ latitude: latitude, longitude: longitude }}
          description="hello"
        />
        {/* )} */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    zIndex: 10,
  },

  mapStyle: {
    width: "100%",
    height: "100%",
  },
});
