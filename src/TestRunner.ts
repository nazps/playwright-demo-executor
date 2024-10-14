import { exec } from 'child_process';
import path from 'path';

export enum Project {
    CHROMIUM = 'chromium'
}

export class TestRunner {
    private project: string;

    constructor(project: Project) {
        this.project = project;
    }

    // Modyfikujemy spawnPromise, aby emitowała dane na bieżąco
    private spawnPromise = (cmd: string, args: any, onData: (data: string) => void) => {
        return new Promise((resolve, reject) => {
            try {
                const runCommand = exec(cmd, args);
                runCommand.stdout?.on('data', data => {
                    onData(data); // Emituj dane na bieżąco
                });

                runCommand.on('close', (code) => {
                    resolve(`Process finished with code: ${code}`);
                });

                runCommand.on('error', err => {
                    reject(err);
                });

                runCommand.stderr?.on('data', data => {
                    onData(data);
                });

            } catch (e) {
                reject(e);
            }
        });
    };

    public async runTests(testName: string, onData: (data: string) => void) {
        // Run Playwright tests using child_process.exec and emit data via the onData callback
        return this.spawnPromise(
            `npx playwright test -g "${testName}" --project=${this.project} --headed`, 
            { cwd: path.join(__dirname, '..') }, 
            onData
        );
    }
}