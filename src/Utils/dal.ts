import fs from 'fs/promises';

async function readString(filename: string): Promise<string> {
    const str = await fs.readFile(filename, 'utf-8');
    return str;
}

async function writeFile(filename: string, text: string): Promise<void> {
    await fs.writeFile(filename, text, "utf-8")
    return;
}

export default {
    readString,
    writeFile
};