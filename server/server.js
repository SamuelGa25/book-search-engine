const express = require('express');
const path = require('path');

const {ApolloServer} = require ('apollo-server-express');
const {authMiddleware} = require('./utils/auth');
const {typeDefs} = require('./schemas/typeDefs');
const {resolvers} = require('./schemas/resolvers');


const db = require('./config/connection');
const { type } = require('os');
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//const routes = require('./routes');
//app.use(routes);


// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

const startApolloServer = async () => {
    await server.start(); 
    server.applyMiddleware({app})

    db.once('open', () => {
    app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
  });

}
startApolloServer(typeDefs, resolvers);

