import PubSubType from './PubSubType';
import Todo from './Todo';

interface TodosFilterType {
  pubsub: PubSubType;
  filterBy( role :string ) :void;
  changeVisibilityFilters( todos :Todo[] ) :void;
};

export default TodosFilterType;