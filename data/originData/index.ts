
export function getGlobal() {
  return import('./global.json')
}

export function getModelData(modelName: string) {
  return import(`./${modelName}.json`)
}
