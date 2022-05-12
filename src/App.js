import {useState, useEffect} from "react";
import { StyleSheet, SafeAreaView, View, FlatList, Text, ActivityIndicator } from "react-native";
// import { Card, ListItem } from 'react-native-elements'

const App = () => {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(false)
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

  // const countryCard = () => {
  //   <Card>
      
  //   </Card>
  // }

  const Footer = () => (
    <View style={styles.footer}>
        {(loading && page < lastPage) && <ActivityIndicator />}
        {(!loading && page === lastPage) && <Text>No more countries</Text>}
    </View>
  )

  return(
    <SafeAreaView style={styles.container}>
      { countries.length > 0 && (
        <FlatList
          contentContainerStyle={styles.list}
          data={countries}
          renderItem={({item}) => <View style={styles.listItem}><Text >{item.name}</Text></View> }
          onEndReachedThreshold={0.6}
          onEndReached={getMoreCountries}
          ListFooterComponent={Footer}
          // ListEmptyComponent={End}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flexGrow: 1,
    height: "100vh",
  },
  listItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
});

export default App;