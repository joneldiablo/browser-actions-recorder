import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
const { updateVersion } = require('../update-version');

test('updateVersion increments patch component', () => {
  const tempDir = mkdtempSync(path.join(tmpdir(), 'pkg-'));
  const pkgPath = path.join(tempDir, 'package.json');
  const orig = JSON.parse(readFileSync('package.json', 'utf-8'));
  writeFileSync(pkgPath, JSON.stringify(orig, null, 2));
  const newVersion = updateVersion(pkgPath);
  const updated = JSON.parse(readFileSync(pkgPath, 'utf-8'));
  expect(updated.version).toBe(newVersion);
  const origParts = orig.version.split('.');
  const newParts = newVersion.split('.');
  expect(parseInt(newParts[2])).toBe(parseInt(origParts[2]) + 1);
  rmSync(tempDir, { recursive: true, force: true });
});
