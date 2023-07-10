const setOptionOrder = function(numOptions){
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

const getRandomSelection = function(numElements, parentArr){
    let totalSize = parentArr.length
    let array = []
    for(let i = 0; i < numElements; i++){
        let rand = Math.floor(Math.random() * totalSize)
        array.push(parentArr[rand])
    }
    return array
}

const checkDuplicates = function(array){
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
const arrayContains = function(objArray, answerObj){
    for(let obj of objArray){
        if(obj == answerObj){
            return true
        }
    }
    return false
}
const optionsUnsuitable = function(objArray, answerObj){
    if(checkDuplicates(objArray)){
        return true
    }
    if(arrayContains(objArray, answerObj)){
        return true
    }
    return false
}

const isCorrect = (answerObj, selected_id) => {
    console.log("Response: " + selected_id)
    if(selected_id == answerObj['Kana']){
        console.log("Correct")
        return true
    }
    else{
        console.log("incorrect")
        return false
    }
}

export {setOptionOrder, getRandomSelection, checkDuplicates, arrayContains,optionsUnsuitable, isCorrect}

