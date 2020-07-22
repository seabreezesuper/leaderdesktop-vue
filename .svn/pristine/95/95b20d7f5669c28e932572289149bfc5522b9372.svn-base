<!-- 组件说明 -->
<template>
  <div class>
      {{dttitle}}
      <el-date-picker
        id="datevalue1"
        class="el-date-picker-class"
        align="right"
        type="date"
        size="mini"
        placeholder="开始日期"
        value-format="yyyy-MM-dd"
        @change="dateChange"
        v-model="datevalue1"
        :picker-options="pickerOptions"
      ></el-date-picker>
      <span>&nbsp;至&nbsp;</span>
      <el-date-picker
        id="datevalue2"
        class="el-date-picker-class"
        align="right"
        type="date"
        size="mini"
        style="height:20px"
        placeholder="结束日期"
        value-format="yyyy-MM-dd"
        @change="dateChange"
        v-model="datevalue2"
        :picker-options="pickerOptions"
      ></el-date-picker>
  </div>
</template>

<script>
import {validateDate} from '@/utils/validate.js'
export default {
  components: {},
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  props: ["dttitle","datevalue1","datevalue2"],
  computed: {},
  methods: {
    dateChange() {
      // this.$nextTick(() => {
        var starttime = this.datevalue1; //document.getElementById("datevalue1").value.trim();
        var endtime = this.datevalue2; //document.getElementById("datevalue2").value.trim();
      var validdate = validateDate(starttime,endtime);
      //});
      // axios提交数据
      if (!validdate) {        
        alert("开始日期不能大于结束日期！");
      }
      
      this.$emit('getSelectedDT',this.datevalue1, this.datevalue2);
        // if (
        //   starttime != null &&
        //   starttime != "" &&
        //   endtime != null &&
        //   endtime != ""
        // ) {
        //   var checkTime = this.getDate(endtime) - this.getDate(starttime);
        //   this.$emit('getSelectedDT',this.datevalue1, this.datevalue2);
        //   if (checkTime < 0) {
        //     return false;
        //   }
        //   else{
        //     return true;
        //   }
        // }
        // else{
        //   return true;
        // }
      // });
    },
    getDate(date) {
      if (date != null) {
        var dates = date.split("-");
        var dateReturn = "";
        for (var i = 0; i < dates.length; i++) {
          dateReturn += dates[i];
        }
        return dateReturn;
      }
    },
    resetDate(){

    }
  },
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style scoped>
/* 日期样式 */
.el-date-picker-class {
  border: red solid 0px;
  width: 130px;
  margin: 1px;
}

.el-date-picker-class /deep/ .el-input__inner {
  height: 20px;
  line-height: 20px;
}

.el-date-picker-class /deep/ .el-input__icon {
  line-height: 20px;
}
</style>