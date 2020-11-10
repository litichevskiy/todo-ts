interface FiltersViewType {
  counterEl: HTMLElement;
  container: HTMLElement;
  filters: string[];
  containerBtns: HTMLElement;
  sortHandler: Function;
  filterTodos( event :Event ) :void;
  setCounter( counter :number ) :void;
  changeVisibilityFilters( bol :boolean ) :void;
  setActiveFilter( filter :string ) :void
};

export default FiltersViewType;