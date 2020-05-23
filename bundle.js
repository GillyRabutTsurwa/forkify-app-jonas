const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

// NOTE: points to the dist directory
//NOTE: Very useful link: https://alligator.io/nodejs/how-to-use__dirname/
app.use(express.static(path.join(__dirname, "dist"))); 
console.log(__dirname);
/** NOTE:
 * If another route is trying to be accessed,
 * redirect to the index.html inside the dist file
 */
app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "dist/index.html"));
});

app.listen(port, () => {
    console.log(`Server Started on Port ${port}`);
});

//NOTE: Very useful video that helped me deploy my app: https://www.youtube.com/watch?v=Ru3Rj_hM8bo
//NOTE: Very useful read from express website documentation: https://expressjs.com/en/starter/static-files.html