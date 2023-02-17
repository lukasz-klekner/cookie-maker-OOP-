type Entry = [string, number]

export const handlebarsHelpers = {
    'find-price': (entries: Entry[], selectedItem: string) => {
        const foundItem = entries.find(([name]) => name === selectedItem)

        if(!foundItem){
            throw new Error('Cannot find price of ${selectedItem}')
        }

        const [,price] = foundItem
        return price
    },
    pricify: (price: number) => price.toFixed(2),
    isNotInArray: <T>(array: T[], element: T) => !array.includes(element),
    isInArray: <T>(array: T[], element: T) => array.includes(element)
}