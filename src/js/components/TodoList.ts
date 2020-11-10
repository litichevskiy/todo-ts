import TodosViewType from '../types/TodosViewType';
import Todo from '../types/Todo';
import TodoListType from '../types/TodoListType';
import PubSubType from '../types/PubSubType';
import StorageType from '../types/StorageType';
import filterBy from '../utils/filterBy';
import TodoListView from '../view-components/TodoListView';

import {
  ADDED_TODO,
  FILTER_CHANGED,
  DELETED_COMPLETED_TODOS,
  UPDATED_TODO,
  EDIT_TODO
} from '../constants';

const DEFAULT_FILTER = Object.keys( filterBy )[0];

class TodoList implements TodoListType {
  todosView: TodosViewType;
  pubsub: PubSubType;
  storage: StorageType;
  filter: string;

  constructor({ container, pubsub, todos, storage }) {

    this.pubsub = pubsub;
    this.storage = storage;
    this.todosView = new TodoListView({ container, todoHandler: this.clickHandler });
    this.filter = DEFAULT_FILTER;

    this.pubsub.subscribe( ADDED_TODO, this.addTodo );
    this.pubsub.subscribe( FILTER_CHANGED, this.sortTodos );
    this.pubsub.subscribe( DELETED_COMPLETED_TODOS, this.deleteCompletedTodo );
    this.pubsub.subscribe( UPDATED_TODO, this.updateTodo );

    this.todosView.createTodos( todos );
  }

  updateTodo = ( todo :Todo ) :void => {
    this.todosView.replaceTodo( todo );
  }

  addTodo = ( todos :Todo[] ) :void => {
    this.todosView.createTodos( todos );
  }

  clickHandler = ({ role, id } : { role :string, id :string }) :void => {
    if( role === 'delete' ) this.deleteTodo( id );
    else if ( role === 'completed' ) this.updateTodoStatus( id );
    else if( role === 'edit' ) this.editTodo( id );
  }

  deleteTodo = ( id: string ) :void => {
    this.storage.deleteTodo( id )
    .then( response => {
      this.todosView.deleteTodo( id );
    })
    .catch( error => console.error( error ));
  }

  deleteCompletedTodo = ( todos :Todo[] ) => {
    todos.forEach( item => this.todosView.deleteTodo( item.id ))
  }

  updateTodoStatus = ( id: string ) :void => {
    this.storage.updateTodoStatus( id )
    .then(( todo :Todo ) => {
      this.todosView.replaceTodo( todo );
      this.sortTodos( this.filter );
    })
    .catch( error => console.error( error ));
  }

  editTodo = ( id :string ) :void => {
    this.pubsub.publish( EDIT_TODO, id );
  }

  sortTodos = ( role :string ) :void => {
    if( role === DEFAULT_FILTER && this.filter === DEFAULT_FILTER ) return;
    this.storage.getTodos()
    .then( todos => {
      this.todosView.clearTodoList();
      const sortedTodos = filterBy[role]( todos );
      this.filter = role;
      this.todosView.createTodos( sortedTodos );
    })
    .catch( error => console.error( error ));
  }
};

export default TodoList;