/**
 * Monkey patch console warn and error to fail if a test makes calls to console.warn or console.error.
 */
export class TestUtils {
    static utilTest(): void {
        this.patchConsole();
    }

    private static patchConsole(): void {
        console.warn = function(message?: any, ...optionalParams: any[]): void {
            const params = optionalParams ? `\nParams: ${optionalParams}` : '';
            fail(`Test contained console warning:\n${message}${params}`);
        };
        console.error = function(message?: any, ...optionalParams: any[]): void {
            const params = optionalParams ? `\nParams: ${optionalParams}` : '';
            fail(`Test contained console error:\n${message}${params}`);
        };
    }
}
