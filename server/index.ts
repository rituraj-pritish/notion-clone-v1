import 'reflect-metadata';

import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { 
	ApolloServerPluginDrainHttpServer 
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import resolvers from './resolvers';

dotenv.config();

import './db';

const PORT = process.env.PORT;

async function startApolloServer() {
	try {
		const schema = await buildSchema({
			resolvers,
			emitSchemaFile: true,
			validate: false
		});
	
		const app = express();
		const httpServer = http.createServer(app);
	
		const server = new ApolloServer({
			introspection: process.env.NODE_ENV === 'development',
			schema,
			plugins: [
				ApolloServerPluginDrainHttpServer({ httpServer })
			],
		});
	
		await server.start();
		server.applyMiddleware({ app });
		await new Promise<void>(resolve => 
			httpServer.listen({ port: PORT }, resolve));
	
		console.log(
			`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
		);
	} catch (error) {
		console.error(error)
	}
}

startApolloServer();