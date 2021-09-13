import { defineComponent, PropType, onMounted, watch, inject, computed, nextTick } from 'vue'
import JsonFormDataModel, { IFormItem, IFormConfig } from '../utils/data'
import { InputNumber, PageHeader } from 'ant-design-vue'

export default defineComponent({
  name: 'RenderFormItem',
  inject: ['jsonFormDataModel'],
  components: {
    inputumber: InputNumber
  },
  props: {
    data: {
      type: Object as PropType<IFormItem>,
      default: () => ({})
    }
  },
  setup(props) {
    const jsonFormDataModel = inject('jsonFormDataModel') as JsonFormDataModel

    function renderString(item: IFormItem) {
      return (
        <a-input placeholder={item.config.default} />
      )
    }
    function renderBoolean(item: IFormItem) {
      return (
        <a-switch placeholder={item.config.default}/>
      )
    }
    function renderColor(item: IFormItem) {
      return (
        <a-input placeholder={item.config.default} />
      )
    }
    function renderSelect(item: IFormItem) {
      const options = item.config?.options
      return (
        <a-select placeholder={item.config.default}>
          {
            options.map(text => {
              return <a-select-option value={text}>{text}</a-select-option>
            })
          }
        </a-select>
      )
    }
    function renderNumber(item: IFormItem) {
      const props: { [key: string]: unknown } = {
        precision: 1
      }
      const config = item.config
      if (config.max) {
        props.max = Number(config.max)
      }
      if (config.min) {
        props.min = Number(config.min)
      }
      if (config.step) {
        props.step = Number(config.step)
      }
      return (
        <a-input-number placeholder={item.config.default} { ...props} />
      )
    }
    function renderItem() {
      let vDom = null
      if (['percent', 'number'].includes(props.data?.config?.type)) {
        vDom = renderNumber(props.data)
      }
      if (props.data?.config?.type === 'boolean') {
        vDom = renderBoolean(props.data)
      }

      if (['text', 'color'].includes(props.data?.config?.type)) {
        vDom = renderString(props.data)
      }

      if (props.data?.config?.type === 'enum') {
        vDom = renderSelect(props.data)
      }

      return (
        <div class='js-tree-title-form-item'>
          { vDom }
        </div>
      )
    }

    function renderDefaultValue() {
      const defaultValue = props?.data?.config?.default
      return <span class='js-tree-title-default-value'>{ defaultValue }</span>
    }
    function handleSelectItem() {
      jsonFormDataModel.handleSelectItem(props.data)
    }

    const isSelect = computed(() => {
      return jsonFormDataModel.selectItem.value?.id === props.data.id
    })

    return {
      renderItem,
      renderDefaultValue,
      handleSelectItem,
      isSelect
    }
  },
  render() {
    return (
      <div class='js-tree-item' onClick={this.handleSelectItem}>
        <span class='js-tree-title-main' >{ this.data.title }</span>
        {
          this.isSelect
            ? this.renderItem()
            : this.renderDefaultValue()
        }
      </div>
    )
  }
})
