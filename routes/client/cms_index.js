/**
 * Created by ewuzg on 2016/2/12.
 */
var express = require('express');
var router = express.Router();
var app = express();
var menuDao = require('../../dao/menuDao');
var listDao = require('../../dao/listDao');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Content-Type","text/html; charset=utf-8");
    res.render('client/cms_index', { title: '记语法啊记语法' });
});

router.get('/get_menu', function(req, res, next) {
    menuDao.queryAll(req, res, next);
});

router.get("/get_grammar_list",function(req, res, next) {
    listDao.queryAll(req, res, next);
});

router.get("/add_grammar",function(req, res, next) {
    listDao.add(req, res, next);
});

router.get("/get_grammar_by_id",function(req, res, next){
    listDao.queryById(req, res, next);
});

router.get("/update_grammar",function(req, res, next){
    console.log("==============:"+ "000000000000000000000000000");
    listDao.update(req, res, next);
});

router.get("/del_grammar",function(req, res, next){
    listDao.delete(req, res, next);
});

router.get("/multi_del_grammar",function(req, res, next){
    listDao.deleteMulti(req, res, next);
});
module.exports = router;