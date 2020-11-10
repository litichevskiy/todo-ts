import Todo from './Todo';

interface FilterByType {
  all( todos :Todo[] ) :Todo[]
  completed( todos :Todo[] ) :Todo[]
  active( todos :Todo[] ) :Todo[]
};

export default FilterByType;