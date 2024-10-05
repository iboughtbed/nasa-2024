/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import "server-only";

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  createStreamableValue,
} from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { type CoreMessage, streamText } from "ai";
import { z } from "zod";
import { format } from "date-fns";
import * as React from "react";

import { generateId } from "~/lib/utils";
import { BotCard, SpinnerMessage } from "~/components/space/message";
import { Information } from "~/components/space/information";
import { Weather } from "~/components/space/weather";
import { RocketRequirements } from "~/components/space/rocket-requirements";
import { SimulateJourney } from "~/components/space/simulate-journey";

async function submitUserMessage(content: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: generateId(),
        role: "user",
        content,
      },
    ],
  });

  const history = aiState.get().messages.map(
    (message) =>
      ({
        role: message.role,
        content: message.content,
      }) as CoreMessage,
  );

  const textStream = createStreamableValue("");
  const spinnerStream = createStreamableUI(<SpinnerMessage />);
  const messageStream = createStreamableUI(null);
  const uiStream = createStreamableUI();

  spinnerStream.update(<SpinnerMessage />);

  try {
    const result = await streamText({
      model: openai("gpt-3.5-turbo"),
      temperature: 0,
      tools: {
        showInformation: {
          description: "Show information about an exoplanet",
          parameters: z.object({
            name: z.string().describe("Name of the exoplanet"),
            type: z.string().describe("Type of exoplanet"),
            orbitalPeriod: z.number().describe("Orbital period in Earth days"),
            radius: z
              .number()
              .describe("Radius of the exoplanet in Earth radii"),
            mass: z.number().describe("Mass of the exoplanet in Earth masses"),
            surfaceGravity: z.number().describe("Surface gravity in m/s^2"),
            atmosphericComposition: z
              .string()
              .describe("Atmospheric composition of the exoplanet"),
            distance: z
              .number()
              .describe("Distance from Earth to the exoplanet in light-years"),
          }),
        },
        showWeather: {
          description: "Show the weather conditions on the selected exoplanet",
          parameters: z.object({
            name: z.string().describe("Name of the exoplanet"),
            temperature: z
              .number()
              .describe(
                "Current temperature on the exoplanet in degrees Celsius",
              ),
            atmosphericPressure: z
              .number()
              .describe("Atmospheric pressure in Pascals"),
            windSpeed: z
              .number()
              .describe("Wind speed on the exoplanet in meters per second"),
            conditions: z
              .enum(["clear", "cloudy", "storm", "rain", "snow", "windy"])
              .describe("Weather conditions on the exoplanet"),
          }),
        },
        calculateRocketRequirements: {
          description:
            "Calculate the rocket specifications required to reach the selected exoplanet",
          parameters: z.object({
            crewSize: z
              .number()
              .int()
              .min(1)
              .describe("Number of crew members for the mission"),
            payloadWeight: z
              .number()
              .min(0)
              .describe("Weight of the cargo in kilograms"),
            fuelAmount: z
              .number()
              .min(0)
              .describe("Amount of fuel required in liters"),
            rocketType: z
              .enum(["chemical", "nuclear", "ionThrusters", "fusion"])
              .describe("Type of rocket propulsion system"),
            missionDuration: z
              .number()
              .min(0)
              .describe("Estimated mission duration in days"),
          }),
        },
        simulateJourney: {
          description:
            "Simulate the journey from Earth to the selected exoplanet",
          parameters: z.object({
            startTime: z
              .string()
              .describe("Start time of the mission in ISO format"),
            endTime: z
              .string()
              .describe(
                "Estimated arrival time to the exoplanet in ISO format",
              ),
            distance: z
              .number()
              .describe("Distance from Earth to the exoplanet in light-years"),
            averageSpeed: z
              .number()
              .min(1)
              .describe(
                "Average speed of the spacecraft in kilometers per hour",
              ),
            fuelUsed: z
              .number()
              .min(0)
              .describe("Total fuel used for the journey in liters"),
          }),
        },
      },
      system: `
        You are a helpful AI assistant that helps users explore celestial objects, including stars, constellations, and exoplanets.
        Your primary role is to provide dynamic, interactive information and simulations based on user selections.

        The date today is ${format(new Date(), "d LLLL, yyyy")}.
        
        Here's the flow:
          1. List information about the exoplanet (type of exoplanet, orbital period, radius, mass, surface gravity and atmospheric composition)
          2. List information about the weather on the exoplanet (temperature, atmospheric pressure, wind speed and conditions)
          3. Calculate requirements for the rocket (crew size, payload weight, fuel, rocket type and mission parameters)
          4. Simulate the journey to the exoplanet (total time, average speed, fuel used)
      `,
      messages: [...history],
    });

    let textContent = "";
    spinnerStream.done(null);

    for await (const delta of result.fullStream) {
      const { type } = delta;

      if (type === "text-delta") {
        const { textDelta } = delta;

        textContent += textDelta;
        messageStream.update(<BotCard>{textContent}</BotCard>);

        aiState.update({
          ...aiState.get(),
          messages: [
            ...aiState.get().messages,
            {
              id: generateId(),
              role: "assistant",
              content: textContent,
            },
          ],
        });
      } else if (type === "tool-call") {
        const { toolName, args } = delta;

        if (toolName === "showInformation") {
          uiStream.update(
            <BotCard>
              <Information summary={args} />
            </BotCard>,
          );

          aiState.done({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: generateId(),
                role: "assistant",
                content: `Here's a list of information related to the planet\n\n ${", "}.`,
                display: {
                  name: "showInformation",
                  props: {
                    ...args,
                  },
                },
              },
            ],
          });
        } else if (toolName === "showWeather") {
          aiState.done({
            ...aiState.get(),
          });

          uiStream.update(
            <BotCard>
              <Weather summary={args} />
            </BotCard>,
          );
        } else if (toolName === "calculateRocketRequirements") {
          aiState.done({
            ...aiState.get(),
          });

          uiStream.update(
            <BotCard>
              <RocketRequirements summary={args} />
            </BotCard>,
          );
        } else if (toolName === "simulateJourney") {
          aiState.done({
            ...aiState.get(),
          });

          uiStream.update(
            <BotCard>
              <SimulateJourney summary={args} />
            </BotCard>,
          );
        }
      }
    }

    uiStream.done();
    textStream.done();
    messageStream.done();
  } catch (e) {
    console.error(e);
    const error = new Error("The AI got rate limited, please try again.");

    uiStream.error(error);
    textStream.error(error);
    messageStream.error(error);
    // @ts-expect-error state is not required for done
    aiState.done();
  }

  return {
    id: generateId(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value,
  };
}

export type Message = {
  role: "user" | "assistant" | "system" | "function" | "data" | "tool";
  content: string;
  id?: string;
  name?: string;
  display?: { name: string; props: Record<string, unknown> };
};

export type AIState = {
  chatId: string;
  messages: Message[];
};

export type UIState = {
  id: string;
  display: React.ReactNode;
  spinner?: React.ReactNode;
  attachments?: React.ReactNode;
}[];

const actions = {
  submitUserMessage,
};

export const AI = createAI<AIState, UIState, typeof actions>({
  actions,
  initialUIState: [],
  initialAIState: { chatId: generateId(), messages: [] },
});

// export function getUIStateFromAIState(aiState: Chat) {
//   return aiState.messages
//     .filter((message) => message.role !== "system")
//     .map((message, index) => ({
//       id: `${aiState.chatId as string}-${index}`,
//       display: message.role === "assistant" ? (
//         message.display?.name === "showInformation"
//       )
//     }));
// }
