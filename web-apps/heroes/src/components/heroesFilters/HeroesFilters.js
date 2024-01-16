import { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { onfilterBy } from '../../actions/index'
// Задача для этого компонента

// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const { filters } = useSelector(state => state);
    const dispatch = useDispatch();

    const itemRefs = useRef([]);

    const onFilter = (filter, i) => {
        itemRefs.current.forEach(item => item.classList.remove('active'));
        itemRefs.current[i].classList.add('active');
        dispatch(onfilterBy(filter.eng))
    }

    const renderRusFilters = (arr) => {
        return arr.map((filter, i) => {
            return <button
                className={`btn btn-${filter.colour}`}
                key={i}
                ref={el => itemRefs.current[i] = el}
                onClick={() => onFilter(filter, i)}
            >{filter.eng}</button>
        })
    }

    const elements = renderRusFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter by elements</p>
                <div className="btn-group">
                    {elements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;