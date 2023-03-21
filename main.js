//Giriş ve çıkış için kullanacağız HTML nesnelerini değişkenlere alalım.
const sonuc = document.getElementById("sonuc");
const aramaKutusu = document.getElementById("aramaKutusu");
const aramaListesi = document.getElementById("aramaListesi");

//Json kaynağından aldığımız verileri sayfada tutmak için dizi değişkenleri oluşturalım.

const anahtarKelimeler = [];
const Sozler = [];

verileriYükle();

async function verileriYükle() {
  const gelen = await fetch("https://sozluk.gov.tr/atasozu");
  let veri = await gelen.json();
  console.log(veri);

  veri.forEach((eleman) => {
    anahtarKelimeler.push(eleman.anahtar);
    Sozler.push(eleman.sozum);
  });

  const birlesmisKelimeler = [...new set(anahtarKelimeler)];

  let sayac = 0;
  birlesmisKelimeler.sort(() => Math.random() - 0.5);
  birlesmisKelimeler.forEach((kelime) => {
    if (sayac < 5) {
      const yeni = document.createElement("option");
      aramaListesi.appendChild(yeni);
      yeni.value = kelime;
    }
    sayac++;
  });
}
aramaKutusu.addEventListener("input", (e) => sonuclariAra(e.target.value));

function sonuclariAra(arananKelime) {
  sonuc.innerHTML = "";
  let aramaKurali = new RegExp(arananKelime, "gi");
  let eslesenler = Sozler.filter((soz) => aramaKurali.test(soz));

  if (arananKelime.length < 3) {
    eslesenler = [];
  }
  eslesenler.forEach((es) => {
    const siradakiSonuc = document.createElement("li");
    sonuc.appendChild(siradakiSonuc);
    siradakiSonuc.innerHTML = es;
  });
}
