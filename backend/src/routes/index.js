// routes/index.js
const express = require('express');
const router = express.Router();

const pool = require('../config/db');
const app = require('../config/express');

const Sensor = require('../models/sensorModel');
const Measure = require('../models/measureModel');
const Value = require('../models/valueModel');

// return all sensors
router.get('/api/sensors', async (req, res) => {
  const sensors = await Sensor.getAllSensors();
  res.json(sensors);
});

// add a new sensor
router.post('/api/addSensor', async (req, res) => {
    const { updatePeriod, measureType, latitude, longitude } = req.body;
    const newSensor = await Sensor.createSensor(updatePeriod, measureType, latitude, longitude);
    res.json(newSensor);
});

// filter measures in map
router.get('/api/sensors/:temp', async (req, res) => {
    const temp = req.params.temp;
    const sensor = await Sensor.filterSensor(temp);
    res.json(sensor);
})
  
// return all measures
router.get('/api/measures', async (req, res) => {
    const measures = await Measure.getAllMeasures();
    res.json(measures);
});

// add a new measure
router.post('/api/addMeasure', async (req, res) => {
    const { measureType, measureUnit } = req.body;
    const newMeasure = await Measure.createMeasure(measureType, measureUnit);
    res.json(newMeasure);
});

// return all values
router.get('/api/values', async (req, res) => {
    const values = await Value.getAllValues();
    res.json(values);
});

// add a new value
router.post('/api/addValue', async (req, res) => {
    const { sensorId, currentValue, lastUpdate } = req.body;
    const newValue = await Value.createValue(sensorId, currentValue, lastUpdate);
    res.json(newValue);
}); 
  
// view the measure update duration regularly
router.get('/api/viewUpdateDuration/:sensorId', async (req, res) => {
    const sensorId = req.params.sensorId;
    const sensorUpdateDuration = await Value.displaySensorUpdateDuration(sensorId);
    res.json(sensorUpdateDuration);
});

module.exports = router;
