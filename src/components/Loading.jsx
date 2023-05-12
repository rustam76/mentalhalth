import { View, Text,ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large"  color="#47B5AC" />
    <Text className="mt-2 text-lg font-medium">Tunggu...</Text>
    </View>
  )
}

export default Loading