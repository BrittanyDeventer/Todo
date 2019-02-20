// Todo item schema
const todoSchema = mongoose.Schema({
    item: {type: String, required: true},
    created: {type: Date, default: () => new Date()},
});

const Todo = module.exports = mongoose.model('todo', todoSchema); 