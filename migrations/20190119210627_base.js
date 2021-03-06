
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('articles', function(t) {
            t.increments('id');
            t.date('date');
            t.string('date_ed');
            t.text('title');
            t.text('content', 'longtext');
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
