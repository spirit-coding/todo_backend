import * as express from 'express';
import * as mongoose from 'mongoose';
import { isNullOrUndefined } from 'util';
import Todo, { IMongooseTodo } from '../models/todo.model';

export class ToDoRouter {
    public router: express.Router;

    constructor() {
        this.router = express.Router();
        this.init();
    }

    init() {
        this.router.get('/:id', (request: express.Request, response: express.Response, next: express.NextFunction) => this.getToDo(request, response, next));
        this.router.put('/:id', (request: express.Request, response: express.Response, next: express.NextFunction) => this.updateToDo(request, response, next));
        this.router.get('/', (request: express.Request, response: express.Response, next: express.NextFunction) => this.getToDos(request, response, next));
        this.router.post('/', (request: express.Request, response: express.Response, next: express.NextFunction) => this.createToDo(request, response, next));
        this.router.delete('/:id', (request: express.Request, response: express.Response, next: express.NextFunction) => this.deleteToDo(request, response, next));
    }

    public createToDo(req: express.Request, res: express.Response, next: express.NextFunction) {
        let toDo = req.body;
        toDo.createdDate = new Date();

        Todo.create(req.body, (err, createdTodo: IMongooseTodo) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.json(createdTodo);
            }
        });
    }

    public deleteToDo(req: express.Request, res: express.Response, next: express.NextFunction) {
        let id = req.params.id;
        Todo.findOneAndRemove({ '_id': id }, (err, removedTodo: IMongooseTodo) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.json(removedTodo);
            }
        });
    }

    public updateToDo(req: express.Request, res: express.Response, next: express.NextFunction) {     
        let id = req.params.id;
        let updateToDo = req.body;
        
        Todo.findById(id, (err, todo: IMongooseTodo) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                if(!todo.completed && updateToDo.completed)
                {
                    updateToDo.completedDate = new Date();
                }

                Todo.findByIdAndUpdate(id, req.body, { new: true }, (err, updatedTodo: IMongooseTodo) => {
                    if (err) {
                        res.status(500);
                        res.json(err);
                    }
                    else {
                        res.json(updatedTodo);
                    }
                });
            }
        });
        
       
    }

    public getToDo(req: express.Request, res: express.Response, next: express.NextFunction) {
        let id = req.params.id;
        Todo.findById(id, (err, todo: IMongooseTodo) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.json(todo);
            }
        });
    }

    public getToDos(req: express.Request, res: express.Response, next: express.NextFunction) {
        Todo.find({}, (err, todos: IMongooseTodo) => {
            if (err) {
                res.status(500);
                res.json(err);
            }
            else {
                res.json(todos);
            }
        });
    }
}