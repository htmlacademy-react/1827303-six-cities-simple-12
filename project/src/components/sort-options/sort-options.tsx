import { memo, useEffect, useState } from 'react';
import { changeOption } from '../../store/data-process/data-process';
import { getFilterName } from '../../store/data-process/selectors';


// Redux
import {
  useAppDispatch,
  useAppSelector
} from '../../hooks';


const options = ['Popular', 'Price: low to high', 'Price: high to low', 'Top rated first'];

function SortOptions() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(changeOption({filterName: 'Popular'}));
  }, [dispatch]);

  const onClickHandler = (option: string) => {
    dispatch(changeOption({filterName: option}));
    setIsOpen(false);
  };

  const filterName = useAppSelector(getFilterName);

  const openPopup = () => {
    if (isOpen) {
      return setIsOpen(false);
    } else {
      return setIsOpen(true);
    }
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0}
        onClick={openPopup}
      >
        {filterName}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpen ? 'places__options--opened' : ''}`}>
        {options.map((option, id) => (
          <li
            onClick={() => onClickHandler(option)}
            key={`${id * 10}`}
            className={`places__option ${filterName === option ? 'places__option--active' : ''}`}
            tabIndex={0}
          >
            {option}
          </li>
        ))}
      </ul>
    </form >
  );
}

export default memo(SortOptions);
