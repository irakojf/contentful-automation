const csv = require('csv-parser'); 
const fs = require('fs'); 
var results = []; 

fs.createReadStream('sources.csv')
  .pipe(csv({}))
  .on('data', (data) => results.push(data));
//   .on('end', () => { 
//     console.log(results[0]);
//  }); 
