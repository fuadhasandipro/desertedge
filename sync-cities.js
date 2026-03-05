const fs = require('fs');
const path = require('path');

const citiesDir = path.join(__dirname, 'public', 'data', 'cities');
const stateCitiesDir = path.join(__dirname, 'public', 'data', 'state-cities');

console.log("Reading existing state cities...");
const stateCitiesData = {};
const stateFiles = fs.readdirSync(stateCitiesDir).filter(f => f.endsWith('.json'));

let existingCount = 0;
for (const file of stateFiles) {
    const state = file.replace('.json', '');
    try {
        const data = JSON.parse(fs.readFileSync(path.join(stateCitiesDir, file), 'utf8'));
        stateCitiesData[state] = data;
        existingCount += data.length;
    } catch (e) {
        console.error(`Error reading ${file}:`, e);
    }
}
console.log(`Found ${existingCount} existing cities in state JSONs.`);

console.log("Reading new cities...");
const files = fs.readdirSync(citiesDir).filter(f => f.endsWith('.json'));

let addedCount = 0;
for (const file of files) {
    const slug = file.replace('.json', '');
    try {
        const fileContent = fs.readFileSync(path.join(citiesDir, file), 'utf8');
        const cityData = JSON.parse(fileContent);
        const { city, state, zip_codes } = cityData;

        if (!state) continue;

        if (!stateCitiesData[state]) {
            stateCitiesData[state] = [];
        }

        const stateArr = stateCitiesData[state];

        // check if city already exists in stateArr based on slug
        const exists = stateArr.find(c => c.slug === slug);
        if (!exists) {
            stateArr.push({
                city: city,
                slug: slug,
                state: state,
                zip_codes: zip_codes || []
            });
            addedCount++;
        }
    } catch (e) {
        console.error(`Error with file ${file}:`, e.message);
    }
}

console.log(`Added ${addedCount} new cities.`);

console.log("Writing updated state JSONs...");
for (const [state, arr] of Object.entries(stateCitiesData)) {
    // Sort cities alphabetically by name
    arr.sort((a, b) => a.city.localeCompare(b.city));
    fs.writeFileSync(path.join(stateCitiesDir, `${state}.json`), JSON.stringify(arr));
}

console.log(`Sync complete! Total cities now in state JSONs: ${existingCount + addedCount}`);
