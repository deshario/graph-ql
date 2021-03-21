import { makeExecutableSchema } from 'apollo-server-express'
import typeDefs from '../schemas'
import resolvers from '../resolvers'

const db = require('./connection')

export const schema = makeExecutableSchema({ typeDefs, resolvers })
export const mongoose = db