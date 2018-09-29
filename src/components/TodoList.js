import React, { Component } from 'react'

import TodoForm from './TodoForm';
import Todo from './Todo';

class TodoList extends Component {
    state = {
        todos: [],
        todosToShow: "all",
        toggleAllToComplete: true
    }

    addTodos = todo => {
        this.setState(state => ({
            todos: [todo, ...state.todos]
        }));
    };

    handletogglerComplete = (id) => {
        this.setState(state => ({
            todos: state.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        complete: !todo.complete
                    }
                } else {
                    return todo
                }
            })
        }));
    }

    handleTodoToShow = (str) => {
        this.setState({
            todosToShow: str
        });
    }

    handleDeleteTodo = (id) => {

        this.setState(state => ({
            todos: state.todos.filter(todo => todo.id !== id)
        }));
    }

    removeAllComplteTodos = () => {
        this.setState(state => ({
            todos: state.todos.filter(todo => !todo.complete)
        }));
    }

    handleAllToComplete = () => {
        this.setState(state => ({
            todos: state.todos.map(todo => ({
                ...todo,
                complete: state.toggleAllToComplete
            })),
            toggleAllToComplete: !state.toggleAllToComplete
        }));
    }

    render() {

        let todostoshow = [];

        if (this.state.todosToShow === "all") {
            todostoshow = this.state.todos
        } else if (this.state.todosToShow === "active") {
            todostoshow = this.state.todos.filter(todo => !todo.complete)
        } else if (this.state.todosToShow === "complete") {
            todostoshow = this.state.todos.filter(todo => todo.complete)
        }
        return (
            <div className="container">

                <h1 className="display-3">React Todo App</h1>
                <div className="font-weight-bold text-monospace">Todos Left: {this.state.todos.filter(todo => !todo.complete).length}</div>
                <p>click on todo to mark as finished</p>
                <div className="row">

                    <div className="col-md-8">
                        <div className="mb-2">
                            <TodoForm onSubmit={this.addTodos} />
                        </div>

                        <ul className="list-group mx-auto">
                            {todostoshow.map(todo =>
                                <li className="list-group-item">
                                    <Todo
                                        key={todo.id}
                                        togglerComplete={() => this.handletogglerComplete(todo.id)}
                                        todo={todo}
                                        onDelete={() => this.handleDeleteTodo(todo.id)}
                                    />
                                </li>
                            )}
                        </ul>
                    </div>


                    <div className="col-md-4">
                        <div>
                            <button className="btn btn-outline-dark btn-lg btn-block" onClick={() => this.handleTodoToShow('all')}>Show All</button>
                            <button className="btn btn-outline-dark btn-lg btn-block" onClick={() => this.handleTodoToShow('active')}>Show Only Active Tasks</button>
                            <button className="btn btn-outline-dark btn-lg btn-block" onClick={() => this.handleTodoToShow('complete')}>Show Only Completed Tasks</button>
                        </div>

                        {this.state.todos.some(todo => todo.complete) ?
                            (<div>
                                <button
                                    className="btn btn-outline-secondary btn-lg btn-block mt-2"
                                    onClick={this.removeAllComplteTodos}
                                >
                                    Remove All Complete Todos!
                                </button>
                            </div>)
                            : null}

                        <div>
                            <button
                                className="btn btn-outline-secondary btn-lg btn-block mt-2"
                                onClick={this.handleAllToComplete}
                            >
                                Toggle All To {this.state.toggleAllToComplete ? "Complete" : "Active"}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        )
    }
}

export default TodoList