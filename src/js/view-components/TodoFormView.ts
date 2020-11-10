import TodoFormViewType from '../types/TodoFormViewType';
import getFormValues from '../utils/getFormValues';

class TodoFormView implements TodoFormViewType {
  container: HTMLFormElement
  bntClear: HTMLButtonElement;
  formHandler: Function;

  constructor({ container, bntClear, formHandler }) {
    this.container = container;
    this.formHandler = formHandler;

    this.container.addEventListener('submit', this.submitHandler );
    bntClear.addEventListener('click', this.clearInputs );
  }

  clearInputs = () :void => {
    [...this.container.elements].forEach(( item: HTMLInputElement ) => {
      if( item.name ) item.value = '';
    });
  }

  submitHandler = ( event: Event ) :void => {
    event.preventDefault();
    const todoData :{ [key:string]: string } = getFormValues( this.container );
    this.clearInputs();
    this.formHandler( todoData );
  }
};

export default TodoFormView;