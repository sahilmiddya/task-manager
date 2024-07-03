import {View, Text} from 'react-native';
import React from 'react';

const ListEmptyComponent = () => {
  return (
    <View style={{marginTop: 15}}>
      <Text style={{textAlign: 'center', fontSize: 20}}>No Task found.</Text>
    </View>
  );
};

export default ListEmptyComponent;
