<template>
  <div id="info">
    <!-- queryArea start -->
    <div id="queryArea">
      <form ref="queryForm">
        <input type="hidden" id="permission" name="permission" th:value="${session.userpermis}" />
        <input type="hidden" id="hiddeptcd" name="hiddeptcd" th:value="${kbselect}" />
        <input type="hidden" id="hidprojcd" name="hidprojcd" th:value="${gcselect}" />
        <input type="hidden" id="hidlinecd" name="hidlinecd" th:value="${zbselect}" />

        <table>
          <tr class="center">
            <td colspan="13" class="label">【信息管理】查询条件</td>
          </tr>
          <tr>
            <td colspan="2">
              课别：
              <select id="kbselect" name="kbselect" v-model="kbselect" @change="kbChange">
                <option
                  v-for="kb in kblist"
                  :key="kb.optionKey"
                  :value="kb.optionKey"
                >{{ kb.optionValue}}</option>
              </select>
            </td>
            <td colspan="2">
              工程：
              <select
                id="gcselect"
                name="gcselect"
                disabled="disabled"
                v-model="gcselect"
                @change="gcChange"
              ></select>
            </td>
            <td colspan="2">
              拉别：
              <select id="zbselect" name="zbselect" disabled="disabled" v-model="zbselect"></select>
            </td>
            <td colspan="2"></td>
            <td rowspan="2" colspan="5">
              <el-button type="primary" size="mini" plain @click="queryInfo" >查询</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              工号：&nbsp;
              <input id="uUsrno" name="uUsrno" type="text" th:value="${uUsrno}" />
            </td>
            <td colspan="2">
              姓名：&nbsp;
              <input id="uUsrName" name="uUsrName" type="text" th:value="${uUsrName}" />
            </td>
            <td colspan="2">
              资格：
              <select id="identity">
                <option
                  v-for="iden in identitylist"
                  :key="iden.mTypeCode"
                  :value="iden.mTypeCode"
                >{{iden.mTypeDesc}}</option>
              </select>
            </td>
            <td colspan="2"></td>
          </tr>
        </table>
      </form>
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

    <!-- resultArea start -->
    <div id="resultArea" ref="resultArea">
      <table>
        <thead>
          <tr class="title">
            <th>序号</th>
            <th>课别</th>
            <th>工程</th>
            <th class="longwidth">拉别/组别</th>
            <th>工号</th>
            <th>姓名</th>
            <th class="longwidth">岗位</th>
            <th class="shortwidth">资格</th>
            <th>4M管理</th>
            <th>离岗管理</th>
            <th>岗位管理</th>
            <th>奖惩管理</th>
          </tr>
        </thead>

        <tbody v-if="recordList == null">
          <tr class="resultData">
            <td colspan="12">暂无数据</td>
          </tr>
        </tbody>

        <tbody v-if="recordList != null">
          <tr v-for="rs in recordList.recordList" :key="rs.serialNO">
            <td>{{rs.serialNO}}</td>
            <td>{{rs.deptValue}}</td>
            <td>{{rs.projValue}}</td>
            <td>{{rs.lineValue}}</td>
            <td>{{rs.userNo}}</td>
            <td>{{rs.userName}}</td>
            <td class="longwidth">{{rs.postValue}}</td>
            <td class="shortwidth">{{rs.identityValue}}</td>
            <td
              v-if="rs.lineValue == null"
              :class="'type_'+rs.deptValue+rs.projValue+rs.lineValue"
            >／</td>
            <td v-if="rs.lineValue != null" :class="'type_'+rs.deptValue+rs.projValue+rs.lineValue">
              <a
                href="#"
                @click="'ajaxReport4m('+rs.deptCd+','+rs.projCd+','+rs.lineCd+')'"
              >录入</a>
            </td>
            <td>
              <div>
                <a href="#">离岗</a>
              </div>
            </td>
            <td v-if="rs.lineValue == null">／</td>
            <td v-if="rs.lineValue != null">
              <a
                href="#"
                th:onclick="'ajaxUserPost(\''+${rs.userId}+'\',\''+${rs.userNo}+'\',\''+${rs.userName}+'\',\''+${rs.deptValue}+'\',\''+${rs.projValue}+'\',\''+${rs.deptCd}+'\',\''+${rs.projCd}+'\')'"
              >录入</a>
            </td>
            <td>
              <a
                href="#"
                th:onclick="'ajaxReward(\''+${rs.userId}+'\',\''+${rs.userNo}+'\',\''+${rs.userName}+'\')'"
              >录入</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <!-- resultArea end -->
