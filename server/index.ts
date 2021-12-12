import { ApolloServer } from 'apollo-server-express';
import { 
	ApolloServerPluginLandingPageGraphQLPlayground, 
	ApolloServerPluginDrainHttpServer 
} from 'apollo-server-core';
import express from 'express';
import http from 'http';

import schema from './graphql/schema';

const PORT = 6000;

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageGraphQLPlayground()
		],
	});
	await server.start();
	server.applyMiddleware({ app });
	await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve));
	console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
}

startApolloServer();