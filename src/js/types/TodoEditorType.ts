import PubSubType from './PubSubType';
import TodoEditorViewType from './TodoEditorViewType';
import Todo from './Todo';
import StorageType from './StorageType';

interface TodoEditorType {
  pubsub :PubSubType;
  editor: TodoEditorViewType;
  todo: Todo | null;
  storage :StorageType
  formHandler({ content, role } : { content? :string, role :string }) :void;
  saveChanges({ id, content } : { id :string, content :string }) :void;
  setFormValue( id :string ) :void;
};

export default TodoEditorType;