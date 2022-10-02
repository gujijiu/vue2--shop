//vee-validate插件：表单验证区域
import Vue from "vue";
import Veevalidate from "vee-validate";
//中文提示信息
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(Veevalidate);

//表单验证
Veevalidate.Validator.localize('zh_CN',{
    messages:{
        ...zh_CN.messages,
        is:(field)=>`${field}必须与密码相同`//修改内置规则的message,让确认密码和密码相同
    },
    attributes:{
        phone: '手机号',
        code: '验证码',
        password: '密码',
        password1: '确认密码',
        isCheck: '协议'
    }
});

// const success = await this.$validator.validateAll(); //全部表单验证
//自定义校验规则
//定义协议必须打勾同意
VeeValidate.Validator.extend('agree', {
    validate: value => {
    return value
    },
    getMessage: field => field + '必须同意'
})

/*
nginx配置：
1:xshe11进入根目录/etc
2:进入etc目录，这个目录下有一个nginx目录，进入到这个目录【已经安装过nginx:如果没有安装过，四五个文件】
3:如果想安装nginx:yum instal1 nginx
4:安装完nginxf服务器以后，你会发现在nginx目录下，多了一个nginx.conf文件，在这个文件中进行配置
5:vim ng.1nx,conf进行编辑，主要添加如下两项
解决第一个问题：
location /
root/root/jch/www/shangpinhui/dist;
index index.html;
try_files $uri Suri//index.html;
1/解决第二个问题
location /api
proxy_pass http://39.98.123.211;
6:nginx服务器跑起来
service nginx start
 */