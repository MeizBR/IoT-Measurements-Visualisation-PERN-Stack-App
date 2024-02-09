const request = require("supertest");
const app = require("../../index");

describe("GET /api/sensors", () => {
    it("should get all the sensors", async () => {
      const response = await request(app)
        .get("/api/sensors")
        .set("Content-Type", "application/json");
  
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("POST /api/addSensor", () => {
  it("should add a new sensor", async () => {
    // Data for the new sensor
    const sensorData = {
      updatePeriod: 60, // Example update period in seconds
      measureType: "Temperature",
      latitude: 123.456, // Example latitude
      longitude: 78.910 // Example longitude
    };

    // Make the POST request
    const response = await request(app)
      .post("/api/addSensor")
      .send(sensorData)
      .set("Content-Type", "application/json");

    // Assertions
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("updatePeriod", sensorData.updatePeriod);
    expect(response.body).toHaveProperty("measureType", sensorData.measureType);
    expect(response.body).toHaveProperty("latitude", sensorData.latitude);
    expect(response.body).toHaveProperty("longitude", sensorData.longitude);
  });
});

// Add other test cases as needed...
