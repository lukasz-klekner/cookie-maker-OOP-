const handlebarsHelpers = {
    'find-price': (entries, selectedItem) => {
        const foundItem = entries.find(([name] ) => name === selectedItem)

        if(!foundItem){
            throw new Error('Cannot find price of ${selectedItem}')
        }

        const [,price] = foundItem
        return price
    },
    pricify: price => price.toFixed(2),
    isNotInArray: (array, element) => !array.includes(element),
    isInArray: (array, element) => array.includes(element)
}

module.exports = {
    handlebarsHelpers
}