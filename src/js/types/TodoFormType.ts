import TodoFormViewType from './TodoFormViewType';
import PubSubType from './PubSubType';
import StorageType from './StorageType';

interface TodoFormType{
  pubsub: PubSubType;
  TodoFormView: TodoFormViewType;
  storage: StorageType;
  formHandler( todoData :{ [key:string]: string } ) :void;
};

export default TodoFormType;