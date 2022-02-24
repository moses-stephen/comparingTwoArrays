const xlsx = require('xlsx');
let wb = xlsx.readFile('./deliveredAssets.xlsx');
/*gettng input from two different sheets of the same work book*/
let workSheets = {};
for(const sheetName of wb.SheetNames){
    workSheets[sheetName] = xlsx.utils.sheet_to_json(wb.Sheets[sheetName])
}
// console.log(workSheets);
// console.log(workSheets.Sheet1);
// console.log(workSheets.Sheet2);
// console.log(wb.SheetNames); //[ 'Sheet1', 'Sheet2', 'Sheet3' ]
 let oldArray = workSheets.Sheet1;
 let newArray = workSheets.Sheet2;
 const results = newArray.filter(({ new_assets: id1 }) => !oldArray.some(({ old_assets: id2 }) => id2 === id1));
// In Sheet1 :[{ o]ld_assets: '27jC4aN6SBz5GmEBWUAFhjEs' },....]
// In Sheet2 :[{ new_assets: '27jC4aN6SBz5GmEBWUAFhjEs' },.....]
//  console.log(results);
 
// if you want output in seperate new workbook
const newBook = xlsx.utils.book_new();
const newSheet = xlsx.utils.json_to_sheet(results);
xlsx.utils.book_append_sheet(newBook,newSheet,"output");
xlsx.writeFile(newBook,"output_book.xlsx")


/*if you want to put the output into the same existing excel :deliveredAssets.xlsx
yet to write*/
/*getting inputs from the same excel sheet ,yet to write....*/