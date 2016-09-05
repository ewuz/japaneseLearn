/**
 * Created by ewuzg on 2016/2/13.
 */
var list = {
    insert:'INSERT INTO jl_grammar(jl_grammar_id, jl_grammar_class_id, jl_grammar_pattern, jl_grammar_explain, jl_grammar_example,jl_grammar_index) VALUES(?,?,?,?,?,?)',
    update:'update jl_grammar set jl_grammar_class_id=?, jl_grammar_pattern=?, jl_grammar_explain=?, jl_grammar_example=? where jl_grammar_id=?',
    delete: 'delete from jl_grammar where jl_grammar_id=?',
    deleteMulti : 'delete from jl_grammar where jl_grammar_id in (?,?,?)',
    queryById: 'select * from jl_grammar where jl_grammar_id=?',
    queryAll: 'select * from jl_grammar where jl_grammar_class_id=? order by jl_grammar_index'
};

module.exports = list;