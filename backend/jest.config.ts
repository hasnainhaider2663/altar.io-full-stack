import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "node", // Use Node.js environment for testing Express
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts$", // Test file pattern
	moduleFileExtensions: ["ts", "js", "json", "node"],
	collectCoverage: true, // Optional: to collect test coverage
};

export default config;
