// declare const mode: string;

declare global {
    const mode: string
    interface Window {
        params: {
            routeParams: Record<string, string | number>;
            hashParams: Record<string, string | number>;
            filePath: string;
        }
    }

    interface Document {

    }

    const chrome: any
}

export {}
