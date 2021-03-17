const { makeExecutableSchema } = require('apollo-server-express')
const typeDefs = require('../typeDefs')
const resolvers = require('../resolvers')
const mongoose = require('./connection')

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = { schema, mongoose }