const sqlite3 = require('sqlite3').verbose();

const { XMLParser } = require('fast-xml-parser');


let db = new sqlite3.Database('database.db');

db.serialize(() => {
    
    // db.each("SELECT COUNT(id) as amount, director FROM movie group by director order by amount asc;", (err, row) => {
    //     if (err) {
    //         console.error(err.message);
    //     }
    //     console.log(row);
    // });

    // db.run(`
    //     ALTER TABLE movie add runtime TEXT
    // `);

    db.each("SELECT * FROM movie LIMIT 1000", (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row);
    });

    // db.each("SELECT * FROM movie", (err, row) => {
    //     if (err) {
    //         console.error(err.message);
    //     }
    //     const directorName = getMovieInfo(row.page);
    //     updateTitleInDB(row.id, directorName);
    //     console.log(row.director);
    // });
});




function updateTitleInDB(id, runtime) {
    db.serialize(() => {
        db.run(`
            UPDATE movie SET runtime = ? WHERE id = ?
        `, [runtime, id]);
    });

    console.log('.');
}

function getMovieInfo(jsonString){
    // Parse the JSON
    const data = JSON.parse(jsonString);

    // Extract the text content which contains the infobox
    const textContent = data.revision[0].text[0]._;

    // console.log(textContent);

    // // Define a function to extract the values
    function extractValues(key, content) {
        let inInfobox = '';
        let word = '';
        const startOf = content.indexOf('Infobox film');
        const endOf = content.indexOf("gross");
        const infobox = content.substring(startOf, endOf);

        const splited = infobox.split('|');
        const info = {};
        splited.forEach((e) => {
            
            let stuff = e.split('=');
            let key = stuff[0];
            let val = stuff[1];

            if(key){
                key = key.trim();
            } else {
                key = '';
            }

            if(val){
                val = val.trim();
            } else {
                val = '';
            }
            info[key] = val;
        });

        if(!info[key]){
            return 'N/A';
        }


        return info[key].replace('[[', '').replace(']]', '');
    
    }

    // // Extract required information
    const director = extractValues('runtime', textContent);

    // const runtime = extractValue('runtime', textContent);
    // const writer = extractValue('writer', textContent);
    // const producer = extractValue('producer', textContent);
    // const starring = extractValue('starring', textContent);
    // const cinematography = extractValue('cinematography', textContent);
    // const editing = extractValue('editing', textContent);
    // const music = extractValue('music', textContent);
    // const studio = extractValue('studio', textContent);
    // const distributor = extractValue('distributor', textContent);
    // const released = extractValue('released', textContent);
    
    // const country = extractValue('country', textContent);
    // const language = extractValue('language', textContent);
    // const budget = extractValue('budget', textContent);
    // const boxOffice = extractValue('gross', textContent);

    // // Output the results
    // console.log(`Directed by: ${values.director}`);
    // console.log(`Written by: ${writer}`);
    // console.log(`Produced by: ${producer}`);
    // console.log(`Starring: ${starring}`);
    // console.log(`Cinematography: ${cinematography}`);
    // console.log(`Edited by: ${editing}`);
    // console.log(`Music by: ${music}`);
    // console.log(`Production companies: ${studio}`);
    // console.log(`Distributed by: ${distributor}`);
    // console.log(`Release date: ${released}`);
    // console.log(`runtime: ${runtime}`);
    // console.log(`Country: ${country}`);
    // console.log(`Language: ${language}`);
    // console.log(`Budget: ${budget}`);
    // console.log(`Box office: ${boxOffice}`);

    return director;
}