const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');

const DATA_DIR = path.join(process.cwd(), 'data');
const CITIES_DIR = path.join(DATA_DIR, 'cities');
const ZIP_PATH = path.join(DATA_DIR, 'cities.zip');

function packData() {
    console.log('[pack-data] Compressing data/cities into data/cities.zip...');

    if (!fs.existsSync(CITIES_DIR)) {
        console.log('[pack-data] Warning: No data/cities directory found. Cannot compress.');
        return;
    }

    try {
        const zip = new AdmZip();
        // Add the folder contents to the root of the zip
        zip.addLocalFolder(CITIES_DIR, "");

        zip.writeZip(ZIP_PATH);
        console.log(`[pack-data] Successfully created ${ZIP_PATH} (${(fs.statSync(ZIP_PATH).size / 1024 / 1024).toFixed(2)} MB)`);
    } catch (err) {
        console.error('[pack-data] Error zipping files:', err);
        process.exit(1);
    }
}

packData();
