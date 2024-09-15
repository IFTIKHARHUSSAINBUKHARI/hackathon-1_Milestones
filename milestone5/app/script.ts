document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("resumeForm") as HTMLFormElement;
  const resumeOutput = document.getElementById(
    "resumeOutput"
  ) as HTMLDivElement;
  const resumeContent = document.getElementById(
    "resumeContent"
  ) as HTMLDivElement;
  const shareButton = document.getElementById(
    "shareButton"
  ) as HTMLButtonElement;
  const downloadButton = document.getElementById(
    "downloadButton"
  ) as HTMLButtonElement;
  const shareLinkContainer = document.getElementById(
    "shareLinkContainer"
  ) as HTMLParagraphElement;
  const shareLink = document.getElementById("shareLink") as HTMLAnchorElement;

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

    // Generate and display the shareable link
    const uniqueUrl = `https://${name
      .replace(/\s+/g, "")
      .toLowerCase()}.vercel.app/resume`;
    shareLink.href = uniqueUrl;
    shareLink.textContent = uniqueUrl;
    shareLinkContainer.classList.remove("hidden");

    // Show share and download buttons
    document.getElementById("resumeActions")?.classList.remove("hidden");
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

  // Share button logic to copy the shareable link to the clipboard
  shareButton.addEventListener("click", () => {
    const shareableLink = shareLink.href;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(shareableLink)
        .then(() => {
          alert("Shareable link copied to clipboard!");
        })
        .catch((err) => {
          console.error("Failed to copy link: ", err);
        });
    } else {
      alert("Clipboard functionality is not available.");
    }
  });

  // Download resume as PDF
  downloadButton.addEventListener("click", () => {
    const element = document.getElementById("resumeContent");
    if (element) {
      const opt = {
        margin: 1,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };
      // @ts-ignore
      html2pdf().from(element).set(opt).save();
    }
  });
});
