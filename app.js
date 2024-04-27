// const addBtn = document.querySelector("#addBtn");
// const main = document.querySelector("#main");

// const savenotes = () => {
//     const notes = document.querySelectorAll(".note textarea");
//     const data = [];
//     notes.forEach(
//         (note) => {
//             data.push({
//                 title: note.parentElement.querySelector('.faizan').value,
//                 content: note.value
//             });
//         }
//     );
//     localStorage.setItem("notes", JSON.stringify(data));
// };

// addBtn.addEventListener(
//     "click",
//     function() {
//         addNote();
//     }
// );

// const addNote = (title = "", text = "") => {
//     const note = document.createElement("div");
//     note.classList.add("note");
//     note.innerHTML = `
//     <div class="tool">
//         <ion-icon name="save" class="save1"></ion-icon>
//         <ion-icon name="trash" class="trash1"></ion-icon>
//         <ion-icon name="eye-off" class="toggleButton"></ion-icon>
//         <ion-icon name="share-alt" id="shareButton"></ion-icon>
//         <ion-icon name="expand" class="fullScreenBtn"></ion-icon>
//         <ion-icon name="exit" class="exitFullScreenBtn" ></ion-icon>
        
//     </div>
//     <input type="text" class="font-effect-fire faizan" class="note-title"  placeholder="Enter title" value="${title}">
//     <textarea>${text}</textarea>
//     `;
//     note.querySelector(".trash1").addEventListener(
//         "click",
//         function(){
//             note.remove();
//             savenotes();
//         }
//     );
//     note.querySelector(".save1").addEventListener(
//         "click",
//         function(){
//             savenotes();
//         }
//     );
//     const toggleButton = note.querySelector(".toggleButton");
//     toggleButton.addEventListener("click", function() {
//         const noteTextarea = note.querySelector("textarea");
//         if (noteTextarea.style.display === "none") {
//             noteTextarea.style.display = "block";
//             toggleButton.name = "eye-off";
//         } else {
//             noteTextarea.style.display = "none";
//             toggleButton.name = "eye";
//         }
//     });

//     const shareButton = note.querySelector("#shareButton");
//     shareButton.addEventListener("click", function() {
//         const noteText = note.querySelector("textarea").value;
//         shareNote(noteText);
//     });

//     const fullScreenBtn = note.querySelector(".fullScreenBtn");
//     const exitFullScreenBtn = note.querySelector(".exitFullScreenBtn");

  
// fullScreenBtn.addEventListener("click", function() {
//     const note = this.closest(".note");
//     note.requestFullscreen();
//     this.style.display = "none";
//     note.querySelector(".exitFullScreenBtn").style.display = "block";
//     note.classList.add("fullscreen"); 
//     note.querySelector(".note-title").classList.add("fullscreen-title"); 
// });

// exitFullScreenBtn.addEventListener("click", function() {
//     document.exitFullscreen();
//     const note = this.closest(".note");
//     note.querySelector(".fullScreenBtn").style.display = "block";
//     this.style.display = "none";
//     note.classList.remove("fullscreen");
//     note.querySelector(".note-title").classList.remove("fullscreen-title"); 
// });


//     main.appendChild(note);
//     savenotes();
// };

// (function(){
//     const lsnotes = JSON.parse(localStorage.getItem("notes")) || [];
//     lsnotes.forEach(
//         (lsnote) => {
//             addNote(lsnote.title, lsnote.content);
//         }
//     );
// })();

// const shareNote = (noteText) => {
//     if (navigator.share) {
//         navigator.share({
//             title: 'My Note',
//             text: noteText,
//         })
//         .then(() => console.log('Successful share'))
//         .catch((error) => console.log('Error sharing', error));
//     } else {
//         alert('Sharing is not supported on your device/browser.');
//     }
// };


// const toggleDarkMode = () => {
//     const body = document.body;
//     body.classList.toggle('dark-mode');
// }

// const darkModeToggleBtn = document.querySelector("#darkModeToggle");
// darkModeToggleBtn.addEventListener("click", toggleDarkMode);

// const searchInput = document.querySelector("#searchInput");
// searchInput.addEventListener("input", function() {
//     const searchText = this.value.toLowerCase(); 
    
//     const notes = document.querySelectorAll(".note");
//     notes.forEach(function(note) {
//         const title = note.querySelector(".faizan").value.toLowerCase(); 
//         const content = note.querySelector("textarea").value.toLowerCase(); 
        
//         if (title.includes(searchText) || content.includes(searchText)) {
//             note.style.display = "block";
//         } else {
//             note.style.display = "none";
//         }
//     });
// });





// yaha se ma chat gpt try kr raha hon
const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

document.getElementById("readMeBtn").addEventListener("click", function() {
    window.location.href = "readme.html";
});
document.getElementById("diagram").addEventListener("click", function() {
    window.location.href = "diagram+text.html";
});
const savenotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push({
                title: note.parentElement.querySelector('.faizan').value,
                content: note.value,
                unsaved: false 
            });
        }
    );
    localStorage.setItem("notes", JSON.stringify(data));
    displayMessage("Notes saved successfully", "save");
};

