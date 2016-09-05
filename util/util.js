/**
 * Created by fujunou on 2015/3/6.
 */

module.exports = {
    extend: function(target, source, flag) {
        for(var key in source) {
            if(source.hasOwnProperty(key))
                flag ?
                    (target[key] = source[key]) :
                    (target[key] === void 0 && (target[key] = source[key]));
        }
        return target;
    },
    jsonWrite: function (res, ret) {
        if(typeof ret === 'undefined') {
            res.json({
                code:'1',
                msg: '操作失败'
            });
        } else {
            res.json(ret);
        }
    },
    md5: function (data) {
        var Buffer = require("buffer").Buffer;
        var buf = new Buffer(data);
        var str = buf.toString("binary");
        var crypto = require("crypto");
        return crypto.createHash("md5").update(str).digest("hex");
    },
    randomWord: function(randomFlag, min, max){
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if(randomFlag){
            range = Math.round(Math.random() * (max-min)) + min;
        }
        for(var i=0; i<range; i++){
            pos = Math.round(Math.random() * (arr.length-1));
            str += arr[pos];
        }
        return str;
    },
    getNowFormatDate : function(utc_str) {
        var date;
        if(utc_str){
            date = new Date(utc_str);
        }else{
            date = new Date();
        }
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + hour + seperator2 + min + seperator2 + sec;
        console.log("----------"+currentdate);
        return currentdate;
    },
    showFormatDate : function(utc_str){
        console.log(utc_str);
        return this.getNowFormatDate(utc_str);
        //var timeZone = new Date().getTimezoneOffset()*(-1)/60;
        //utc_str = utc_str.split(".")[0];
        //utc_str = utc_str.replace("T"," ");
        //var hour = parseInt(utc_str.split(" ")[1].split(":")[0]) + timeZone;
        //hour > 9 ? hour : "0" + hour;
        //var hms_arr = utc_str.split(" ")[1].split(":");
        //return utc_str.split(" ")[0] + " " + hour + ":" + hms_arr[1] + ":" + hms_arr[2];
    }
}