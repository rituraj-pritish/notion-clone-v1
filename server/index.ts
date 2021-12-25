import 'reflect-metadata';

import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { 
	ApolloServerPluginDrainHttpServer 
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import { buildSchema } from 'type-graphql';
import jwt from 'jsonwebtoken';

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

		app.use(cookieParser());

		const whiteList = [process.env.CLIENT_BASE_URL!];

		if(process.env.NODE_ENV === 'development') {
			whiteList.push('https://studio.apollographql.com');
		}

		app.use(cors({
			origin: whiteList,
			credentials: true
		}));
		const httpServer = http.createServer(app);
	
		const server = new ApolloServer({
			introspection: process.env.NODE_ENV === 'development',
			schema,
			plugins: [
				ApolloServerPluginDrainHttpServer({ httpServer })
			],
			context: async ({ req, res }) => {
				const token = req.headers.authorization || req.cookies.auth_token;

				res.header('Access-Control-Allow-Origin', process.env.CLIENT_BASE_URL);

				if(!token) return { res };

				try {
					const {	user, workspace } = await jwt.verify(token, process.env.JWT_SECRET);

					return {
						user,
						workspace,
						res
					};

				} catch (error) {
					//todo handle error
					return {
						res
					};
				}
			}
		});
	
		await server.start();
		server.applyMiddleware({ app });
		await new Promise<void>(resolve => 
			httpServer.listen({ port: PORT }, resolve));
	
		console.log(
			`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
		);
	} catch (error) {
		console.error(error);
	}
}

startApolloServer();