addBtn.addEventListener(
    "click",
    function() {
        addNote(); 
        displayMessage("Note added", "add"); 
    }
);


const addNote = (title = "", text = "") => {
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="tool">
        <ion-icon name="save" class="save1"></ion-icon>
        <ion-icon name="trash" class="trash1"></ion-icon>
        <ion-icon name="eye-off" class="toggleButton"></ion-icon>
        <ion-icon name="share-alt" id="shareButton"></ion-icon>
        <ion-icon name="expand" class="fullScreenBtn"></ion-icon>
        <ion-icon name="exit" class="exitFullScreenBtn" ></ion-icon>
        <ion-icon name="remove" class="unsave1"></ion-icon> <!-- Added unsaved icon -->
    </div>
    <input type="text" class="font-effect-fire faizan" class="note-title"  placeholder="Enter title" value="${title}">
    <textarea>${text}</textarea>
    `;
    note.querySelector(".trash1").addEventListener(
        "click",
        function(){
            note.remove();
            
            displayMessage("Note deleted", "delete");
        }
    );
    note.querySelector(".save1").addEventListener(
        "click",
        function(){
            savenotes();
        }
    );
    const toggleButton = note.querySelector(".toggleButton");
    toggleButton.addEventListener("click", function() {
        const noteTextarea = note.querySelector("textarea");
        if (noteTextarea.style.display === "none") {
            noteTextarea.style.display = "block";
            toggleButton.name = "eye-off";
        } else {
            noteTextarea.style.display = "none";
            toggleButton.name = "eye";
        }
    });

    const shareButton = note.querySelector("#shareButton");
    shareButton.addEventListener("click", function() {
        const noteText = note.querySelector("textarea").value;
        shareNote(noteText);
    });

    const fullScreenBtn = note.querySelector(".fullScreenBtn");
    const exitFullScreenBtn = note.querySelector(".exitFullScreenBtn");

    fullScreenBtn.addEventListener("click", function() {
        const note = this.closest(".note");
        note.requestFullscreen();
        this.style.display = "none";
        note.querySelector(".exitFullScreenBtn").style.display = "block";
        note.classList.add("fullscreen"); 
        note.querySelector(".note-title").classList.add("fullscreen-title"); 
    });

    exitFullScreenBtn.addEventListener("click", function() {
        document.exitFullscreen();
        const note = this.closest(".note");
        note.querySelector(".fullScreenBtn").style.display = "block";
        this.style.display = "none";
        note.classList.remove("fullscreen");
        note.querySelector(".note-title").classList.remove("fullscreen-title"); 
    });

    const unsaveButton = note.querySelector(".unsave1");
    unsaveButton.addEventListener("click", function() {
        const noteIndex = Array.from(main.children).indexOf(note); // Get index of the note
        unsavenote(noteIndex);
        displayMessage("Note unsaved", "unsave");
    });

    main.appendChild(note);
    savenotes();
};

(function(){
    const lsnotes = JSON.parse(localStorage.getItem("notes")) || [];
    lsnotes.forEach(
        (lsnote) => {
            addNote(lsnote.title, lsnote.content);
        }
    );
})();

const shareNote = (noteText) => {
    if (navigator.share) {
        navigator.share({
            title: 'My Note',
            text: noteText,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    } else {
        alert('Sharing is not supported on your device/browser.');
    }
};

const toggleDarkMode = () => {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

const darkModeToggleBtn = document.querySelector("#darkModeToggle");
darkModeToggleBtn.addEventListener("click", toggleDarkMode);

const searchInput = document.querySelector("#searchInput");
searchInput.addEventListener("input", function() {
    const searchText = this.value.toLowerCase(); 
    
    const notes = document.querySelectorAll(".note");
    notes.forEach(function(note) {
        const title = note.querySelector(".faizan").value.toLowerCase(); 
        const content = note.querySelector("textarea").value.toLowerCase(); 
        
        if (title.includes(searchText) || content.includes(searchText)) {
            note.style.display = "block";
        } else {
            note.style.display = "none";
        }
    });
});



function displayMessage(message, type) {
    const msgContainer = document.createElement("div");
    msgContainer.classList.add("message-container");

    const icon = document.createElement("ion-icon");
    icon.setAttribute("name", type === "save" ? "checkmark-circle" : (type === "delete" ? "trash" : "warning"));
    icon.style.color = type === "save" ? "green" : (type === "delete" ? "red" : "orange");

    const textNode = document.createTextNode(message);

    msgContainer.appendChild(icon);
    msgContainer.appendChild(textNode);

    document.body.appendChild(msgContainer);

    
    setTimeout(() => {
        msgContainer.remove();
    }, 3000);
}

function unsavenote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    if (notes[index]) {
        notes.splice(index, 1); // Hata dein note ko array se
        localStorage.setItem("notes", JSON.stringify(notes)); // Firse save karein local storage mein
    }
}
