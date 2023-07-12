const tableEl = document.getElementById("feedback-table")
const raw_data = [
    {
        answerObj : {
            "Kana": "1. ああ",
            "Romaji": "aa",
            "English": "like that; so",
            "Type": "adverb (fukushi)"
        },
        questionNo: 1,
        correct: true
    },
    {
        answerObj : {
            "Kana": "13. あ, あっ",
            "Romaji": "a, ats",
            "English": "ah; oh (surprise)",
            "Type": "expression"
        },
        questionNo: 13,
        correct: false
    }
]

function generateRow(feedbackObj){
    let row = `
    <tr>
        <td>${feedbackObj.questionNo}</td>
        <td>${feedbackObj.answerObj.Kana}</td>
        <td>${feedbackObj.answerObj.English}</td>
        <td>${feedbackObj.correct}</td>
    </tr>
    `
    return row
}

function populateTable(){
    let rows = ""
    raw_data.forEach((feedbackObj) => {
        rows += generateRow(feedbackObj)
    })
    tableEl.innerHTML += rows
}

populateTable()