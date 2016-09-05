/**
 * Created by ewuzg on 2016/2/13.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
//访问地址
//http://localhost:3000/users/addUser?jl_user_id=11111&jl_user_name=xyz&jl_password=123456
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    add: function (req, res) {
        console.log("-----------------------userDao.add-----");
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            //var param = req.query || req.params; //get参数的取值方法
            var param = req.body;
            // 获取六位的随机字符串
            var str = $util.randomWord(false,6);
            console.log("-----------------------userDao-----");
            // 获取16位的唯一id
            param['id'] = $util.md5(str).toUpperCase().substr(8,16);
            // 建立连接，向表中插入值
            connection.query($sql.insert, [param.id,param.userName, param.password], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'查询成功'
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                $util.jsonWrite(res, result);

                // 释放连接
                connection.release();
            });
        });
    },
    queryByParam: function (req, res,callback) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.body;
            // 获取六位的随机字符串
            var str = $util.randomWord(false,6);
            // 建立连接，向表中插入值
            connection.query($sql.queryByParam, [param.userName,param.password], function(err, result) {
                console.log("999999999999:"+result.toString());
                if(result && result.length > 0) {
                    result = {
                        code: 200,
                        msg:'查询成功',
                        result: result
                    };
                }

                //// 以json形式，把操作结果返回给前台页面
                //$util.jsonWrite(res, result);

                // 释放连接
                connection.release();

                if(typeof callback == "function"){
                    callback(result);
                }
            });
        });
    }
};