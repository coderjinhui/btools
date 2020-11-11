
export interface BaseCommand {
    command: string;
    alias?: string | string[];
    description?: string;
    optionDescription?: {[option: string]: string};
    handler: (...args: any[]) => void | Promise<void>;
}