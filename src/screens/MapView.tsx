import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import NavigationButton from 'src/components/NavigationButton';
export default function MapView({navigation, route} : any)
: React.JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
            <View style={{flex: 1, alignItems: 'center'}}>
                <NavigationButton title="BACK TO MAP SELECT" onPress={() => navigation.popTo('MapSelect')}/>
                <View>
                    <Text style={{fontSize: 26, color: 'white'}}>{route.params.mapName}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}