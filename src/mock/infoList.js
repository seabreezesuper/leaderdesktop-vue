let Mock = require("mockjs");

let infoList = Mock.mock({
    status: 200,
    message: "success",
    flag: true,
    recordCount: 120,    
    "recordList|50": [{
        "serialNO|+1": 1,
        "deptCd|1": ["1", "2", "3"],
        "deptValue|1": ["TH", "CP", "IC"],
        "projCd|1": ["1", "2", "3"],
        "projValue|1": ["PUMP", "流路制造", "捆包"],
        "lineCd|1": ["1", "2", "3"],
        "lineValue|1": ["CXA", "CXB", "SXA"],
        "userId|1-1000": 2,
        "userNo|10000-99999": 10000,
        userName: "@cname",
        "postCd|1": ["1", "2", "3"],
        "postValue|1": ["供给孔熔接", "逆止帽熔接", "标签贴付"],
        "identityCd|1": ["1", "2", "3"],
        "identityValue|1":["A", "B", "C"],
        pdate: "@date('yyyy-MM-dd')",
        "tState|1": true,
        tReplaceUserid: "hello",
        tDestination: "hello",
        tHasLeavecard: "hello",
        leaveDt: "hello",
        leaveId: "hello",
        tRemark: "hello"
    }]
})

export default {
    "post|/infoList": () => {
        return infoList
    }
}