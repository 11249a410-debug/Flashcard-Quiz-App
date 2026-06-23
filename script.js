let flashcards =
JSON.parse(localStorage.getItem("flashcards")) || [
    {
        question:"What is HTML?",
        answer:"HTML stands for HyperText Markup Language."
    },
    {
        question:"What is CSS?",
        answer:"CSS stands for Cascading Style Sheets."
    },
    {
        question:"What is JavaScript?",
        answer:"JavaScript adds interactivity to web pages."
    }
];

let currentIndex = 0;
let editMode = false;

const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");

const showBtn = document.getElementById("showBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const questionInput = document.getElementById("questionInput");
const answerInput = document.getElementById("answerInput");

const addBtn = document.getElementById("addBtn");
const editBtn = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const counter = document.getElementById("counter");

function saveData(){
    localStorage.setItem(
        "flashcards",
        JSON.stringify(flashcards)
    );
}

function displayCard(){

    if(flashcards.length === 0){
        questionEl.textContent = "No Flashcards Available";
        answerEl.textContent = "";
        counter.textContent = "";
        return;
    }

    questionEl.textContent =
    flashcards[currentIndex].question;

    answerEl.textContent =
    flashcards[currentIndex].answer;

    answerEl.classList.add("hidden");

    showBtn.textContent = "Show Answer";

    counter.textContent =
    `Card ${currentIndex + 1} of ${flashcards.length}`;
}

showBtn.addEventListener("click",()=>{

    if(answerEl.classList.contains("hidden")){
        answerEl.classList.remove("hidden");
        showBtn.textContent = "Hide Answer";
    }
    else{
        answerEl.classList.add("hidden");
        showBtn.textContent = "Show Answer";
    }
});

nextBtn.addEventListener("click",()=>{

    if(flashcards.length === 0) return;

    currentIndex =
    (currentIndex + 1) % flashcards.length;

    displayCard();
});

prevBtn.addEventListener("click",()=>{

    if(flashcards.length === 0) return;

    currentIndex =
    (currentIndex - 1 + flashcards.length)
    % flashcards.length;

    displayCard();
});

addBtn.addEventListener("click",()=>{

    let q = questionInput.value.trim();
    let a = answerInput.value.trim();

    if(q === "" || a === ""){
        alert("Please fill all fields");
        return;
    }

    if(editMode){

        flashcards[currentIndex].question = q;
        flashcards[currentIndex].answer = a;

        editMode = false;
        addBtn.textContent = "Add Flashcard";
    }
    else{

        flashcards.push({
            question:q,
            answer:a
        });

        currentIndex = flashcards.length - 1;
    }

    saveData();
    displayCard();

    questionInput.value = "";
    answerInput.value = "";
});

editBtn.addEventListener("click",()=>{

    if(flashcards.length === 0) return;

    questionInput.value =
    flashcards[currentIndex].question;

    answerInput.value =
    flashcards[currentIndex].answer;

    editMode = true;

    addBtn.textContent = "Update Flashcard";
});

deleteBtn.addEventListener("click",()=>{

    if(flashcards.length === 0) return;

    let confirmDelete =
    confirm("Delete this flashcard?");

    if(confirmDelete){

        flashcards.splice(currentIndex,1);

        if(currentIndex >= flashcards.length){
            currentIndex = 0;
        }

        saveData();
        displayCard();
    }
});

displayCard();
