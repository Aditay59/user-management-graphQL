const express = require('express'); // requiring the express module
const app = express(); //creating the express server
const dotenv = require('dotenv'); //to setup the environment variable
dotenv.config(); // configuring the enviroment variable
const PORT = process.env.PORT || 4300; // port for the express apollo server
const { ApolloServer } = require('@apollo/server'); // requiring the Apollo server module
const { expressMiddleware } = require("@apollo/server/express4"); // requiring the express middleware from the apollo server
const bodyParser = require('body-parser'); // requiring the body-parser module
const cors = require('cors');
const typeDefs = require('./graphql/schema/graphqlSchema');
const resolvers = require('./graphql/resolvers/resolvers');
const connect = require('./mongodb/con');

const corsOptions = {
    origin: "http://localhost:5173", // frontend app uri
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // methods you want to allow
    credential: true // If you need to allow the credentials (cookies, auth, headers)
};
// calling/using the json parser from body parser and setting the cors
app.use(bodyParser.json(), cors(corsOptions));

// creating the instance of the apollo server with the schema and resolvers
const server = new ApolloServer({ typeDefs, resolvers });

// creating a async function to start the apollo server with express
const apolloServer = async () => {
    try {
        await server.start();
        app.use("/graphql", expressMiddleware(server));
        connect().then(() => {
            app.listen(PORT, (err) => {
                if(err) throw new Error(`Error starting the express server: ${err}`);
                console.log(`🚀 Server is ready at http://localhost:${PORT}/graphql`);
            });
        }).catch(err => {
            throw new Error(err);
        });
    } catch(err) {
        console.error(`Ohh shit!! 🫨 you got an error while starting the apollo server: ${err}`);   
    }
};

apolloServer().catch(err => {
    console.error(`Opps👉🏻👈🏻 you got an error in starting the apollo server with express: ${err}`);
});