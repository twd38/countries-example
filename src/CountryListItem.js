import { StyleSheet, View } from "react-native";
import { ListItem, ListItemAvatar, ListItemText, Avatar, IconButton } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';

const CountryListItem = ({country, openModal}) => {
    return(
      <View style={styles.listItem}>
          <ListItem
              secondaryAction={
                <IconButton edge="end">
                  <InfoIcon />
                </IconButton>
              }
              onClick={() => openModal(country)}
          >
              <ListItemAvatar>
                <Avatar variant="square" sx={{bgcolor: "white"}}>
                  <img src={country.flag} width="40px"/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={country.name}
                secondary={country.name}
              />
            </ListItem>
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
        paddingTop: 50
    },
    listItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8
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

  export default CountryListItem