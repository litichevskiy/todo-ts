import Todo from '../types/Todo';
import FormatedDateType from '../types/FormatedDateType';
import formatDate from '../utils/formatDate';

const createTodo = ({ content, completed, id, date } :Todo) :HTMLLIElement => {
  const { day, fullDateISO, hours, minutes, month, year } :FormatedDateType = formatDate( date );

  const li = document.createElement('li');
  li.setAttribute( 'id', id );
  li.setAttribute( 'class', completed ? 'todo todo__completed' : 'todo' );
  li.innerHTML = `
    <div class="todo-navigation">
      <label class="check">
        ${completed ?
          '<input type="checkbox" class="check-input" checked />' :
          '<input type="checkbox" class="check-input" />'}
        <span class="check-box" data-role="completed"></span>
      </label>
      <time class="date todo-date" datetime="${fullDateISO}">${day} ${month} ${year}  ${hours}:${minutes}</time>
      <div class="container-buttons">
        <button class="todo-btn empty-btn empty-btn__edit" data-role="edit"></button>
        <button class="todo-btn empty-btn empty-btn__delete" data-role="delete"></button>
      </div>
    </div>
    <p class="todo-content">${content}</p>`;

  return li;
};

export default createTodo;