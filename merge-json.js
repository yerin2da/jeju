const fs = require('fs');
const path = require('path');

const basePath = path.join(__dirname, 'public', 'db');

const culture = JSON.parse(fs.readFileSync(path.join(basePath, 'culture.json'), 'utf-8'));
const theme = JSON.parse(fs.readFileSync(path.join(basePath, 'theme.json'), 'utf-8'));
const guide = JSON.parse(fs.readFileSync(path.join(basePath, 'visitjeju.json'), 'utf-8'));

const merged = {
    culture,
    theme,
    guide
};

fs.writeFileSync(path.join(basePath, 'all.json'), JSON.stringify(merged, null, 2), 'utf-8');
console.log('✅ all.json 병합 완료');
