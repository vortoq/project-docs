const contentEl = document.getElementById("content");
const docSelector = document.getElementById("docSelector");

function loadMarkdown(file) {
  fetch(`docs/${file}`)
    .then(res => res.text())
    .then(md => {
      const rawHTML = marked.parse(md);
      const safeHTML = DOMPurify.sanitize(rawHTML);
      contentEl.innerHTML = safeHTML;
    })
    .catch(() => {
      contentEl.innerHTML = "<p>Error loading document.</p>";
    });
}

docSelector.addEventListener("change", (e) => {
  loadMarkdown(e.target.value);
});

loadMarkdown(docSelector.value);