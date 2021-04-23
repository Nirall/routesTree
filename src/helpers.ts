import { RouteObjType, passFuncType } from 'namespace';

const passTree = (init: any, node: RouteObjType, fn: passFuncType): void => {
  const { nodes } = node;
  const acc = fn(init, node);
  if (nodes.length !== 0) {
    nodes.forEach((node) => passTree(acc, node, fn));
  }
}

const matchNode = (searchPath: string, tree: RouteObjType): null | RouteObjType  => {
  let matchNode = null;
  const matchFunction = (parentPath: string, node: RouteObjType) => {
    const { route } = node;
    const currentPath = `${parentPath}${route}`;;
    if (currentPath === searchPath) {
      matchNode = node;
    }

    return currentPath;
  }

  passTree('', tree, matchFunction);

  return matchNode;
}

const flatTree = (tree: RouteObjType): Array<RouteObjType> => {
  const treeArray: Array<RouteObjType> = [];
  const flatFunction = (parentPath: string, node: RouteObjType) => {
    const { nodes, title, route } = node;
    treeArray.push({
      title,
      nodes,
      route: `${parentPath}${route}`,
    });

    return `${parentPath}${route}`;
  }

  passTree('', tree, flatFunction);

  return treeArray;
}

export { passTree, matchNode, flatTree };
