import { z, ZodError } from "zod";
import { LightningEvent } from "../../type";

// This function validates a LightningEvent object using zod
// It returns true if the object is valid, and false if it is not
// If the object is not valid, it will log the errors to the console
export default function validateLightningEvent(event: LightningEvent) {
	const eventObject = z.object({
		flashType: z
			.number({
				required_error: "Flash Type is required",
				invalid_type_error: "Flash Type must be either 0, 1, or 9",
			})
			.refine((value) => value in [0, 1, 9], {
				message: "Flash Type must be either 0, 1, or 9",
			}),
		strikeTime: z.number({
			required_error: "Strike Time is required",
			invalid_type_error: "Title must be a unix timestamp",
		}),
		latitude: z
			.number({
				required_error: "Latitude is required",
				invalid_type_error: "Latitude must be a number between -90 and 90",
			})
			.min(-90, { message: "Latitude must be a number greater than -90" })
			.max(90, { message: "Latitude must be a number less than 90" }),
		longitude: z
			.number({
				required_error: "Longitude is required",
				invalid_type_error: "Longitude must be a number between -180 and 180",
			})
			.min(-180, { message: "Longitude must be a number greater than -180" })
			.max(180, { message: "Longitude must be a number less than 180" }),
		peakAmps: z.number({
			required_error: "Peak Amps is required",
			invalid_type_error: "Peak Amps must be a number",
		}),
		reserved: z.string({
			required_error: "Reserved is required",
			invalid_type_error: "Reserved must be a string",
		}),
		icHeight: z.number({
			required_error: "IC Height is required",
			invalid_type_error: "IC Height must be a number",
		}),
		receivedTime: z.number({
			required_error: "Received Time is required",
			invalid_type_error: "Received Time must be a unix timestamp",
		}),
		numberOfSensors: z.number({
			required_error: "Number of Sensors is required",
			invalid_type_error: "Number of Sensors must be a number",
		}),
		multiplicity: z.number({
			required_error: "Multiplicity is required",
			invalid_type_error: "Multiplicity must be a number",
		}),
	});
	try {
		// If the object is valid, then return true
		eventObject.parse(event);
		return true;
	} catch (e) {
		// If the object is not valid, then log the errors to the console and return false
		if (e instanceof ZodError) {
			console.log("\n---------------------------------------");
			e.errors.forEach((error) => {
				console.log("Error:", error.message);
			});
			console.log("---------------------------------------\n");
		}
		return false;
	}
}
