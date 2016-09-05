/**
 * Created by ewuzg on 2016/2/16.
 */
var express = require('express');
var router = express.Router();
var userDao = require('../../dao/userDao');
var $util = require("../../util/util")

router.post('/register', function(req, res) {
    userDao.add(req, res);
});

router.post('/login', function(req, res){
    userDao.queryByParam(req, res , function(result){
        if(result.code == 200){
            //存储session
            req.session.userid = result.result[0].jl_user_id;
        }
        console.log("----session-----:" + req.session.userid);
        // 以json形式，把操作结果返回给前台页面
        $util.jsonWrite(res, result);
    });
});

module.exports = router;