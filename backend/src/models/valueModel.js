// models/valueModel.js
const pool = require('../config/db');

const moment = require('moment');

class Value {
  static async getAllValues() {
    const query = 'SELECT * FROM value';
    const result = await pool.query(query);
    return result.rows;
  }

  static async createValue(sensorId, currentValue, lastUpdate) {
    const query = 'INSERT INTO value (sensor_id, current_value, last_update) VALUES ($1, $2, $3) RETURNING *';
    const values = [sensorId, currentValue, lastUpdate];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async displaySensorUpdateDuration(sensorId) {
    const query = "SELECT last_update FROM value WHERE sensor_id = $1";
    const values = [sensorId];

    const result = await pool.query(query, values);
    const lastUpdate = moment.utc(result.rows[0].last_update).local();
    const currentDate = moment().tz('Africa/Tunis');
    
    const duration = moment.duration(currentDate.diff(lastUpdate));

    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    const updatedXAgo = "Updated " + hours + " hours, " + minutes + " minutes, " + seconds + " seconds ago";

    return ({
      currentDate: currentDate.format(),
      lastUpdate: lastUpdate.format(),
      updatedXAgo: updatedXAgo,
    })
  }
}

module.exports = Value;
