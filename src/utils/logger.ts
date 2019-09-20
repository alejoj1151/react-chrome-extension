const PREFIX = '[FiltrosProjectCO]: ';

export function log(message: string) {
    console.log(`${PREFIX}${message}`);
}

export function logError(message: string) {
    console.error(`${PREFIX}${message}`);
}
