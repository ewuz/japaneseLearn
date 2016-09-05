/**
 * Created by ewuzg on 2016/2/12.
 */
var express = require('express');
var router = express.Router();
var menuDao = require('../../dao/menuDao');
var listDao = require('../../dao/listDao');
var userDao = require('../../dao/listDao');
var daySentencesDao = require("../../dao/daySentencesDao");
var $util = require("../../util/util");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Content-Type","text/html; charset=utf-8");
    res.render('front/home', { title: '记语法啊记语法-home',data : req });
});

router.get("/loginout",function(req, res, next){
    var param = req.query || req.params;
    if(param.user_id == req.session.userid){
        console.log("已登录。。。");
        req.session.userid == "";
        var result = {
            code : 200,
            msg : "登出成功"
        };
        $util.jsonWrite(res, result);
    }else{
        console.log("未登录。。。");
        var result = {
            code : 0,
            msg : "未登录",
            req : req.session.userid,
            user_id : param.user_id
        };
        $util.jsonWrite(res, result);
    }
});

router.get("/get_sentences_list",function(req, res, next){
    var param = req.query || req.params;
    if(param.user_id == req.session.userid){
        console.log("已登录。。。");
        daySentencesDao.queryAll(req, res, next);
    }else{
        console.log("未登录。。。");
        var result = {
            code : 0,
            msg : "未登录"
        }
        $util.jsonWrite(res, result);
    }
});
router.get("/add_sentences",function(req, res, next){
    var param = req.query || req.params;
    if(param.user_id == req.session.userid){
        console.log("已登录。。。");
        daySentencesDao.add(req, res, next);
    }else{
        console.log("未登录。。。");
        var result = {
            code : 0,
            msg : "未登录"
        }
        $util.jsonWrite(res, result);
    }
});

//删除例句
router.get("/del_sentence",function(req, res, next){
    var param = req.query || req.params;
    if(param.user_id == req.session.userid){
        console.log("已登录。。。");
        daySentencesDao.delete(req, res, next);
    }else{
        console.log("未登录。。。");
        var result = {
            code : 0,
            msg : "未登录"
        }
        $util.jsonWrite(res, result);
    }
});

module.exports = router;