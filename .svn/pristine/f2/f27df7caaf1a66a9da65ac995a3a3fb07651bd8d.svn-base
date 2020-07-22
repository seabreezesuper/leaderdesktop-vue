let Mock = require("mockjs");

let operationLogList = Mock.mock({
    recordCount: 120,    
    "recordList|50": [{
        "serialNO|+1": 1,
        "usrno|1": ["TEST001","ADMIN","TEST002","TEST003","TEST004","TEST005","TEST006"],
        userName: "@cname",
        "operateType|1":["新增","修改","编辑"],
        "operateContent|1": ["用户对4M报表进行了班长确认：4M002023018120200630", 
                        "用户对4M报表进行了组长确认：T4mMainVo [t4mId=4M002023018220200629]", 
                        "用户更新了4M报表草稿：Report4MVo [loginUserName=胡平, t4mId=4M001009007120200701, lineCd=71, lineValue=VAA]", 
                        "用户更新了4M报表草稿：Report4MVo [loginUserName=胡平, t4mId=4M001009007120200629, lineCd=71, lineValue=VAA]", 
                        "用户对4M报表进行了组长确认：T4mMainVo [t4mId=4M001009007120200618]", 
                        "用户更新了4M报表草稿：Report4MVo [loginUserName=胡平, t4mId=4M001009007120200617, lineCd=71, lineValue=VAA]"],
        "operateIP|1": ["172.16.166.139", "172.16.211.85", "172.16.166.139", "172.16.181.232", "172.16.181.58", "172.16.211.76"],
        operateDT: "@date('yyyy-MM-dd')"
    }]
})

export default {
    "post|/getList": () => {
        return operationLogList
    }
}