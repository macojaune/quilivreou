import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";

const link = createHttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
})

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem('token')
    return {headers: {...headers, authorization: token ? `Bearer ${token}` : ""}}
})

const apolloClient = new ApolloClient({
    link:authLink.concat(link),
    cache: new InMemoryCache()
})

export default apolloClient
