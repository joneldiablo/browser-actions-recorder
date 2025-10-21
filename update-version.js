'use strict';
const fs = require('fs');

/**
 * Increments the patch version in the provided package.json file.
 *
 * @param {string} [pkgPath="./package.json"] - Path to the package.json file.
 * @returns {string} The updated version string.
 *
 * @example
 * // Increase the version of the local package.json
 * const newVersion = updateVersion();
 * console.log(newVersion);
 */
function updateVersion(pkgPath = './package.json') {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const versionParts = pkg.version.split('.');
  const last = versionParts.pop();
  const tmp = last.split('-');
  const patch = parseInt(tmp[0], 10) + 1;
  const newLast = tmp.length > 1 ? `${patch}-${tmp[1]}` : `${patch}`;
  versionParts.push(newLast);
  pkg.version = versionParts.join('.');
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  return pkg.version;
}

if (require.main === module) {
  console.log(updateVersion());
}

module.exports = { updateVersion };
