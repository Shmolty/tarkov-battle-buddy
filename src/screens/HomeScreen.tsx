// ---HOME SCREEN--
// This serves as the first screen on user authentication. It is the root screen of the overall app navigation.
// !!!TODO: --> The intention is to have some form of news feed here or perhaps navigational assistance for the app. As well as a brief intro.


// Library Imports
import React from 'react';
import { View, Text, StyleSheet, FlatList, ListRenderItemInfo, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Custom components
import Title from '../components/Title';
import { AppTheme } from 'src/theme/theme';
import Tile from 'src/components/Tile';

function HomeScreen({ navigation }: any): React.JSX.Element {

  // function to navigate based on selected tile
  function navigateToScreen(screenName: string) {
    switch (screenName) {
      case 'itemSearch':
        navigation.navigate('ItemSearchStack');
        break;
      case 'maps':
        navigation.navigate('MapSelect');
        break;
      case 'ammo':
        navigation.navigate('AmmoCharts');
        break;
    }
  }

  return (
    <SafeAreaView style={{flex: 1}} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.rootScreen}>
        <Title>Tarkov Battle Buddy</Title>

        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>The ultimate companion app for</Text>
        <Text style={[styles.subtitle,{fontFamily: 'bender-bold'}]}>Escape From Tarkov</Text>
        </View>

        <Text style={styles.subtitle}>This app is designed as a convenient all in one tool for finding the information you need in raid!</Text>
        
        <View style={styles.gridContainer}>

          <Text style={styles.subtitle}>What you can do:</Text>

          <View style={{ justifyContent: 'center',flexDirection: 'row' }}>

            <Tile title="SEARCH ITEMS" imageSource={require('../assets/images/itemSearchPreview.png')} onPress={() => navigateToScreen('itemSearch')} />

            <Tile title="VIEW MAPS" imageSource={require('../assets/images/mapScreenPreview.png')} onPress={() => navigateToScreen('maps')} />

          </View>

          <View style={{ justifyContent: 'center',flexDirection: 'row' }}>

            <Tile title="CHECK AMMO" imageSource={require('../assets/images/ammoChartPreview.png')} onPress={() => navigateToScreen('ammo')} />

          </View>
          
        </View>

        <View>
          <Text style={styles.subtitle}>Click any option or use the bottom tabs below to get started!</Text>
        </View>

        {/* <FlatList
          data={content}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }: ListRenderItemInfo<string>) => (
            <View style={styles.listItem}>
              <Text style={styles.contentText}>{item}</Text>
            </View>
          )}
          alwaysBounceVertical={false}
        /> */}
      </View>
    </SafeAreaView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    alignItems: 'center',
  },
  subtitleContainer: {
    paddingVertical: 10,
    marginHorizontal: 40
  },
  subtitle: {
    fontFamily: 'bender',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  gridContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  gridItem: {
    width: 150,
    padding: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  pressed: {
    opacity: 0.75
  },

  listItem: {
    padding: 15,
  },
  contentText: {
    color: AppTheme.colors.text,
    fontSize: 24,
    fontFamily: 'bender',
  },
});