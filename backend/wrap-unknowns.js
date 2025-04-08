import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const EXTENSIONS = ['.ts', '.tsx'];
const DEBUG_IMPORT = `import { debug } from '@/utils/debug';`;
const DRY_RUN = process.argv.includes('--dry-run');

function findFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findFiles(full);
    if (EXTENSIONS.includes(path.extname(entry.name))) return full;
    return [];
  });
}

function ensureDebugImport(lines) {
  const hasImport = lines.some((line) => line.includes(DEBUG_IMPORT));
  if (!hasImport) {
    const firstImport = lines.findIndex((line) => line.startsWith('import'));
    const insertAt = firstImport >= 0 ? firstImport : 0;
    lines.splice(insertAt, 0, DEBUG_IMPORT);
    return true;
  }
  return false;
}

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  let lines = content.split('\n');
  let modified = false;
  const changes = [];

  // Step 1: Replace all `any` with `unknown`
  lines = lines.map((line, index) => {
    if (line.includes(': any')) {
      const updated = line.replace(/: any\b/g, ': unknown');
      if (updated !== line) {
        changes.push({ type: 'replace', original: line.trim(), updated: updated.trim(), line: index + 1 });
        modified = true;
        return updated;
      }
    }
    return line;
  });

  // Step 2: Add debug(...) after unknown declarations
  const resultLines = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    resultLines.push(line);

    const match = line.match(/^\s*(const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*unknown\b/);
    if (match) {
      const varName = match[2];
      const indent = line.match(/^\s*/)?.[0] || '';
      const debugLine = `${indent}${varName} = debug('${varName}', ${varName});`;

      // Avoid duplicates
      const nextLine = lines[i + 1] || '';
      if (!nextLine.includes(`debug('${varName}'`)) {
        resultLines.push(debugLine);
        changes.push({ type: 'debug', line: i + 2, code: debugLine });
        modified = true;
      }
    }
  }

  // Step 3: Ensure debug import
  const importAdded = ensureDebugImport(resultLines);
  if (importAdded) {
    changes.push({ type: 'import', code: DEBUG_IMPORT });
    modified = true;
  }

  if (modified) {
    if (DRY_RUN) {
      console.log(`\n[Dry Run] Would modify ${filePath}`);
      for (const c of changes) {
        if (c.type === 'replace') {
          console.log(`  [Line ${c.line}] Replace: ${c.original}`);
          console.log(`                 With:    ${c.updated}`);
        } else if (c.type === 'debug') {
          console.log(`  [Line ${c.line}] Add debug: ${c.code}`);
        } else if (c.type === 'import') {
          console.log(`  + Add import: ${c.code}`);
        }
      }
    } else {
      fs.writeFileSync(filePath, resultLines.join('\n'), 'utf-8');
      console.log(`✔ Modified: ${filePath}`);
    }
  }
}

function main() {
  const files = findFiles(SRC_DIR);
  files.forEach(processFile);
}

main();
