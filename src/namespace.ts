export type RouteObjType = {
  route: string;
  title: string;
  nodes: Array<RouteObjType>;
}

export type FormattedRouteType = {
  route: string;
  title: string;
  nodeCount: number;
}

export type appliedFunc = (...args: any) => void;
