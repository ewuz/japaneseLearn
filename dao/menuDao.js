/**
 * Created by ewuzg on 2016/2/13.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./menuSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    queryAll: function(req, res, next){
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            connection.query($sql.queryAll, [], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'查询成功',
                        data: result
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                $util.jsonWrite(res, result);
                // 释放连接
                connection.release();

            });
        });
    },
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
            connection.query($sql.insert, [param.id, param.name, param.password], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'增加成功'
                    };
                }
                // 以json形式，把操作结果返回给前台页面
                $util.jsonWrite(res, result);
                // 释放连接
                connection.release();
            });
        });
    }
};