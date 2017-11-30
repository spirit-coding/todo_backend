import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface ITodo {
    title: string;
    completed: boolean;
    createdDate: Date;
    completedDate: Date;
    description: string;
}

export interface IMongooseTodo extends mongoose.Document, ITodo {}

export const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    completedDate: {
        type: Date,
        required: false
    },
    description: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model<ITodo>('Todos', TodoSchema, 'todo', true);
export default Todo;