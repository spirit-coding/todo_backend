import * as mongoose from 'mongoose';

export let Schema = mongoose.Schema;
export let ObjectId = mongoose.Schema.Types.ObjectId;

export interface ITodo {
    title: string;
    complete: boolean;
}

export interface IMongooseTodo extends mongoose.Document, ITodo {}

export const TodoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    complete: {
        type: Boolean,
        required: true
    }
});

const Todo = mongoose.model<ITodo>('Todos', TodoSchema, 'todo', true);
export default Todo;