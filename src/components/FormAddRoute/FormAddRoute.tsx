import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { block } from 'bem-cn';

import './FormAddRoute.scss';
import { RootState } from '../../store';
import { RouteObjType } from '../../namespace';
import { matchNode } from '../../helpers';
import { addRoute } from '../../store/actionCreators';

const FormAddRoute = ({currentPath}: {currentPath: string}) => {
  const dispatch = useDispatch();
  const routesTree = useSelector<RootState, RouteObjType>(({ routesTree }) => routesTree);
  const [route, setRoute] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const b = block('form-add-route');

  const checkRouteValue = (route: string) => {
    if (route === undefined || route === '') {
      return 'Enter the route';
    }

    if (!/^\/[a-z0-9]+$/.test(route)) {
      return 'A Route should starts with "/" and has latin letters or digits'
    }

    if (matchNode(`${currentPath}${route}`, routesTree)) {
      return 'This route exists already'
    }

    return '';
  }

  const handleRouteFieldChange = (event: React.FormEvent<HTMLInputElement>) => {
    const routeValue = (event.target as HTMLInputElement).value;
    setRoute(routeValue);
    setError(checkRouteValue(routeValue));
  }

  const handleTitleFieldChange = (event: React.FormEvent<HTMLInputElement>) => {
    const titleValue = (event.target as HTMLInputElement).value;
    setTitle(titleValue);
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errorValue = checkRouteValue(route);
    setError(errorValue);
    if (!errorValue && route) {
      dispatch(addRoute({
        route,
        title,
        parentPath: currentPath,
      }))
    }
  }

  return (
    <form className={b()} onSubmit={handleFormSubmit}>
      <h3 className={b('title')}>
        The form to add a route
      </h3>
      <label className={b('row')}>
        Route
        <input className={b('field')} onChange={handleRouteFieldChange} value={route} />
      </label>
      <label className={b('row')}>
        Title
        <input className={b('field')} onChange={handleTitleFieldChange} value={title} />
      </label>
      <div className={b('error')}>
        {error}
      </div>
      <button type="submit" className={b('button')} disabled={Boolean(error)}>
        Add the route
      </button>
    </form>
  )

}

export default FormAddRoute;