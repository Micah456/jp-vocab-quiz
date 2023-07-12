const mod = require('../vocab_func_ref.js')

test('Test Options Unsuitable', () => {
    let array = [1,2,3,4]
    let array2 = [1,1,2,3]
    expect(mod.checkDuplicates(array)).toBe(false);
    expect(mod.checkDuplicates(array2)).toBe(true);
});

test('Test Array Contains', () => {
    let array = []
    let obj1 = {
        object : "one"
    }
    let obj2 = {
        object : 2
    }
    let obj3 = {
        object : true
    }
    let obj4 = {
        object : "one"
    }
    array.push(obj1)
    array.push(obj2)
    expect(mod.arrayContains(array, obj1)).toBe(true)
    expect(mod.arrayContains(array, obj2)).toBe(true)
    expect(mod.arrayContains(array, obj2)).toBe(true)
    expect(mod.arrayContains(array, obj3)).toBe(false)
});

test('Test Set Option Order', () => {
    let numOptions = Math.floor((Math.random() * 9) + 2)
    let newArray = mod.setOptionOrder(numOptions)
    let newArray2 = mod.setOptionOrder(numOptions)
    let newArray3 = mod.setOptionOrder(numOptions)
    expect(newArray).toHaveLength(numOptions)
    expect(newArray2).toHaveLength(numOptions)
    expect(newArray3).toHaveLength(numOptions)
    for(let i = 0; i < numOptions ; i++){
        expect(newArray).toContain(i)
        expect(newArray2).toContain(i)
        expect(newArray3).toContain(i)
    }
    
    expect(newArray == newArray2 && newArray == newArray3 && newArray2 == newArray3 ).toBeFalsy()
})

test('Test Get Random Selection', () => {
    let numElements = Math.floor((Math.random() * 9) + 2) // n
    let numElementsParent = Math.floor((Math.random() * (numElements + 2)*4) + numElements + 2) // Lower bound: n+2 Upper bound: 5n+9
    expect(numElements < numElementsParent).toBe(true)
    let parentArray = []
    for(let i = 0; i < numElementsParent ; i++){
        parentArray.push(Math.floor(Math.random() * 100))
    }
    let selection = mod.getRandomSelection(numElements, parentArray)
    let selection2 = mod.getRandomSelection(numElements, parentArray)
    let selection3 = mod.getRandomSelection(numElements, parentArray)
    expect(selection).toHaveLength(numElements)
    expect(selection2).toHaveLength(numElements)
    expect(selection3).toHaveLength(numElements)
    for(let i = 0; i<numElements; i++){
        expect(parentArray).toContain(selection[i])
        expect(parentArray).toContain(selection2[i])
        expect(parentArray).toContain(selection3[i])
    }
    expect(selection == selection2 && selection == selection3 && selection2 == selection3 ).toBeFalsy()
})

test('Test Check Duplicates', () => {
    let array = [1,1,2,3]
    let array2 = [1,2,3,4,5,6]
    let array3 = [1,2,3,1]
    let array4 = [1,2,3,4,5,6,6]
    expect(mod.checkDuplicates(array)).toBe(true)
    expect(mod.checkDuplicates(array2)).toBe(false)
    expect(mod.checkDuplicates(array3)).toBe(true)
    expect(mod.checkDuplicates(array4)).toBe(true)
})

test('Test Is Correct', () => {
    let answerObj = {
        'Kana': 'Correct'
    }
    let correct = 'Correct'
    let incorrect = 'Incorrect'
    expect(mod.isCorrect(answerObj, correct)).toBe(true)
    expect(mod.isCorrect(answerObj, incorrect)).toBe(false)
})

test('Test Generate Feedback', () => {
    let answerObj = {
        Kana: "insert_kana"
    }
    let questionNo = 3
    let correct = false
    let feedback = mod.generateFeedback(answerObj, questionNo, correct)
    expect(feedback).toBeInstanceOf(Object)
    expect(feedback.answerObj['Kana']).toBe("insert_kana")
    expect(feedback.questionNo).toBe(questionNo)
    expect(feedback.correct).toBe(correct)
})

test('Test Split Questions', () => {
    let questions = []
    for(let i = 0; i < 20; i++){
        questions.push(`Question ${i + 1}`)
    }
    expect(questions).toHaveLength(20)
    let splits = mod.splitQuestions(questions.length, 3)
    expect(splits).toHaveLength(3)
    expect(splits[0]).toBe(6)
    expect(splits[1]).toBe(6)
    expect(splits[2]).toBe(8)
    splits = mod.splitQuestions(questions.length, 5)
    expect(splits).toHaveLength(5)
    expect(splits[0]).toBe(4)
    expect(splits[1]).toBe(4)
    expect(splits[2]).toBe(4)
    expect(splits[3]).toBe(4)
    expect(splits[4]).toBe(4)
})

test('Test Get Set By Split', () => {
    let questions = []
    for(let i = 0; i < 20; i++){
        questions.push(`Question ${i + 1}`)
    }
    expect(questions).toHaveLength(20)
    let splits = mod.splitQuestions(questions.length, 3)
    expect(splits).toEqual([6,6,8])
    let set1 = mod.getSetBySplit(questions, splits, 1)
    let set2 = mod.getSetBySplit(questions, splits, 2)
    let set3 = mod.getSetBySplit(questions, splits, 3)
    for(let i = 0; i < 6; i++){
        expect(set1[i]).toBe(`Question ${i + 1}`)
    }
    for(let i = 0; i < 6; i++){
        expect(set2[i]).toBe(`Question ${i + 7}`)
    }
    for(let i = 0; i < 8; i++){
        expect(set3[i]).toBe(`Question ${i + 13}`)
    }
    splits = mod.splitQuestions(questions.length, 5)
    expect(splits).toEqual([4,4,4,4,4])
    set1 = mod.getSetBySplit(questions, splits, 1)
    set2 = mod.getSetBySplit(questions, splits, 2)
    set3 = mod.getSetBySplit(questions, splits, 3)
    set4 = mod.getSetBySplit(questions, splits, 4)
    set5 = mod.getSetBySplit(questions, splits, 5)
    for(let i = 0; i < 4; i++){
        expect(set1[i]).toBe(`Question ${i + 1}`)
    }
    for(let i = 0; i < 4; i++){
        expect(set2[i]).toBe(`Question ${i + 5}`)
    }
    for(let i = 0; i < 4; i++){
        expect(set3[i]).toBe(`Question ${i + 9}`)
    }
    for(let i = 0; i < 4; i++){
        expect(set4[i]).toBe(`Question ${i + 13}`)
    }
    for(let i = 0; i < 4; i++){
        expect(set5[i]).toBe(`Question ${i + 17}`)
    }
})