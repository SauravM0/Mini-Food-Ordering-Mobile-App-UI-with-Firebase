import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const root = process.cwd();

const moveFile = (src, dest) => {
  if (fs.existsSync(src)) {
    // Create destination directory if it doesn't exist
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.renameSync(src, dest);
    console.log(`Moved: ${src} → ${dest}`);
  }
};

const copyFile = (src, dest) => {
  if (fs.existsSync(src)) {
    // Create destination directory if it doesn't exist
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(src, dest);
    console.log(`Copied: ${src} → ${dest}`);
  }
};

const removeDir = (dir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`Removed: ${dir}`);
  }
};

// Move app directory to app-example
moveFile(path.join(root, 'app'), path.join(root, 'app-example'));

// Create new app directory
fs.mkdirSync(path.join(root, 'app'), { recursive: true });

// Copy template files
copyFile(path.join(__dirname, 'template', 'app', '_layout.tsx'), path.join(root, 'app', '_layout.tsx'));
copyFile(path.join(__dirname, 'template', 'app', '+not-found.tsx'), path.join(root, 'app', '+not-found.tsx'));
copyFile(path.join(__dirname, 'template', 'app', 'index.tsx'), path.join(root, 'app', 'index.tsx'));
copyFile(path.join(__dirname, 'template', 'app', 'cart.tsx'), path.join(root, 'app', 'cart.tsx'));
copyFile(path.join(__dirname, 'template', 'app', 'order-summary.tsx'), path.join(root, 'app', 'order-summary.tsx'));

// Create (tabs) directory and copy files
fs.mkdirSync(path.join(root, 'app', '(tabs)'), { recursive: true });
copyFile(path.join(__dirname, 'template', 'app', '(tabs)', '_layout.tsx'), path.join(root, 'app', '(tabs)', '_layout.tsx'));
copyFile(path.join(__dirname, 'template', 'app', '(tabs)', 'index.tsx'), path.join(root, 'app', '(tabs)', 'index.tsx'));
copyFile(path.join(__dirname, 'template', 'app', '(tabs)', 'explore.tsx'), path.join(root, 'app', '(tabs)', 'explore.tsx'));

console.log('✅ Project reset successful!');
console.log('✅ Moved existing app to app-example');
console.log('✅ Created new app directory with template files');
console.log('✅ To start developing, edit the files in the app directory');