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

const generateFeedback = (answerObj, questionNo, correct) => {
    let feedback = {
        answerObj: answerObj,
        questionNo: questionNo,
        correct: correct
    }
    return feedback
}

const splitQuestions = (totalQuestions, numberOfSplits) => {
    let totalPerSplit = Math.floor(totalQuestions / numberOfSplits)
    let splits = []
    for(let i = 0; i<numberOfSplits - 1; i++){
        splits.push(totalPerSplit)
        totalQuestions -= totalPerSplit
    }
    splits.push(totalQuestions)
    return splits
}

const getSetBySplit = (data, splits, setNumber) => { //set number is 1-indexed
    let startIndex = splits[0] * (setNumber - 1)
    let endIndex = startIndex + splits[setNumber-1]
    let set = []
    for(let i = startIndex; i<endIndex; i++){
        set.push(data[i])
    }
    // Total = 20,  Splits = [6, 6, 8]
    // set 1: start = 0 end(exclusive) = 6
    // set 2: start = 6 end(exclusive) = 12
    // set 3: start = 12 end(exclusive) = 20

    // set 1: start = split[0] * 0 end(exclusive) = start + split[0]
    // set 2: start = split[0] * 1 end(exclusive) = start + split[1]
    // set 3: start = split[0] * 2 end(exclusive) = start + split[2]
    return set
}

export {setOptionOrder, getRandomSelection, checkDuplicates, arrayContains,optionsUnsuitable, isCorrect, generateFeedback, splitQuestions, getSetBySplit}

