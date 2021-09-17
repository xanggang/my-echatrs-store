interface IData {
  [key: string]: {
    desc: string
  }
}

export interface IModel {
  title: string
  desc: string
  children: IModel[]
}

function formatModelData(data: IData): IModel[] {
  const keys = Object.keys(data)
  const list: IModel[] = []
  const map: any = {}
  keys.forEach((key: string) => {
    if (!key.includes('-')) {
      list.push({
        title: key,
        desc: data[key].desc,
        children: []
      })
      return
    }
    const keys = key.split('-')
    const child = {
      title: keys[1],
      desc: data[key].desc,
      children: []
    }

    if (map[keys[0]]) {
      map[keys[0]][keys[1]] = child
      return
    }

    map[keys[0]] = {
      title: keys[0],
      desc: [],
      children: [child]
    }
  })

  return list
}

export default formatModelData
