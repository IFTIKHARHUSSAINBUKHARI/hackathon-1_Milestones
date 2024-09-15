"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resumeForm");
    const resumeOutput = document.getElementById("resumeOutput");
    const resumeContent = document.getElementById("resumeContent");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Capture form data
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const education = document.getElementById("education").value;
        const experience = document.getElementById("experience").value;
        const skills = document.getElementById("skills")
            .value;
        // Generate resume HTML with editable sections
        const resumeHTML = `
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> <span id="resumeName" contenteditable="true">${name}</span></p>
            <p><strong>Email:</strong> <span id="resumeEmail" contenteditable="true">${email}</span></p>
            <h3>Education</h3>
            <p id="resumeEducation" contenteditable="true">${education}</p>
            <h3>Work Experience</h3>
            <p id="resumeExperience" contenteditable="true">${experience}</p>
            <h3>Skills</h3>
            <p id="resumeSkills" contenteditable="true">${skills}</p>
        `;
        // Display the resume
        resumeContent.innerHTML = resumeHTML;
        resumeOutput.classList.remove("hidden");
        // Add event listeners for editable sections
        makeSectionEditable("resumeName", "name");
        makeSectionEditable("resumeEmail", "email");
        makeSectionEditable("resumeEducation", "education");
        makeSectionEditable("resumeExperience", "experience");
        makeSectionEditable("resumeSkills", "skills");
    });
    // Function to make sections editable and sync changes back to form inputs
    function makeSectionEditable(elementId, inputId) {
        const editableElement = document.getElementById(elementId);
        const formInputElement = document.getElementById(inputId);
        editableElement.addEventListener("input", () => {
            formInputElement.value = editableElement.innerText; // Sync changes back to the form
        });
    }
});
