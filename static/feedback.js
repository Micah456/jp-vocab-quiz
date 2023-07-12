const tableEl = document.getElementById("feedback-table")
const finalScoreEl = document.getElementById("final-score")
const rawData = JSON.parse(localStorage.getItem("feedback"))
const score = JSON.parse(localStorage.getItem("score"))
const calculatedScore = `${score}/${rawData.length}`

function generateRow(feedbackObj){
    let rowColour = ""
    if(feedbackObj.correct){
        rowColour = "lightgreen"
    }
    else{
        rowColour = "red"
    }
    let row = `
    <tr style="color:${rowColour}">
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
    rawData.forEach((feedbackObj) => {
        rows += generateRow(feedbackObj)
    })
    tableEl.innerHTML += rows
}
finalScoreEl.textContent = calculatedScore
populateTable()