const user = require('./user');
const blog = require('./blog');
const comment = require('./comment');

user.hasMany(blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

blog.belongsTo(user, {
    foreignKey: 'user_id'
});

blog.hasMany(Comment, {
    foreignKey: 'blog_id'
});

comment.belongsTo(user, {
    foreignKey: 'user_id'
});

module.exports = { user, blog, comment };