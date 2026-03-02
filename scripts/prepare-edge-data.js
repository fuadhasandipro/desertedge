const fs = require('fs');
const path = require('path');

async function prepareEdgeData() {
  const sourceDir = path.join(process.cwd(), 'data', 'cities');
  const targetDir = path.join(process.cwd(), 'public', 'data', 'cities');
  const stateCitiesDir = path.join(process.cwd(), 'public', 'data', 'state-cities');
  const statesFile = path.join(process.cwd(), 'public', 'data', 'states.json');

  console.log('Preparing data for Cloudflare Edge...');

  // Create target directories if they don't exist
  [targetDir, stateCitiesDir].forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  // Read all city files
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.json'));
  const citiesByState = {};
  
  console.log(`Processing ${files.length} city files...`);

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    // Copy the file to public directory so it can be fetched at the Edge
    fs.copyFileSync(sourcePath, targetPath);

    // Read the file to categorize it by state
    const cityData = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
    const stateShort = cityData.state.toUpperCase();

    if (!citiesByState[stateShort]) {
      citiesByState[stateShort] = {
        state: stateShort,
        state_name: cityData.state_name,
        cities: []
      };
    }

    // Keep a lightweight version of the city for the state lists
    citiesByState[stateShort].cities.push({
      city: cityData.city,
      slug: cityData.slug,
      state: cityData.state,
      zip_codes: cityData.zip_codes || []
    });
  }

  // Generate state summary files
  const stateSummary = [];
  
  for (const [stateCode, stateData] of Object.entries(citiesByState)) {
    // Write individual state file (e.g. public/data/state-cities/TX.json)
    fs.writeFileSync(
      path.join(stateCitiesDir, `${stateCode}.json`),
      JSON.stringify(stateData.cities)
    );

    // Add to national summary
    stateSummary.push({
      state: stateCode,
      state_name: stateData.state_name,
      count: stateData.cities.length
    });
  }

  // Write top-level states file
  // Sort alphabetically by state name
  stateSummary.sort((a, b) => a.state_name.localeCompare(b.state_name));
  fs.writeFileSync(statesFile, JSON.stringify(stateSummary));

  console.log(`Successfully prepared data for ${stateSummary.length} states.`);
  console.log('Edge data generation complete!');
}

prepareEdgeData().catch(err => {
  console.error('Failed to prepare edge data:', err);
  process.exit(1);
});
