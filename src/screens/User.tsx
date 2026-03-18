// ---USER SCREEN--
// This screen will be for a user to view their own 'profile' and user info
// !!!TODO: ---> Add authentication to the application, then generate user data on this screen. Also add a logout feature here.

// Library Imports
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function User(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
      <View>
        <Text style={{ fontSize: 18 }}>DUMMY USER / ACCOUNT PAGE</Text>
      </View>
    </SafeAreaView>
  );
}

export default User;

const styles = StyleSheet.create({
  // styles go here lol
});
