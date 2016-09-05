/**
 * Created by ewuzg on 2016/2/13.
 */
$(function(){

    var oprate_type = "add";
    var curr_prammar_id = "";
    //获取数据列表
    Common.ajax_2({user:"ewuz",password:"123"},"cms_index/get_menu",function(flag, data){
        create_menu(data);
        //初始化内容
        $(".dropdown-toggle").eq(0).click();
    });
    //创建左侧栏目
    function create_menu(data){
        var html = "";
        var menu_arr = [];
        var item = data.data;
        var menu_obj = {};
        for(var i = 0 ;i < item.length; i++){
            if($.inArray(item[i].jl_class_level_id, menu_arr) == -1){
                menu_arr.push(item[i].jl_class_level_id)
                html += '<li class="dropdown" id="'+item[i].jl_class_level_id+'"><a href="#" class="dropdown-toggle">'+item[i].jl_class_level_name+'<span class="caret"></span></a></li>';
                menu_obj[item[i].jl_class_level_id] = [];
            }
        }
        $(".nav").html(html);
        for(var i = 0 ;i < item.length; i++){
            menu_obj[item[i].jl_class_level_id].push(item[i]);
        }
        for(var obj in menu_obj){
            var html = "";
            html += "<ul class='dropdown-menu'>";
            for(var i = 0 ;i < menu_obj[obj].length ; i++){
                html += "<li id='"+menu_obj[obj][i].jl_class_id+"'><a href='#'>"+menu_obj[obj][i].jl_class_name+"</a></li>";
            }
            html += "</ul>";

            $("#"+ obj).append(html);
        }
    };

    //一级栏目点击事件（等级）
    $("#left-panel").on("click",".dropdown-toggle",function(){
        if ($(this).parents(".dropdown").find(".dropdown-menu").length > 0){
            $(this).parents(".dropdown").find(".dropdown-menu").slideToggle();
            $(".dropdown").removeClass("active");
            $(this).parents(".dropdown").addClass("active");
        }
    });
    //二级栏目点击事件（课程）
    $("#left-panel").on("click",".dropdown-menu li",function(){
        $(".dropdown-menu li").removeClass("sub_active");
        $(this).addClass("sub_active");
        $(".nav-title").html($(this).parents(".active").find(".dropdown-toggle").text()+"  》  "+$(this).find("a").html());
        //初始化显示面板
        //$(".block-panel").slideUp();
        $("#default-panel").slideDown();
        get_list($(this).attr("id"));
    });
    //获取列表
    function get_list(id){
        var params = {
            class_id : id,
        };
        Common.ajax_2(params,"cms_index/get_grammar_list",function(flag, data){
            if(data.data){
                create_table(data.data);
                $("#default-panel").slideDown();
                $("#add-panel").slideUp();
            }
        });
    }
    //创建表格
    function create_table(data){
        var html = "";
        if(data.length > 0){
            for(var i = 0 ;i < data.length; i++){
                html += '<tr>'
                html += '<td><input type="checkbox" id="'+data[i].jl_grammar_id+'"></td>';
                html += '<td>'+data[i].jl_grammar_pattern+'</td>'
                      + '<td>'+data[i].jl_grammar_explain+'</td>'
                      + '<td><a class="go_detail" onclick="javascript:go_detail(\''+data[i].jl_grammar_id+'\')">详情</a>'
                      + '<a class="go_edit">修改</a>'
                      + '<a class="go_delete">删除</a></td>';
                html += '</tr>';
            }
        }else{
            for(var i = 0 ;i < 10; i++){
                html += '<tr><td></td><td></td><td></td><td></td></tr>';
            }
        }
        $(".table tbody").html(html);

    }

    //列表面板添加事件
    $("#default-panel .add-btn").click(function(){
        oprate_type = "add";
        $("#add-panel #syntactic").val("");
        $("#add-panel #explain").val("");
        $("#add-panel #example").val("");
        $("#default-panel").slideUp();
        $("#add-panel").slideDown();
    });
    //添加面板返回事件
    $("#add-panel,#detail-panel").on("click",".back-btn",function(){
        $(".block-panel").slideUp();
        $("#default-panel").slideDown();
    });
    //添加面板确定事件
    $("#add-panel").on("click",".add-btn",function(){
        if(oprate_type == "add"){
            var params = {
                class_id : $(".active .sub_active").attr("id"),
                pattern : $("#syntactic").val(),
                explain : $("#explain").val(),
                example : $("#example").val()
            }
            Common.ajax_2(params,"cms_index/add_grammar",function(flag, data){
                if(data.code == 200){//添加成功
                    //查询列表
                    get_list($(".active .sub_active").attr("id"));
                }
            });
        }
        else{
            var params = {
                prammar_id : curr_prammar_id,
                class_id : $(".active .sub_active").attr("id"),
                pattern : $("#syntactic").val(),
                explain : $("#explain").val(),
                example : $("#example").val()
            }
            Common.ajax_2(params,"cms_index/update_grammar",function(flag, data){
                if(data.code == 200){//修改成功
                    //查询列表
                    get_list($(".active .sub_active").attr("id"));
                }
            });
        }
    });
    //列表修改事件
    $("#default-panel").on("click",".go_edit",function(){
        oprate_type = "edit";
        curr_prammar_id = $(this).parents("tr").find("input[type=checkbox]").attr("id");
        go_edit(curr_prammar_id);
    });
    //列表删除事件
    $("#default-panel").on("click",".go_delete",function(){
        curr_prammar_id = $(this).parents("tr").find("input[type=checkbox]").attr("id");
        var self = $(this);
        Common.ajax_2({grammar_ids: curr_prammar_id},"cms_index/del_grammar",function(flag, data){
            if(data.code == 200){
                //查询列表
                //get_list($(".active .sub_active").attr("id"));
                self.parents("tr").hide(500);
            }
        });
    });
    //列表删除多条事件
    $("#default-panel").on("click",".del-btn",function(){
        var inputs = $("#default-panel").find("input[type=checkbox]");
        var ids = [];
        for(var i=0;i<inputs.length;i++){
            if(inputs[i].checked){
                ids.push($(inputs[i]).attr("id"));
            }
        }
        var id_str = ids.join(",");
        Common.ajax_2({grammar_ids: id_str},"cms_index/multi_del_grammar",function(flag, data){
            if(data.code == 200){
                //查询列表
                get_list($(".active .sub_active").attr("id"));
            }
        });
    });
});

//查看详情
function go_detail(id){
    $("#default-panel").slideUp();
    $("#detail-panel").slideDown();
    //获取单条记录
    Common.ajax_2({grammar_id: id},"cms_index/get_grammar_by_id",function(flag, data){
        if(data.code == 200 && data.data){
            var item = data.data[0];
            $("#syntactic-detail").html(item.jl_grammar_pattern);
            $("#explain-detail").html(item.jl_grammar_explain);
            $("#example-detail").html(item.jl_grammar_example.replace(/&/g,'\r\n'));
        }
    });
};
//修改
function go_edit(id){
    $("#default-panel").slideUp();
    $("#add-panel").slideDown();
    Common.ajax_2({grammar_id: id},"cms_index/get_grammar_by_id",function(flag, data){
        if(data.code == 200 && data.data){
            var item = data.data[0];
            $("#syntactic").val(item.jl_grammar_pattern);
            $("#explain").val(item.jl_grammar_explain);
            $("#example").val(item.jl_grammar_example.replace(/&/g,'\r\n'));
        }
    });
};