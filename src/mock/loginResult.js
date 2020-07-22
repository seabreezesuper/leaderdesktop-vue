let Mock = require('mockjs');

let loginResult = Mock.mock({
    loginuserid: 1,
    loginuserno: 'ADMIN',
    loginusername: '系统管理员',
    loginuserdeptid: '2',
    loginuserdeptname: 'CP',
    loginpermiss:'',
    logindate:'@now("second")',
    flag:true,
    msg:'hello'
})

export default {
    'post|/login': () => {
        return loginResult;
    }
}