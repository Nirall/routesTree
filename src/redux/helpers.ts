import * as ns from '../namespace';

const proceedTree = (init: any, node: ns.RouteObjType, fn: ns.appliedFunc): void => {
  const { nodes } = node;
  const acc = fn(init, node);
  if (nodes.length !== 0) {
    nodes.forEach((node) => proceedTree(acc, node, fn));
  }
}

const matchNode = (searchPath: string, tree: ns.RouteObjType): null | ns.RouteObjType  => {
  let matchNode = null;
  const matchFunction = (parentPath: string, node: ns.RouteObjType) => {
    const { route } = node;
    const currentPath = `${parentPath}${route}`;;
    if (currentPath === searchPath) {
      matchNode = node;
    }

    return currentPath;
  }

  proceedTree('', tree, matchFunction);

  return matchNode;
}

const flatTree = (tree: ns.RouteObjType): Array<ns.FormattedRouteType> => {
  const treeArray: Array<ns.FormattedRouteType> = [];
  const flatFunction = (parentPath: string, node: ns.RouteObjType) => {
    const { nodes, title, route } = node;
    treeArray.push({
      title,
      route: `${parentPath}${route}`,
      nodeCount: nodes.length
    });

    return `${parentPath}${route}`;
  }

  proceedTree('', tree, flatFunction);

  return treeArray;
}

export { proceedTree, matchNode, flatTree };
