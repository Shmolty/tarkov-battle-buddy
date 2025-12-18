import { View, Pressable, StyleSheet } from 'react-native';

function NavButton({ 
    IconComponent, 
    iconName, 
    iconSize, 
    iconStyle,
    onNavButtonPress
}) {

    function buttonPress() {
        onNavButtonPress(iconName);
        console.log(iconName);
    }

    return (
        <View style={styles.navButton}>
            <Pressable onPress={buttonPress}>
                <IconComponent
                    name={iconName}
                    size={iconSize}
                    color="white"
                    style={iconStyle}
                />
            </Pressable>
        </View>
    )
}

export default NavButton;

const styles = StyleSheet.create({
    navButton: {
        width: 75,
        height: 75,
        backgroundColor: '#121212ff',
        margin: 5,
        borderRadius: 10,
    },
});