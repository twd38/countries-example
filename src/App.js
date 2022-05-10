import {useState, useEffect} from "react";
import { StyleSheet, View, FlatList, Text} from "react-native";

const App = () => {
  const [countries, setCountries] = useState([])

  useEffect(() => {
    getCountries().then(data => {
      setCountries(data)
    })
  },[])

  const getCountries = async () => {
    const url = "https://restcountries.com/v3.1/all"
    const res = await fetch(url, {
      method: 'GET',
    })
    return res.json()
  }
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={countries}
        renderItem={({item}) => <View styles={styles.listItem}><Text>{item.name.common}</Text></View> }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
    height: "100%",
    padding: "10px",
  },
  listItem: {
    width: "100%",
    height: "40px",
    padding: "8px",
    alignSelf: "center"
  },
});

export default App;