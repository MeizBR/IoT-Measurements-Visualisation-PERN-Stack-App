# Measurements-Visualisation
## IOT Sensors Visualisation with ReactJS, ExpressJS, PostgreSQL, Socket.IO, and Docker

Web Application implemented through a map for visualizing the locations of sensors in Sousse, their measurement details, accompanied by a dashboard for displaying the measurement history (Line Chart and Heat Map Chart), and a feedback form to collect user opinions.

### How to Run the Application
To start the application, run the following command:
```bash
docker-compose up --build
```
Make sure Docker is installed on your system.

### Database Connection Setup
Before running the command, ensure the database connection is set up. If you prefer an online PostgreSQL on the cloud, consider using Neon: [Neon Tech Console](https://console.neon.tech/app/projects).

### Database Schema
#### 3 Tables:

1. **measure:**
   - `measure_type`: varchar(20) (Primary Key)
   - `measure_unit`: varchar(20)

2. **sensor:**
   - `sensor_id`: integer (serial) (Primary Key)
   - `update_period`: integer
   - `measure_type`: varchar(20) (Foreign Key referencing `measure_type` in `measure` table)
   - `latitude`: numeric(8,5)
   - `longitude`: numeric(8,5)

3. **value:**
   - `sensor_id`: integer (serial) (Foreign Key referencing `sensor_id` in `sensor` table)
   - `current_value`: numeric(10,5)
   - `last_update`: timestamp with timezone

### SQL Queries for Creating Tables

1. **measure:**
   ```sql
   CREATE TABLE measure (
     measure_type VARCHAR(20) PRIMARY KEY,
     measure_unit VARCHAR(20)
   );
   ```

2. **sensor:**
   ```sql
   CREATE TABLE sensor (
     sensor_id SERIAL PRIMARY KEY,
     update_period INTEGER,
     measure_type VARCHAR(20) REFERENCES measure(measure_type),
     latitude NUMERIC(8,5),
     longitude NUMERIC(8,5)
   );
   ```

3. **value:**
   ```sql
   CREATE TABLE value (
     sensor_id SERIAL REFERENCES sensor(sensor_id),
     current_value NUMERIC(10,5),
     last_update TIMESTAMP WITH TIME ZONE
   );
   ```

### Example of Insert Queries

1. **measure:**
   ```sql
   INSERT INTO measure (measure_type, measure_unit) VALUES 
     ('temperature', 'Celsius'),
     ('humidity', 'Percentage'),
     ('pressure', 'Pascal');
   ```

2. **sensor:**
   ```sql
   INSERT INTO sensor (update_period, measure_type, latitude, longitude) VALUES 
     (60, 'temperature', 37.7749, -122.4194),
     (90, 'humidity', 34.0522, -118.2437),
     (120, 'pressure', 40.7128, -74.0060);
   ```

3. **value:**
   ```sql
   INSERT INTO value (sensor_id, current_value, last_update) VALUES 
     (1, 25.5, '2024-01-18 12:00:00+00:00'),
     (2, 65.2, '2024-01-18 12:15:00+00:00'),
     (3, 101325, '2024-01-18 12:30:00+00:00');
   ```

### Happy Coding!
Hope you enjoy using my application! Cheers! 🚀
