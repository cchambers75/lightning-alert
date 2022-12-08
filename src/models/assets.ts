import fs from "fs";
import { Asset } from "../../type";

// Map to store the assets that could be alerted
const assets = new Map();

// Reads the assets from the assets.json file and stores them in the assets map
export const getAssets = () => {
	try {
		// Reads the assets from the assets.json file
		const data = fs.readFileSync("./assets.json");
		// Parses the assets from the assets.json file
		const assetArr = JSON.parse(data.toString());
		// Stores the assets in the assets map
		assetArr.forEach((asset: Asset) => {
			assets.set(asset.quadKey, asset);
		});
	} catch (e: any) {
		console.log("\n----------------------------------------------------");
		console.log("Error: Issue with reading JSON from assets.json file");
		console.log(
			"The lightning alert program will now end. Please review the assets.json file and try again."
		);
		console.log("----------------------------------------------------\n");
		process.exit(1);
	}
};

getAssets();

export default assets;
