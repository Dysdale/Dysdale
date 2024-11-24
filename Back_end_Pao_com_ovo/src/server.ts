import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const port = 3000;

const uri = "mongodb+srv://CaTest:RHmVoab4yyjtYUdI@pao-com-ovo.kiubl.mongodb.net/?retryWrites=true&w=majority&appName=pao-com-ovo";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connectToDatabase() {
  try {
    await client.connect();
    // console.log("Connected to MongoDB!");
    return client.db("pao_com_ovo");
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(routes);

// Swagger Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start Server
app.listen(port, () => {
  console.log(`Servidor Express rodando em http://localhost:${port}`);
  console.log(`Documentação Swagger disponível em http://localhost:${port}/api-docs`);
});
