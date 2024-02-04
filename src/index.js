import React from "react";
import "./styles/index.css";
import App from "./components/App";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";

// 1
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { AUTH_TOKEN } from "./constants";

// 2
const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});

// API requests will be authenticated with this
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// 3
const client = new ApolloClient({
  // link: httpLink,
  // authLink added to add authenticate individual request to the server
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = createRoot(document.getElementById("root"));

// 4
root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
