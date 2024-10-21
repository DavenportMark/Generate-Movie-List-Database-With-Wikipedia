# Generate-Movie-List-Database-With-Wikipedia
Using a wikipedia dump, generate a SQLite database of movies.

To use the tool you need to download an XML dump file from Wikipedia. The file name will be something like. enwiki-latest-pages-articles-multistream.xml 
[wikipedia database download](https://en.wikipedia.org/wiki/Wikipedia:Database_download)

Then you can generate the sql file. There's a very basic UI for searching through the movie names.

This is a work in progress, and is not finished.

You'll need to install node dependancies with
```
npm i
```

Then you can run

```
node main.js
```