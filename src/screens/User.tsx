// ---USER SCREEN--
// This screen will be for a user to view their own 'profile' and user info
// !!!TODO: ---> Add authentication to the application, then generate user data on this screen. Also add a logout feature here.

// Library Imports
import React, { useContext } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// context
import { AuthContext } from 'src/context/AuthContext';

function User(): React.JSX.Element {
  const authCtx = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.screen}>
        <Button title="LOG OUT" onPress={() => authCtx.logout()} />
      </View>
    </SafeAreaView>
  );
}

export default User;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
});
