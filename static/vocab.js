import * as mod from './vocab_functions.js'
localStorage.clear()
const data =
    [
        {
            "Kana": "1. ああ",
            "Romaji": "aa",
            "English": "like that; so",
            "Type": "adverb (fukushi)"
        },
        {
            "Kana": "2. 挨拶 (あいさつ)",
            "Romaji": "aisatsu",
            "English": "greeting",
            "Type": "noun; ~suru verb"
        },
        {
            "Kana": "3. 間 (あいだ)",
            "Romaji": "aida",
            "English": "space (between); during, while",
            "Type": "noun; adverb (fukushi)"
        },
        {
            "Kana": "4. 合う (あう)",
            "Romaji": "au",
            "English": "to merge; to unite; to meet",
            "Type": "godan verb with u ending; intransitive verb"
        },
        {
            "Kana": "5. 赤ちゃん (あかちゃん)",
            "Romaji": "akachan",
            "English": "baby; infant",
            "Type": "noun"
        },
        {
            "Kana": "6. 上がる (あがる)",
            "Romaji": "agaru",
            "English": "to rise; to go up",
            "Type": "godan verb with u ending; intransitive verb"
        },
        {
            "Kana": "7. 開く (あく)",
            "Romaji": "aku",
            "English": "to open",
            "Type": "godan verb with ku ending,; intransitive verb; transitive verb"
        },
        {
            "Kana": "8. 上げる (あげる)",
            "Romaji": "ageru",
            "English": "to raise",
            "Type": "iIchidan verb, transitive verb"
        },
        {
            "Kana": "9. 浅い (あさい)",
            "Romaji": "asai",
            "English": "shallow",
            "Type": "i-adjective (keiyoushi)"
        },
        {
            "Kana": "10. 明日 (あした / あす)",
            "Romaji": "ashita/asu",
            "English": "tomorrow",
            "Type": "noun; adverb (fukushi)"
        },
        {
            "Kana": "11. 味 (あじ)",
            "Romaji": "aji",
            "English": "flavor; taste",
            "Type": "noun"
        },
        {
            "Kana": "12. 遊び (あそび)",
            "Romaji": "asobi",
            "English": "playing",
            "Type": "noun; noun; used as a suffix"
        },
        {
            "Kana": "13. あ, あっ",
            "Romaji": "a, ats",
            "English": "ah; oh (surprise)",
            "Type": "expression"
        },
        {
            "Kana": "14. 集まる (あつまる)",
            "Romaji": "atsumaru",
            "English": "to gather; to collect",
            "Type": "godan verb with ru ending; intransitive verb"
        },
        {
            "Kana": "15. 謝る (あやまる)",
            "Romaji": "ayamaru",
            "English": "to apologize",
            "Type": "godan verb with ru ending"
        },
        {
            "Kana": "16. 安心 (あんしん)",
            "Romaji": "anshin",
            "English": "relief",
            "Type": "noun; na-adjective (keiyodoshi) ~suru verb; intransitive verb"
        }
    ]

const vocabGameFieldEl = document.getElementById("vocab-game-field")
const noOptionsPerQuestion = 3
const feedbackTracker = []
let answerObj = {}
let score = 0
let questionNo = 1

/*function generateQuestion(){
    //Get a random vocab
    let chosenVocab = Math.floor(Math.random() * vocabLeft.length)
    console.log(`Position in vocab left: ${chosenVocab}`)
    let answerObj = data[chosenVocab]
    vocabLeft.splice(chosenVocab, 1)
    let optionsObjArray = []
    do{
        optionsObjArray = getRandomSelection(noOptionsPerQuestion, data)
    }while(optionsUnsuitable(optionsObjArray, answerObj))
    optionsObjArray.push(answerObj)
    let optionOrder = setOptionOrder(noOptionsPerQuestion)
    vocabGameFieldEl.innerHTML = `
        <div class="game-header">
            <p class="question-count">Q.1</p>
            <p class="score-count">Score: 0</p>
        </div>
        <div class="question-card meaning-question-card">
            <div class="vocab-box">
                ${answerObj['Kana']}
            </div>
        </div>
        <div class="answer-box meaning-answer-box">
            <button id="${data[optionOrder[0]]['Kana']}" onclick="selectAnswer()">${data[0]['English']}</button>
            <button id="${data[optionOrder[1]]['Kana']}" onclick="selectAnswer()">${data[1]['English']}</button>
            <button id="${data[optionOrder[2]]['Kana']}" onclick="selectAnswer()">${data[2]['English']}</button>
            <button id="${data[optionOrder[3]]['Kana']}" onclick="selectAnswer()">${data[3]['English']}</button>
        </div>
    `
}*/

