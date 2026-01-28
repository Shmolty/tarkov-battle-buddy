// --IMPORTS--
// Library Imports
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";

// Custom components
import Title from "src/components/Title";
import SearchForm from "src/components/SearchForm";

export default function ItemSearch(): React.JSX.Element {
    // state boolean to switch between loading and displaying data
    const [isLoading, setIsLoading] = useState(false);

    // handler function for starting query after form submission
    async function queryItemsHandler(itemName: string) {
        setIsLoading(true);
        // call function to query for items (inside api file)
        // send data to flatlist for display
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Title>Item Search</Title>
            <SearchForm onFormSubmit={queryItemsHandler} />
            <View style={styles.listContainer}>
                {/* list of items goes here */}
                {isLoading ? <Text>Loading ...</Text> 
                : <Text>THIS WILL BE FLATLIST COMPONENT</Text>}
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },
    listContainer: {
        justifyContent: 'center'
    }
})