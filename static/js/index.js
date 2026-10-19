document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('copy-bibtex');
  const citation = document.getElementById('bibtex-code');
  const status = document.getElementById('copy-status');
  if (!button || !citation || !status) return;

  button.hidden = false;
  button.addEventListener('click', async () => {
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(citation.textContent.trim());
      status.textContent = 'BibTeX copied to clipboard.';
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Automatic copying is unavailable. The citation is selected; press Ctrl+C or ⌘C to copy.';
    } finally {
      button.disabled = false;
    }
  });
});
