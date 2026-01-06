const cache = require('../config/db');

class User {
  static create({ name, email, password_hash, phone }) {
    const user = {
      id: cache._userId++,
      name,
      email,
      password_hash,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    cache.users.push(user);
    return user;
  }

  static findOne({ where }) {
    return cache.users.find(user => {
      if (where.email) return user.email === where.email;
      if (where.id) return user.id === where.id;
      return false;
    });
  }

  static findByPk(id) {
    return cache.users.find(user => user.id === id);
  }

  static findAll() {
    return cache.users;
  }
}

module.exports = User;
