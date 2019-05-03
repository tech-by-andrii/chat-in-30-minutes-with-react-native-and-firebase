import { StyleSheet } from 'react-native'

import COLORS from './colors'

export default StyleSheet.create({
  messagesContainer: {
    height: '100%',
    paddingBottom: 100
  },
  inputContainer: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingLeft: 20,

    borderTopWidth: 1,
    borderTopColor: COLORS.GREY
  }
})
