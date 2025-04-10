import fs from 'fs';
import path from 'path';
import { quicktype, InputData, jsonInputForTargetLanguage } from 'quicktype-core';

const INPUT_DIR = path.resolve(__dirname, '../../typesamples');
const OUTPUT_FILE = path.resolve(__dirname, '../../types/generated-types.ts');

function toPascalCase(input: string) {
  return input
    .replace(/[^a-zA-Z0-9]/g, ' ')
    .replace(/(?:^|\s|_)(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/\s+/g, '');
}

async function generate() {
  const inputData = new InputData();
  const jsonInput = jsonInputForTargetLanguage('typescript');

  const dirs = fs.readdirSync(INPUT_DIR, { withFileTypes: true }).filter(d => d.isDirectory());

  for (const dir of dirs) {
    const folder = path.join(INPUT_DIR, dir.name);
    const files = fs.readdirSync(folder).filter(f => f.endsWith('.json'));

    if (files.length === 0) continue;

    const className = toPascalCase(dir.name);
    const samples = files.map(file => {
      const fullPath = path.join(folder, file);
      return fs.readFileSync(fullPath, 'utf-8');
    });

    await jsonInput.addSource({
      name: className,
      samples
    });
  }

  inputData.addInput(jsonInput);

  const result = await quicktype({
    inputData,
    lang: 'typescript',
    rendererOptions: {
      'just-types': 'true',
      'nice-property-names': 'true',
      'acronym-style': 'original',
      'infer-enums': 'false',
      'prefer-types': 'true',
    },
  });


  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, result.lines.join('\n'));

  console.log(`✅ Generated types to ${OUTPUT_FILE}`);
}

generate().catch((err) => {
  console.error('❌ Type generation failed:', err);
});
