# DuLa — Mağaza Uyumluluk Statik Sayfaları Planı

> **Versiyon:** v1.0
> **Doküman Türü:** Uygulama Planı (Static Web Pages)
> **Amaç:** App Store ve Google Play yayını için gereken 4 statik web sayfasının üretimi
> **Tarih:** 2026-05-18

---

## 1. Bağlam (Kararlaştırılmış)

| Konu                  | Karar                                                                                                                             |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| **Marka**             | DuLa — "Digital hall management" (turuncu kimlik `#C2680F`, `init.png`'den; eski designer dokümanındaki mavi DEĞİL). Not: `init.png` screenshot'unda "TableFlow" görünüyor — gerçek uygulama adı **DuLa**, sayfalarda DuLa kullanılır |
| **Pazar / Kullanıcı** | Kırgızistan; saat bazlı salon (bilardo, masa tenisi, satranç) owner & manager'ları                                                |
| **Hosting**           | Mevcut GitHub Pages. Public URL tabanı: `https://eldar2021.github.io/sport_manager_web/`                                          |
| **Teknik**            | Bağımsız statik HTML (React yok, build bağımlılığı yok)                                                                           |
| **Diller**            | EN + RU + KY — sayfa başına tek dosya, inline JS dil değiştirici (review için varsayılan EN)                                      |
| **Hesap silme**       | Uygulama içinde mevcut: `DELETE /api/v1/auth/account` (bearer). Web sayfası bilgilendiricidir (adımları + yedek iletişim anlatır) |

### İletişim Bilgileri

- **E-posta:** `eldiiaralmazbekov@gmail.com`
- **WhatsApp / Telegram / Telefon:** `+996 990 039 301`

### Veri Sorumlusu

- Bireysel geliştirici (sayfada görünecek ad: **Eldiiar Almazbekov** — resmi yazım farklıysa düzeltilecek). Apple/Google bireysel geliştiriciyi kabul eder.

### Veri Saklama Kuralı (kritik — hem Privacy hem Deletion sayfasına işlenecek)

- **Owner** hesabını silerse → hesap **ve tüm mekan/masa/session/rapor verisi anında silinir**.
- **Manager** hesabını silerse → hesap kaldırılır, ancak Manager'ın oluşturduğu **session/rapor kayıtları kalır** (Owner'ın analitikleri bozulmasın diye); bunlar yalnızca Owner kendi hesabını/raporları sildiğinde silinir.
- Bu asimetri başlı başına bir açıklama gerektirir; deletion sayfasında açıkça belirtilir (her iki mağaza da bunu bekler).

---

## 2. Neden Bu 4 Sayfa (Mağaza Eşlemesi)

| Sayfa            | Apple App Store                                        | Google Play                                     |
| ---------------- | ------------------------------------------------------ | ----------------------------------------------- |
| Privacy Policy   | **Zorunlu** — App Privacy + listing URL                | **Zorunlu** — Data safety + listing URL         |
| Account Deletion | Silme yolu zorunlu (uygulama içi var; URL güçlendirir) | **Zorunlu** — public deletion URL (Data safety) |
| Support Contacts | **Zorunlu** — Support URL                              | **Zorunlu** — Support email/site                |
| Marketing        | Opsiyonel "Marketing URL" / promo                      | Opsiyonel ama listelemeyi güçlendirir           |

---

## 3. Dosya Yapısı (Yeni — mevcut hiçbir şey değişmez)

```
public/
  legal/
    index.html              # hub: 4 sayfaya link + dil değiştirici
    privacy.html
    account-deletion.html
    support.html
    marketing.html
    assets/
      style.css             # paylaşılan, küçük tek dosya, marka token'ları
      i18n.js               # küçük dil değiştirici (data-i18n attr, EN/RU/KY)
      logo.svg              # init.png'den yeniden çizilmiş DuLa markı
```

