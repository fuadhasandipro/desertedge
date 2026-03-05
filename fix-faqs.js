const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = 'f:\\Hustle\\llm\\cities_updated.csv';
const citiesDir = path.join(__dirname, 'public', 'data', 'cities');

let totalInCsv = 0;
let jsonFilesFound = 0;
let filesModified = 0;
let faqsModifiedTotal = 0;

function generateSlug(city, stateId) {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const stateSlug = stateId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${citySlug}-${stateSlug}.json`;
}

function processFaqs(faqs) {
    let modified = false;
    if (!Array.isArray(faqs)) return { modified: false, faqs };

    const newFaqs = faqs.map(faq => {
        if (!faq.a) return faq; // Skip if no answer field

        const aText = faq.a;

        // Match strictly "Q: ... A: ..." or "Q ... A ..."
        // Using a regex to extract Question and Answer from the "a" field.
        const match = aText.match(/Q:\s*(.*?)\s*A:\s*(.*)/i) || aText.match(/Q\s(.*?)A\s(.*)/i);

        if (match) {
            const extractedQuestion = match[1].trim();
            const extractedAnswer = match[2].trim();
            modified = true;
            return {
                q: extractedQuestion,
                a: extractedAnswer
            };
        }

        return faq;
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
                const data = JSON.parse(fileContent);

                if (data.faqs) {
                    const { modified, newFaqs } = processFaqs(data.faqs);

                    if (modified) {
                        data.faqs = newFaqs;
                        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
                        filesModified++;
                    }
                }
            } catch (error) {
                console.error(`Error processing file ${filename}:`, error.message);
            }
        }
    })
    .on('end', () => {
        console.log('--- FAQ Formatting Fix Summary ---');
        console.log(`Total cities in CSV: ${totalInCsv}`);
        console.log(`JSON files found matching CSV: ${jsonFilesFound}`);
        console.log(`JSON files successfully modified: ${filesModified}`);
        console.log(`JSON files that didn't need changes (left untouched): ${jsonFilesFound - filesModified}`);
        console.log(`JSON files from CSV NOT found in cities dir: ${totalInCsv - jsonFilesFound}`);
        console.log('---------------------------------');
    });
