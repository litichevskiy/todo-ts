interface TodoEditorViewType {
  container :HTMLElement;
  editForm :HTMLFormElement;
  formHandler :Function;
  setFormValue( todo: { title?: string, content?: string }) :void;
  clearInputs() :void;
  hideEditor() :void;
  showEditor() :void;
  keyBoardHandler( event :KeyboardEvent ) :void;
  clickHandler( event :Event ) :void;
};

export default TodoEditorViewType;