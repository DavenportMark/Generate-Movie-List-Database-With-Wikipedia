const sqlite3 = require('sqlite3').verbose();

const { XMLParser } = require('fast-xml-parser');

let db = new sqlite3.Database('database.db');


const firstArg = process.argv[2];
const secondArg = process.argv[3];
const thirdArg = process.argv[4];



console.log(firstArg);
console.log(secondArg);
console.log(thirdArg);


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

if(firstArg == 'peek'){
    db.each("SELECT * FROM movie LIMIT 10", (err, row) => {
        if (err) {
            console.error(err.message);
        }
        console.log(row);
    });
}

if(firstArg == 'addmoviecol'){
    if(secondArg){
        db.run(`ALTER TABLE movie add ${secondArg} TEXT`);    
    }
}


if(firstArg == 'extract'){
    const detailName = secondArg; // example released

    db.each("SELECT * FROM movie", (err, row) => {
        if (err) {
            console.error(err.message);
        }
        // console.log(row);
        const value = getMovieInfo(detailName, row.page);
        updateTitleInDB(row.id, detailName, value);


    });

}


if(firstArg == 'extract'){
    db.each("SELECT * FROM movie", (err, row) => {
        if (err) {
            console.error(err.message);
        }

        const updated = row.budget; // $72{{nbsp}}million

        updateTitleInDB(id, 'budget', updated);



    });
}




function updateTitleInDB(id, detailName, value) {
    db.serialize(() => {
        db.run(`
            UPDATE movie SET ${detailName} = ? WHERE id = ?
        `, [value, id]);
    });

    console.log(value);
}

function getMovieInfo(detailName, jsonString){
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

        const splited = infobox.split('| ');
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

    // Extract required information
    return extractValues(detailName, textContent);;
}