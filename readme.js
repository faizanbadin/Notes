document.addEventListener("DOMContentLoaded", function() {
    const saveBtn = document.getElementById("saveBtn");
    const subjectSelect = document.getElementById("subject");
    const noteNumberInput = document.getElementById("noteNumber");
    const topicInput = document.getElementById("topic");
    const dateInput = document.getElementById("date");
    const teacherInput = document.getElementById("teacher");
    const attendanceSelect = document.getElementById("attendance");
    const attendanceList = document.getElementById("attendanceList");
    const successMessage = document.getElementById("successMessage");
    const deletedMessage = document.getElementById("deletedMessage");
    // ya meny apni check k liya add kiya ha again page mera cover wala means note page 
    
    
    saveBtn.addEventListener("click", function() {
        const subject = subjectSelect.value;
        const noteNumber = noteNumberInput.value;
        const topic = topicInput.value;
        const date = dateInput.value;
        const teacher = teacherInput.value;
        const attendance = attendanceSelect.value;

        const entry = {
            subject: subject,
            noteNumber: noteNumber,
            topic: topic,
            date: date,
            teacher: teacher,
            attendance: attendance
        };

        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.push(entry);
        localStorage.setItem("entries", JSON.stringify(entries));

        displayEntries();
        successMessage.style.display = "block";
        setTimeout(function() {
            successMessage.style.display = "none";
        }, 2000); // ais 2000 ka matlab meny aise bola ha k 2sec ma msge hide ho 
    });

    function displayEntries() {
        let subjects = {}; // local storage ma save krwa raha ha hon yaha index ko 
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.forEach(function(entry) {
            // ab ya aise he banaya ha k ya check kry k save ha ya nh 
            if (!subjects.hasOwnProperty(entry.subject)) {
                
                subjects[entry.subject] = [];
            }
            
            subjects[entry.subject].push(entry);
        });

        
        attendanceList.innerHTML = "";

        
        for (const subject in subjects) {
           
            const subjectDiv = document.createElement("div");
            subjectDiv.innerHTML = `<h2>${subject}</h2>`;

           
            subjects[subject].forEach(function(entry, index) {
                // ya aik div type box jha entry hogi
                const entryDiv = document.createElement("div");
                entryDiv.innerHTML = `<span>${entry.noteNumber}. ${entry.topic}</span> - ${entry.date} - ${entry.teacher} - ${entry.attendance}`;
                
                // ya ha mera edit ka button jo save k bad show hoga 
                const editBtn = document.createElement("button");
                editBtn.innerText = "Edit";
                editBtn.addEventListener("click", function() {
                    editEntry(entry, index);
                });

                // usy k sath ab ma delete bhi show krwao ga button 
                const deleteBtn = document.createElement("button");
                deleteBtn.innerText = "delete"
                deleteBtn.addEventListener("click", function() {
                    deleteEntry(entry, index);
                });
                
                // ya open button ha but uncomplate 
                const openBtn = document.createElement("button");
                openBtn.innerText = "Open";
                openBtn.addEventListener("click", function() {
                    openNote(entry.noteNumber);
                });
                
                // buttons ki div ma entry ha jo div ha mera yani box 
                entryDiv.appendChild(editBtn);
                entryDiv.appendChild(deleteBtn);
                entryDiv.appendChild(openBtn);
                subjectDiv.appendChild(entryDiv); 
            });

            // or ya attendance ko bhi yahe laga diya ha 
            attendanceList.appendChild(subjectDiv);
        }
    }

    function editEntry(entry, index) {
        
        subjectSelect.value = entry.subject;
        noteNumberInput.value = entry.noteNumber;
        topicInput.value = entry.topic;
        dateInput.value = entry.date;
        teacherInput.value = entry.teacher;
        attendanceSelect.value = entry.attendance;

        // ya ha save ko again edit krna ais ma thori help li gai ha 
        saveBtn.style.display = "none";
        const editBtn = document.createElement("button");
        editBtn.innerText = "Edit";
        editBtn.id = "editBtn";
        saveBtn.parentNode.appendChild(editBtn);
        

        
        editBtn.addEventListener("click", function() {
            const editedEntry = {
                subject: subjectSelect.value,
                noteNumber: noteNumberInput.value,
                topic: topicInput.value,
                date: dateInput.value,
                teacher: teacherInput.value,
                attendance: attendanceSelect.value
            };
            let entries = JSON.parse(localStorage.getItem("entries")) || [];
            entries[index] = editedEntry;
            localStorage.setItem("entries", JSON.stringify(entries));
            displayEntries();

            //ya msgs hen but without icon wale ya kam krna ha icons set krne honge 
            successMessage.style.display = "block";
            setTimeout(function() {
                successMessage.style.display = "none";
            }, 2000); 

            // ya ma bol raha ha edit button jb hojai to save hojai
            editBtn.parentNode.removeChild(editBtn);
            saveBtn.style.display = "block";
        });
    }

    // ya abi done nh ais pa kam abi krna ha 
function openNoteByNumber(noteNumber) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find(note => note.noteNumber === noteNumber);
    if (note) {
        alert("Note Content: " + note.content);
    } else {
        alert("Note not found!");
    }
}
// Function to open note by code
function openNoteByCode(code) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const note = notes.find(note => note.code === code);
    if (note) {
        // Yahan par Read Me page ka URL dena hoga jahan specific note open hoga
        window.location.href = `readme.html?note=${note.content}`;
    } else {
        alert("Note not found!");
    }
}

    function deleteEntry(entry, index) {
        let entries = JSON.parse(localStorage.getItem("entries")) || [];
        entries.splice(index, 1);
        localStorage.setItem("entries", JSON.stringify(entries));
        displayEntries();
        deletedMessage.style.display = "block";
        setTimeout(function() {
            deletedMessage.style.display = "none";
        }, 2000); 
    }

    function openNote(noteNumber) {
        const notes = JSON.parse(localStorage.getItem("notes")) || [];
        const note = notes.find(note => note.noteNumber === noteNumber);
        if (note) {
            alert("Note Content: " + note.content);
        } else {
            alert("Note not found!");
        }
    }

    displayEntries();
});
const openBtn = document.createElement("button");
openBtn.innerText = "Open";
openBtn.addEventListener("click", function() {
    openNoteByCode(entry.code);
});

