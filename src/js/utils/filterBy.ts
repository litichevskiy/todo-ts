import Todo from '../types/Todo';
import FilterByType from '../types/FilterByType';

const filterBy :FilterByType = {
  all: ( todos :Todo[] ) :Todo[] => todos,
  completed: ( todos :Todo[] ) :Todo[] => todos.filter( todo => todo.completed ),
  active: ( todos :Todo[] ) :Todo[] => todos.filter( todo => !todo.completed ),
};

export default filterBy;