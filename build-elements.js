const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const sourceDir = './dist/apps/snapodds';
  const targetDir = './dist/elements/snapodds';
  const files = [
    `${sourceDir}/runtime.js`,
    `${sourceDir}/polyfills.js`,
    `${sourceDir}/main.js`,
    `${sourceDir}/assets/snapodds-builder.js`,
  ];

  await fs.ensureDir(`${targetDir}`);
  await concat(files, `${targetDir}/snapodds-sdk.js`);
  await fs.copyFile(`${sourceDir}/styles.css`, `${targetDir}/snapodds-sdk.css`);
})();
