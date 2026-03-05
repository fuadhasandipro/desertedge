const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = 'f:\\Hustle\\llm\\cities_updated.csv';
const citiesDir = path.join(__dirname, 'public', 'data', 'cities');

let totalInCsv = 0;
let jsonFilesFound = 0;
let filesModified = 0;
let parseErrors = 0;

function generateSlug(city, stateId) {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const stateSlug = stateId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${citySlug}-${stateSlug}.json`;
}

function processFaqs(faqs) {
    let modified = false;
    if (!Array.isArray(faqs)) return { modified: false, faqs };

    let newFaqs = [];

    faqs.forEach(faq => {
        if (!faq.a) {
            newFaqs.push(faq);
            return;
        }

        if (typeof faq.a === 'object') {
            let extracted = false;
            // Iterate over potential keys q1, a1, q2, a2, ...
            for (let i = 1; i <= Object.keys(faq.a).length; i++) {
                const qKey = `q${i}`;
                const aKey = `a${i}`;
                if (faq.a[qKey] && faq.a[aKey]) {
                    newFaqs.push({
                        q: faq.a[qKey],
                        a: faq.a[aKey]
                    });
                    extracted = true;
                }
            }
            if (!extracted) {
                newFaqs.push(faq);
            } else {
                modified = true;
            }
            return;
        }

        if (typeof faq.a === 'string') {
            const aText = faq.a;
            const match = aText.match(/Q:\s*(.*?)\s*A:\s*(.*)/i) || aText.match(/Q\s(.*?)A\s(.*)/i);

            if (match) {
                newFaqs.push({
                    q: match[1].trim(),
                    a: match[2].trim()
                });
                modified = true;
            } else {
                newFaqs.push(faq);
            }
        } else {
            newFaqs.push(faq);
        }
    });

    return { modified, newFaqs };
}

fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
        totalInCsv++;
        const city = row.city;
        const stateId = row.state_id;

        if (!city || !stateId) return;

        const filename = generateSlug(city, stateId);
        const filePath = path.join(citiesDir, filename);

        if (fs.existsSync(filePath)) {
            jsonFilesFound++;
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (!fileContent.trim()) {
                    console.warn(`File is empty: ${filename}`);
                    parseErrors++;
                    return;
                }
                const data = JSON.parse(fileContent);

                if (data.faqs) {
                    const { modified, newFaqs } = processFaqs(data.faqs);

                    if (modified) {
                        data.faqs = newFaqs;
                        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                        filesModified++;
                        console.log(`Fixed object/string format for: ${filename}`);
                    }
                }
            } catch (error) {
                parseErrors++;
                console.error(`Error processing file ${filename}:`, error.message);
            }
        }
    })
    .on('end', () => {
        console.log('--- FAQ Formatting Fix Summary 2 ---');
        console.log(`Total cities in CSV: ${totalInCsv}`);
        console.log(`JSON files found matching CSV: ${jsonFilesFound}`);
        console.log(`Newly modified files: ${filesModified}`);
        console.log(`Errors skipped: ${parseErrors}`);
        console.log('------------------------------------');
    });
