import React, { useEffect, useReducer, useContext } from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

import { firebaseService } from '../../services'
import { UserContext } from '../../contexts'

import Input from '../Input'
import Message from '../Message'

import { messagesReducer } from './reducers'
import { chatRoomStyles as styles } from '../../styles'

export default function HooksExample () {
  const { uid } = useContext(UserContext)
  const [messages, dispatchMessages] = useReducer(messagesReducer, [])

  useEffect(
    function () {
      return firebaseService.messageRef
        .orderBy('created_at', 'desc')
        .onSnapshot(function (snapshot) {
          dispatchMessages({ type: 'add', payload: snapshot.docs })
        })
    },
    [false]
  )

  return (
    <SafeAreaView>
      <View style={styles.messagesContainer}>
        <FlatList
          inverted
          data={messages}
          keyExtractor={function (item) {
            return item.id
          }}
          renderItem={function ({ item }) {
            const data = item.data()
            const side = data.user_id === uid ? 'right' : 'left'

            return (
              <Message side={side} message={data.message} />
            )
          }}
        />
      </View>

      <View style={styles.inputContainer}>
        <Input />
      </View>
    </SafeAreaView>
  )
}
