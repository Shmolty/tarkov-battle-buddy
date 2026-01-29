// --IMPORTS--
// Library Imports
import React, { useMemo, useRef } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { useLazyQuery } from '@apollo/client/react';

// Custom components
import Title from "src/components/Title";
import SearchForm from "src/components/SearchForm";

// GraphQL
import { SEARCH_ITEMS_BY_NAME } from "src/graphql/items";

type Item = {
    id: string;
    name: string;
    types?: string[];
};

type SearchItemsData = {
    items: Item[];
};

type SearchItemsVars = {
    name: string;
    limit: number;
    offset: number;
};

const PAGE_SIZE = 25;

// small debounce helper
function debounce<T extends (...args: any[]) => void>(fn: T, ms: number) {
    let t: ReturnType<typeof setTimeout> | undefined;
    return (...args: Parameters<T>) => {
        if (t) clearTimeout(t);
        t = setTimeout(() => fn(...args), ms);
    };
}

export default function ItemSearch(): React.JSX.Element {
    // keep track of latest query to prevent weirdnes if later add pagination
    const latestQueryRef = useRef("");

    const [runSearch, { data, loading, error, called, fetchMore }] = useLazyQuery<
        SearchItemsData,
        SearchItemsVars
    >(SEARCH_ITEMS_BY_NAME, {
        fetchPolicy: "cache-and-network",
        notifyOnNetworkStatusChange: true,
    });

    // immediate search (on form submit)
    async function queryItemsHandler(itemName: string) {
        const trimmed = itemName.trim();
        if (trimmed.length < 2) return; // optional min length
        latestQueryRef.current = trimmed;

        runSearch({
            variables: { name: trimmed, limit: PAGE_SIZE, offset: 0 },
        });
    }

    // debounced typing search
    const queryItemsTypingHandler = useMemo(
        () =>
            debounce((text: string) => {
                const trimmed = text.trim();
                if (trimmed.length < 2) return; // min length
                latestQueryRef.current = trimmed;

                runSearch({
                    variables: { name: trimmed, limit: PAGE_SIZE, offset: 0 },
                });
            }, 300),
        [runSearch]
    );

    const items = data?.items ?? [];

    async function loadMore() {
        const q = latestQueryRef.current;
        if (!q || q.length < 2) return;
        if (!fetchMore) return;
        if (loading) return;

        // if backend returns fewer than PAGE_SIZE, stop extra calls
        if (items.length < PAGE_SIZE) return;

        await fetchMore({
            variables: { name: q, limit: PAGE_SIZE, offset: items.length },
            updateQuery: (prev, {fetchMoreResult }) => {
                if (!fetchMoreResult?.items?.length) return prev;
                return { items: [...prev.items, ...fetchMoreResult.items] };
            },
        });
    }

    return (
        <View style={styles.screen}>
            <Title>Item Search</Title>
            <SearchForm 
                onFormSubmit={queryItemsHandler}
                onTextChange={queryItemsTypingHandler} 
            />
            {!called && <Text style={styles.hint}>Type at least 2 characters to search.</Text>}

            {loading && items.length === 0 ? (
                <Text style={styles.status}>Loading ...</Text>
            ) : error ? (
                <Text style={styles.error}>Error: {error.message}</Text>
            ) : (
                <View style={styles.listContainer}>
                    {/* replace this with custom component */}
                    <FlatList
                        data={items}
                        keyExtractor={(item) => item.id}
                        onEndReached={loadMore}
                        onEndReachedThreshold={0.4}
                        renderItem={({ item }) => (
                            <View style={styles.row}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                {!!item.types && item.types.map((type) => {
                                    return <Text key={type} style={styles.itemType}>{type}</Text>
                                })}
                            </View>
                        )}
                        ListEmptyComponent={
                            called ? <Text style={styles.status}>No results.</Text> : null
                        }
                    />
                </View>
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center'
    },
    listContainer: {
        justifyContent: 'center'
    },
    hint: {
        opacity: 0.7,
        marginTop: 8,
        color: 'white'
    },
    status: {
        marginTop: 12,
        color: 'white'
    },
    error: {
        marginTop: 12,
        color: "red",
    },
    row: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    itemName: {
        fontSize: 14,
        fontFamily: 'bender-bold',
        color: 'white'
    },
    itemType: {
        opacity: 0.7,
        fontSize: 12,
        fontFamily: 'bender',
        color: 'white'
    },
});