import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'

import { unionWith } from 'lodash'

import { firebaseService } from '../../services'
import { UserContext } from '../../contexts'

import Message from '../Message'
import Input from '../Input'

import { chatRoomStyles as styles } from '../../styles'

export default class ClassExample extends React.Component {
  static contextType = UserContext;

  state = {
    messages: []
  }

  unsubscribe = null

  componentDidMount () {
    this.unsubscribe = firebaseService.messageRef
      .orderBy('created_at', 'desc')
      .onSnapshot((snapshot) => {
        const messages = unionWith(this.state.messages, snapshot, function (a, b) {
          return a.id === b.id
        }).sort(function (a, b) {
          const aData = a.data()
          const bData = b.data()

          return bData.created_at.seconds - aData.created_at.seconds
        })

        this.setState({ messages })
      })
  }

  componentWillUnmount (): void {
    this.unsubscribe && this.unsubscribe()
  }

  render () {
    return (
      <SafeAreaView>
        <View style={styles.messagesContainer}>
          <FlatList
            inverted
            data={this.state.messages}
            keyExtractor={function (item) {
              return item.id
            }}
            renderItem={function ({ item }) {
              const data = item.data()
              const side = data.user_id === this.context.uid ? 'right' : 'left'

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
}
