const { writeFile } = require('./util/wireFile')
const _ = require('lodash')
const baseUint = require('./title')

const a = {
  'textStyle.rich': {
    desc: '<p>在 <code class="codespan">rich</code> 里面，可以自定义富文本样式。利用富文本样式，可以在标签中做出非常丰富的效果。</p>\n<p>例如：</p>\n<pre><code class="lang-js">label: {\n    // 在文本中，可以对部分文本采用 rich 中定义样式。\n    // 这里需要在文本中使用标记符号：\n    // `{styleName|text content text content}` 标记样式名。\n    // 注意，换行仍是使用 &#39;\\n&#39;。\n    formatter: [\n        &#39;{a|这段文本采用样式a}&#39;,\n        &#39;{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}&#39;\n    ].join(&#39;\\n&#39;),\n\n    rich: {\n        a: {\n            color: &#39;red&#39;,\n            lineHeight: 10\n        },\n        b: {\n            backgroundColor: {\n                image: &#39;xxx/xxx.jpg&#39;\n            },\n            height: 40\n        },\n        x: {\n            fontSize: 18,\n            fontFamily: &#39;Microsoft YaHei&#39;,\n            borderColor: &#39;#449933&#39;,\n            borderRadius: 4\n        },\n        ...\n    }\n}\n</code></pre>\n<p>详情参见教程：<a href="tutorial.html#%E5%AF%8C%E6%96%87%E6%9C%AC%E6%A0%87%E7%AD%BE" target="_blank">富文本标签</a></p>\n'
  },
  'textStyle.rich.<style_name>.color': {
    desc: '\n\n<p>文字的颜色。</p>\n',
    uiControl: {
      type: 'color',
      default: 'null'
    }
  },
}
function init(mock) {
  const allKey = Object.keys(mock)
  const map = {}

  const getItemValue = (source) => {
    const data = {}
    data.dec = source.dec
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
}


// init(a)
init(baseUint)
