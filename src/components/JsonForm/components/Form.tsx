import { defineComponent, PropType, onMounted, watch } from 'vue'

type IFormType = 'number' | 'color' | 'enum'

interface IFormConfig {
  type: IFormType
  default: any
  options: string[]
  min: string
  step: string
}

interface IFormItem {
  desc: string,
  isLeaf: boolean
  title: string
  config: IFormConfig
  children?: IFormItem[]
}

export default defineComponent({
  name: 'FormContent',
  props: {
    data: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    }
  },
  data() {
    return {
      form: {},
    }
  },
  methods: {
    renderInput(item: IFormItem) {
      return (
        <a-form-item label={item.title}>
          <a-input placeholder={item.config.default} />
        </a-form-item>
      )
    },
    renderSelect(item: IFormItem) {
      const options = item.config?.options

      return (
        <a-form-item label={item.title}>
          <a-select placeholder={item.config.default}>
            {
              options.map(text => {
                return <a-select-option value={text}>{text}</a-select-option>
              })
            }
          </a-select>
        </a-form-item>
      )
    },
    renderItem(item: IFormItem) {
      if (item?.config?.type === 'number') {
        return this.renderInput(item)
      }
      if (item?.config?.type === 'enum') {
        return this.renderSelect(item)
      }
    }
  },
  render() {
    return (
      <div class="jf-form-wrap" ref="container">
        <a-form model={this.form}>
          {
            this.data.map(item => {
              return this.renderItem(item)
            })
          }
        </a-form>
      </div>
    )
  }
})
