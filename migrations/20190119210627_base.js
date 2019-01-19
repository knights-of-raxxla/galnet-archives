
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('articles', function(t) {
            t.increments('id');
            t.date('date');
            t.date('date_ed');
            t.text('title');
            t.text('content');
            t.string('link');
            t.date('created_at');
        })
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
         knex.schema.dropTable('articles')
    ]);
};
