const sequelize = require('../config/connection');
const { user, Blog, comment} = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData =require('./commentData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await user.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const blog of blogData) {
    await Blog.create({
      ...blog,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  const comments = await comment.bulkCreate(commentData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();