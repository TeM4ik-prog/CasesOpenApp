

function RandInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1))

}

function RandElemFromAr(array) {
    return array[RandInt(0, array.length - 1)]
}


export {
    RandInt,
    RandElemFromAr
}