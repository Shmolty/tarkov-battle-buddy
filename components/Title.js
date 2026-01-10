import { View, Text, StyleSheet } from 'react-native';

function Title({children}) {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{children}</Text>
        </View>
    )
}

export default Title;

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 50,
        padding: 15,
        borderWidth: 3,
        borderColor: 'white',
        width: '85%',
    },
    titleText: {
        fontSize: 28,
        fontFamily: 'bender-bold',
        color: 'white',
        textAlign: 'center',
    },
})