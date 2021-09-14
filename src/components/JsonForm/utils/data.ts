import { ref, Ref, onMounted, watch, isRef, isReactive, isProxy } from 'vue'
import * as _ from 'lodash'
import formatEchartOption from '../../../util/formatEchartOption'
import titlecConfig from '../../../../data/titlets'

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
  // 默认值
  defaultValue: AnyObject = {}
  //
  currentShowFormOptions: Ref<IFormItem[]> = ref([])

  selectItem: Ref<IFormItem | null> = ref(null)

  constructor() {
    const { formatData, defaultValue } = formatEchartOption(titlecConfig)
    this.formData = ref(formatData)
    this.defaultValue = defaultValue
  }

  handleChangeValue(originKey: string, value: unknown): void {
    console.log('handleChangeValue', value)
    const keyList = originKey.split('.')
    _.set(this.form.value, keyList, value)
  }

  getItemValue(originKey: string): void {
    const keyList = originKey.split('.')
    return _.get(this.form.value, keyList)
  }

  handleRemoveKey(originKey: string): void {
    const keyList = originKey.split('.')
    _.unset(this.form.value, keyList)
  }

  handleSelectItem(item: IFormItem): void {
    this.selectItem.value = item
  }
}

export default JsonFormDataModel
