let arrayNote = [];

let saveBtn = document.querySelector('.tak-save-btn');
let titleInput = document.querySelector('.tak-note-title');
let descInput = document.querySelector('.tak-note-desc');
let divNotes = document.querySelector('.div-notes');

addEventListener();

function addEventListener() {
    saveBtn.addEventListener('click', saveFunction);
    document.addEventListener('DOMContentLoaded', onLoadLocalStorage);
    titleInput.addEventListener('keydown', titleChecker);
    descInput.addEventListener('keydown', descChecker);
}

// check the value of TITLE input
function titleChecker(e) {
    if (e.keyCode === 32 && titleInput.value === "") {
        e.preventDefault();
    }
}

// check the value of DESC input
function descChecker(e) {
    if (e.keyCode === 32 && descInput.value === "") {
        e.preventDefault();
    }
}

// check the localstorage when laoding
function onLoadLocalStorage() {
    let onLoadArray = getTheLocalStorage();
    onLoadArray.forEach((element) => {
        console.log(element);
        createNewNote(element.title, element.desc);
    })
}

//set the array to localStorage
function setTheLocalStorage() {
    let arrayStringify = JSON.stringify(arrayNote);
    localStorage.setItem("arrayNote", arrayStringify);
}

//get the array from localStorage
function getTheLocalStorage() {
    let arrayParse = JSON.parse(localStorage.getItem('arrayNote'));
    return arrayParse;
}

// when tap saveBtn
function saveFunction(e) {
    e.preventDefault();
    let titleText = titleInput.value;
    let descText = descInput.value;

    if (titleInput.value !== '' && descInput.value !== '') {
        arrayNote.push({title: titleText, desc: descText});
        createNewNote(titleText, descText);
        setTheLocalStorage();
        document.querySelector('.div-sticky-position').reset();
    }
}

// create html tage for note
function createNewNote(titleTextArg, descText) {
    //create box div and class of it
    let noteBox = document.createElement('div');
    noteBox.className = "show-notes";

    //make title span, class it and value
    let titleSpan = document.createElement('span');
    titleSpan.className = "tak-box-show-title tak-iranyekan-bold";
    titleSpan.textContent = titleTextArg;
    noteBox.appendChild(titleSpan);

    //make desc span, class it and value
    let descSpan = document.createElement('span');
    descSpan.className = "tak-box-show-desc tak-iranyekan-light";
    descSpan.textContent = descText;
    noteBox.appendChild(descSpan);

    //create delete img and class and atrebute
    let deleteBtn = document.createElement('img');
    deleteBtn.className = "tak-delete-icon";
    deleteBtn.setAttribute("src", "images/trash.png");
    deleteBtn.addEventListener("click", removeTageBtn)
    noteBox.appendChild(deleteBtn);

    //appandchiled box to parent
    divNotes.appendChild(noteBox);
}


//delete the same element from array
function removeTageBtn() {

    //make div of yes or no button
    let divVoteYesOrNo = document.createElement('div');
    divVoteYesOrNo.className = ('tak-yes-or-no');
    this.parentElement.appendChild(divVoteYesOrNo);
    setTimeout(()=>{
        divVoteYesOrNo.classList.add('tak-yes-or-no-opacity');
    }, 10)


    //create yes button
    let voteYes = document.createElement('img');
    voteYes.className = ('tak-vote-yes');
    voteYes.setAttribute('src', 'images/yes.svg');
    divVoteYesOrNo.appendChild(voteYes);
    voteYes.addEventListener('click', yesVoteBtn)

    //create no button
    let voteNo = document.createElement('img');
    voteNo.className = ('tak-vote-no');
    voteNo.setAttribute('src', 'images/no.svg');
    divVoteYesOrNo.appendChild(voteNo);
    voteNo.addEventListener('click', noVoteBtn)


}

function yesVoteBtn() {
    let arrayForDeleteArray = getTheLocalStorage();
    let title = this.parentElement.parentElement.children[0].textContent;
    let desc = this.parentElement.parentElement.children[1].textContent;
    arrayForDeleteArray.forEach((element, index) => {
        if (element.title === title && element.desc === desc) {
            this.parentElement.parentElement.classList.add('show-notes-transition');
            arrayForDeleteArray.splice(index, 1);
            setTimeout(()=>{
                this.parentElement.parentElement.remove();
            },300)

        }
    })

    // set the new array after delete to localstorage
    localStorage.setItem("arrayNote", JSON.stringify(arrayForDeleteArray));
}

function noVoteBtn() {
    this.parentElement.classList.add('tak-yes-or-no-opacity-close');
    setTimeout(()=>{
        this.parentElement.remove();
    },300)
}