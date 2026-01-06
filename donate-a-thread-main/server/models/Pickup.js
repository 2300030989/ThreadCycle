const cache = require('../config/db');

class Pickup {
  static create({ userId, pickup_date, pickup_time, address, lat, lng, cloth_type, condition, quantity, notes }) {
    const pickup = {
      id: cache._pickupId++,
      userId,
      pickup_date,
      pickup_time,
      address,
      lat,
      lng,
      cloth_type,
      condition,
      quantity,
      notes,
      status: 'Scheduled',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    cache.pickups.push(pickup);
    return pickup;
  }

  static findAll({ where, order }) {
    let results = cache.pickups;
    
    if (where && where.userId) {
      results = results.filter(pickup => pickup.userId === where.userId);
    }
    
    if (order) {
      // Simple ordering by createdAt DESC
      results = [...results].sort((a, b) => b.createdAt - a.createdAt);
    }
    
    return results;
  }

  static findByPk(id) {
    return cache.pickups.find(pickup => pickup.id === id);
  }

  static findOne({ where }) {
    return cache.pickups.find(pickup => {
      if (where.id) return pickup.id === where.id;
      if (where.userId) return pickup.userId === where.userId;
      return false;
    });
  }
}

module.exports = Pickup;
