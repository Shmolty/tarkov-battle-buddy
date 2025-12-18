import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

function NavBar () {
    return (
        <View style={styles.root}>
            <View style={styles.navButton}>
                <MaterialCommunityIcons name="home" size={50} color="white" style={styles.materialIcon} />
            </View>
            <View style={styles.navButton}>
                <FontAwesome5 name="map-marked-alt" size={40} color="white" style={styles.fontAwesomeIcon} />
            </View>
            <View style={styles.navButton}>
                <MaterialCommunityIcons name="database" size={50} color="white" style={styles.materialIcon} />
            </View>
            <View style={styles.navButton}>
                <MaterialCommunityIcons name="account" size={50} color="white" style={styles.materialIcon} />
            </View>
        </View>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 50,
        padding: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    navButton: {
        width: 75,
        height: 75,
        backgroundColor: '#424242ff',
        margin: 5,
    },
    materialIcon: {
        padding: 12.5,
    },
    fontAwesomeIcon: {
        padding: 15,
    },
})