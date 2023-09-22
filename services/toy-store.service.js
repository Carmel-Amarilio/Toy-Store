import fs from 'fs'
import { utilService } from './util.service.js'

const toys = utilService.readJsonFile('data/toy.json')

export const toyStoreService = {
    query,
    get,
    remove,
    save
}

function query(filterBy = {}) {
    let toysToDisplay = toys
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        toysToDisplay = toysToDisplay.filter(toy => regExp.test(toy.name))
    }
    if (filterBy.label) {
        toysToDisplay = toysToDisplay.filter(toy => toy.labels.includes(filterBy.label))
    }


    return Promise.resolve(toysToDisplay)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('toy not found!')
    return Promise.resolve(toy)
}

function remove(toyId,) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('No Such toy')
    const toy = toys[idx]
    toys.splice(idx, 1)
    return _saveToysToFile()

}

function save(toyToEdit) {
    if (toyToEdit._id) {
        const toyToUpdate = toys.find(toy => toy._id === toyToEdit._id)
        toyToUpdate.name = toyToEdit.name
        toyToUpdate.price = toyToEdit.price
        toyToUpdate.inStock = toyToEdit.inStock
        toyToUpdate.labels = toyToEdit.labels
    } else {
        toyToEdit._id = _makeId()
        toys.push(toyToEdit)
    }
    
    return _saveToysToFile().then(() => toyToEdit)
    // return Promise.resolve(toy)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {

        const toysStr = JSON.stringify(toys, null, 4)
        fs.writeFile('data/toy.json', toysStr, (err) => {
            if (err) {
                return console.log(err);
            }
            console.log('The file was saved!');
            resolve()
        });
    })
}
