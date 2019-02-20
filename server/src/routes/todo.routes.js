'use strict'

import { Router } from 'express';
import bodyParser from 'body-parser';

import basicAuth from '../lib/basic-auth-middleware.js';
import Todo from '../model/todo.js';

const todoRouter = module.exports = new Router();

todoRouter.get('/', (req, res) => {
    res.render('landing.ejs');
})