/// <reference types="vite/client" />
export declare global {
	interface Window {
		// add you custom properties and methods
		_env_: {
			BASE_URL: string;
			BACKEND_URL: string;
		};
	}
}
