const media = window.ALBUM_MEDIA || [];
const viewer = document.getElementById("viewer");
const stage = document.getElementById("stage");
const counter = document.getElementById("counter");
const title = document.getElementById("viewer-title");
const description = document.getElementById("viewer-description");
let activeIndex = 0;
let touchStart = null;

function render(index, updateHash = true) {
  activeIndex = (index + media.length) % media.length;
  const item = media[activeIndex];
  stage.replaceChildren();
  const element = item.type === "video" ? document.createElement("video") : document.createElement("img");
  element.src = item.localPath;
  if (item.type === "video") {
    element.controls = true;
    element.autoplay = true;
    element.playsInline = true;
    element.poster = item.posterPath;
  } else {
    element.alt = `${item.title}: ${item.description}`;
  }
  stage.append(element);
  counter.textContent = `${activeIndex + 1} / ${media.length}`;
  title.textContent = item.title || `Záznam ${activeIndex + 1}`;
  description.textContent = item.description || "";
  if (updateHash) history.replaceState(null, "", `#medium-${item.id}`);
}

function openViewer(index) {
  render(index);
  viewer.showModal();
  document.body.style.overflow = "hidden";
}

function closeViewer() {
  viewer.close();
  document.body.style.overflow = "";
  history.replaceState(null, "", `${location.pathname}${location.search}`);
}

document.querySelectorAll(".card-open").forEach((button) => {
  button.addEventListener("click", () => openViewer(Number(button.dataset.index)));
});
document.getElementById("close").addEventListener("click", closeViewer);
document.getElementById("previous").addEventListener("click", () => render(activeIndex - 1));
document.getElementById("next").addEventListener("click", () => render(activeIndex + 1));
viewer.addEventListener("click", (event) => { if (event.target === viewer) closeViewer(); });
viewer.addEventListener("cancel", (event) => { event.preventDefault(); closeViewer(); });
document.addEventListener("keydown", (event) => {
  if (!viewer.open) return;
  if (event.key === "ArrowLeft") render(activeIndex - 1);
  if (event.key === "ArrowRight") render(activeIndex + 1);
  if (event.key === "Escape") closeViewer();
});
stage.addEventListener("touchstart", (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
stage.addEventListener("touchend", (event) => {
  if (touchStart === null) return;
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 55) render(activeIndex + (distance < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });

const deepLink = location.hash.match(/^#medium-(\d+)$/)?.[1];
if (deepLink) {
  const index = media.findIndex((item) => item.id === deepLink);
  if (index >= 0) openViewer(index);
}
