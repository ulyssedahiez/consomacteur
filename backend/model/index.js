import User from "./user.js";
import House from "./house.js";
import Area from "./area.js";
import Sensor from "./sensor.js";
import Measurement from "./measurement.js";
import Scenario from "./scenario.js";
import ScenarioStep from "./scenarioStep.js";

User.hasMany(House, {
  as: 'houses',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})
House.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

House.hasMany(Area, {
  as: 'areas',
  foreignKey: 'houseId',
  onDelete: 'CASCADE',
})

Area.belongsTo(House, {
  as: 'house',
  foreignKey: 'houseId',
  onDelete: 'CASCADE',
});

// Define the hasMany association
Area.hasMany(Area, {
  as: 'subAreas',
  foreignKey: 'parentAreaId',
  onDelete: 'CASCADE' // delete sub-areas when the parent area is deleted
});

// Define the belongsTo association for the parent area
Area.belongsTo(Area, {
  as: 'parentArea',
  foreignKey: 'parentAreaId',
  onDelete: 'CASCADE' // set the parent area foreign key to null when a sub-area is deleted
});

Area.hasMany(Sensor, {
  as: 'sensors',
  foreignKey: 'areaId',
  onDelete: 'CASCADE',
})

Sensor.belongsTo(Area, {
  as: "area",
  foreignKey: 'areaId',
  onDelete: "CASCADE",
});

Sensor.hasMany(Measurement, {
  as: 'measurements',
  foreignKey: 'sensorId',
  onDelete: 'CASCADE',
})

Measurement.belongsTo(Sensor, {
  as: 'sensor',
  foreignKey: 'sensorId',
  onDelete: 'CASCADE',
})

User.hasMany(Scenario, {
  as: 'scenarios',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

Scenario.belongsTo(User, {
  as: 'user',
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

Scenario.hasMany(ScenarioStep, {
  as: 'steps',
  foreignKey: 'scenarioId',
  onDelete: 'CASCADE',
})

ScenarioStep.belongsTo(Scenario, {
  as: 'scenario',
  foreignKey: 'scenarioId',
  onDelete: 'CASCADE',
})

ScenarioStep.belongsTo(Sensor, {
  as: 'sensor',
  foreignKey: 'sensorId',
})

ScenarioStep.belongsTo(ScenarioStep, {
  as: 'nextStep',
  foreignKey: 'nextStepId',
  onDelete: 'NO ACTION',
})

ScenarioStep.belongsTo(ScenarioStep, {
  as: 'previousStep',
  foreignKey: 'previousStepId',
  onDelete: 'NO ACTION',
})

export { User, House, Area, Sensor, Measurement, Scenario, ScenarioStep };
