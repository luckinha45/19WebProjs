import projsmap from './projsmap.json' with { type: 'json' };

let gridProjs = document.querySelector('#grid-projs');

if (gridProjs) {
  // removendo as children do elemento
  gridProjs.innerHTML = '';

  projsmap.forEach(proj => {
    const pdiv = document.createElement('div');
    pdiv.classList.add('proj-div');
    pdiv.addEventListener('click', () => window.location = proj.path)
    pdiv.innerHTML = `
      <h3> ${proj.name} </h3>
      <p> ${proj.desc} </p>
    `.replaceAll('\n', ' ').trim();

    gridProjs.appendChild(pdiv);
  })
}
