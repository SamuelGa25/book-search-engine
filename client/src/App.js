import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

import {setContext} from '@apollo/client/link/context'
//need to import apolloprovider to in order to use the functionality
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

//link to the apollo server
  const HttpLink = createHttpLink({
    uri: 'graphql',
  });

  //athentication link
  const authLink = setContext((_, {headers}) =>{
    const token = localStorage.getItem('id_token');
    return{
      header:{
        ...headers,
        authorization: token? `Bearer ${token}`:"",
      }

    }
  });

  //client with appolloClient
  const client = new ApolloClient({
    links: authLink.concat(HttpLink),
    cache:  new InMemoryCache()
  });

function App() {

  return (

    <ApolloProvider client ={client} >
      
        <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchBooks} />
            <Route exact path='/saved' component={SavedBooks} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>

    </ApolloProvider>

  );
}

export default App;
