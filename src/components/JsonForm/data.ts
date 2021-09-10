import { ref, Ref, onMounted, watch, isRef, isReactive, isProxy } from 'vue'

export type IFormType = 'number' | 'color' | 'enum'

export interface IFormConfig {
  type: IFormType
  default: any
  options: string[]
  min: string
  step: string
}

export interface IFormItem {
  desc: string
  isLeaf: boolean
  title: string
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

  constructor(options: IOptions) {
    this.formData = ref(options.formData)
    this.addWatch()
  }

  addWatch(): void {
    watch(this.selectedKeys, (value) => {
    })
  }
}

export default JsonFormDataModel
