document.querySelectorAll('.redec').forEach(el => {
  el.addEventListener('click', () => {
    const redec = el.id;
    window.location.href = `redec.html?redec=${encodeURIComponent(redec)}`;
  });
});
