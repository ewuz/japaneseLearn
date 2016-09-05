/**
 * Created by ewuzg on 2016/2/13.
 */
var user = {
    insert:'INSERT INTO jl_cms_user(jl_user_id, jl_user_name, jl_password) VALUES(?,?,?)',
    update:'update jl_cms_user set jl_user_name=?, jl_password=? where jl_user_id=?',
    delete: 'delete from jl_cms_user where jl_user_id=?',
    queryByParam: 'select jl_user_name,jl_user_id from jl_cms_user where jl_user_name=? and jl_password=?',
    queryAll: 'select * from jl_cms_user'
};

module.exports = user;