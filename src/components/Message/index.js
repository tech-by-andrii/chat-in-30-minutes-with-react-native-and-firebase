import React from 'react'
import { View, Text } from 'react-native'

import { styles, flattenedStyles } from './styles'

export default function Message ({ message, side }) {
  const isLeftSide = side === 'left'

  const containerStyles = isLeftSide ? styles.container : flattenedStyles.container
  const textContainerStyles = isLeftSide ? styles.textContainer : flattenedStyles.textContainer
  const textStyles = isLeftSide ? flattenedStyles.leftText : flattenedStyles.rightText

  return (
    <View style={containerStyles}>
      <View style={textContainerStyles}>
        <Text style={textStyles}>
          {message}
        </Text>
      </View>
    </View>
  )
}
