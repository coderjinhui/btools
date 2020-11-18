export interface Options {
    command: string;
    description: string;
}
export interface BaseCommand {
    command: string;
    alias?: string | string[];
    description?: string;
    optionDescription?: Options[]
    handler: (...args: any[]) => void | Promise<void>;
}
