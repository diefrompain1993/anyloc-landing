import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'dist');
const output = join(root, '_site');
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
let html = await readFile(join(source, 'index.html'), 'utf8');

// New filenames prevent a fresh page from reusing an older cached script or stylesheet.
for (const [asset, attribute] of [['main.js', 'src'], ['style.css', 'href']]) {
  const data = await readFile(join(source, asset));
  const hash = createHash('sha256').update(data).digest('hex').slice(0, 12);
  const { name, ext } = parse(asset);
  const versioned = `${name}.${hash}${ext}`;
  const reference = `${attribute}="${asset}"`;
  if (!html.includes(reference)) throw new Error(`Missing asset reference: ${reference}`);
  html = html.replaceAll(reference, `${attribute}="${versioned}"`);
  await writeFile(join(output, versioned), data);
  console.log(`${asset} → ${versioned}`);
}

await writeFile(join(output, 'index.html'), html);