</template>

<script>
export default {
  data() {
    return {
      loginUserId: JSON.parse(sessionStorage.getItem("sessionData"))
        .loginuserid,
      loginpermiss: JSON.parse(sessionStorage.getItem("sessionData"))
        .loginpermiss,
      kbselect: "",
      gcselect: "",
      zbselect: "",
      kblist: [
        {
          optionKey: "",
          optionValue: ""
        },
        {
          optionKey: "2",
          optionValue: "TH"
        },
        {
          optionKey: "1",
          optionValue: "CP"
        },
        {
          optionKey: "4",
          optionValue: "IC"
        }
      ],
      identitylist: [
        { mTypeCode: -1, mTypeDesc: "" },
        { mTypeCode: 1, mTypeDesc: "A" },
        { mTypeCode: 2, mTypeDesc: "B" },
        { mTypeCode: 3, mTypeDesc: "C" }
      ],
      recordList: {
        recordList: []
      },
      currentPage: 1,
      currentTotal: 0,
      pageSize: 50
    };
  },
  methods: {
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
    queryInfo: function() {
      // axios提交数据
      var postData = {
        loginUserId: this.loginUserId,
        permission: this.loginpermiss,
        deptCd: this.kbselect,
        projCd: this.gcselect,
        lineCd: this.zbselect,
        userNo: "",
        userName: "",
        identityCd: "",
        pageSize: this.pageSize,
        page: this.currentPage
      };

      this.axios({
        method: "post",
        url: "/infoList",
        data: postData
      })
        .then(res => {
          // ajax请求返回200
          console.log(res.data);
          if (res.status == 200) {
            this.$nextTick(() => {
              this.recordList.recordList = res.data.recordList;
              this.currentTotal = res.data.recordCount;
              //this.cellMerge();
            });
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
    },
    cellMerge: function() {
      // 遍历class属性值以"type_"打头的单元格
      this.$nextTick(() => {
        var tdElements;
        var count = 0;

        tdElements = document.querySelectorAll("td[class^='type_']");

        var lastLine = tdElements.item(0).getAttribute("class");

        tdElements.forEach(item => {
          count++;

          var line = item.getAttribute("class");
          console.log(line);

          // 一旦换了一个line，则对上一拉进行单元格合并
          if (line != lastLine) {
            var objArr = document.querySelectorAll(
              "td[class='" + lastLine + "']"
            );

            if (objArr.length > 1) {
              objArr.item(0).setAttribute("rowspan", objArr.length);
              objArr.item(0).className = objArr
                .item(0)
                .className.replace(
                  new RegExp("(\\s|^)" + lastLine + "(\\s|$)"),
                  ""
                );

              //移除相同class的td标签
              var processedObjArr = document.querySelectorAll(
                "td[class='" + lastLine + "']"
              );
              processedObjArr.forEach(obj => {
                console.log(obj);
                obj.parentNode.removeChild(obj);
              });
            }

            lastLine = line;
          }
          //遍历到最后一个td，将本line合并
          if (count == tdElements.length) {
            objArr = document.querySelectorAll("td[class='" + line + "']");

            if (objArr.length > 1) {
              objArr.item(0).setAttribute("rowspan", objArr.length);
              //objArr[0].className=setAttribute("class", "");
              objArr.item(0).className = objArr
                .item(0)
                .className.replace(
                  new RegExp("(\\s|^)" + line + "(\\s|$)"),
                  ""
                );

              //console.log(objArr);

              //移除相同class的td标签
              processedObjArr = document.querySelectorAll(
                "td[class='" + line + "']"
              );
              processedObjArr.forEach(obj => {
                //console.log(obj);
                obj.parentNode.removeChild(obj);
              });
            }
          }
        });
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.queryInfo();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.queryInfo();
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    this.queryInfo();
  }
};
</script>

<style scoped>
/* 按钮样式 */
.el-button--primary  {
  width: 100px;
}
.el-button--mini, .el-button--mini.is-round{
  padding: 2px 15px;
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
  width: 7%;
  text-align: center;
  padding-left: 10;
}

#queryArea .btnS {
  width: 80px;
}

#queryArea .btnM {
  width: 90px;
}

#queryArea .title {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  font-family: Arial;
}

#queryArea input {
  width: 90px;
}

#queryArea select {
  width: 100px;
}

#mainFrame {
  width: 100%;
  height: 100%;
}

