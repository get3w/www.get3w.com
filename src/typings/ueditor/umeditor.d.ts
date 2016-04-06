// Type definitions for tmodjs 1.0.1
// Project: https://github.com/aui/tmodjs

interface UMEditorInstance {
    setContent(html: string): void;
    getContent(): string;
    getContentTxt(): string;
    execCommand(cmd: string, options?: any);
}

declare module UM {
    function getEditor(id: string, options?: any): UMEditorInstance;
}