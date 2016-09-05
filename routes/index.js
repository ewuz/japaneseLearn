var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('/login');
  //res.header("Content-Type","text/html; charset=utf-8");
  //res.render('index', { title: '语法' });
  //  res.redirect('/login');
});

router.route('/login')
    .get(function(req, res) {
        res.render('login', { title: '后台用户登录' });
    })
    .post(function(req, res) {
        var user={
            username: 'akira',
            password: 'guoluxiao'
        }
        console.log(req.body.username);
        if(req.body.username === user.username && req.body.password === user.password){
            res.redirect('/cms_index');
        }else{
            res.redirect('/login');
        }
    });

router.route('/jllogin')
    .get(function(req, res) {
        res.render('jllogin', { title: '记语法啊记语法-登录' });
    })

module.exports = router;
