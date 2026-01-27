// Exercice 1 - Changement de couleur au clic
const colors = ['red', 'blue', 'pink', 'green', 'yellow'];
let currentColorIndex = 0;

const divexo1 = document.querySelector('.divexo1');
divexo1.addEventListener('click', () => {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    divexo1.style.backgroundColor = colors[currentColorIndex];
});

// Exercice 2 - Suivi de la souris
const zone = document.querySelector('.zone');
const coordonnees = document.querySelector('.coordonnees');

const cursor = document.createElement('div');
cursor.style.width = '10px';
cursor.style.height = '10px';
cursor.style.backgroundColor = 'red';
cursor.style.borderRadius = '50%';
cursor.style.position = 'absolute';
cursor.style.pointerEvents = 'none';
cursor.style.display = 'none';
zone.appendChild(cursor);

zone.addEventListener('mouseenter', () => {
    cursor.style.display = 'block';
});

zone.addEventListener('mouseleave', () => {
    cursor.style.display = 'none';
});

zone.addEventListener('mousemove', (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    console.log(`Coordonnées : (${x}, ${y})`);
    console.log(event);
    coordonnees.textContent = `Coordonnées : (${x}, ${y})`;
    
    cursor.style.left = `${x - 5}px`; 
    cursor.style.top = `${y - 5}px`;
});

// Exercice 3 -  Réaction au scroll (scroll)
const header = document.querySelector('header');
const scrollZone = document.querySelector('.divexo3 .zone');
const scrollBar = document.querySelector('#scroll-bar');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollY / maxScroll) * 100;
    
    // header
    const color = `hsl(${scrollY % 360}, 70%, 50%)`;
    header.style.backgroundColor = color;
    
    scrollZone.textContent = `Niveau de scroll: ${scrollY}px`;
    
    // la bar a droite
    scrollBar.style.height = `${scrollPercent}%`;
    scrollBar.style.backgroundColor = color; // Même couleur que le header
});


