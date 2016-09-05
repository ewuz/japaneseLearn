/**
 * Created by ewuzg on 2016/2/13.
 */
var list = {
    insert:'INSERT INTO jl_user_sentences VALUES VALUES(?,?,?,?,?)',
    update:'update jl_user_sentences set jl_user_sentences=?, jl_user_sentences_modify_time=? where jl_user_sentences_id=?',
    delete: 'delete from jl_user_sentences where jl_user_sentences_id=? and jl_user_sentences_user_id=?',
    deleteMulti : 'delete from jl_user_sentences where jl_user_sentences_id in (?,?,?)',
    queryById: 'select * from jl_user_sentences where jl_user_sentences_id=?',
    queryAll: 'select * from jl_user_sentences where jl_user_sentences_grammar_id=? and jl_user_sentences_user_id=? order by jl_user_sentences_modify_time desc'
};

module.exports = list;