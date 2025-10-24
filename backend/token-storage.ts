import * as fs from 'fs/promises';
import * as path from 'path';

const tokenFilePath = path.join(__dirname, 'token.json');

interface Tokens {
  access_token: string;
  refresh_token: string;
}

export async function saveTokens(tokens: Tokens): Promise<void> {
  try {
    await fs.writeFile(tokenFilePath, JSON.stringify(tokens, null, 2));
  } catch (error) {
    console.error('Error saving tokens:', error);
  }
}

export async function getTokens(): Promise<Tokens | null> {
  try {
    const data = await fs.readFile(tokenFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      // File doesn't exist, which is fine on first run.
      return null;
    }
    console.error('Error reading tokens:', error);
    return null;
  }
}
