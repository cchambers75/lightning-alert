import { Asset, LightningEvent } from "../../type";
import assets from "../models/assets.js";
import toQuadKey from "../utils/quadKey-conversion.js";
import validateLightningEvent from "../utils/zod-validators.js";

// This function takes in a lightning event and checks if it is within a valid asset
// If it is within a valid asset, then it returns the asset
// If it is not within a valid asset, then it returns false
export default function processStrike(strike: LightningEvent): Asset | false {
	// If the lightning event is not valid, then return false
	if (!validateLightningEvent(strike)) {
		return false;
	}
	// If the lightning event is a flash type 9, then return false
	if (strike.flashType === 9) {
		return false;
	}
	// Convert the latitude and longitude to a quadkey
	const qKey = toQuadKey(strike.latitude, strike.longitude, 12);
	// If the quadkey is in the assets map, then return the asset
	if (assets.get(qKey)) {
		return assets.get(qKey);
	}
	// If the quadkey is not in the assets map, then return false
	return false;
}
