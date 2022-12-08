import { test, assert } from "vitest";
import validateLightningEvent from "./zod-validators";

test("validateLightningEvent should return true for a valid event object", () => {
	const event = {
		flashType: 0,
		strikeTime: 1610377898,
		latitude: 34.0522,
		longitude: -118.2437,
		peakAmps: 1000000,
		reserved: "",
		icHeight: 10000,
		receivedTime: 1610377898,
		numberOfSensors: 8,
		multiplicity: 3,
	};
	assert.isTrue(validateLightningEvent(event));
});

test("should return false for an invalid event object", () => {
	const event = {
		flashType: 3, // Invalid flashType
		strikeTime: 1610377898,
		latitude: 34.0522,
		longitude: -118.2437,
		peakAmps: 1000000,
		reserved: "",
		icHeight: 10000,
		receivedTime: 1610377898,
		numberOfSensors: 8,
		multiplicity: 3,
	};
	assert.isFalse(validateLightningEvent(event));
});
