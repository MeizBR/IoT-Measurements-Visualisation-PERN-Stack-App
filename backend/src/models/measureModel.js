// models/measureModel.js
const pool = require('../config/db');

class Measure {
  static async getAllMeasures() {
    const query = 'SELECT * FROM measure';
    const result = await pool.query(query);
    return result.rows;
  }

  static async createMeasure(measureType, measureUnit) {
    const query = 'INSERT INTO measure (measure_type, measure_unit) VALUES ($1, $2) RETURNING *';
    const values = [measureType, measureUnit];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = Measure;
