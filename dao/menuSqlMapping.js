/**
 * Created by ewuzg on 2016/2/13.
 */
var menu = {
    insert:'INSERT INTO jl_cms_user(jl_user_id, jl_user_name, jl_password) VALUES(?,?,?)',
    update:'update jl_cms_user set jl_user_name=?, jl_password=? where jl_user_id=?',
    delete: 'delete from jl_cms_user where jl_user_id=?',
    queryById: 'select * from jl_cms_user where jl_user_id=?',
    queryAll: 'select * from jl_class order by jl_index asc'
};

module.exports = menu;