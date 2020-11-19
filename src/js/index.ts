import storage from './storage';
import initialStore from './initialStore';
import StoreType from './types/StoreType';
import PubSubType from './types/PubSubType';
import PubSub from './utils/PubSub';
import filterBy from './utils/filterBy';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Filters from './components/Filters';
import Alert from './components/Alert';
import TodoEditor from './components/TodoEditor';
import '../images/favicon.png';

const pubsub :PubSubType = new PubSub;
const filters :string[] = Object.keys( filterBy );

storage.init({ initialStore, pubsub })
.then(({ todos } : StoreType ) => {

  new TodoForm({
    container: document.querySelector('.todo-form'),
    bntClear: document.querySelector('.todo-form .clear'),
    pubsub: pubsub,
    storage: storage,
  });

  new TodoList({
    storage: storage,
    container: document.querySelector('.todo-list'),
    pubsub: pubsub,
    todos: todos
  });

  new Filters({
    container: document.querySelector('.filter'),
    counterEl: document.querySelector('.todo-counter'),
    containerBtns: document.querySelector('.filter .filter-buttons'),
    pubsub: pubsub,
    todos: todos,
    filter: filters[0],
    filters: filters,
  });

  new Alert({
    container: document.querySelector('.alert'),
    messageEl: document.querySelector('.alert-message'),
    btnClose: document.querySelector('.alert-close'),
    pubsub: pubsub,
  });

  new TodoEditor({
    container: document.querySelector('.editor'),
    editForm: document.querySelector('.editor-form'),
    pubsub: pubsub,
    storage: storage,
  });
})
.catch( error => console.error( error ));