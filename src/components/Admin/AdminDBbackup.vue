<template>
  <div class="Container">
    <h1>数据库备份界面</h1>

    <i-form :model="formItem" :label-width="140" class="form">
      <Form-item label="当前是否开启备份">
        <i-Switch :checked.sync="formItem.switch" size="large" @on-change="change">
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-Switch>
      </Form-item>
    </i-form>

    <!-- 组件可视化的判断是否 -->
    <i-form :model="formItem" :label-width="140" class="form" :style="visibility">
      <Form-item label="备份频率">
        <i-select :model.sync="formItem.frequency" placeholder="请选择">
          <i-option value="1">1天1次</i-option>
          <i-option value="3">3天1次</i-option>
          <i-option value="5">5天1次</i-option>
          <i-option value="7">7天1次</i-option>
        </i-select>
      </Form-item>

      <Form-item label="日期控件">
        <Date-picker type="datetimerange" placeholder="请选择备份时间段" :value.sync="formItem.date"></Date-picker>
      </Form-item>

      <Form-item label="备注信息">
        <i-input :value.sync="formItem.note" placeholder="请输入"></i-input>
      </Form-item>
    </i-form>

    <i-button type="primary" class="commit" @click="confirm">确认</i-button>
  </div>
</template>

<script>
export default {
  methods: {
    change(status) {
      if (status) {
        this.visibility = "visibility:visible";
        this.switch_status = true;
        this.$Notice.info({
          title: "正在开启备份",
          desc:
            "检测到您正在开启备份，请完善相关设置，并点击[确认]按钮以后开启备份状态",
          duration: 7
        });
      } else {
        this.visibility = "visibility:hidden";
        this.switch_status = false;
        this.$Notice.warning({
          title: "正在关闭备份",
          desc:
            "检测到您正在关闭备份，若为误点击无需其他操作，如果意在关闭备份状态请点击[确认]按钮后生效",
          duration: 7
        });
      }
    },
    confirm() {
      this.$Modal.confirm({
        title: "请再次确认！",
        content: "您确定要"+((this.visibility=="visibility:visible")?'开启':'关闭')+"备份状态吗" ,
        onOk: () => {
          this.$Message.info("确认成功，当前备份状态："+((this.visibility=="visibility:visible")?'开启':'关闭'));
        },
        onCancel: () => {
          this.$Message.info("您取消了当前的操作");
        }
      });
    }
  },
  data() {
    return {
      visibility: "visibility:hidden",
      formItem: {
        frequency: "",
        date: "",
        note: ""
      }
    };
  },
};
</script>

<style>
.commit {
  margin: 10px 20px;
}
</style>