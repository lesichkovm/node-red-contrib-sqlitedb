const axios = require('axios')

module.exports = function (RED) {
  function SqliteDbNode(config) {
    RED.nodes.createNode(this, config)
    var node = this
    var apiurl = config.apiurl
    var apikey = config.apikey
    var sqlquery = config.sqlquery // Type of query
    var sql = config.sql

    node.on('input', function (msg) {
      // Sets the SQL if it comes via msg.topic
      if (sqlquery == 'msg.topic') {
        if (typeof msg.topic !== 'string') {
          node.error('msg.topic : the query is not defined as string', msg)
          node.status({ fill: 'red', shape: 'dot', text: 'msg.topic error' })
          msg.payload = {
            status: 'error',
            message: 'msg.topic IS NOT a string',
          }
          node.send(msg)
          return false
        }

        if (msg.topic.length < 1) {
          node.error('msg.topic : the query is empty', msg)
          node.status({ fill: 'red', shape: 'dot', text: 'msg.topic error' })
          msg.payload = {
            status: 'error',
            message: 'msg.topic CAN NOT be empty string',
          }
          node.send(msg)
          return false
        }

        sql = msg.topic
      }

      // Post the SQL to the SqliteDB API
      axios({
        method: 'post',
        responseType: 'json',
        url: apiurl,
        data: {
          api_key: apikey,
          sql: sql,
        },
      })
        .then(function (response) {
          node.status({ fill: 'green', shape: 'dot', text: 'query ok' })
          msg.payload = response.data
          node.send(msg)
        })
        .catch(function (error) {
          node.error('http : connection error', msg)
          node.status({
            fill: 'red',
            shape: 'dot',
            text: 'HTTP connection error',
          })
          msg.payload = error
          node.send(msg)
        })
    })
  }

  // Registering the node-red type
  RED.nodes.registerType('sqlitedb api', SqliteDbNode)
}
