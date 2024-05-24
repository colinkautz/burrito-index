import { input, select } from "@inquirer/prompts";
import * as zipcodes from "zipcodes";
import {fetchBurrito, fetchListOfStores} from "./fetch-utils.js";

let zip = await input({message: "Enter a Zip Code"});
zip = zipcodes.lookup(zip);

const init = async () => {
    const storeList = await fetchListOfStores(zip.latitude, zip.longitude);

    if(storeList.length > 0) {
        const selectedStore = await select({
            pageSize: 10,
            message: 'Select a store',
            choices: storeList
        });
        const burrito = await fetchBurrito(selectedStore);

        console.log(`The price for a 5-Layer Burrito at this store is: ${burrito}`);
    } else {
        console.log(`Sadly, there are no Taco Bell locations near you. Try another ZIP code.`);
    }

}

init().catch(err => console.error(err));