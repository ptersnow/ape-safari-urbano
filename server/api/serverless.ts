// Read the .env file.
import * as dotenv from "dotenv";
dotenv.config();

// Require the framework
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import bootstrap from "../src/server";

// Instantiate Fastify with some config
const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(bootstrap);

export default async (request: FastifyRequest, reply: FastifyReply) => {
    await app.ready();
    app.server.emit('request', request, reply);
}