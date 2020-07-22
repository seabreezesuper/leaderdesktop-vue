<!-- 【人员管理】页面 -->
<template>
  <div>
    <!-- queryArea start -->
    <div id="queryArea">
      <el-form refs="userForm">
        <el-form-item>
        <table>
          <tr>
            <td colspan="8" class="elformtitle">【人员管理】查询</td>
          </tr>
          <tr>
            <td>
              <el-form-item prop="kbselect" class="date-td">
                课别：
                <!-- @change="kbChange" -->
                <select id="kbselect" name="kbselect" v-model="userForm.kbselect">
                  <option
                    v-for="kb in kblist"
                    :key="kb.optionKey"
                    :value="kb.optionKey"
                  >{{ kb.optionValue}}</option>
                </select>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="gcselect" class="date-td">
                工程：
                <select id="gcselect" name="gcselect" disabled v-model="userForm.gcselect"></select>
                <!-- @change="gcChange" -->
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="zbselect" class="date-td">
                拉别：
                <select id="zbselect" name="zbselect" disabled v-model="userForm.zbselect"></select>
              </el-form-item>
            </td>
            <td colspan="2">
              <el-form-item prop="userpdate" class="date-td">
                日期:
                <el-date-picker
                  id="userpdate"
                  class="el-date-picker-class"
                  v-model="userForm.userpdate"
                  align="right"
                  type="date"
                  size="mini"
                  placeholder="日期"
                  :picker-options="userForm.pickerOptions"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </td>
            <td>
              <el-button id="querybtn" type="primary" plain size="mini">&nbsp;查询&nbsp;</el-button>
              <el-button id="addbtn" type="primary" plain size="mini">&nbsp;新增&nbsp;</el-button>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item prop="zgselect" class="date-td">
                资格：
                <!-- @change="kbChange" -->
                <select id name="zgselect" v-model="userForm.kbselect">
                  <option
                    v-for="kb in kblist"
                    :key="kb.optionKey"
                    :value="kb.optionKey"
                  >{{ kb.optionValue}}</option>
                </select>
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="zgselect" class="date-td">
                职务：
                <select
                  id
                  name="gcselect"
                  disabled="disabled"
                  v-model="gcselect"
                  @change="gcChange"
                ></select>
              </el-form-item>
            </td>

            <td>
              <el-form-item prop="zgselect" class="date-td">
                入社日期:
                <el-date-picker
                  id="rushedtstart"
                  class="el-date-picker-class"
                  v-model="userForm.rushedtstart"
                  align="right"
                  type="date"
                  size="mini"
                  placeholder="开始日期"
                  :picker-options="userForm.pickerOptions"
                  @change="(value)=>dateChange(value, 'this.userFomr.rushedtstart')"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span>&nbsp;至&nbsp;</span>
                <el-date-picker
                  id="rushedtend"
                  class="el-date-picker-class"
                  v-model="userForm.rushedtend"
                  align="right"
                  type="date"
                  size="mini"
                  placeholder="结束日期"
                  :picker-options="userForm.pickerOptions"
                  @change="(value)=>dateChange(value, 'this.userFomr.rushedtend')"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </td>
            <td colspan="2">
              <input
                placeholder="请选择上传文件"
                id="file"
                name="file"
                type="file"
                style="width:120px;"
                size="mini"
              />
              <el-button id="uploadbtn" type="primary" plain size="mini">批量导入</el-button>
              <el-button id="uploadbtn" type="primary" plain size="mini">模板下载</el-button>
            </td>
            <td>
              <el-button id="dataDLbtn" type="primary" plain size="mini">数据下载</el-button>
              <el-button
                id="resetbtn"
                type="primary"
                plain
                size="mini"
                @click="resetForm('userForm')"
              >重置</el-button>
            </td>
          </tr>
          <tr>
            <td>
              <el-form-item prop="userno" class="date-td">
                工号:&nbsp;
                <input
                  v-model="userForm.userno"
                  placeholder="请输入工号"
                  id="userno"
                  name="userno"
                  type="text"
                />
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="zgselect" class="date-td">
                姓名:&nbsp;
                <input
                  v-model="userForm.username"
                  placeholder="请输入姓名"
                  id="username"
                  name="username"
                  type="text"
                />
              </el-form-item>
            </td>
            <td>
              <el-form-item prop="zgselect" class="date-td">
                入工会日期:
                <el-date-picker
                  id="datevalue1"
                  class="el-date-picker-class"
                  v-model="userForm.datevalue1"
                  align="right"
                  type="date"
                  size="mini"
                  placeholder="开始日期"
                  :picker-options="userForm.pickerOptions"
                  @change="dateChange"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
                <span>&nbsp;至&nbsp;</span>
                <el-date-picker
                  id="datevalue2"
                  class="el-date-picker-class"
                  v-model="userForm.datevalue2"
                  align="right"
                  type="date"
                  size="mini"
                  placeholder="结束日期"
                  :picker-options="userForm.pickerOptions"
                  @change="dateChange"
                  value-format="yyyy-MM-dd"
                ></el-date-picker>
              </el-form-item>
            </td>
            <td colspan="3">
              <el-button id="recoverbtn" type="primary" plain size="mini">恢复清单</el-button>
            </td>
          </tr>
        </table>
        </el-form-item>
      </el-form>
    </div>
    <!-- queryArea end -->
  </div>
