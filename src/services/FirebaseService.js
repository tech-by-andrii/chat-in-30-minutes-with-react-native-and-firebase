import firebase from 'react-native-firebase'
import { COLLECTIONS } from '../constants'

export default class FirebaseService {
  auth = firebase.auth()

  firestore = firebase.firestore()

  messageRef = this.firestore.collection(COLLECTIONS.MESSAGES);

  async signIn () {
    try {
      const response = await this.auth.signInAnonymously()
      return { user: response.user }
    } catch (error) {
      return { error }
    }
  }

  async fetchMessages () {
    const messages = await this.messageRef
      .orderBy('created_at', 'desc')
      .limit(10)
      .get()

    return messages.docs
  }

  async createMessage ({ message, uid }) {
    await this.messageRef.add({
      message,
      user_id: uid,
      created_at: new Date()
    })
  }
}
