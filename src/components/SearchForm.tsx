// --IMPORTS--
// Library imports
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

// props interface
type SearchFormProps = {
    onFormSubmit: (itemName: string) => void;
}


export default function SearchForm({ onFormSubmit }: SearchFormProps): React.JSX.Element {
    // state variable for entered text input
    const [searchInput, setSearchInput] = useState('');

    // function to submit user input and start query in ItemSearch
    function submitHandler() {
        // query for data using search input
        onFormSubmit(searchInput);
    }

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="enter item name"
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onChangeText={(textInput) => setSearchInput(textInput)}
                onSubmitEditing={submitHandler}
            />
            {/* button for submitting search here */}
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginVertical: 18,
    },
    input: {
        width: '50%',
        paddingHorizontal: 8,
        backgroundColor: 'white',
        borderRadius: 6,
        fontFamily: 'bender',
        fontSize: 18,
        color: 'black'
    }
});