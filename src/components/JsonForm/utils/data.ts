import { ref, Ref, onMounted, watch, isRef, isReactive, isProxy } from 'vue'

export type IFormType = 'number' | 'color' | 'enum' | 'text' | 'boolean' | 'vector' | 'percent'

export interface IFormConfig {
  type: IFormType
  default: any
  options: string[]
  min: string
  max: string
  step: string
}

export interface IFormItem {
  id: string
  desc: string
  isLeaf: boolean
  title: string
  originKey: string
  config: IFormConfig
  children?: IFormItem[]
}

export interface AnyObject {
  [key: string]: any
}

export interface IOptions {
  formData: IFormItem[]
}

class JsonFormDataModel {
  // 表单数据
  formData: Ref<IFormItem[]> = ref([])
  // 选中的项目
  selectedKeys: Ref<string[]> = ref([])
  // 操作的表单
  form: Ref<AnyObject> = ref({})
  //
  currentShowFormOptions: Ref<IFormItem[]> = ref([])

  selectItem: Ref<IFormItem | null> = ref(null)

  constructor(options: IOptions) {
    this.formData = ref(options.formData)
    this.getModelValue()
    this.addWatch()
  }

  addWatch(): void {
    // watch(this.selectedKeys, (value) => {
    //   console.log(value)
    // })
  }

  // 从data中拉出来一组默认值
  getModelValue() {
    const data = this.formData.value
    const defaultValue: { [key: string] : unknown} = {}

    const getDefaultValue = (item: any) => {
      const config = item.config || {}
      const type = config.type
      if (config.default) return config.default
      return undefined
    }

    data.forEach((item: IFormItem) => {
      if (!item.originKey) return
      const key = item.originKey
      console.log(key)
      if (key.includes('.')) {
        const list = key.split('.')
        _.set(defaultValue, list, getDefaultValue(item))
        return
      }
      defaultValue[key] = getDefaultValue(item)
    })

    console.log(defaultValue)
    return defaultValue
  }

  handleSelectItem(item: IFormItem) {
    this.selectItem.value = item
  }
}

export default JsonFormDataModel
