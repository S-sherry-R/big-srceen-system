import { defineComponent, onMounted, ref, watch, onBeforeUnmount, reactive } from 'vue'
import '@/common/echart/map/fujian.js'
import '@/common/echart/map/chengdu.js'
import theme from '@/common/echart/style/theme.js' // 引入默认主题
import * as echarts from 'echarts'

// 定义类型
const PropsType = {
  // 图表唯一 id
  id: String,
  // 图表类名
  className: {
    type: String,
    default: 'chart'
  },
  // 图表宽度
  width: {
    type: String,
    require: true
  },
  // 图表高度
  height: {
    type: String,
    require: true
  },
  // 图表数据项
  options: {
    type: Object,
    default: () => ({}),
  }
} as const

export default defineComponent({
  name: 'Echarts',
  props: PropsType,
  setup(props, { expose }) {
    const chartRef = ref<HTMLElement>()
    const charts = {
      chart: null
    }

    /**
     * 初始化echart
     * @param data 数据项
     * @param clearCaching 是否清除缓存
     */
    const initChart = (data?: any, clearCaching = false) => {
      if (data || props.options) {
        charts.chart.setOption(data || props.options, clearCaching)
      }
    }

    // 生命周期
    onMounted(() => {
      // 定义实例
      echarts.registerTheme('myTheme', theme) // 覆盖默认主题
      charts.chart = echarts.init(chartRef.value, 'myTheme')
      initChart()
    })
    onBeforeUnmount(() => {
      charts.chart.dispose()
      charts.chart = null
    })

    // 监听改变
    watch(
      () => props.options,
      val => {
        val && initChart(val)
      },
      {
        deep: true
      }
    )

    // 对外暴露接口
    expose({
      chartRef,
      initChart
    });

    return () => {
      const { id, className, height, width } = props
      return <div
        ref={chartRef}
        id={id as string}
        class={className as string}
        style={{
          'height': height as string,
          'width': width as string
        }}
      />
    }
  }
})
