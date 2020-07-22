import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)

// 引入svg文件夹下面所有的svg文件
// 单个打包例的话：import xxxIcon from './svg/xxx.svg'
const req = require.context('./svg', false, /\.svg$/)

// 上面调用方法，到底返回的是一个map
// var map = {
// 	"./A.svg": "./svg/A.svg",
// 	"./B.svg": "./svg/B.svg",
// 	"./C.svg": "./svg/C.svg",
// 	"./D.svg": "./svg/D.svg"
// };

// console.log(req.keys())
// 以上语句打印结果，也就是打印出map的key值数组：["./404.svg", "./bug.svg", "./chart.svg", "./clipboard.svg", "./component.svg", "./dashboard.svg", "./documentation.svg", "./drag.svg", "./edit.svg", "./education.svg", "./email.svg", "./example.svg", "./excel.svg", "./exit-fullscreen.svg", "./eye-open.svg", "./eye.svg", "./form.svg", "./fullscreen.svg", "./guide.svg", "./icon.svg", "./international.svg", "./language.svg", "./link.svg", "./list.svg", "./lock.svg", "./message.svg", "./money.svg", "./nested.svg", "./password.svg", "./pdf.svg", "./people.svg", "./peoples.svg", "./qq.svg", "./search.svg", "./shopping.svg", "./size.svg", "./skill.svg", "./star.svg", "./tab.svg", "./table.svg", "./theme.svg", "./tree-table.svg", "./tree.svg", "./user.svg", "./wechat.svg", "./zip.svg"]

// console.log(req.keys().map(req))
// 以上语句打印结果，也就是根据key去遍历map，得到value数组：[Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module, Module]
// Module其实就是类似"./svg/A.svg"这个对象，会直接被import进dom对象

const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
