import FiltersViewType from '../types/FiltersViewType';

const CLASS_ACTIVE_FILTER = 'filter-active';

class FiltersView implements FiltersViewType {
  counterEl: HTMLElement;
  container: HTMLElement;
  sortHandler: Function;

  filters: string[];
  containerBtns: HTMLElement;

  constructor({ container, counterEl, sortHandler, containerBtns, filters }) {
    this.container = container;
    this.counterEl = counterEl;
    this.sortHandler = sortHandler;

    containerBtns.appendChild(
      filters.reduce((acc, item) => {
        acc.appendChild( createBtn( item ) );
        return acc;
      }, document.createDocumentFragment())
    );
    this.container.addEventListener('click', this.filterTodos );
  }

  filterTodos = ( event: Event ) :void => {
    const target = event.target as HTMLElement;
    const role :string = target.getAttribute('data-role');
    if( !role ) return;
    this.sortHandler( role );
  }

  setCounter( counter :number ) :void {
    this.counterEl.innerHTML = counter.toString();
  }

  changeVisibilityFilters( bol :boolean ) {
    if( bol ) this.container.classList.add('filter__active');
    else this.container.classList.remove('filter__active');
  }

  setActiveFilter = ( filter :string ) :void => {
    const oldFilter :HTMLElement = this.container.querySelector(`.${CLASS_ACTIVE_FILTER}`);
    if( oldFilter ) oldFilter.classList.remove( CLASS_ACTIVE_FILTER );
    ( this.container.querySelector(`[data-role="${filter}"]`) )
    .classList.add( CLASS_ACTIVE_FILTER );
  }
};

const createBtn = ( role :string ) :HTMLButtonElement => {
  const btn = document.createElement('button');
  btn.setAttribute('class', 'btn btn__primary');
  btn.setAttribute('data-role', role );
  btn.innerHTML = role;
  return btn;
};

export default FiltersView;