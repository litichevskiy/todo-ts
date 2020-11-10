import PubSubType from '../types/PubSubType';
import TodoFormViewType from '../types/TodoFormViewType';
import StorageType from '../types/StorageType';
import TodoFormType from '../types/TodoFormType';
import Todo from '../types/Todo';
import uniqueId from '../utils/uniqueId';
import TodoFormView from '../view-components/TodoFormView';
import { SHOW_ALERT_MESSAGE } from '../constants';

const EMPTY_TODO_ALERT = `Todo can't be empty`;

class TodoForm implements TodoFormType {
  pubsub: PubSubType;
  TodoFormView: TodoFormViewType;
  storage: StorageType

  constructor({ container, bntClear, pubsub, storage }) {
    this.pubsub = pubsub;
    this.storage = storage;

    this.TodoFormView = new TodoFormView({
      container, bntClear, formHandler: this.formHandler
    });
  }

  formHandler = ( todoData :{ [key:string]: string } ) => {
    event.preventDefault();
    if( !todoData.content.trim() ) this.pubsub.publish( SHOW_ALERT_MESSAGE, EMPTY_TODO_ALERT );
    else {
      const { content } = todoData;
      this.storage.addTodo({ content, id: uniqueId(), completed: false, date: new Date})
      .then( response => {})
      .catch( error => console.error( error ))
    }
  }
};

export default TodoForm;