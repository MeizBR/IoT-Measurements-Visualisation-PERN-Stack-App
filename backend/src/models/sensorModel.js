// models/sensorModel.js
const pool = require('../config/db');

class Sensor {
  static async getAllSensors() {
    const query = 'SELECT * FROM sensor';
    const result = await pool.query(query);
    return result.rows;
  }

  static async createSensor(updatePeriod, measureType, latitude, longitude) {
    const query = 'INSERT INTO sensor (update_period, measure_type, latitude, longitude) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [updatePeriod, measureType, latitude, longitude];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async filterSensor(temp) {
    const query = 'select s.latitude, s.longitude, s.sensor_id, m.measure_type, v.current_value from sensor s, measure m, value v where s.measure_type = m.measure_type and s.sensor_id = v.sensor_id and m.measure_type = $1';
    const values = [temp];
    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = Sensor;