</template>

<script>
//import x from ''
export default {
  components: {},
  data() {
    return {
      userForm: {
        kbselect: "",
        gcselect: "",
        zbselect: "",
        userno: "",
        username: "",
        userpdate: "",
        rushedtstart:"",
        rushedtend:"",
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
      },
        recordList: {
          recordList: []
        },
        currentPage: 1,
        currentTotal: 0,
        pageSize: 50,
        clickflag: false
    };
  },
  computed: {},
  methods: {
    //重置功能
    resetForm(formName) {
      //alert(formName);
      this.$nextTick(() => {
        // if (this.$refs[formName] != undefined) {
        this.$refs[formName].resetFields();
        console.log(this.$refs[formName].resetFields());
        // }
      });
    },
    dateChange(value, selectddt) {
       
      //alert("this.userpdate:" + this.userpdate);
      this.$nextTick(() => {
       var starttime = value;
       var endtime = selectddt;
        // if (selectddt.indexOf("start")!= -1){    
        //   starttime = value
        // }
        // else if (selectddt.indexOf("end")!= -1){
        //   endtime = value;   
        // }
        alert(starttime);
        alert(endtime);
        // if (
        //   starttime != null &&
        //   starttime != "" &&
        //   endtime != null &&
        //   endtime != ""
        // ) {
        //   // if (val==1){
        //     var checkTime = this.getDate(endtime) - this.getDate(starttime);
        //     if (checkTime < 0) {
        //       alert("入社开始日期不能大于结束日期！");
        //     }
        //   // }
        //   // else if (val == 2){

        //   // }
        // }
      });
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
    }
    /*
    ,
    kbChange: function() {
      var queryForm = this.$refs["queryForm"];
      var dept = queryForm.kbselect.value;

      if (dept != null && dept != "") {
        // 更新工程下拉菜单
        // axios提交数据
        this.axios({
          method: "get",
          async: false,
          cache: false,
          url: "/ajaxGclist/" + this.loginUserId + "/" + dept
        })
          .then(res => {
            // ajax请求返回200
            //console.log(res.data.flag);
            if (res.status == 200) {
              if (res.data != null) {
                var objSelect = queryForm.gcselect;
                objSelect.innerHTML = "";

                var newOption = new Option("", "");
                objSelect.options.add(newOption);

                for (var i = 0; i < res.data.length; i++) {
                  var projectCd = res.data[i]["optionKey"];
                  var projectName = res.data[i]["optionValue"];
                  newOption = new Option(projectName, projectCd);
                  objSelect.options.add(newOption);
                }

                // 如果上次有选择工程，则恢复所选项
                var lastSelectedProject = queryForm.hidprojcd.value;
                for (var j = 0; j < objSelect.options.length; j++) {
                  var dept = objSelect.options[j].value;
                  if (dept == lastSelectedProject) {
                    objSelect.options[j].selected = true;
                  }
                }
              }
              objSelect.disabled = false;

              // 清空组别,并设为disabled
              queryForm.zbselect.innerHTML = "";
              queryForm.zbselect.disabled = true;
            } else {
              this.$message({
                type: "error",
                message: res.status
              });
            }
          })
          .catch(err => {
            this.$message({ type: "error", message: err });
            this.$message({ type: "error", message: "所请求的页面有异常！" });
            console.log(err);
          });
      } else {
        // 清空modelSerial,并设为disabled
        queryForm.gcselect.innerHTML = "";
        queryForm.gcselect.disabled = true;

        // 清空modelCode,并设为disabled
        queryForm.zbselect.innerHTML = "";
        queryForm.zbselect.disabled = true;
      }
    },
    gcChange: function() {
      var queryForm = this.$refs["queryForm"];
      var dept = queryForm.kbselect.value;
      var proj = queryForm.gcselect.value;

      if (proj != null && proj != "") {
        // 更新组别/拉别下拉菜单
        // axios提交数据
        this.axios({
          method: "get",
          url: "/ajaxZblist/" + this.loginUserId + "/" + dept + "/" + proj
        })
          .then(res => {
            // ajax请求返回200
            //console.log(res.data.flag);
            if (res.status == 200) {
              if (res.data != null) {
                var objSelect = queryForm.zbselect;
                objSelect.innerHTML = "";

                var newOption = new Option("", "");
                objSelect.options.add(newOption);

                for (var i = 0; i < res.data.length; i++) {
                  var lineCd = res.data[i]["optionKey"];
                  var lineName = res.data[i]["optionValue"];
                  newOption = new Option(lineName, lineCd);
                  objSelect.options.add(newOption);
                }

                // 如果上次有选择拉别，则恢复所选项
                var lastSelectedLine = queryForm.hidlinecd.value;
                for (var j = 0; j < objSelect.options.length; j++) {
                  var line = objSelect.options[j].value;
                  if (line == lastSelectedLine) {
                    objSelect.options[j].selected = true;
                  }
                }
              }
              objSelect.disabled = false;
            } else {
              this.$message({
                type: "error",
                message: res.status
              });
            }
          })
          .catch(err => {
            this.$message({ type: "error", message: err });
            this.$message({ type: "error", message: "所请求的页面有异常！" });
            console.log(err);
          });
      } else {
        // 清空modelSerial,并设为disabled
        queryForm.gcselect.innerHTML = "";
        queryForm.gcselect.disabled = true;

        // 清空modelCode,并设为disabled
        queryForm.zbselect.innerHTML = "";
        queryForm.zbselect.disabled = true;
      }
    },
    funClear() {
      alert(this.userpdate);
      this.userno = "";
      this.username = "";
      this.op_content = "";
      this.pageSize = 50;
      this.currentPage = 1;
      this.recordList.recordList = null;
      this.currentTotal = 0;
      var downloadbtn = document.getElementById("downloadbtn");
      downloadbtn.disabled = true;
      this.clickflag = false;
    }
    // handleSizeChange(val) {
    //   this.pageSize = val;
    //   //   this.getUserList();
    //   console.log(`每页 ${val} 条`);
    // },
    // handleCurrentChange(val) {
    //   this.currentPage = val;
    //   //   this.getUserList();
    //   console.log(`当前页: ${val}`);
    // }
    */
  },
  mounted() {
    // var datepicker1 = document.getElementById("datevalue1");
    // var datepicker2 = document.getElementById("datevalue2");
    // datepicker1.parentNode.style.width = "130px";
    // datepicker2.parentNode.style.width = "130px";
    // datepicker1.parentNode.style.height = "30px";
    // datepicker2.parentNode.style.height = "30px";
  },
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
/* 按钮样式 */
.el-button--primary {
  width: 100px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 2px 15px;
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

#queryArea {
  /* margin:20px 0; */
  margin: auto;
}

#queryArea .center {
  text-align: center;
}

#queryArea .label {
  width: 80px;
  text-align: center;
  font-size: 18px;
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

#queryArea tr {
  background-color: #e0dfde;
  border-color: #000000;
}

#queryArea td {
  padding: 0;
  border: 1px solid #ffffff;
  text-align: center;
}

#queryArea .btnM {
  width: 90px;
}

#queryArea .title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  font-family: Arial;
}

#queryArea select {
  width: 100px;
}

.elformtitle {
  font-size: 18px;
}

.date-td {
  float: left;
  border: red solid 1px;
}
.el-form-item {
  margin-bottom: 0px;
}
.el-form-item /deep/ .el-form-item__content {
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
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 40%;
}
</style>