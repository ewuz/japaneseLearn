/**
 * Created by ewuzg on 2016/2/18.
 */
/**
 * Created by ewuzg on 2016/2/13.
 */
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./daySentencesSqlMapping');

// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

module.exports = {
    queryAll: function(req, res, next){
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接
            connection.query($sql.queryAll, [param.grammar_id,param.user_id], function(err, result) {
                if(result) {
                    //对返回数据进行遍历
                    for(var i = 0 ; i < result.length; i++ ){
                        result[i].jl_user_sentences_create_time = $util.showFormatDate(result[i].jl_user_sentences_create_time);
                        result[i].jl_user_sentences_modify_time = $util.showFormatDate(result[i].jl_user_sentences_modify_time);
                    }
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
    queryById: function(req, res, next){
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            connection.query($sql.queryById, [param.grammar_id], function(err, result) {
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
    update: function(req, res, next){
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;
            console.log("param.example======:"+ param.example);
            // 建立连接，向表中插入值
            connection.query($sql.update, [param.class_id,param.pattern,param.explain,param.example,param.prammar_id], function(err, result) {
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
    delete: function(req, res, next){
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            connection.query($sql.delete, [param.sentence_id, param.user_id], function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'删除成功',
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
    deleteMulti: function(req, res, next){
        pool.getConnection(function(err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            var ids_arr = param.grammar_ids.split(",");
            var sql = 'delete from jl_grammar where jl_grammar_id in (';
            for(var i = 0; i < ids_arr.length; i++){
                sql += "?";
                if(i < ids_arr.length-1){
                    sql += ",";
                }
            }
            sql += ')';
            connection.query(sql, ids_arr, function(err, result) {
                if(result) {
                    result = {
                        code: 200,
                        msg:'删除成功',
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
            var sql = 'INSERT INTO jl_user_sentences VALUES';
            for(var i = 0 ;i < param.example_arr.length ; i++){
                // 获取六位的随机字符串
                var str = $util.randomWord(false,6);
                // 获取16位的唯一id
                var id = $util.md5(str).toUpperCase().substr(8,16);
                var time = $util.getNowFormatDate();
                if(i == param.example_arr.length-1){
                    sql += '("'+id+'","'+param.example_arr[i]+'","'+param.user_id+'","'+param.grammar_id+'","'+time+'","'+time+'")';
                }else{
                    sql += '("'+id+'","'+param.example_arr[i]+'","'+param.user_id+'","'+param.grammar_id+'","'+time+'","'+time+'"),';
                }
            }
            console.log("----sql-----:"+sql);
            connection.query("select max(jl_grammar_index) from jl_grammar",[],function(err,result){
                // 建立连接，向表中插入值
                connection.query(sql, [], function(err, result) {
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
                    return result;
                });
            });

        });
    }
};