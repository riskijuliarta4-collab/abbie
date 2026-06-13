// Mengunci urutan tumpukan z-index lembaran kertas dari awal biar aman
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

// Logika perputaran halaman murni tanpa utak-atik posisi wadah kontainer induk
papers.forEach((paper, index) => {
    paper.addEventListener('click', (e) => {
        // Blokir perputaran lembar halaman jika tombol swap galeri foto atau amplop pesan di-klik
        if (e.target.closest('#photo-click-area') || e.target.closest('#envelope')) return;

        if (paper.classList.contains('flipped')) {
            // Jika halaman di-klik untuk ditutup kembali ke kanan
            paper.classList.remove('flipped');
            paper.style.zIndex = papers.length - index;
        } else {
            // Jika halaman di-klik untuk dibuka berbalik ke kiri
            paper.classList.add('flipped');
            paper.style.zIndex = index + 1;
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