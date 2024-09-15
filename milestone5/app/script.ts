document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const resumeOutput = document.getElementById(
    "resumeOutput"
  ) as HTMLDivElement;
  const resumeContent = document.getElementById(
    "resumeContent"
  ) as HTMLDivElement;

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Capture form data
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const education = (
      document.getElementById("education") as HTMLTextAreaElement
    ).value;
    const experience = (
      document.getElementById("experience") as HTMLTextAreaElement
    ).value;
    const skills = (document.getElementById("skills") as HTMLTextAreaElement)
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
  function makeSectionEditable(elementId: string, inputId: string) {
    const editableElement = document.getElementById(elementId) as HTMLElement;
    const formInputElement = document.getElementById(inputId) as
      | HTMLInputElement
      | HTMLTextAreaElement;

    editableElement.addEventListener("input", () => {
      formInputElement.value = editableElement.innerText; // Sync changes back to the form
    });
  }
});
