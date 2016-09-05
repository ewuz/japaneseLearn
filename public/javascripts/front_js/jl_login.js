/**
 * Created by ewuzg on 2016/2/16.
 */
$(function(){
    $(".register-btn").click(function(){
        $("#login_form").slideUp();
        $("#register_form").slideDown();
    });
    $(".return-btn").click(function(){
        $("#register_form").slideUp();
        $("#login_form").slideDown();
    });
    $("#confirmPassword-r").blur(function(){
        if($(this).val() !== $("#password-r").val()){
            Common.Alert.tip("warning","错误提示：","密码输入不一致，请重新输入");
        }
    });
    //注册
    $("#register_form .btn").click(function(){
        if($("#confirmPassword-r").val() !== $("#password-r").val()){
            Common.Alert.tip("warning","错误提示：","密码输入不一致，请重新输入");
            return;
        }
        var params = {
            userName : $("#username-r").val(),
            password : $("#password-r").val()
        };
        Common.ajax(params,"front_login/register",function(flag, data){
            if(data.code == 200){
                //提示
                Common.Alert.tip("success","操作成功：","注册成功，请登录");
                $("#register_form").slideUp();
                $("#login_form").slideDown();
            }
        });
    });

    //登录
    $("#login_form .btn").click(function(){
        if($("#confirmPassword-r").val() !== $("#password-r").val()){
            Common.Alert.tip("warning","错误提示：","信息不完整，请补全后重试");
            return;
        }
        var params = {
            userName : $("#username").val(),
            password : $("#password").val()
        };
        Common.ajax(params,"front_login/login",function(flag, data){
            if(data.code == 200){
                //跳转
                Common.Alert.tip("info","","正在跳转。。。请稍后");
                location.href = "/home?name="+data.result[0].jl_user_name + "&id=" + data.result[0].jl_user_id;
            }
        });
    });
});