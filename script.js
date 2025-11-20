// Ambil elemen HTML
const input = document.getElementById("video-url");
const btn = document.getElementById("gas");
const resultBox = document.getElementById("result");
const loadingBox = document.getElementById("loading");

// Bersihkan status
function clearStatus() {
  loadingBox.classList.add("hidden");
  resultBox.classList.add("hidden");
  resultBox.innerHTML = "";
}

// Fungsi fetch API TikWM
async function fetchDownloadInfo(videoUrl) {
  // ===== CALL API TIKWM =====
  const api = `https://www.tikwm.com/api/?url=${encodeURIComponent(videoUrl)}&hd=1`;

  const res = await fetch(api);
  const data = await res.json();

  if (data.code !== 0) {
    throw new Error("Gagal parsing URL");
  }

  return data.data;
}

// Render hasilnya
function renderResult(data) {
  resultBox.classList.remove("hidden");

  let html = `
    <h3 class="res-title">Hasil Parser</h3>
    <div class="res-item">
      <p>Tanpa Watermark</p>
      <a href="${data.play}" class="btn-dl" download>Download</a>
    </div>
    <div class="res-item">
      <p>Watermark (Backup)</p>
      <a href="${data.wmplay}" class="btn-dl" download>Download</a>
    </div>
  `;

  resultBox.innerHTML = html;
}

// Event tombol GAS
btn.addEventListener("click", async () => {
  clearStatus();

  let url = input.value.trim();
  if (!url) return alert("Masukin link dulu bro.");

  loadingBox.classList.remove("hidden");

  try {
    let data = await fetchDownloadInfo(url);
    renderResult(data);
  } catch (e) {
    alert("Gagal: " + e.message);
  }

  loadingBox.classList.add("hidden");
});
