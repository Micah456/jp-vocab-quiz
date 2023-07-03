module.exports.setOptionOrder = function(numOptions){
    let array = []
    for(let i=0 ; i<numOptions; i++){
        array.push(i)
    }
    let finalArray = []
    while(array.length > 1){
        let pos = Math.floor(Math.random() * array.length)
        let numToPush = array.splice(pos, 1)[0]
        finalArray.push(numToPush)
    }
    finalArray.push(array[0])
    return finalArray
}

module.exports.getRandomSelection = function(numElements, parentArr){
    let totalSize = parentArr.length
    let array = []
    for(let i = 0; i < numElements; i++){
        let rand = Math.floor(Math.random() * totalSize)
        array.push(parentArr[rand])
    }
    return array
}

module.exports.checkDuplicates = function(array){
    for(let item of array){
        let newArr = array.filter(function(i){
            return i == item
        })
        let num = newArr.length
        if(num > 1){
            return true
        }
    }
    return false
}
module.exports.arrayContains = function(objArray, answerObj){
    for(let obj of objArray){
        if(obj == answerObj){
            return true
        }
    }
    return false
}
module.exports.optionsUnsuitable = function(objArray, answerObj){
    if(checkDuplicates(objArray)){
        return true
    }
    if(arrayContains(objArray, answerObj)){
        return true
    }
    return false
}
