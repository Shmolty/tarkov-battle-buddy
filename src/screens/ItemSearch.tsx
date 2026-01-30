// --IMPORTS--
// Library Imports
import React, { useMemo, useRef } from "react";
import { View, StyleSheet, Text, FlatList, Platform } from "react-native";
import { useLazyQuery } from '@apollo/client/react';

// Custom components
import Title from "src/components/Title";
import SearchForm from "src/components/SearchForm";

// GraphQL
import { SEARCH_ITEMS_BY_NAME } from "src/graphql/items";

// types
import type { SearchItemsData, SearchItemsVars } from "src/types/item";
import ItemCard from "src/components/ItemCard";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

const PAGE_SIZE = 8;

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

    const insets = useSafeAreaInsets();

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
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
                            alwaysBounceVertical={false}
                            renderItem={({ item }) =>
                                <ItemCard
                                    name={item.name}
                                    imageUri={item.inspectImageLink}
                                    types={item.types}
                                    price={item.avg24hPrice}
                                />
                            }
                            ListEmptyComponent={
                                called ? <Text style={styles.status}>No results.</Text> : null
                            }
                            contentContainerStyle={{
                                paddingBottom: 56 + insets.bottom,
                            }}
                            contentInsetAdjustmentBehavior={Platform.OS === 'ios' ? 'never' : undefined}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        alignItems: 'center',
        flex: 1,
    },
    listContainer: {
        flex: 1,
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