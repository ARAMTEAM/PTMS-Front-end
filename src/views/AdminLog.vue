<template>
  <div class="Container">
    <h1>查看日志界面</h1>
    <div class="LogForm">
        <i-table size="large" :columns="columns1" :data="data1"></i-table>
    </div>

  </div>
</template>

<script>
export default {
data () {
    return {
        columns1: [
            {
                type: 'index',
                width: 60,
                align: 'center'
            },
            {
                title: '日志编号',
                key: 'log_id',
                width: 200,
            },
            {
                title: '记录时间',
                key: 'time',
                width: 250,
            },
            {
                title: '日志内容',
                key: 'log_content'
            }
        ],
        data1: [
            {
                log_id: '王小明',
                time: '2020-02-03 20:25:14',
                log_content: '北京市朝阳区芍药居哪哈的反馈你不快乐决胜巅峰版纳可接受的的奥术大师发的说法啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
            },
            {
                log_id: '张小刚',
                time: '2020-02-03 20:25:14',
                log_content: '北京市海淀区西二旗'
            },
            {
                log_id: '李小红',
                time: '2020-02-03 20:25:14',
                log_content: '上海市浦东新区世纪大道'
            },
            {
                log_id: '周小伟',
                time: '2020-02-03 20:25:14',
                log_content: '深圳市南山区深南大道'
            }
        ]
    }
  }
}
</script>

<style>
.LogForm{
  margin: 20px 0;
  border: 1px solid #cfcfcf;
}

</style>