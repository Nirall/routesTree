export type RouteObjType = {
  route: string;
  title: string;
  nodes: Array<RouteObjType>;
}

export type passFuncType = (parentPath: string, node: RouteObjType) => void;
