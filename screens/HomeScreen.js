import { View, Text, StyleSheet, FlatList } from 'react-native';

import Title from '../components/Title';

// filler content for prototyping. will be replaced
const content = [
    'Placeholder content goes here. I am just creating an array of strings as an example',
    'Here is another sentence that is better off unread. It is a waste of time to sit here and read through this stuff.',
    'Wait are you seriously still reading this? I thought i was clear, this is just filler content.',
    'Well if you are going to keep reading I might as well fill you in on my biggest secret. You will have to scroll through some stuff to find it though.',
    'Blah blah blee blee blah. -Aristotle',
    'You know the secret is in here somewhere but I cannot just put it in the bottom and make it easy for you.',
    'Have you noticed I avoid using \' in this text? It\'s really not hard to do but I am lazy and thus will not be doing it much',
    'The big secret is I have no idea what I am doing',
    'There\'s something special about writing a bunch of nonsense just to fill a screen. Kind of like a personal diary I guess.',
    'I am really running out of things to say so I think I will just stop here for now. Just enough content to scroll through',
];

function HomeScreen () {
    return (
        <View style={styles.rootScreen}>
            <Title style={styles.title}>Tarkov Battle Buddy</Title>
            <FlatList
                data={content}
                keyExtractor={(item) => item.index}
                renderItem={(itemData) => <View key={itemData.index} style={styles.listItem}><Text style={styles.contentText}>{itemData.item}</Text></View>}
                alwaysBounceVertical={false}
            />
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        alignItems: 'center',
    },
    listItem: {
        padding: 15,
    },
    contentText: {
        color: 'white',
        fontSize: 24,
        fontFamily: 'bender',
    },
});