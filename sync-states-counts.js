const fs = require('fs');
const path = require('path');

const statesFile = path.join(__dirname, 'public', 'data', 'states.json');
const stateCitiesDir = path.join(__dirname, 'public', 'data', 'state-cities');

console.log("Reading states.json...");
let statesData = [];
try {
    statesData = JSON.parse(fs.readFileSync(statesFile, 'utf8'));
} catch (e) {
    console.error("Error reading states.json:", e);
    process.exit(1);
}

const stateFiles = fs.readdirSync(stateCitiesDir).filter(f => f.endsWith('.json'));

for (const file of stateFiles) {
    const stateId = file.replace('.json', '');
    const exists = statesData.find(s => s.state === stateId);
    if (!exists) {
        console.log(`Adding missing state: ${stateId}`);
        // For DC we know it's District of Columbia
        statesData.push({
            state: stateId,
            state_name: stateId === 'DC' ? "District of Columbia" : stateId,
            count: 0
        });
    }
}

let totalCount = 0;

console.log("Updating counts...");
for (const stateObj of statesData) {
    const state = stateObj.state;
    const cityFilePath = path.join(stateCitiesDir, `${state}.json`);

    try {
        if (fs.existsSync(cityFilePath)) {
            const cityData = JSON.parse(fs.readFileSync(cityFilePath, 'utf8'));
            const count = cityData.length;
            stateObj.count = count;
            totalCount += count;
        } else {
            stateObj.count = 0;
        }
    } catch (e) {
        console.error(`Error processing state ${state}:`, e.message);
    }
}

console.log(`\nNew total count across all states: ${totalCount}`);

// sort states alphabetically by state
statesData.sort((a, b) => a.state.localeCompare(b.state));

console.log("Writing updated states.json...");
try {
    fs.writeFileSync(statesFile, JSON.stringify(statesData, null, 4));
    console.log("Successfully updated states.json");
} catch (e) {
    console.error("Error writing states.json:", e);
}
