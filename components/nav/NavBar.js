import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import NavButton from './NavButton';

function NavBar ({onNavButtonPress}) {

    return (
        <View style={styles.root}>
            <NavButton 
                IconComponent={MaterialCommunityIcons}
                iconName="home"
                iconSize={50}
                iconStyle={styles.materialIcon}
                onNavButtonPress={onNavButtonPress}
            />
            <NavButton
                IconComponent={FontAwesome5}
                iconName={"map-marked-alt"}
                iconSize={40}
                iconStyle={styles.fontAwesomeIcon}
                onNavButtonPress={onNavButtonPress}
            />
            <NavButton 
                IconComponent={MaterialCommunityIcons}
                iconName="database"
                iconSize={50}
                iconStyle={styles.materialIcon}
                onNavButtonPress={onNavButtonPress}
            />
            <NavButton 
                IconComponent={MaterialCommunityIcons}
                iconName="account"
                iconSize={50}
                iconStyle={styles.materialIcon}
                onNavButtonPress={onNavButtonPress}
            />
        </View>
    )
}

export default NavBar;

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 30,
        padding: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
    },
    materialIcon: {
        padding: 12.5,
    },
    fontAwesomeIcon: {
        padding: 15,
    },
});