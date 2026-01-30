// --IMPORTS--
// Library imports
import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

// props interface
type SearchFormProps = {
    onFormSubmit: (itemName: string) => void;
    onTextChange: (itemName: string) => void;
}


export default function SearchForm({ 
    onFormSubmit, 
    onTextChange 
}: SearchFormProps): React.JSX.Element {
    // state variable for entered text input
    const [searchInput, setSearchInput] = useState('');

    // function to submit user input and start query in ItemSearch
    function submitHandler() {
        const trimmed = searchInput.trim();
        onFormSubmit(trimmed);
    }

    return (
        <View style={styles.form}>
            <TextInput
                placeholder="enter item name"
                placeholderTextColor='white'
                maxLength={15}
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                onChangeText={(textInput) => {
                    setSearchInput(textInput);
                    onTextChange(textInput);
                }}
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
        width: 165,
        paddingHorizontal: 12,
        borderRadius: 6,
        fontFamily: 'bender',
        fontSize: 18,
        color: 'white',
        backgroundColor: 'black'
    }
});