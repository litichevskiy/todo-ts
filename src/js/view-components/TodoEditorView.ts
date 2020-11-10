import TodoEditorViewType from '../types/TodoEditorViewType';
import getFormValues from '../utils/getFormValues';
import { ESC_KEY } from '../constants';

class TodoEditorView implements TodoEditorViewType {
  container :HTMLElement;
  editForm :HTMLFormElement;
  formHandler :Function;

  constructor({ container, formHandler, editForm }) {
    this.container = container;
    this.formHandler = formHandler;
    this.editForm = editForm;

    this.container.addEventListener('click', this.clickHandler );
  }

  setFormValue = ( todo: { title?: string, content?: string }) :void => {
    for( let key in todo ) {
      const input: HTMLInputElement = this.editForm.querySelector(`[name=${key}]`);
      input.value = todo[key];
    }
  }

  clearInputs = () :void => {
    [...this.editForm.elements].forEach(( item: HTMLInputElement ) => {
      if( item.name ) item.value = '';
    });
  }

  hideEditor = () :void => {
    this.container.classList.remove('active');
    document.removeEventListener('keydown', this.keyBoardHandler );
  }

  showEditor = () :void => {
    this.container.classList.add('active');
    document.addEventListener('keydown', this.keyBoardHandler );
  }

  keyBoardHandler = ( event :KeyboardEvent ) :void => {
    if( event.key.toLowerCase() === ESC_KEY ) this.hideEditor();
  }

  clickHandler = ( event :Event ) :void => {
    const target = event.target as HTMLElement;
    if( target === this.container ) this.hideEditor();
    const role :string = target.getAttribute('data-role');
    if( !role ) return;
    const { content } :{ [key: string]: any } = getFormValues( this.editForm );
    this.formHandler({ content, role });
  }
};

export default TodoEditorView;