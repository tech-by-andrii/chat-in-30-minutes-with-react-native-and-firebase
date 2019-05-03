import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

import styles from './styles'

export default function Button ({ text, disabled, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} disabled={disabled}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}
