export interface LightningEvent {
	flashType: number;
	strikeTime: number;
	latitude: number;
	longitude: number;
	peakAmps: number;
	reserved: string;
	icHeight: number;
	receivedTime: number;
	numberOfSensors: number;
	multiplicity: number;
}

export interface Asset {
	assetName: string;
	quadKey: string;
	assetOwner: string;
}
