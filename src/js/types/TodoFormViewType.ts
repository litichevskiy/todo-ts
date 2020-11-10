interface TodoFormViewType {
  container: HTMLFormElement
  bntClear: HTMLButtonElement;
  formHandler: Function;
  clearInputs() :void;
  submitHandler( event: Event ) :void;
};

export default TodoFormViewType;