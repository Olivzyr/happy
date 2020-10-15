import express from 'express';
import path from 'path';
import cors from 'cors';

import 'express-async-errors';

import './database/connection';

import routes from './routes';
import errorHandler from './errors/handler';


const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
// Caminho aonde está localizadas as imagens salvas prontas para abrir
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
// Utilizando o error handler para abstrair informações do usuário em relação a errors
app.use(errorHandler);


app.listen(3333);