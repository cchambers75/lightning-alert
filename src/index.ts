import readline from "readline";
import { LightningEvent, Asset } from "../type";
import processStrike from "./controllers/strike-controller.js";

// Creates a readline interface to read from the command line
var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Map to keep track of which assets have already been alerted
const alertIssuedMap: Map<String, Asset> = new Map();

// Reads the input from the command line
rl.on("line", (line) => {
	try {
		// Parses the input as JSON
		const strike: LightningEvent = JSON.parse(line);
		// Checks if the strike is within a valid asset
		const foundQK: Asset | false = processStrike(strike);
		// If the strike is within a valid asset, and the asset has not already been alerted, then alert the asset owner
		if (foundQK) {
			const assetOwnerLookup = alertIssuedMap.get(foundQK.quadKey);
			if (
				!assetOwnerLookup ||
				assetOwnerLookup.assetOwner !== foundQK.assetOwner
			) {
				// Log the alert to the console
				console.log("=========================================\n\n");
				console.log(
					"Lightning alert for " + foundQK.assetOwner + ":" + foundQK.assetName
				);
				console.log("\n\n=========================================");
				alertIssuedMap.set(foundQK.quadKey, foundQK);
			}
		}
	} catch (e) {
		// If the input is not valid JSON, then log an error to the console
		console.log(
			"\nThe entry that was made was not valid JSON. Please make sure you are only entering a valid JSON object.\n"
		);
	}
});
