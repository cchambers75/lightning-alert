import processStrike from "./strike-controller.js";
import { test, assert } from "vitest";

test("processStrike returns false for invalid lightning event", () => {
	const invalidStrike = {
		// invalid lightning event data
		flashType: 1,
		strikeTime: 1446761132430,
		latitude: 33.7581367,
		longitude: -9006.7315375,
		peakAmps: 1993,
		reserved: "000",
		icHeight: 18469,
		receivedTime: 1446761143735,
		numberOfSensors: 16,
		multiplicity: 23,
	};
	assert.isFalse(processStrike(invalidStrike));
});

test("processStrike returns false for flash type 9 event", () => {
	const flashType9Event = {
		flashType: 9,
		strikeTime: 1446761132358,
		latitude: 34.6429685,
		longitude: -96.2436649,
		peakAmps: 1540,
		reserved: "000",
		icHeight: 8727,
		receivedTime: 1446761144710,
		numberOfSensors: 11,
		multiplicity: 7,
	};
	assert.isFalse(processStrike(flashType9Event));
});

test("processStrike returns asset for valid event within asset", () => {
	const validEventWithinAsset = {
		flashType: 1,
		strikeTime: 1446761132430,
		latitude: 33.7581367,
		longitude: -96.7315375,
		peakAmps: 1993,
		reserved: "000",
		icHeight: 18469,
		receivedTime: 1446761143735,
		numberOfSensors: 16,
		multiplicity: 23,
	};
	const expectedAsset = {
		assetName: "Fahey Brooks",
		quadKey: "023112310233",
		assetOwner: "86315",
	};
	assert.deepEqual(processStrike(validEventWithinAsset), expectedAsset);
});

test("processStrike returns false for valid event not within asset", () => {
	const validEventNotWithinAsset = {
		flashType: 1,
		strikeTime: 1446760902510,
		latitude: 8.7020156,
		longitude: -12.2736188,
		peakAmps: 3034,
		reserved: "000",
		icHeight: 11829,
		receivedTime: 1446760915181,
		numberOfSensors: 6,
		multiplicity: 1,
	};
	assert.isFalse(processStrike(validEventNotWithinAsset));
});
