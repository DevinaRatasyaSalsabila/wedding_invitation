/*
  UNDANGAN DIGITAL ANDY & ZHEA
  - Ubah data acara pada array stories.
  - Ganti tautan Google Maps dengan URL lokasi yang benar.
  - Ganti elemen placeholder foto dengan foto milik sendiri.
*/

const stories = [
  {
    label: "Hari Bahagia Kami",
    title: "Akad & Resepsi",
    content: `
      <div class="story-rule">
        <div class="tiny-label">SABTU, 12 DESEMBER 2026</div>
        <p>Dengan penuh rasa syukur, kami mengundang Anda untuk hadir dan memberikan doa restu di hari bahagia kami.</p>
      </div>
      <div class="tiny-label">AKAD NIKAH</div>
      <p>08.00 WIB – selesai<br>Jl. Soekarno No.17 Kota Blitar</p>
      <div class="tiny-label">RESEPSI</div>
      <p>11.00 WIB – selesai<br>Jl. Soekarno No.17 Kota Blitar</p>
    `
  },
  {
    label: "Petunjuk Lokasi",
    title: "Tempat Acara",
    content: `
      <div class="ornament">⌖</div>
      <div class="tiny-label">LOKASI AKAD & RESEPSI</div>
      <p>Nama gedung dan alamat lengkap akad ditambahkan di sini.</p>
      <a class="gold-button map-link" href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">BUKA GOOGLE MAPS ↗</a>
    `
  },
  {
    label: "The Wedding",
    title: "Andy & Zhea",
    content: `
      <p>Merupakan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.</p>
      <div class="ornament">♡</div>
      <p>Terima kasih telah menjadi bagian dari cerita kami.</p>
    `
  },
  {
    label: "Our Love Story",
    title: "Perjalanan Cinta Kami",
    content: `
      <p>Setiap kisah punya awal, perjalanan, dan tujuan. Inilah beberapa potongan cerita kami.</p>
      <div class="timeline">
        <article class="moment">
          <div class="tiny-label">AWAL BERTEMU</div>
          <h3>Sebuah Pertemuan</h3>
          <div class="memory-photo">Ganti dengan foto kenangan pertama</div>
          <p>Kami bertemu pada [tanggal/tahun]. Dari pertemuan sederhana itu, sebuah cerita mulai tumbuh.</p>
        </article>
        <article class="moment">
          <div class="tiny-label">MULAI BERSAMA</div>
          <h3>Menjadi Kita</h3>
          <div class="memory-photo">Ganti dengan foto berdua</div>
          <p>Pada [tanggal], kami mulai saling mengenal lebih dekat, belajar memahami, dan tumbuh bersama.</p>
        </article>
        <article class="moment">
          <div class="tiny-label">MOMEN BERARTI</div>
          <h3>Melangkah Bersama</h3>
          <div class="memory-photo">Ganti dengan foto momen spesial</div>
          <p>Banyak hal kami lalui bersama. Setiap tawa dan tantangan mengajarkan kami arti saling mendukung.</p>
        </article>
        <article class="moment">
          <div class="tiny-label">12 DESEMBER 2026</div>
          <h3>Awal Selamanya</h3>
          <p>Kini, kami siap memulai babak baru sebagai pasangan suami istri. Semoga perjalanan ini selalu dipenuhi cinta, kesabaran, dan doa.</p>
        </article>
      </div>
      <div class="ornament">❦</div>
      <p>Terima kasih telah membaca cerita kami. Doa baik Anda adalah hadiah yang berarti bagi kami.</p>
    `
  },
  {
    label: "Ucapan & Doa",
    title: "Terima Kasih",
    content: `
      <div class="ornament">♡</div>
      <p>Merupakan kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir serta memberikan doa restu.</p>
      <p>Mohon maaf apabila terdapat kekurangan dalam undangan ini.</p>
      <div class="story-rule"><div class="tiny-label">DENGAN CINTA</div><p>Andy &amp; Zhea</p></div>
    `
  }
];

const cover = document.getElementById("cover");
const storyPage = document.getElementById("storyPage");
const progress = document.getElementById("storyProgress");
const progressSegments = [...progress.querySelectorAll("span")];
const openButton = document.getElementById("openInvitation");
const nextStoryButton = document.getElementById("nextStory");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const previousTap = document.getElementById("previousTap");
const nextTap = document.getElementById("nextTap");
const pageCounter = document.getElementById("pageCounter");

let currentPage = -1; // -1 means cover

function renderPage(index) {
  currentPage = Math.max(-1, Math.min(stories.length - 1, index));
  const isCover = currentPage === -1;

  cover.style.display = isCover ? "flex" : "none";
  storyPage.style.display = isCover ? "none" : "block";
  progress.style.display = isCover ? "none" : "flex";
  previousTap.style.display = isCover ? "none" : "block";
  nextTap.style.display = isCover ? "none" : "block";

  if (isCover) {
    pageCounter.textContent = "Sampul undangan";
    return;
  }

  const page = stories[currentPage];
  document.getElementById("storyLabel").textContent = page.label;
  document.getElementById("storyTitle").textContent = page.title;
  document.getElementById("storyContent").innerHTML = page.content;

  progressSegments.forEach((segment, index) => {
    segment.classList.toggle("active", index <= currentPage);
  });

  nextStoryButton.textContent =
    currentPage === stories.length - 1
      ? "KEMBALI KE SAMPUL ↺"
      : "LANJUT CERITA ›";

  pageCounter.textContent = `Story ${currentPage + 1} dari ${stories.length}`;
  storyPage.scrollTop = 0;
  storyPage.focus({ preventScroll: true });
}

function goNext() {
  if (currentPage === -1) {
    renderPage(0);
  } else if (currentPage === stories.length - 1) {
    renderPage(-1);
  } else {
    renderPage(currentPage + 1);
  }
}

function goPrevious() {
  if (currentPage <= 0) {
    renderPage(-1);
  } else {
    renderPage(currentPage - 1);
  }
}

openButton.addEventListener("click", () => renderPage(0));
nextStoryButton.addEventListener("click", goNext);
nextButton.addEventListener("click", goNext);
previousButton.addEventListener("click", goPrevious);
previousTap.addEventListener("click", goPrevious);
nextTap.addEventListener("click", goNext);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") goNext();
  if (event.key === "ArrowLeft") goPrevious();
});

renderPage(-1);