- Vite `public/` içeriğini `dist/`'e aynen kopyalar → mevcut `deploy.yml` ile **workflow değişikliği olmadan** deploy olur.
- Final URL'ler:
  - `…/sport_manager_web/legal/privacy.html`
  - `…/sport_manager_web/legal/account-deletion.html`
  - `…/sport_manager_web/legal/support.html`
  - `…/sport_manager_web/legal/marketing.html`
  - `…/sport_manager_web/legal/` (hub)

---

## 4. Sayfa İçerikleri

### 4.1 privacy.html

- Yürürlük tarihi
- Veri sorumlusu (bireysel geliştirici + iletişim)
- Toplanan veri:
  - Hesap: ad, e-posta, telefon
  - Kullanım: mekan / masa / session / gelir verisi
  - Tanılama: Firebase Crashlytics + Analytics (deployment planına göre)
- Amaç ve hukuki dayanak
- Veri satışı / reklam yok
- Üçüncü taraflar (Firebase/Google, backend hosting)
- Saklama süresi (Owner/Manager asimetrisi — Bölüm 1)
- Kullanıcı hakları (erişim, düzeltme, silme, dışa aktarma)
- Silme yönlendirmesi → account-deletion sayfası
- Çocuklar (<16'ya yönelik değil)
- Uluslararası veri aktarımı
- Kırgızistan kişisel veri mevzuatı notu + GDPR tarzı haklar
- İletişim

### 4.2 account-deletion.html

- Uygulama adı
- Uygulama içi adımlar (screenshot'lara birebir uyumlu):
  _Uygulamayı aç → Profile (sağ alt) → "Delete account"a kaydır → "Delete forever" onayı_
- Silinenler vs. saklananlar:
  - **Owner:** hesap + tüm veri anında, kalıcı, geri alınamaz
  - **Manager:** hesap silinir; oluşturduğu session/rapor kayıtları Owner'ın analitiği için kalır, Owner sildiğinde silinir
- İşlem süresi
- Uygulamaya erişimi olmayan kullanıcılar için yedek: destek e-postasına talep
- Privacy sayfasına geri link

### 4.3 support.html

- Ürün tek cümle tanım
- Destek e-postası (birincil kanal)
- WhatsApp / Telegram / Telefon: `+996 990 039 301`
- Yanıt süresi beklentisi
- SSS:
  - Giriş / davet kodu
  - Şifre sıfırlama (e-posta ile geçici şifre)
  - Mekan değiştirme
  - Abonelik (1000 som / mekan / ay, 14 gün deneme)
  - Hesap silme
- Privacy & Deletion sayfalarına link

### 4.4 marketing.html

- Hero: DuLa + "Manager'ının seni soymadığını bilmek için ayda 1000 som"
- Problem → çözüm
- Özellik vurguları: masa başlat/bitir, otomatik süre+ücret, indirim, owner raporları, çoklu mekan, manager davet kodu
- Fiyatlandırma: 1000 som/mekan/ay, 14 gün deneme
- Mağaza rozetleri (App Store / Google Play — canlıya kadar placeholder link)
- Footer: diğer 3 sayfaya link
- Responsive, harici JS yok, marka stilli

---

## 5. Teknik Yaklaşım

- Kendi kendine yeten: React yok, yeni npm bağımlılığı yok, workflow düzenlemesi yok.
- Her sayfa üç dilli: tek inline JS değiştirici (`data-i18n` attribute'ları); JS yoksa EN ilk render edilir (reviewer için).
- Marka uyumu `init.png`'ye göre (turuncu kimlik, Inter font, DuLa markı).
- Mobil uyumlu, erişilebilir (semantic HTML, 4.5:1 kontrast, klavye navigasyonu) — deployment planındaki a11y çıtasını karşılar.

---

## 6. Açık / Doğrulanacak Maddeler

- [ ] Veri sorumlusu resmi ad yazımı ("Eldiiar Almazbekov" doğru mu?)
- [ ] App Store / Google Play uygulama URL'leri (canlıya kadar placeholder)
- [ ] Privacy yürürlük tarihi (yayın tarihi)

---

## 7. Sonraki Adım

Onay sonrası `public/legal/` altındaki 6 dosya üretilir ve mevcut `deploy.yml` ile GitHub Pages'e deploy edilir.
