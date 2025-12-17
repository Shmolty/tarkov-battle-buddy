import { View, Text, StyleSheet } from 'react-native';

function Title() {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>TARKOV BATTLE BUDDY</Text>
        </View>
    )
}

export default Title;

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 60,
        padding: 15,
        borderWidth: 3,
        borderColor: 'white',
    },
    titleText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
})