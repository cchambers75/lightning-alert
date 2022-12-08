# Lightning Strike Alert System

This program reads lightning strike events as JSON objects as a stream of data from stdin and takes the objects, parses them, converts the latitude and longitude to a quadkey, and then looks for a matching asset based on the quadkey value. Once it finds an asset, it prints an alert to the console for the strike. It keeps track of the alerts and won't alert the same asset twice.

## Dependencies

- @types/node
- typescript
- vitest
- zod

## Installation

- Clone this repository to your local machine using git clone https://github.com/cchambers75/lightning-alert.git.
- Navigate to the cloned repository directory.
- Install the required dependencies using npm install.

## Usage

To run the program locally, use the following command:

`ts-node-esm ./src/index.ts`

This will start the program and begin reading lightning strike events as they are entered in the console. The program will parse the events, convert the latitude and longitude to a quadkey, and then look for a matching asset. If an asset is found, an alert will be printed to the console.

You can exit by pressing "CTRL + C" on your keyboard.

To complile the typescript to a dist folder you can run the following command:

`npm run build`

To run the tests use the following command:

`npx vitest`

## Docker Usage

To get the image from Docker you can run the following command:

`docker pull cchambers75/lightning-alert`

Once you have the image you can run the container in the command line by running the following command:

`docker run -it cchambers75/lightning-alert`

This will start the program and begin reading lightning strike events as they are entered in the console. The program will parse the events, convert the latitude and longitude to a quadkey, and then look for a matching asset. If an asset is found, an alert will be printed to the console.

You can exit by pressing "CTRL + C" on your keyboard.
