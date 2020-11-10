import localforage from 'localforage';
import Todo from './types/Todo';
import StoreType from './types/StoreType';
import StorageType from './types/StorageType';
import PubSubType from './types/PubSubType';
import {
  ADDED_TODO,
  UPDATED_QUANTITY_TODOS,
  DELETE_COMPLETED_TODOS,
  DELETED_COMPLETED_TODOS,
  UPDATED_TODO
} from './constants';

const STORAGE_NAME = 'todo-ts';

const storage :StorageType = (function() {
  let pubSub :PubSubType;

  return {

    async init(
      { initialStore, pubsub }:{ initialStore: StoreType, pubsub: PubSubType }
      ) :Promise<StoreType> {

      pubSub = pubsub;
      let store :StoreType = await this.getStorage();
      if( !store ) store = await this.setStorage( initialStore );
      this.deleteCompletedTodos = this.deleteCompletedTodos.bind( this );
      pubSub.subscribe( DELETE_COMPLETED_TODOS, this.deleteCompletedTodos );
      return store;
    },

    async getTodos() :Promise <Todo[]> {
      return (await this.getStorage()).todos;
    },

    async getTodo( id : string ) :Promise <Todo> {
      const store :StoreType = await this.getStorage();
      const todos :Todo[] = store.todos;

      for( let i = 0; i < todos.length; i++ ) {
        const todo = todos[i];
        if( todo.id === id ) return todo;
      }
    },

    async addTodo ( todo: Todo ) :Promise <void> {
      const store :StoreType = await this.getStorage();
      const todos :Todo[] = [todo, ...store.todos];
      await this.setStorage({ ...store, todos });
      pubSub.publish( ADDED_TODO, [todo] );
      pubSub.publish( UPDATED_QUANTITY_TODOS, todos );
    },

    async deleteTodo( idTodo: string ) :Promise <string> {
      const store :StoreType = await this.getStorage();
      const todos :Todo[] = store.todos.filter(({ id }) => id !== idTodo );
      await this.setStorage({ ...store, todos: todos });
      pubSub.publish( UPDATED_QUANTITY_TODOS, todos );
      return idTodo;
    },

    async deleteCompletedTodos() :Promise <void> {
      const store :StoreType = await this.getStorage();
      let todos :Todo[] = store.todos;
      const deletedTodos :Todo[] = todos.filter( todo => todo.completed )
      todos = todos.filter( todo => !todo.completed );
      await this.setStorage({ ...store, todos });
      pubSub.publish( DELETED_COMPLETED_TODOS, deletedTodos );
      pubSub.publish( UPDATED_QUANTITY_TODOS, todos );
    },

    async updateTodo({ id, fields } : { id :string, fields }) :Promise <string> {
      const store :StoreType = await this.getStorage();
      let updatedTodo :Todo;
      const todos: Todo[] = store.todos.map(( todo ) => {
        if( todo.id === id  ) {
          updatedTodo = { ...todo, ...fields };
          return { ...todo, ...fields }
        }
        return todo;
      });
      await this.setStorage({ ...store, todos: todos });
      pubSub.publish( UPDATED_TODO, updatedTodo );
      return id;
    },

    async updateTodoStatus( id :string ) :Promise <Todo> {
      const store :StoreType = await this.getStorage();
      let updatedTodo :Todo;
      const todos :Todo[] = store.todos.map( todo => {
        if( todo.id === id ) {
          updatedTodo = { ...todo, completed: !todo.completed };
          return updatedTodo;
        }
        else return todo;
      });

      await this.setStorage({ ...store, todos: todos });
      pubSub.publish( UPDATED_QUANTITY_TODOS, todos );
      return updatedTodo;
    },

    async getStorage() :Promise <StoreType> {
      return await localforage.getItem( STORAGE_NAME );
    },

    async setStorage( store :StoreType ) :Promise <StoreType> {
      return await localforage.setItem( STORAGE_NAME, store );
    },
  }

})();

export default storage;