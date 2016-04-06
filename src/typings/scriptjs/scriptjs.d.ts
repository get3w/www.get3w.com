interface ScriptJsFn {
	(url: string, callback: Function): string;
}

declare var scriptjs: ScriptJsFn;

declare module "scriptjs" {
	export = scriptjs
}
