export const countDuplicatedItemArray = (value, array) => {
    //cuenta las veces que se ha duplicado un PRODUCTO
    let count = 0
    array.forEach((arrayValue) => {
        if (arrayValue == value) {
            count++
        }
    })
    return count
}

export const removeArrayDuplicates = (array) => {
    // elimina los elementos repetidos de un array de PRODUCTOS
    return Array.from(new Set(array))
}

export const removeItemArray = (array, item) => {
    //sirve para aumentar o disminuir las unidades de un producto
    const index = array.indexOf(item)
    if (index > -1) {
        array.splice(index, 1)
    }
    return array
}
