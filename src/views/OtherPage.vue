<template>
  <table>
    <tr v-for="entry in deptMap" :key="entry.key">
      <td class="dept">{{ entry.key }}</td>
      <td class="system">
        <div v-for="entry2 in entry.value" :key="entry2.key" id="rightdiv">
          <a th:href="#" target="_blank">
            <div class="urldiv">
              <div class="systemdiv">{{ entry2.key }}</div>
            </div>
          </a>
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  data() {
    return {
      deptMap: [
        {
          key: "IC",
          value: [
            {
              key: "点检信息查询",
              value: { mAutosign: 1, mSysurl: "http://172.16.73.230:8083" }
            },
            {
              key: "AGCS数据查询",
              value: { mAutosign: 1, mSysurl: "http://172.16.73.152" }
            }
          ]
        },
        {
          key: "TH",
          value: [
            {
              key: "PWP生产数据制卡软件",
              value: {
                mAutosign: 1,
                mSysurl:
                  "//172.16.73.62/THPWP_LiveUP/thpwp/thcard20190514/card_2.9.exe"
              }
            },
            {
              key: "每日生产状况查询",
              value: {
                mAutosign: 1,
                mSysurl:
                  "http://172.16.73.96:8080/thpwpReport/DailyReport.do?action=load"
              }
            }
          ]
        }
      ]
      //url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    };
  }
};
</script>

<style scoped>
table {
  width: 100%;
  /* 各单元格到table边框的间距 */
  padding: 10px 10px;
  /* table中各tr的间距 */
  border-collapse: separate;
  border-spacing: 0px 5px;
  background-color: #dfdfdf;
}

tr {
  height: 85px;
}

.dept {
  margin-top: 10px;
  /* 左边td的圆角 */
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  text-align: center;
  width: 10%;
  height: 40px;
  border-top: solid 1.5px #c0c0c0;
  border-left: solid 1.5px #c0c0c0;
  /* 左边td的右边框宽度设为0 */
  border-right: solid 0px blue;
  border-bottom: solid 1.5px #c0c0c0;
  /*背景色*/
  background-color: #e3e7e2;
}
#rightdiv {
  width: 16%;
  height: 100%;
  border: 0px solid;
  float: left;
}
.system {
  /* 右边td的圆角 */
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 80%;
  height: auto;
  border: solid 1.5px #c0c0c0;
  background-color: #dddddd;
}

.systemdiv {
  font-size: 12px;
  padding-top: 10px;
  margin: 10px 10px;
  text-align: center;
  float: left;
  width: 80%;
  height: 41px;
  border: solid 1px #bbbbbb;
  color: #000000; /*字体颜色*/
  /*div的背景色*/
  background-color: #f0f0f0;
  /*background: url(img/bg4.png) repeat;*/
  background-size: 100% 100%;
}

.urldiv {
  padding-top: 0;
  margin: 0 0;
  text-align: center;
  float: left;
  width: 100%;
  height: 81px;
  /*border: solid 1px red;*/
  color: #000000; /*字体颜色*/
  /*div的背景色*/
  /*background-color: #f0f0f0;*/
  /*background: url(img/bg4.png) repeat;*/
  background-size: 100% 100%;
}

.systemdiv:hover {
  font-size: 14px;
  color: #ff4500; /*字体颜色*/
  cursor: pointer;
  /*背景色和鼠标悬停阴影*/
  /*background-color: #00FF00;*/
  /*background: url(img/bg5.png) repeat;*/
  /*background: url(img/bg4.png) repeat;*/
  border: solid 1.5px #515151;
  background-size: 100% 100%;
  box-shadow: 10px 10px 5px #888888;
}
</style>