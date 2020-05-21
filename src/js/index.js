import string from "./models/Search";
import { addition, multiplication, ID } from "./views/searchView";
// changing name of the functions in the new file comme je veux
import { addition as add, multiplication as multiply, ID as myID } from "./views/searchView";
// how to import absolutely everything from searchview.js
    // we save everything in an object
    
import * as searchView from "./views/searchView";

console.log(string);
console.log(`Using imported functions: ${addition(ID, 2)} and ${multiplication(3,5)}`);
console.log(`Using imported functions2: ${add(myID, 2)} and ${multiply(3,5 )}`);
console.log(`Using imported functions3: ${searchView.addition(myID, 2)} and ${searchView.multiplication(3,5 )}`);