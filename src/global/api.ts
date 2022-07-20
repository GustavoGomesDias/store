export interface RouterDefinition {
  method: 'get' | 'post' | 'put' | 'delete'
  path: string
}

export interface ApiRouterDefinition extends RouterDefinition {
  controllerMethod: string | symbol
}
