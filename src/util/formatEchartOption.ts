import * as _ from 'lodash'
// import titleConfig from '../../data/title.ts'

const baseKey = ['config', 'isLeaf', 'desc', 'title', 'originKey']

function getUid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 将object转化成树行
function objectToTreeList(objValue: any) {
  const res: any = []

  function deepGetItem(obj: any) {
    // 子对象
    const childrenKey = Object.keys(obj)
      .filter(key => !baseKey.includes(key))
    if (!childrenKey.length) return obj

    const resObj: any = {
      children: []
    }
    childrenKey.forEach(key => {
      resObj.children.push(Object.assign({},
        deepGetItem(obj[key]),
        { title: key },
        { id: getUid() }
      ))
    })

    return resObj
  }

  Object.keys(objValue).forEach(key => {
    res.push(Object.assign({},
      deepGetItem(objValue[key]),
      { title: key },
      { id: getUid() }
    ))
  })

  return res
}

function init(mock: any) {
  const allKey = Object.keys(mock)
  const map: any = {}
  const defaultValue: any = {}

  const getItemValue = (source: any, originKey: string) => {
    const data: any = {}
    data.originKey = originKey
    data.desc = source.desc
    data.config = {}
    data.isLeaf = true
    if (!source.uiControl) return data
    Object.keys(source.uiControl).forEach(key => {
      if (key === 'options') {
        data.config[key] = source.uiControl[key].split(',')
        return
      }
      data.config[key] = source.uiControl[key]
    })

    return data
  }

  const getDefaultValue = (source: any) => {
    const config = source.uiControl || {}
    const type = config.type
    if (config.default) return config.default
    return undefined
  }

  allKey.forEach(key => {
    if (key.includes('.')) {
      const list = key.split('.')
      _.set(map, list, getItemValue(mock[key], key))
      _.set(defaultValue, list, getDefaultValue(mock[key]))
      return
    }
    map[key] = getItemValue(mock[key], key)
    defaultValue[key] = getDefaultValue(mock[key])
  })
  return {
    formatData: objectToTreeList(map),
    defaultValue
  }
}

// init(a)

export default function getFormData(titleConfig: any) {
  return init(titleConfig)
}
