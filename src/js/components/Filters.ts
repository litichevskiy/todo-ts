import FiltersViewType from '../types/FiltersViewType';
import TodosFilterType from '../types/TodosFilterType';
import PubSubType from '../types/PubSubType';
import Todo from '../types/Todo';
import FiltersView from '../view-components/FiltersView';
import {
  UPDATED_QUANTITY_TODOS,
  CLEAR_COMPLETED_TODO,
  DELETE_COMPLETED_TODOS,
  FILTER_CHANGED
} from '../constants';

class Filters implements TodosFilterType {
  filtersView: FiltersViewType;
  pubsub: PubSubType;

  constructor({ container, counterEl, pubsub, todos, filter, containerBtns, filters }) {
    this.pubsub = pubsub;
    this.filtersView = new FiltersView({
      container, counterEl, sortHandler: this.filterBy, containerBtns, filters
    });

    this.pubsub.subscribe( UPDATED_QUANTITY_TODOS, this.changeVisibilityFilters );
    this.changeVisibilityFilters( todos );
    this.filtersView.setActiveFilter( filter );
  }

  changeVisibilityFilters = ( todos :Todo[] ) :void => {
    const quantityCompletedTodos = ( filterCompleted( todos ) ).length;
    if( !todos.length ) this.filtersView.changeVisibilityFilters( false );
    else this.filtersView.changeVisibilityFilters( true );
    this.updateCounter( quantityCompletedTodos );
  }

  updateCounter = ( quantityTodos :number ) :void => {
    this.filtersView.setCounter( quantityTodos );
  }

  filterBy = ( filter :string ) :void => {
    if( filter === CLEAR_COMPLETED_TODO ) this.pubsub.publish( DELETE_COMPLETED_TODOS );
    else {
      this.pubsub.publish( FILTER_CHANGED, filter );
      this.filtersView.setActiveFilter( filter );
    }
  }
};

const filterCompleted = (todos :Todo[]) :Todo[] => todos.filter(todo => !todo.completed );

export default Filters;