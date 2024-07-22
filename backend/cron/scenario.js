import { Op } from "sequelize";
import { Measurement, Scenario, ScenarioStep } from "../model/index.js";
import { stopScenario } from "../services/scenarioService.js";

const scenariosExecution = async () => {
  const scenarios = await Scenario.findAll({
    where: {
      status: "started",
    },
  });

  scenarios.forEach((scenario) => {
    executeScenario(scenario);
  });
};

const executeScenario = async (scenario) => {
  if (!scenario.startedAt) {
    scenario.startedAt = Date.now();
    await scenario.save();
  }
  let step = await getNextScenarioStep(scenario);

  while (null !== step) {
    let previousStep = await step.getPreviousStep();
    if (null === previousStep) {
      await processStep(step);
    } else {
      let limitDate = new Date(
        new Date(previousStep.executedAt).setSeconds(
          new Date(previousStep.executedAt).getSeconds() +
            step.executionSecondDelay
        )
      );
      if (Date.now() >= limitDate) {
        await processStep(step);
      } else {
        return;
      }
    }
    step = await step.getNextStep();
  }

  stopScenario(scenario);
};

const getNextScenarioStep = async (scenario) => {
  const scenarioId = scenario.id;
  // if first step
  const step = await ScenarioStep.findOne({
    where: {
      scenarioId,
      executedAt: null,
      previousStepId: null,
    },
  });
  if (step) return step;

  // if scenario processing
  let previousStep = await ScenarioStep.findOne({
    where: { scenarioId },
    order: [["executedAt", "DESC"]],
  });

  if (previousStep) {
    while (
      await previousStep.getNextStep({
        where: { executedAt: { [Op.not]: null } },
      })
    ) {
      previousStep = await previousStep.getNextStep({
        where: { executedAt: { [Op.not]: null } },
      });
    }
    const nextStep = await previousStep.getNextStep();
    if (nextStep) return nextStep;
  }

  return null;
};

const processStep = async (step) => {
  const { unit, value, type, sensorId } = step;
  await Measurement.create({
    sensorId,
    unit,
    value,
    type,
  });

  step.executedAt = Date.now();
  await step.save();
};

export { scenariosExecution };
