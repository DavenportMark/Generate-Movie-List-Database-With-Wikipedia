const express = require('express');
const app = express();

const path = require('path');
const sqlite3 = require('sqlite3').verbose();
let db = new sqlite3.Database('D:\\wikipedia\\database.db');
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'Client')));

app.get('/movie', (req, res) => {
    let movieList;
    db.all("SELECT * FROM movie LIMIT 100", [], (err, row) => {
        if (err) {
            return console.error(err.message);
        }

        movieList = row;
        res.json({success: true, movieList});
    });
});

app.get('/movie_ajax', function(request, response){

    let search_value  = request.query.search_value;    
    db.get("SELECT * FROM movie WHERE title LIKE ? LIMIT 100", [`%${search_value}%`], function(data, error){
        if(error){
            response.json(error);
        } else {
            response.json({
                movieList: data,
                code: 200,
                success:true
            });
    
        }
    });
});


app.listen(3001);
console.log('listening on port 3001');
