"use strict";
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('resumeForm');
    const resumeOutput = document.getElementById('resumeOutput');
    const resumeContent = document.getElementById('resumeContent');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        // Capture form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const skills = document.getElementById('skills').value;
        // Generate resume HTML
        const resumeHTML = `
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Work Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
        `;
        // Display the resume
        resumeContent.innerHTML = resumeHTML;
        resumeOutput.classList.remove('hidden');
    });
});
