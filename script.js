const book = document.getElementById('scrapbook');
const papers = [
    document.getElementById('paper1'),
    document.getElementById('paper2'),
    document.getElementById('paper3')
];

function initBook() {
    papers.forEach((paper, index) => {
        paper.style.zIndex = papers.length - index;
    });
}
initBook();

papers.forEach((paper, index) => {
    paper.addEventListener('click', (e) => {
        if (e.target.closest('#photo-click-area') || e.target.closest('#envelope')) return;

        if (paper.classList.contains('flipped')) {
            paper.classList.remove('flipped');
            paper.style.zIndex = papers.length - index;
        } else {
            paper.classList.add('flipped');
            paper.style.zIndex = index + 1;
        }

        // --- SISTEM DINAMIS LEBAR CONTAINER BIAR KEEPIN CENTER & ANTI GEPENG ---
        const flippedCount = papers.filter(p => p.classList.contains('flipped')).length;

        if (flippedCount > 0 && flippedCount < papers.length) {
            // Pas lagi dibuka membaca isi, container melebar jadi 900px di tengah
            book.classList.add('is-opened');
        } else {
            // Pas ditutup total (cover depan ato cover belakang), balik jadi 450px biar ga penyet di HP
            book.classList.remove('is-opened');
        }
    });
});

// --- LOGIKA SWAP GALERI FOTO ---
const photoArea = document.getElementById('photo-click-area');
const galleryImg = document.getElementById('gallery-img');
const galleryCaption = document.getElementById('gallery-caption');

const listPhotos = [
    { src: "JNJM.jfif", cap: "Foto ini kamu gemes banget" },
    { src: "pfp cp rp.jfif", cap: "Gatau sih yang ini,nemu lucu jadi kakak masukin hehe." },
    { src: "500462577366621235.jfif", cap: "Peace" }
];
let photoIdx = 0;

photoArea.addEventListener('click', () => {
    photoIdx = (photoIdx + 1) % listPhotos.length;
    photoArea.style.transform = "scale(0.95) rotate(0deg)";
    
    setTimeout(() => {
        galleryImg.src = listPhotos[photoIdx].src;
        galleryCaption.innerText = listPhotos[photoIdx].cap;
        const randomAngle = Math.floor(Math.random() * 6) - 3;
        photoArea.style.transform = `scale(1) rotate(${randomAngle}deg)`;
    }, 180);
});

// --- LOGIKA POP-UP SURAT RAHASIA ---
const envelope = document.getElementById('envelope');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('close-modal');

envelope.addEventListener('click', () => modal.classList.add('show'));
closeModal.addEventListener('click', () => modal.classList.remove('show'));