#mainFrame2 {
  width: 400px;
  text-align: center;
  margin: 0 auto;
}

#resultArea {
  text-align: center;
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
  border: 1px solid #ffffff;
}

#resultArea th input {
  vertical-align: middle;
  margin-top: -2px;
  margin-bottom: 1px;
}

#resultArea td {
  padding: 0;
  border: 1px solid #ffffff;
  width: 6%;
}

.longwidth {
  padding: 0;
  border: 1px solid #ffffff;
  width: 8%;
}

.shortwidth {
  padding: 0;
  border: 1px solid #ffffff;
  width: 4%;
}

#resultArea a:visited {
  color: #8000ff;
}

#resultArea a {
  color: #0000ff;
}

#infoBox {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -150px 0 0 -200px;
  width: 400px;
  height: 300px;

  text-align: center;
  line-height: 25px;
  font-size: 14px;
}

#infoBox li {
  list-style-type: none;
}

#infoBox .msg {
  color: red;
  margin-bottom: 20px;
}

#infoBox input {
  margin: auto 20px;
}

.userLeave {
  position: absolute;
  top: 30%;
  left: 50%;
  margin: -17px 0 0 -317px;
  width: 500px;
  height: 380px;

  z-index: 99;
  display: none;

  text-align: center;
  line-height: 25px;
  font-size: 14px;
  border-right: #ffffff 1px solid;
  border-top: #ffffff 1px solid;
  border-left: #ffffff 1px solid;
  border-bottom: #ffffff 1px solid;
  background-color: #ffffff;
}
#ulInputContent {
  height: auto;
  border-top: #ffffff 1px solid;
  text-align: left;
}
#ulInputTitle {
  height: 25px;
  background-color: #228fbd;
  font-weight: bold;
  color: white;
}
#ulInputContent ul {
  margin-top: 30px;
}

#ulInputContent li {
  list-style-type: none;
  height: 30px;
}
#ulInputContent input {
  width: 100px;
}

#ulInputButton {
  margin: 36px 0 0 15px;
}

#page {
  height: 35px;
  /* width: 100%; */
  /*  鏂板start  */
  width: auto;
  margin: auto;
  /* 鏂板end */

  background-color: #99CCFF;
  font-size: 10px;
  text-align: left;
  color: black;
}

#pageinfo {
  text-align: left;
  color: #ffffff;
  padding: 5px 210px;
  font-size: 16px;
  float: left;
}

.current {
  border: solid 1px #000099;
  padding: 2px 5px;
  font-weight: bold;
  margin: 2px;
  color: #fff;
  background-color: #000099;
}

#mask {
  width: 100%;
  height: 100%;
  filter: alpha(opacity=80);
  opacity: 0.3;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 98;
  display: none;
  background: #fff;
}

#mask iframe {
  width: 100%;
  height: 100%;
  filter: alpha(opacity=0);
  opacity: 0;
  border: 0px;
  display: none;
}

#eaInputTitle {
  height: 25px;
  background-color: #228fbd;
  font-weight: bold;
  color: white;
}

#eaInputContent {
  height: auto;
  border-top: #ffffff 1px solid;
  text-align: left;
}

#eaInputContent li {
  list-style-type: none;
  height: 30px;
}

#eaInputContent select {
  width: 120px;
}

#unlock {
  position: absolute;
  top: 30%;
  left: 50%;
  margin: -102px 0 0 -120px;
  width: 360px;
  height: 220px;

  z-index: 99;
  display: none;

  text-align: center;
  line-height: 25px;
  font-size: 14px;
  border-right: #ffffff 1px solid;
  border-top: #ffffff 1px solid;
  border-left: #ffffff 1px solid;
  border-bottom: #ffffff 1px solid;
  background-color: #ffffff;
}

.passWidth {
  padding: 0;
  border: 1px solid #c0c0c0;
  width: 200px;
}

/* 绂诲矖鏃堕暱鏄惁瓒呰繃15鍒� 鑳屾櫙鑹� 闂儊  鈫�*/
.headerBox {
  background-color: #ffff66;
  color: #fff;
  animation: fade 600ms infinite;
  -webkit-animation: fade 600ms infinite;
}
@keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}
@-webkit-keyframes fade {
  from {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

.leaveTimeout {
  opacity: 0.6;
}
/* 绂诲矖鏃堕暱鏄惁瓒呰繃15鍒� 鑳屾櫙鑹� 闂儊  鈫�*/
</style>