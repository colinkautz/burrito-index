import fetch from "node-fetch";

export const fetchListOfStores = async (lat, long) => {
    const storeListUrl = `https://www.tacobell.com/tacobellwebservices/v4/tacobell/stores?latitude=${lat}&longitude=${long}`;

    const res = await fetch(storeListUrl);
    const data = await res.json();

    let formattedList = [];

    if(data.nearByStores.length > 0) {
        const storeData = data.nearByStores.length > 10 ? data.nearByStores.slice(0, 10) : data.nearByStores;

        for (const location of storeData) {
            formattedList.push({
                name: `${location.storeNumber} - ${location.address.line1} ${location.address.town}, ${location.address.region.isocode.substring(3)}`,
                value: location.storeNumber
            });
        }

        return formattedList;
    } else {
        return formattedList;
    }
}

export const fetchBurrito = async (storeNumber) => {
    const storeProductsUrl = `https://www.tacobell.com/tacobellwebservices/v4/tacobell/products/menu/${storeNumber}`;

    const res = await fetch(storeProductsUrl);
    const data = await res.json();

    const menuCategories = data.menuProductCategories;
    const burritos = menuCategories.find(item => item.name === "Burritos");
    const fiveLayerBurrito = burritos.products.find(burrito => burrito.name === "Beefy 5-Layer Burrito");

    return fiveLayerBurrito.price.formattedValue;
}