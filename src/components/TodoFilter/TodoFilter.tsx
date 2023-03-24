import { ChangeEventHandler } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { actions as filterActions } from '../../features/filter';
import { selectFilter } from '../../state/todos/selectors';
import { Status } from '../../types/Status';

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectFilter);

  const setFilter: ChangeEventHandler<HTMLSelectElement> = (e) => dispatch(
    filterActions.setStatus(e.target.value as Status),
  );
  const clearSearch = () => dispatch(filterActions.setQuery(''));

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter.status}
            onChange={setFilter}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={filter.query}
          onChange={e => dispatch(filterActions.setQuery(e.target.value))}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {!!filter.query && (

            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clear search"
              onClick={clearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
