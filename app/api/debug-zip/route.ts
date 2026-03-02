import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const cwd = process.cwd();
    const dir = __dirname;
    const filesInCwd = fs.readdirSync(cwd);

    let nextServerFiles: string[] = [];
    try {
        nextServerFiles = fs.readdirSync(path.join(cwd, '.next', 'server'));
    } catch {
        // ignore
    }

    return NextResponse.json({
        cwd,
        dirname: dir,
        filesInCwd,
        nextServerFiles,
        dataZipExistsInCwd: fs.existsSync(path.join(cwd, 'data.zip')),
    });
}
