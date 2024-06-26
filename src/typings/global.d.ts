// * Menu
declare namespace Menu {
	interface MenuOptions {
		path: string;
		title: string;
		icon?: string;
		isLink?: string;
		close?: boolean;
		children?: MenuOptions[];
	}
}

// * Vite
declare type Recordable<T = any> = Record<string, T>;

declare interface ViteEnv {
	VITE_API_URL: string;
	VITE_PORT: number;
	VITE_OPEN: boolean;
	VITE_GLOB_APP_TITLE: string;
	VITE_DROP_CONSOLE: boolean;
	VITE_PROXY_URL: string;
	VITE_BUILD_GZIP: boolean;
	VITE_REPORT: boolean;
}

declare module "*.png" {
	const value: any;
	export default value;
}

declare interface ImportMeta {
	readonly env: ImportMetaEnv;
	globEager(pattern: string): Record<string, any>;
}

interface ImportMetaEnv {
	[key: string]: any;
	BASE_URL: string;
	MODE: string;
	DEV: boolean;
	PROD: boolean;
	SSR: boolean;
}
