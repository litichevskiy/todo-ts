import Todo from './Todo';
import StoreType from './StoreType';
import PubSubType from './PubSubType';

interface StorageType {
  init(
    { initialStore, pubsub }:{ initialStore: StoreType, pubsub: PubSubType }
  ) :Promise<StoreType>;
  getTodos() :Promise <Todo[]>;
  getTodo( id : string ) :Promise <Todo>;
  addTodo ( todo: Todo ) :Promise <void>;
  deleteTodo( idTodo: string ) :Promise <string>;
  deleteCompletedTodos() :Promise <void>;
  updateTodo({ id, fields } : { id :string, fields }) :Promise <string>;
  updateTodoStatus( id :string ) :Promise <Todo>;
  getStorage() :Promise <StoreType>;
  setStorage( store :StoreType ) :Promise <StoreType>;
};

export default StorageType;