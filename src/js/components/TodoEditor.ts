import PubSubType from '../types/PubSubType';
import TodoEditorViewType from '../types/TodoEditorViewType';
import Todo from '../types/Todo';
import TodoEditorType from '../types/TodoEditorType';
import StorageType from '../types/StorageType';
import TodoEditorView from '../view-components/TodoEditorView';
import { EDIT_TODO, SHOW_ALERT_MESSAGE } from '../constants';

const EMPTY_EDITABLE_TASK = `Todo can't be empty`;

class TodoEditor implements TodoEditorType {
  pubsub :PubSubType;
  editor: TodoEditorViewType;
  todo: Todo | null;
  storage :StorageType

  constructor({ container, pubsub, storage, editForm }) {
    this.pubsub = pubsub;
    this.editor = new TodoEditorView({ container, editForm, formHandler: this.formHandler });
    this.storage = storage;
    this.todo = null;

    this.pubsub.subscribe( EDIT_TODO, this.setFormValue );
  }

  formHandler = ({ content, role } : { content? :string, role :string }) :void => {
    if( role === 'close' ) {
      this.editor.hideEditor();
      this.todo = null;
    }
    else if ( role === 'cancel' ) {
      const { content } = this.todo;
      this.editor.setFormValue({ content });
    } else if( role === 'save' ) {
      this.saveChanges({ id: this.todo.id, content });
    }
  }

  saveChanges = ({ id, content } : { id :string, content :string }) :void => {
    if( !content.trim() ) {
      const { content } = this.todo;
      this.editor.setFormValue({ content });
      this.pubsub.publish( SHOW_ALERT_MESSAGE, EMPTY_EDITABLE_TASK );

    } else {
      this.storage.updateTodo({ id, fields :{ content } })
      .then( response => {
        this.editor.hideEditor();
        this.todo = null;
      })
      .catch( error => console.error( error ));
    }
  }

  setFormValue = ( id :string ) :void => {
    this.storage.getTodo( id )
    .then(( todo :Todo ) => {
      const { content } = todo;
      this.editor.setFormValue({ content });
      this.editor.showEditor();
      this.todo = todo;
    })
    .catch( error => console.error( error ));
  }
};

export default TodoEditor;