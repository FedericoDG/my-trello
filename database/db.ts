import mongoose from 'mongoose'

/**
 * 0: disconnected
 * 1: connected
 * 2: connecting
 * 3: disconnecting
 */

const mongoConnection = {
  isConnected: 0,
}

const connect = async () => {
  if (mongoConnection.isConnected === 1) return console.log('MongoDB ya estaba conectado')

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState

    if (mongoConnection.isConnected === 1) return console.log('MongoDB usando conexión existente')

    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGODB_URI as string)

  mongoConnection.isConnected = 1

  console.log('MongoDB conectado')
}

export const disconnect = async () => {
  if (process.env.NODE_ENV === 'development') return

  if (mongoConnection.isConnected === 0) return

  await mongoose.disconnect()

  mongoConnection.isConnected = 0

  console.log('MongoDB desconectado')
}

export default connect
