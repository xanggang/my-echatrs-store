const { writeFile } = require('./util/wireFile')
const _ = require('lodash')
const baseUint = require('./title')

const baseKey = ['config', 'isLeaf', 'desc', 'title']

function init(mock) {
  const allKey = Object.keys(mock)
  const map = {}

  const getItemValue = (source) => {
    const data = {}
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

  allKey.forEach(key => {
    if (key.includes('.')) {
      const list = key.split('.')
      _.set(map, list, getItemValue(mock[key]))
      return
    }
    map[key] = getItemValue(mock[key])
  })
  writeFile('mock.json', JSON.stringify(map))
  formatData(map)
}

// init(a)
init(baseUint)

function formatData(objValue) {
  const res = []

  function deepGetItem(obj) {
    // 子对象
    const childrenKey = Object.keys(obj)
      .filter(key => !baseKey.includes(key))
    if (!childrenKey.length) return obj

    const resObj = {
      children: []
    }
    console.log(childrenKey)
    childrenKey.forEach(key => {
      resObj.children.push(Object.assign({}, deepGetItem(obj[key]), { title: key }))
    })

    return resObj
  }

  Object.keys(objValue).forEach(key => {
    res.push(Object.assign({}, deepGetItem(objValue[key]), { title: key }))
  })
  writeFile('formMock.json', JSON.stringify(res))
}
