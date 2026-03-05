const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = 'f:\\Hustle\\llm\\cities_updated.csv';
const citiesDir = path.join(__dirname, 'public', 'data', 'cities');

let totalInCsv = 0;
let filesModified = 0;

function generateSlug(city, stateId) {
    const citySlug = city.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const stateSlug = stateId.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return `${citySlug}-${stateSlug}.json`;
}

function removePrefixes(str) {
    if (typeof str !== 'string') return str;
    let cleaned = str.trim();
    // Remove "Q:", "A:", "Question:", "Answer:" (case insensitive) and optional markdown bold stars
    cleaned = cleaned.replace(/^\**(?:Q|A|Question|Answer)\**[:\.\-]\s*/i, '');

    // Also catch "Q " and "Question " (but NOT "A " because "A" is a common starting word like "A pipe leak...")
    cleaned = cleaned.replace(/^\**(?:Q|Question)\**\s+/i, '');
    return cleaned.trim();
}

function processFaqs(faqs) {
    let modified = false;
    if (!Array.isArray(faqs)) return { modified, faqs };

    const newFaqs = faqs.map(faq => {
        let newFaq = { ...faq };

        if (typeof newFaq.q === 'string') {
            const cleanedQ = removePrefixes(newFaq.q);
            if (cleanedQ !== newFaq.q) {
                newFaq.q = cleanedQ;
                modified = true;
            }
        }

        if (typeof newFaq.a === 'string') {
            const cleanedA = removePrefixes(newFaq.a);
            if (cleanedA !== newFaq.a) {
                newFaq.a = cleanedA;
                modified = true;
            }
        } else if (typeof newFaq.a === 'object' && newFaq.a !== null) {
            for (const key in newFaq.a) {
                if (typeof newFaq.a[key] === 'string') {
                    const cleaned = removePrefixes(newFaq.a[key]);
                    if (cleaned !== newFaq.a[key]) {
                        newFaq.a[key] = cleaned;
                        modified = true;
                    }
                }
            }
        }

        return newFaq;
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
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                if (!fileContent.trim()) return;

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
        console.log('--- FAQ Prefix Removal Summary ---');
        console.log(`Total cities in CSV: ${totalInCsv}`);
        console.log(`JSON files successfully modified: ${filesModified}`);
        console.log('----------------------------------');
    });