function generateQuestion(){
    //Get a random vocab as answer
    let chosenVocabIndex = Math.floor(Math.random() * vocabLeft.length)
    console.log(`Position in vocableft: ${chosenVocabIndex}`)
    answerObj = data[vocabLeft[chosenVocabIndex]]
    //Remove chosen vocab from vocabLeft
    vocabLeft.splice(chosenVocabIndex, 1)
    console.log("Vocab remaining: " + vocabLeft)
    //Get remaining options and make sure no duplicates
    let optionsObjArray = []
    do{
        optionsObjArray = mod.getRandomSelection(noOptionsPerQuestion, data)
    }while(mod.optionsUnsuitable(optionsObjArray, answerObj))
    //Add answer to options
    optionsObjArray.push(answerObj)
    //Generate order
    let optionOrder = mod.setOptionOrder(optionsObjArray.length)
    //Build page
    vocabGameFieldEl.innerHTML = `
        <div class="game-header">
            <p class="question-count">Q.${questionNo}</p>
            <p class="score-count">Score: ${score}</p>
        </div>
        <div class="question-card meaning-question-card">
            <div class="vocab-box">
                ${answerObj['Kana']}
            </div>
        </div>
        <div class="answer-box meaning-answer-box" id="button-box">
            <button id="${optionsObjArray[optionOrder[0]]['Kana']}">${optionsObjArray[optionOrder[0]]['English']}</button>
            <button id="${optionsObjArray[optionOrder[1]]['Kana']}">${optionsObjArray[optionOrder[1]]['English']}</button>
            <button id="${optionsObjArray[optionOrder[2]]['Kana']}">${optionsObjArray[optionOrder[2]]['English']}</button>
            <button id="${optionsObjArray[optionOrder[3]]['Kana']}">${optionsObjArray[optionOrder[3]]['English']}</button>
        </div>
    `
    // Add event listeners to buttons
    let buttonBoxEl = document.getElementById("button-box")
    let answerButtonEls = buttonBoxEl.childNodes
    for (var button of answerButtonEls) {
        let button_id = button.id
        button.addEventListener("click", () => {
            //If correct increase score. Always show answer and get next question
            let answerCorrect = mod.isCorrect(answerObj, button_id)
            if(answerCorrect){
               score++
            }
            feedbackTracker.push(mod.generateFeedback(answerObj, questionNo, answerCorrect))
            console.log(feedbackTracker)
            showAnswer(answerObj['Kana'])
            setTimeout(nextQuestion, 1550)
        });
       }
    console.log("Answer: " + answerObj['Kana'])
}

/*
function selectAnswer(){
    console.log("Response: " + event.target.id)
    if(event.target.id == answerObj['Kana']){
        console.log("Correct")
    }
    else{
        console.log("incorrect")
    }
}*/

function nextQuestion(){
    if(vocabLeft.length > 0){
        questionNo++
        generateQuestion()
    }
    else{
        endGame()
    }
}

function endGame(){
    console.log("Game over!")
    console.log("Total Score: ", score)
    localStorage.setItem("feedback", JSON.stringify(feedbackTracker));
    localStorage.setItem("score", score)
    window.location.href+="feedback"
}

function showAnswer(correct_id){
    let buttonBoxEl = document.getElementById("button-box")
    console.log(buttonBoxEl)
    let answerButtonEls = buttonBoxEl.getElementsByTagName("button")
    //console.log(answerButtonEls)
    for (let button of answerButtonEls){
        let classToAdd
        if(button.id == correct_id){
            classToAdd = "correct-answer"
        }
        else{
            classToAdd = "incorrect-answer"
        }
        document.getElementById(button.id).classList.add(classToAdd)
        setTimeout(function(){
            button.classList.remove(classToAdd)
        }, 1500)
    }
}



const vocabLeft = mod.setOptionOrder(data.length)
console.log(vocabLeft)
generateQuestion()
