<template>
  <div>
    <!-- queryArea start -->
    <div id="queryArea">
      <el-form :model="operationLogForm" ref="operationLogForm">
        <el-form-item>
        <table>
          <tr>
            <td colspan="7" class="elformtitle">【操作日志】查询</td>
          </tr>
          <tr>
            <td>
              <el-form-item prop="userno" class="el-form-item-td">
              工号:&nbsp;
              <input
                v-model="operationLogForm.userno"
                placeholder="请输入工号"
                id="userno"
                name="userno"
                type="text"
              />
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="username" class="el-form-item-td">
              姓名:&nbsp;
              <input
                v-model="operationLogForm.username"
                placeholder="请输入姓名"
                id="username"
                name="username"
                type="text"
              />
              </el-form-item>
            </td>
            <td>   
              <el-form-item prop="datevalue" class="el-form-item-td">
                <esldatepicker ref="resetdate" :datevalue1="operationLogForm.datevalue1" 
                :datevalue2="operationLogForm.datevalue2" dttitle="操作日期:" @getSelectedDT="getDateFromDatepicker"></esldatepicker>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="op_content" class="el-form-item-td">
              操作内容:
              <input
                v-model="operationLogForm.op_content"
                placeholder="请输入操作内容"
                id="op_content"
                name="op_content"
                type="text"
              />
              </el-form-item>
            </td>
            <td>
              <el-button type="primary" size="mini" plain @click="getList">查询</el-button>
            </td>
            <td>
              <el-button type="primary" @click="resetForm('operationLogForm')" size="mini" plain>重置</el-button>
            </td>
            <td>
              <el-button
                type="primary"
                id="downloadbtn"
                :disabled="isDisabled"
                size="mini"
                plain
                @click="handleDownLoad"
              >下载</el-button>
            </td>
          </tr>
        </table>
        </el-form-item>
      </el-form>
    </div>
    <!-- queryArea end -->
    <div id="page" v-if="recordList != null">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[20, 50, 100, 200]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="currentTotal"
      ></el-pagination>
    </div>

    <div id="resultArea">
      <table>
        <thead>
          <th class="shortwidth">序号</th>
          <th class="shortwidth">工号</th>
          <th class="shortwidth">姓名</th>
          <th class="shortwidth">操作类别</th>
          <th>操作内容</th>
          <th>操作者IP</th>
          <th>操作时间</th>
        </thead>
        <tbody v-if="recordList == null" :class="resultData">
          <tr :class="resultData">
            <td colspan="7">暂无数据</td>
          </tr>
        </tbody>
        <tbody v-if="recordList != null">
          <tr v-for="ol in recordList.recordList" :key="ol.serialNO">
            <td class="shortwidth">{{ol.serialNO}}</td>
            <td class="shortwidth">{{ol.usrno}}</td>
            <td class="shortwidth">{{ol.userName}}</td>
            <td class="shortwidth">{{ol.operateType}}</td>
            <td :title="ol.operateContent" class="content">{{ol.operateContent}}</td>
            <td>{{ol.operateIP}}</td>
            <td>{{ol.operateDT|moment}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import esldatepicker from '@/components/esl-datepicker'
import {validateDate} from '@/utils/validate.js'
export default {
  components: {
    esldatepicker
  },
  data() {
    return {
      operationLogForm: {
        userno: "",
        username: "",
        op_content: "",
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
        },
        datevalue1: "",        
        datevalue2: ""       
      },
      recordList: {
        recordList: []
      },
      currentPage: 1,
      currentTotal: 0,
      pageSize: 50,
      clickflag: false,
      isDisabled:true 
    };
  },
  methods: {
    getList: async function() {
      //this.$nextTick(() => {
       var validdate = validateDate(this.operationLogForm.datevalue1,this.operationLogForm.datevalue2);
      //});
      // 
    
      // axios提交数据
      if (!validdate) {        
        alert("开始日期不能大于结束日期！");
      } else {
        var startdt = this.operationLogForm.datevalue1;
        var enddt = this.operationLogForm.datevalue2;
        var postData = {
          userid: this.operationLogForm.userno,
          username: this.operationLogForm.username,
          opContent: this.operationLogForm.op_content,
          logstart: startdt,
          logend: enddt,
          limit: this.pageSize,
          page: this.currentPage
        };
        await this.axios({
          method: "post",
          url: "/getList",
          data: postData
        })
          .then(res => {
        //     // ajax请求返回200
            // console.log(res);
            if (res.status == 200) {              
              this.recordList.recordList = res.data.recordList;
              this.currentTotal = res.data.recordCount;
              //var downloadbtn = document.getElementById("downloadbtn");
              if (res.data.recordCount > 0) {
                this.isDisabled=false;
              } else {
                this.isDisabled = true;
              }
            } else {
              this.$message({
                type: "error",
                message: res.status
              });
            }
          })
          .catch(err => {
            this.$message({ type: "error", message: err });
            //   this.$message({ type: "error", message: "所请求的页面有异常！" });
            console.log(err);
          });
      }
      
    },
    getDateFromDatepicker(value1, value2){
      this.operationLogForm.datevalue1=value1
      this.operationLogForm.datevalue2=value2   
    },
    //重置功能
    resetForm(formName) {
      this.$nextTick(() => {
        // if (this.$refs[formName] != undefined) {
          this.$refs[formName].resetFields();
          //console.log(this.$refs[formName].resetFields());
        // }
        var resetobj = this.$refs["resetdate"];
        console.log(resetobj);
        resetobj.datevalue1="";
        resetobj.datevalue2="";
        this.operationLogForm.datevalue1="";
        this.operationLogForm.datevalue2="";
        
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
      console.log(`当前页: ${val}`);
    },
    handleDownLoad: function() {
      var userid = this.operationLogForm.userno; // 工号
      var username = this.operationLogForm.username; //姓名
      var logstart = this.operationLogForm.datevalue1; // 起始时间
      var logend = this.operationLogForm.datevalue2; // 结束时间
      var opcontent = this.operationLogForm.op_content;
      var page = 1; // 当前页数
      var limit = 65536; // 每页条数
      this.handleClickDLbtn();
      if (this.clickflag) {
        window.location.href =
          "http://172.16.183.129:8101/logdownload?" +
          "userid=" +
          userid +
          "&username=" +
          encodeURIComponent(username) +
          "&logstart=" +
          logstart +
          "&logend=" +
          logend +
          "&opContent=" +
          encodeURIComponent(opcontent) +
          "&page=" +
          page +
          "&limit=" +
          limit;
      }
    },
    handleClickDLbtn: function() {
      var iCount = 10000;
      // if (this.currentTotal>=20000){
      //   iCount = 15000;
      // }
      this.clickflag = true;     
      this.isDisabled = true;
      setTimeout(() => {
        this.clickflag = false;
        this.isDisabled = false;
      }, iCount);
    }
  },
  mounted() {}
};
</script>

<style scoped>
/* 按钮样式 */
.el-button--primary {
  width: 100px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 2px 15px;
}

#queryArea table {
  width: 100%;
  background-color: #ffffff;
  font-size: 12px;
  border: 0;
  margin: 0;
  border-collapse: collapse;
  border-spacing: 0;
}

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

.elformtitle {
  font-size: 18px;
}

.el-form table {
  width: 100%;
  background-color: #ffffff;
  border-collapse: collapse;
  border-spacing: 0;
}
.el-form tr {
  background-color: #e0dfde;
  border-color: #000000;
}
.el-form td {
  padding: 0;
  border: 1px solid white;
  text-align: center;
}
.date-td{  
  float: left;
  border: red solid 0px;
}

.el-form-item-td{
  text-align: center;
}
.el-form-item{
  margin-bottom:0px;
}
.el-form-item /deep/ .el-form-item__content{
  line-height: 25px;  
  font-size: 12px;
}

#page {
  height: 35px;
  /* width: 100%; */
  width: auto;
  margin: auto;

  background-color: #228fbd;
  font-size: 10px;
  text-align: left;
  color: black;
}

#resultArea {
  text-align: center;
  width: 100%;
}

#resultArea table {
  width: 100%;
  background-color: #ffffff;
  line-height: 25px;
  font-size: 12px;
  border: 0;
  margin: 0;
  border-collapse: collapse;
  border-spacing: 0;
}

#resultArea tr {
  background-color: #e4edf9;
  border-color: #000000;
}

#resultArea th {
  padding: 0;
  background-color: #dfdfdf;
  border: 0px solid #f50606;
}

#resultArea td {
  padding: 0;
  border: 1px solid #ffffff;
  word-wrap: break-word;
}

#resultArea .resultData {
  background-color: #dfdfdf;
  border-color: #000000;
  height: 100%;
}

#resultArea a:visited {
  color: #8000ff;
}

#resultArea .hidden {
  display: none;
}

.shortwidth {
  padding: 0;
  border: 1px solid #ffffff;
  width: 10%;
}
.content {
  margin: 0 auto;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 40%;
}
</style>