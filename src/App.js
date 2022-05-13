import {useState, useEffect} from "react";
import { StyleSheet, View, FlatList, Text, ActivityIndicator } from "react-native";
import CountryListItem from "./CountryListItem";
import CountryDetail from "./CountryDetail";

const App = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeCountry, setActiveCountry] = useState(null)
  const [page, setPage] = useState(1)
  const lastPage = 15

  useEffect(() => {
    getCountries()
  },[page])

  const getCountries = async () => {
    setLoading(true)

    const res = await fetch(`https://country-service-simple.herokuapp.com/countries?page=${page}&limit=20`, {
      method: 'GET',
    })

    const data = await res.json()
      
    setCountries([...countries, ...data])
    setLoading(false)
  }

  const getMoreCountries = () => {
    if(loading===false && page<lastPage){
      setPage(page+1)
    }
  }

  const Footer = () => (
    <View style={styles.footer}>
        {(loading && page < lastPage) && <ActivityIndicator />}
        {(!loading && page === lastPage) && <Text>No more countries</Text>}
    </View>
  )

  return(
    <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.list}
          data={countries}
          renderItem={({item}) => <CountryListItem country={item} openModal={(country) => setActiveCountry(country)}/> }

          onEndReachedThreshold={0.1}
          onEndReached={getMoreCountries}
          ListFooterComponent={Footer}
        />

        <CountryDetail country={activeCountry} handleClose={() => setActiveCountry(null)} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    height: "100vh",
    maxWidth: 500,
    paddingTop: 20,
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  footer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  listText: {
    fontSize: 16,
  }
});

export default App;