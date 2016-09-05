/**
 * Created by ewuzg on 2016/2/13.
 */
$(function(){
    var oprate_type = "add";
    var curr_prammar_id = "";
    var list_data = {};

    //获取用户信息
    var user_info = Common.GetRequest();
    if(!user_info || !user_info.id){
        location.href = "/jllogin";
    }
    $(".user-info").html(user_info.name + "/" + "<span id='"+ user_info.id +"'>登出</span>");

    //获取数据列表
    Common.ajax_2({user:"ewuz",password:"123"},"cms_index/get_menu",function(flag, data){
        create_menu(data);
        //初始化内容
        $(".dropdown-toggle").eq(0).click();
        $(".dropdown-menu li").removeClass("sub_active");
        var $this = $(".dropdown-menu li").eq(0);
        $this.addClass("sub_active");
        $(".nav-title").html($this.parents(".active").find(".dropdown-toggle").text()+"  》  "+$this.find("a").html());
        //初始化显示面板
        $("#default-panel").slideDown();
        get_list($this.attr("id"));
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
        $(".block-panel").slideUp();
        get_list($(this).attr("id"));
    });
    //获取列表
    function get_list(id){
        var params = {
            class_id : id,
        }
        Common.ajax_2(params,"cms_index/get_grammar_list",function(flag, data){
            if(data.data && data.data.length > 0){
                create_table(data.data);
                list_data = data.data;
                $("#list-panel").slideDown();
            }else{
                $("#alert-panel").slideDown();
            }
        });
    }
    //创建列表
    function create_table(data){
        var html = "";
        if(data.length > 0){
            for(var i = 0 ;i < data.length; i++){
            //<div class="panel panel-default"><div role="tab" id="heading1" class="panel-heading"><h4 class="panel-title"><a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1" aria-expanded="false" aria-controls="collapse1" class="collapsed">Collapsible Group Item #1</a></h4></div><div id="collapse1" role="tabpanel" aria-labelledby="heading1" class="panel-collapse collapse" aria-expanded="false" style="height: 0px;"><div class="panel-body">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad sq</div></div></div>
                html += '<div class="panel panel-default">' +
                            '<div role="tab" id="heading'+i+'" class="panel-heading">' +
                                '<h4 class="panel-title">' +
                                    '<a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse'+i+'" aria-expanded="true" aria-controls="collapse'+i+'" class="">'+data[i].jl_grammar_pattern+'</a>' +
                                '</h4>' +
                                '<div class="ico-add glyphicon glyphicon-plus"></div>' +
                            '</div>' +
                            '<div id="collapse'+i+'" role="tabpane'+i+'" aria-labelledby="heading'+i+'" class="panel-collapse collapse" aria-expanded="true">' +
                                '<div class="panel-body">' +
                                    '<form class="form-horizonta'+i+'">' +
                                        '<div class="form-group">' +
                                            '<label for="syntactic-detail" class="col-sm-1 control-label">语法</label>' +
                                            '<div class="col-sm-11">' +
                                                '<pre id="syntactic-detail" class="form-control">'+data[i].jl_grammar_pattern+'</pre>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            '<label for="explain-detail" class="col-sm-1 control-label">解释</label>' +
                                            '<div class="col-sm-11">' +
                                                '<pre id="explain-detail" class="form-control">'+data[i].jl_grammar_explain+'</pre>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="form-group">' +
                                            '<label for="example-detail" class="col-sm-1 control-label">例句</label>' +
                                            '<div class="col-sm-11">' +
                                                '<pre id="example-detail" class="form-control">'+data[i].jl_grammar_example+'</pre>' +
                                            '</div>' +
                                            '</div>' +
                                        '</form>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
            }
            $(".block-panel").slideUp();
            $("#list-panel").slideDown();
        }else{
            $("#default-panel").slideUp();
            $("#alert_panel").slideDown();
        }
        $("#accordion").html(html);
    }

    //列表面板添加图标
    $("#accordion").on("click",".ico-add",function(){
        $("#list-panel").slideUp();
        $("#add-panel").slideDown();
        $(".grammar").html($(this).parents(".panel-heading").find("a").html());
        //获取每日一句列表get_sentences_list
        var i = $(this).index(".ico-add");
        curr_prammar_id = list_data[i].jl_grammar_id;
        get_sentences_list();
    });
    function get_sentences_list(){
        var params = {
            grammar_id : curr_prammar_id,
            user_id : $(".user-info").find("span").attr("id")
        };
        Common.ajax_2(params,"home/get_sentences_list",function(flag, data){
            if(data.code == 200){//成功
                //查询列表
                if(data.data.length > 0){
                    create_sentences_list(data.data);
                }else{
                    console.log('デーダーがありませんで、追加してください');
                    var html = '<div class="alert-content"><img src="images/alert_img.png"></img><div class="alert-txt">デーダーがありませんで、追加してください</div></div>'
                    $(".example-list").html(html);
                }
            }else if(data.code == 0){
                //未登录
                location.href = "/jllogin";
            }
        });
    };
    //添加面板返回事件
    $("#add-panel").on("click",".back-btn",function(){
        $(".block-panel").slideUp();
        $("#list-panel").slideDown();
    });
    //添加面板确定事件,添加每日例句
    $("#add-panel").on("click",".add-btn",function(){
        var flag = check_input($("#add-panel"));
        if(flag != true){
            if(flag === false){
                Common.Alert.tip("warning","提示：","没有可操作的内容，请先添加内容");
            }else{
                Common.Alert.tip("warning","提示：","请补全内容");
            }
            return;
        }
        if(oprate_type == "add"){
            var example_doms = $("#add-panel textarea"),
                example_arr = [];
            for(var i = 0 ; i < example_doms.length ; i++){
                example_arr.push(example_doms.eq(i).val());
            }
            var params = {
                example_arr : example_arr,
                grammar_id : curr_prammar_id,
                user_id : $(".user-info").find("span").attr("id")
            };
            Common.ajax_2(params,"home/add_sentences",function(flag, data){
                if(data.code == 200){//添加成功
                    //查询列表
                    //create_sentences_list(data.data);
                    get_sentences_list();
                }else if(data.code == 0){
                    //未登录
                    location.href = "/jllogin";
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
    function create_sentences_list(data){
        var html = "";
        for(var i = 0;i < data.length; i++){
            html += '<div class="sentences_item">' +
                        '<div class="del" id="'+data[i].jl_user_sentences_id+'">'+"删除"+'</div>' +
                        '<div class="time">'+data[i].jl_user_sentences_modify_time.split(" ")[0]+'</div>' +
                        '<div class="sentences">'+data[i].jl_user_sentences+'</div>' +
                    '</div>';
        }
        $(".example-list").html(html);
    };
    function check_input(dom){
        var inputs = dom.find("textarea");
        if(!inputs || inputs.length == 0){return false;}
        for(var i = 0 ;i < inputs.length; i++){
            if(!inputs.val()){
                return i ;
            }
        }
        return true;
    }
    //添加面板添加例句
    $("#add-panel").on("click",".add-example",function(){
        if($("#add-panel").find(".alert-content").length > 0){
            $("#add-panel").find(".alert-content").remove();
        }
        $(".example-list").prepend('<textarea id="example" type="text" placeholder="example" class="form-control"></textarea>');
    });

    //删除用户的例句
    $("#add-panel").on("click",".del",function(){
        var params = {
            sentence_id : $(this).attr("id"),
            user_id : $(".user-info").find("span").attr("id")
        };
        var $this = $(this);
        Common.ajax_2(params,"home/del_sentence",function(flag, data){
            if(data.code == 200){//成功
                //删除dom
                $this.parents(".sentences_item").remove();
                if($(".example-list").find(".sentences_item").length <= 0){
                    //显示无数据
                    console.log('デーダーがありませんで、追加してください');
                    var html = '<div class="alert-content"><img src="images/alert_img.png"></img><div class="alert-txt">デーダーがありませんで、追加してください</div></div>'
                    $(".example-list").html(html);
                }

            }else if(data.code == 0){
                //未登录
                location.href = "/jllogin";
            }
        });
    });

    //登出
    $(".user-info span").click(function(){
        Common.ajax_2('',"home/loginout",function(flag, data){
            if(data.code == 200){//添加成功
                //查询列表
                location.href = "/jllogin";
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
            $("#").val(item.jl_grammar_example.replace(/&/g,'\r\n'));
        }
    });
};