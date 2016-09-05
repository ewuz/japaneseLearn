(function($,window){
    var Common = function(){};

    var baseUrl = '/';
    // var baseHost = "http://192.168.95.214/";
    var baseHost = "http://localhost:3000/";
    Common.BaseHost = function($host) {
        if (!$host) {
            return baseHost;
        } else {
            baseHost = $host;
            return baseHost;
        }
    };
    /*
     ajax post
     */
    Common.ajax = function(params,url,callback){
        var post_data={};
        //if (func!=="") {
        //    post_data = {
        //        nns_func: func
        //    };
        //};
        for (var attr in params) {
            if (!post_data[attr]) {
                post_data[attr] = params[attr];
            }
        }
        var urlr = Common.BaseHost().substring(0,(Common.BaseHost().length-1))+ baseUrl + url;
        $.ajax(urlr, {
            success:function(data){
                if(data === "" || data === null){
                    callback(false);
                }else{
                    callback(true,data);
                }
            },
            dataType: 'json',
            type: 'post',
            data: post_data
        });
    };
    /**
     *ajax get
     */
    Common.ajax_2 = function(params, url, callback){
        var post_data={};
        var post_data = {};
        for (var attr in params) {
            if (!post_data[attr]) {
                post_data[attr] = params[attr];
            }
        }
        var infoparams = "";
        var urlr = Common.BaseHost().substring(0,(Common.BaseHost().length-1))+ baseUrl + url;
        var ajaxoption = $.ajax(urlr, {
            success: function(data) {
                if(data === "" || data === null){
                    callback(false);
                }else{
                    callback(true,data);
                }
            },
            error: function(data) {
                alert("error");
            },
            type: "GET",
            dataType: 'json',
            data: post_data
        });
        // Common.arrayAJAX.push(ajaxoption);
    };

    /*
     获取url参数
     */
    Common.GetRequest = function() {
        var url = location.search; // 获取url中"?"符后的字串
        var theRequest = {};
        if (url.indexOf("?") !== -1) {
            var str = url.substr(1);
            var strs = str.split("&");
            for ( var i = 0; i < strs.length; i++) {
                theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
            }
        }
        return theRequest;
    };
    /*
     分页加载
     */
    var clearTime = 0;
    Common.refresh = function(callback,allPages,pageNum){
        if(allPages === pageNum ){
            $(".push").hide();
            $(window).unbind("scroll");
            return;
        }
        var load = function(){
            if(($(window).scrollTop() + $(window).height() > $(document).height()-2)  && allPages > pageNum){
                //滚动条拉到离底2像素内，而且没ajax中，而且没超过总页数
                clearTimeout(clearTime);
                $(".push").show();
                $("#push-load").show();
                clearTime = setTimeout(function(){
                    callback(pageNum);
                },300);
            }
        };
        $(window).unbind("scroll").bind("scroll",load);
    };

    Common.Alert = {
        tip:function(type, title, msg, callback){
            var class_name = "";
            switch (type){
                case "info":
                    class_name = "alert alert-info";
                    break;
                case "warning":
                    class_name = "alert alert-warning";
                    break;
                case "error":
                    class_name = "alert alert-error";
                    break;
                case "success":
                    class_name = "alert alert-success";
                    break;
            };
            $("#common-alert").html("<div class='"+class_name+"'><strong>" + title + "</strong>" + msg + "</div>").slideDown("normal");
            if (typeof callback == 'function') {
                callback();
            }
            setTimeout("$('#common-alert').slideUp().empty()", 3000);
        }
    };
    //跳转链接
    Common.go_link = function($obj){
        // location.href = $($obj).attr("data-href");
        window.open($($obj).attr("data-href"),"_blank");
    }

    //配置
    Common.Config = {

    };

    //掉接口返回的数据处理
    Common.interfaceBackManage = function(data,callback){
        if (data.code === '100007')
        {
            if (Common.Config.is_login_overtime === false) {
                alert(data.reason);
                Common.Config.is_login_overtime = true;
                location.href = Common.Config.login_page_url;
                return;
            };
        }else if (data.code === "000000")
        {
            callback();
        }else
        {
            alert(data.reason);
        };
    };

    /**
     *
     * @param {Object} $selector
     * @param {Object} type "or": 不全部为空即可  ，"and": 全部不为空才行
     */
    Common.CheckInputNull = function($selector,type){
        var flag = type == "or" ? false : true;
        $($selector).find("input").each(function(){
            if(type == "or"){//检测信息修改
                if ($.trim($(this).val()) !== "")
                {
                    flag = flag || true;
                };
            }
            else{//检测密码修改
                if ($.trim($(this).val()) === "")
                {
                    flag = flag && false;
                }else{
                    flag = flag || true;
                }
            }
        });
        return flag;
    }

    //时分秒转成秒
    Common.HourToMs = function(timeHour,splitChar)
    {
        var n = [3600,60,1];
        var temp = 0;
        var arr = timeHour.split(splitChar);
        for(var i = 0; i < arr.length ; i++)
        {
            temp += parseInt(arr[i],10) * n[i];
        }
        return temp;
    };

    Common.getNowFormatDate = function() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        return currentdate;
    }

    //cookie处理
    Common.set_cookie = function(key,value,days){
        var day = new Date();
        day.setTime(day.getTime() + days*24*60*60*1000);
        document.cookie=key+"="+value+";expires=" + day.toGMTString() + "; path=/";
    }
    Common.getCookie = function(name)//取cookies函数
    {
        var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
        // if(arr != null) return unescape(arr[2]); return null;
        if(arr != null) return arr[2]; return null;
    }
    Common.delCookie = function(name)//删除cookie
    {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval=Common.getCookie(name);
        if(cval!=null) document.cookie= name + "="+cval+";expires="+exp.toGMTString() + "; path=/";
    }

    //去掉左右两边的空格
    Common.LRtrim = function(str){
        return str.replace(/(^\s*)|(\s*$)/g,"");
    };
    Common.Ltrim = function(str){ //删除左边的空格
        return str.replace(/(^\s*)/g,"");
    };
    Common.Rtrim = function(str){ //删除右边的空格
        return str.replace(/(\s*$)/g,"");
    };

    window.Common = Common;
})(jQuery,window);

