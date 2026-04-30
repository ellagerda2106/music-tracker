// אובייקט הלהקות - נשמור אותו למעלה
const bands = {
    skz: {
         name: "Stray Kids", 
         desc: "JYPE, founded in 2017", 
         info: "8 members: Bang Chan, Lee Know, Changbin, Hyunjin, Han, Felix, Seungmin, I.N. Fandom: STAY.", 
         img: "images/skz.jpg" 
        },
    p1h: { 
        name: "P1Harmony", 
        desc: "FNC, founded in 2020", 
        info: "6 members: Theo, Keeho, Jiung, Intak, Soul, Jongseob. Fandom: P1ECE.", 
        img: "images/p1h.jpg" 
        },
    txt: { 
        name: "Tomorrow X Together", 
        desc: "HYBE (Bighit), founded in 2019", 
        info: "5 members: Yeonjun, Soobin, Beomgyu, Taehyun, Huening Kai. Fandom: MOA.", 
        img: "images/txt.jpg" 
        },
    bnd: { 
        name: "BoyNextDoor", 
        desc: "HYBE (KOZ), founded in 2023", 
        info: "6 members: Sungho, Riwoo, Jaehyun, Taesan, Leehan, Woonhak. Fandom: ONEDOOR.", 
        img: "images/bnd.jpg"
        },
    svt: { 
        name: "Seventeen", 
        desc: "HYBE (Pledis), founded in 2015", 
        info: "13 members: S.Coups, Jeonghan, Joshua, Jun, Hoshi, Wonwoo, Woozi, The8, Mingyu, DK, Seungkwan, Vernon, and Dino. Fandom: CARAT.", 
        img: "images/svt.jpg" 
        },
    kfp: { 
        name: "Kickflip", 
        desc: "JYPE, founded in 2025", 
        info: "7 members: Kyehoon, Amaru, Donghwa, Juwang, Minje, Keiju, Donghyeon. Fandom: WEFLIP.", 
        img: "images/kfp.jpg" 
        },
    lngst: { 
        name: "Lngshot", 
        desc: "MORE VISION, founded in 2026", 
        info: "4 members: Ohyul, Ryul, Woojin, Louis. Fandom: SHOTTIES.", 
        img: "images/lngst.jpg"
         },
    xdh: { 
        name: "Xdinary Heroes", 
        desc: "JYPE, founded in 2021", 
        info: "6 members: Gunil, Jungsu, Gaon, O.de, Junhan, Jooyeon. Fandom: VILLAINS.", 
        img: "images/xdh.jpg" 
        },
    day6: { 
        name: "DAY6", 
        desc: "JYPE, founded in 2015", 
        info: "4 members: Sungjin, Young K, Wonpil, Dowoon. Fandom: MY DAY", 
        img: "images/day6.jpg" 
        }
};

// פונקציות הלהקות (חייבות להיות גלובליות כדי שה-HTML יזהה אותן)
function openInfo(bandKey) {
    const box = document.getElementById("infoBox");
    const data = bands[bandKey];

    if (!box || !data) return;

    box.innerHTML = `
    <div class="modal-content">
        <span class="close-btn" onclick="closeInfo()">&times;</span>
        <h2>${data.name}</h2>
        <img src="${data.img}" alt="${data.name}" style="width:100%; max-width:300px; border-radius:10px;">
        <p><strong>${data.desc}</strong></p>
        <p>${data.info}</p>
    </div>
    `;
    box.style.display = "flex"; // מציג את המודאל
}

function closeInfo() {
    const box = document.getElementById("infoBox");
    if (box) {
        box.innerHTML = "";
        box.style.display = "none"; // מחביא את המודאל
    }
}

// קוד רשימת השירים - עטוף בבדיקה כדי שלא יפיל את שאר הדף
const list = document.getElementById("songList");
if (list) {
    let songs = [];
    const savedSongs = localStorage.getItem("songs");
    if (savedSongs) {
        songs = JSON.parse(savedSongs);
        songs.forEach(song => addSongToList(song.name, song.artist));
    }

    const addBtn = document.getElementById("addBtn");
    if (addBtn) {
        addBtn.addEventListener("click", function () {
            const songInput = document.getElementById("songName").value;
            const artistInput = document.getElementById("artistName").value;
            if (songInput && artistInput) {
                addSongToList(songInput, artistInput);
                songs.push({ name: songInput, artist: artistInput });
                localStorage.setItem("songs", JSON.stringify(songs));
            }
        });
    }
}

function addSongToList(songName, artistName) {
    const listElement = document.getElementById("songList");
    if (!listElement) return;
    const li = document.createElement("li");
    li.innerHTML = `${songName} - ${artistName} <button onclick="this.parentElement.remove()">delete</button>`;
    listElement.appendChild(li);
}