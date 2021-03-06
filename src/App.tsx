import { useLocation, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { block } from 'bem-cn';

import './App.scss';
import { RootState } from './store';
import { RouteObjType } from './namespace';
import { flatTree, matchNode } from './helpers';
import { themeSwitcher } from './theme/themeSwitcher';
import { removeRoute, setCurrentNode } from './store/actionCreators';

import Header from './components/Header/Header';
import NodesTable from './components/NodesTable/NodesTable';
import LinksList from './components/LinksList/LinksList';
import FormAddRoute from './components/FormAddRoute/FormAddRoute';
import Footer from './components/Footer/Footer';


const App = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const routesTree = useSelector<RootState, RouteObjType>(({ routesTree }) => routesTree);

  const b = block('app');
  if (pathname) {
    pathname = pathname.replace(/\/$/, "");
  }

  const handleDeleteButtonClick = (path: string) => {
    dispatch(removeRoute(path));
  }

  const flattenTree = flatTree(routesTree);
  const currentNode = flattenTree.filter(({ route }) => route === pathname)[0];
  dispatch(setCurrentNode(currentNode));
  if (currentNode) {
    themeSwitcher(currentNode.nodes.length);
  }

  const parentPath = pathname.split(/\/\w*$/i)[0];
  const isParentPathExist = Boolean(matchNode(parentPath, routesTree));

  const content = !currentNode
    ? <Redirect to={ isParentPathExist ? parentPath : routesTree.route } />
    : <>
        <div className={b('table')}>
          <NodesTable nodesData={flattenTree} handleDeleteButtonClick={handleDeleteButtonClick}/>
        </div>
        <div className={b('current-routes')}>
          <LinksList path={pathname} nodes={currentNode.nodes}/>
          <FormAddRoute currentPath={pathname}/>
        </div>
      </>

  return (
    <div className={b()}>
      <header className={b('header')}>
        <Header pathname={pathname}/>
      </header>
      <main className={b('content')}>
        {content}
      </main>
      <footer className={b('footer')}>
        <Footer text="This app allows to add and remove routes"/>
      </footer>
    </div>
  )
}

export default App;
