import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import { filtersFetched, filtersFetching, filtersFetchingError, heroesFetched, heroesFetching, heroesFetchingError } from '../../actions';
import { useHttp } from '../../hooks/http.hook';
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const [name, setName] = useState('');
    const [description, setDescr] = useState('');
    const [element, setElement] = useState('');

    const { filters, filtersLoadingStatus } = useSelector(state => state);
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
    }, []);

    const onValueChange = (e) => {
        if (e.target.name === 'name') {
            setName(e.target.value);
        } else if (e.target.name === 'description') {
            setDescr(e.target.value);
        } else {
            setElement(e.target.value);
        }

    }

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: name,
            description: description,
            element: element,
        }

        dispatch(heroesFetching())
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
            .then(res => console.log(res, 'Successfuly sent'))
            .then(dispatch(heroesFetched([newHero])))
            .catch(() => dispatch(heroesFetchingError()))

        setName('');
        setDescr('');
        setElement('');
    }

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <option value=''>No filters yet</option>
        }

        return arr.map((filter, i) => {
            if (filter.eng === 'all') {
                return <option value="" key={i}>I have an element...</option>
            }

            return <option value={filter.eng} key={i}>{filter.rus}</option>
        })
    }
    const filterItems = renderFilters(filters);

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Name of the new hero</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={onValueChange}
                    placeholder="What is my name?" />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    type="text"
                    name='description'
                    className="form-control"
                    id="descr"
                    value={description}
                    onChange={onValueChange}
                    placeholder="What do I do?"
                    style={{ "height": '130px' }} />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose an element</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    value={element}
                    onChange={onValueChange}
                    name="element">
                    {filterItems}
                </select>
            </div>

            <button onClick={onSubmit} type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default HeroesAddForm;