import { defineComponent, PropType, inject, computed } from 'vue'
import JsonFormDataModel, { IFormItem } from '../utils/data'
import { InputNumber } from 'ant-design-vue'

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

    const originKey = computed(() => props.data.originKey)
    const formValue = computed(() => jsonFormDataModel.getItemValue(props.data.originKey))
    const defaultValue = computed(() => props.data.config.default)

    function renderString() {
      const value = formValue.value === undefined ? defaultValue.value : formValue.value
      const onChange = (event: InputEvent) => {
        const newValue = (event.target as HTMLInputElement).value
        if (newValue === defaultValue.value) {
          jsonFormDataModel.handleRemoveKey(originKey.value)
          return
        }
        jsonFormDataModel.handleChangeValue(originKey.value, newValue)
      }
      console.log(value)
      const props = {
        value,
        placeholder: value,
        onChange
      }
      return (
        <a-input { ...props }/>
      )
    }
    function renderBoolean(item: IFormItem) {
      const originKey = item.originKey
      const defaultValue = item.config.default === 'true'
      const formValue = jsonFormDataModel.getItemValue(originKey)
      const value = formValue === undefined ? defaultValue : formValue
      const onChange = (newValue: boolean) => {
        if (newValue === defaultValue) {
          jsonFormDataModel.handleRemoveKey(originKey)
          return
        }
        jsonFormDataModel.handleChangeValue(originKey, newValue)
      }
      return (
        <a-switch checked={value} onChange={onChange} placeholder={item.config.default}/>
      )
    }
    function renderSelect(item: IFormItem) {
      const options = item.config?.options
      const value = formValue.value === undefined ? defaultValue.value : formValue.value
      const onChange = (newValue: string) => {
        if (newValue === defaultValue.value) {
          jsonFormDataModel.handleRemoveKey(originKey.value)
          return
        }
        jsonFormDataModel.handleChangeValue(originKey.value, newValue)
      }
      const props = {
        value,
        placeholder: value,
        onChange
      }
      return (
        <a-select { ...props}>
          {
            options.map(text => {
              return <a-select-option value={text}>{text}</a-select-option>
            })
          }
        </a-select>
      )
    }
    function renderNumber(item: IFormItem) {
      const value = formValue.value === undefined ? defaultValue.value : formValue.value
      const onChange = (newValue: string) => {
        if (newValue === defaultValue.value) {
          jsonFormDataModel.handleRemoveKey(originKey.value)
          return
        }
        jsonFormDataModel.handleChangeValue(originKey.value, newValue)
      }
      const props: { [key: string]: unknown } = {
        precision: 1,
        value,
        onChange
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
        <a-input-number {...props} />
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
        vDom = renderString()
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
      if (!props.data.originKey) {
        return null
      }
      const originKey = props.data.originKey
      const defaultValue = props.data?.config?.default
      const formValue = jsonFormDataModel.getItemValue(originKey)
      const value = formValue === undefined ? defaultValue : formValue
      return <span class='js-tree-title-default-value'>{ value }</span>
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
