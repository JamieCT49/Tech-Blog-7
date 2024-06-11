const user = require('./user');
const Blog = require('./blog');
const comment = require('./comment');

user.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(user, {
    foreignKey: 'user_id'
});

Blog.hasMany(comment, {
    foreignKey: 'blog_id'
});

comment.belongsTo(user, {
    foreignKey: 'user_id'
});

module.exports = { user, Blog, comment };