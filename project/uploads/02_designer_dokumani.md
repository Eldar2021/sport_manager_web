# TableFlow — Designer Dokümanı

> **Versiyon:** MVP v1.0
> **Hedef Okuyucu:** UI/UX Designer
> **Araç:** Figma (önerilen)

---

## 1. Tasarım Felsefesi

Bu ürünün kullanıcıları teknolojiye çok yatkın değil. UI tasarımında şu prensipler **her kararın önünde**:

1. **Tek elle kullanılabilir olmalı.** Manager'ın diğer eli ya hesap makinesinde ya da masada.
2. **Kritik butonlar kocaman olmalı.** Özellikle "Başlat" ve "Bitir" butonları ekranın %30'unu kaplayabilir.
3. **3 saniye kuralı:** Manager herhangi bir işlemi 3 saniyede yapabilmeli.
4. **Sayı ve süre büyük gösterilsin.** Süre sayacı min. 48pt. Para tutarı min. 32pt.
5. **Renk kodu tutarlı:** Yeşil = boş/başla, Kırmızı = dolu/bitir, Gri = devre dışı.
6. **Yazı dilinde sade ol.** "Session'ı sonlandır" değil, "Bitir". "Ücret" değil, "Ödenecek".

## 2. Design Tokens

### 2.1 Renk Paleti

```
Primary (Action)
├─ Brand Blue       #1E88E5   — ana marka rengi, link/butonlar
├─ Brand Blue Dark  #1565C0   — basılı durum
└─ Brand Blue Light #E3F2FD   — background vurgu

Semantic
├─ Success Green    #22C55E   — "Başlat", boş masa, kazanç pozitif
├─ Success Dark     #16A34A   — pressed state
├─ Danger Red       #EF4444   — "Bitir", aktif masa, uyarı
├─ Danger Dark      #DC2626   — pressed state
├─ Warning Amber    #F59E0B   — dikkat, beklemedeki ödeme
└─ Info Cyan        #06B6D4   — bilgi balonu

Neutrals
├─ Ink 900          #0F172A   — ana metin
├─ Ink 700          #334155   — ikincil metin
├─ Ink 500          #64748B   — placeholder, label
├─ Ink 300          #CBD5E1   — divider, disabled
├─ Ink 100          #F1F5F9   — card background (light mode)
└─ White            #FFFFFF

Dark Mode (opsiyonel, v1.5)
├─ BG Primary       #0B0F14
├─ BG Secondary     #11161D
├─ BG Tertiary      #1A2029
└─ BG Border        #2A3340
```

### 2.2 Tipografi

**Font ailesi:** Inter (ücretsiz, Cyrillic desteği mükemmel — Rusça/Kırgızca için kritik)

```
Display  (süre sayacı)    — 56px / 64px, weight 700, mono-numerik
H1       (ekran başlığı)  — 28px / 34px, weight 700
H2       (kart başlığı)   — 22px / 28px, weight 600
H3       (alt başlık)     — 18px / 24px, weight 600
Body     (ana metin)      — 16px / 24px, weight 400
Body Bold                 — 16px / 24px, weight 600
Caption  (label, meta)    — 13px / 18px, weight 500
Button   (buton yazısı)   — 17px / 22px, weight 600
Amount   (para)           — 32px / 40px, weight 700, tabular-nums
```

> ⚠️ Süre ve para gösteriminde mutlaka `tabular-nums` (eşit genişlik rakamlar) kullan. Yoksa sayaç titrer.

### 2.3 Spacing Sistemi

4px tabanlı: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64`.

### 2.4 Radius

```
Buttons, inputs    — 12px
Cards              — 16px
Modal, bottom sheet — 20px (üst köşeler)
Chip, badge        — 999px (tam yuvarlak)
```

### 2.5 Shadow

```
sm:  0 1px 2px rgba(0,0,0,0.04)
md:  0 4px 12px rgba(0,0,0,0.08)
lg:  0 12px 24px rgba(0,0,0,0.12)
```

## 3. Ekran Listesi (Screen Inventory)

MVP'de toplam **16 ekran** var:

**Auth (3)**
1. Welcome / Splash
2. Login
3. Register (Owner) / Register (Manager — davet kodu ile)

**Manager/Owner Ortak (6)**
4. Home — Mekanlar & Masalar
5. Mekan Seçici (Bottom Sheet)
6. Masa Detayı — Boş
7. Masa Detayı — Aktif Session
8. Ödeme Özeti (Session Bitirme)
9. Ayarlar

**Owner'a Özel (4)**
10. Mekan Yönetimi (Ekle/Düzenle)
11. Masa Yönetimi (Ekle/Düzenle/Fiyat)
12. Manager Yönetimi (Davet Kodu, Silme)
13. Raporlar Dashboard

**Ortak Yardımcı (3)**
14. Raporlar Detay (Aylık/Yıllık)
15. Abonelik Durumu
16. Şifre Sıfırlama

## 4. Ekran Detayları

### 4.1 Welcome

**Amaç:** İlk açılışta marka tanıtımı, login/register seçimi.

**İçerik:**
- Üstte logo ve kısa slogan ("Salon yönetiminin dijital hali")
- Ortada illustration (masalar, saat ikonu — lisanssız özgün çizim yapılmalı)
- Altta iki büyük buton: "Giriş Yap", "Kayıt Ol"
- En altta "Diliniz" seçici (RU / KG / TR)

**State'ler:** Sadece idle.

### 4.2 Login

**İçerik:**
- Üstte "Giriş Yap" başlığı
- Input: Kullanıcı adı veya email
- Input: Şifre (göster/gizle ikonu)
- Buton: "Giriş Yap" (primary, full width)
- Link: "Şifremi Unuttum"
- Alt kısım: "Hesabın yok mu? Kayıt Ol"

**State'ler:**
- Idle
- Loading (buton içinde spinner)
- Error (input altında kırmızı label: "Kullanıcı adı veya şifre yanlış")

### 4.3 Register

**Özel durum:** İlk seçim "Owner mı Manager mı" olmalı.

**Adım 1:** Rol seçimi (iki büyük kart, simgeli)
- 🏢 Salon sahibiyim → Owner akışı
- 🎱 Salon çalışanıyım → Manager akışı (davet kodu ister)

**Adım 2 (Owner):**
- İsim
- Telefon
- Email
- Şifre (min 8 karakter, göstergeli)
- Şifre tekrar
- Kullanım şartları checkbox
- "Hesap Oluştur"

**Adım 2 (Manager):**
- Davet Kodu (owner'dan alacak)
- Kullanıcı adı
- İsim
- Şifre
- "Kayıt Ol"

### 4.4 Home — Mekanlar & Masalar

**EN KRİTİK EKRAN.** Manager bu ekranı günde 500 kez görecek.

**Layout:**

```
┌─────────────────────────────────┐
│ [☰]   Merkez Şube ▾    [⚙]     │  ← AppBar
│       Mekan #1                  │     (mekan değiştirici dropdown)
├─────────────────────────────────┤
│                                 │
│  ┌────────┐ ┌────────┐         │
│  │Masa 1  │ │Masa 2  │         │
│  │ ●BOŞ   │ │●DOLU   │         │
│  │        │ │ 00:45  │         │   ← Masa kartları grid
│  │ 200/sa │ │ 00:45  │         │     (2 kolon mobil, 3 kolon tablet)
│  └────────┘ └────────┘         │
│                                 │
│  ┌────────┐ ┌────────┐         │
│  │Masa 3  │ │ +      │         │
│  │ ●BOŞ   │ │ Ekle   │         │   ← "+" yalnızca owner'a
│  │ 200/sa │ │        │         │
│  └────────┘ └────────┘         │
│                                 │
├─────────────────────────────────┤
│  [Bugün: 3,450 som  |  Aktif: 1]│  ← Sadece owner'a görünür
└─────────────────────────────────┘
```

**Masa Kartı — State'ler:**

| State | Görünüm |
|-------|---------|
| **Boş** | Yeşil nokta, "BOŞ", alt kısımda saatlik fiyat |
| **Aktif** | Kırmızı arkaplan (light fill), kırmızı nokta, canlı sayaç |
| **Az Önce Bitti** | 5 saniye boyunca yeşil flash animasyonu, sonra "Boş" |

**Canlı sayaç:** Her masada 1 saniye periyotla tick atar. Local'de hesaplanır (backend'e sürekli istek gitmez). Format: `HH:MM:SS`, 1 saati geçince `01:23:45`.

**Owner'ın ekstra hakkı:** "+ Ekle" kartı sadece owner'a görünür.

### 4.5 Mekan Seçici (Bottom Sheet)

AppBar'daki mekan adına tıklandığında alttan açılır.

```
┌─────────────────────────────────┐
│  Mekan Seç                   [x]│
├─────────────────────────────────┤
│  ✓ Merkez Şube                  │
│    Mekan #1 · 6 masa            │
├─────────────────────────────────┤
│    Botanika Şubesi              │
│    Mekan #2 · 4 masa            │
├─────────────────────────────────┤
│    Osh Şubesi                   │
│    Mekan #3 · 8 masa            │
├─────────────────────────────────┤
│  [+ Yeni Mekan Ekle]            │  ← Sadece owner
└─────────────────────────────────┘
```

### 4.6 Masa Detayı — Boş

```
┌─────────────────────────────────┐
│  [←]   Masa 2                   │
├─────────────────────────────────┤
│                                 │
│         (illustration)          │
│         🎱  veya ikon           │
│                                 │
│         Masa 2                  │
│         "VIP Salon"             │  ← opsiyonel isim
│                                 │
│         200 som / saat          │
│                                 │
│   ┌───────────────────────┐     │
│   │                       │     │
│   │       BAŞLAT          │     │   ← Kocaman yeşil buton
│   │                       │     │     (ekranın ~%25'i)
│   └───────────────────────┘     │
│                                 │
│   Son Session: 1s 15dk          │
│   Bugün toplam: 4 session       │
└─────────────────────────────────┘
```

### 4.7 Masa Detayı — Aktif Session

```
┌─────────────────────────────────┐
│  [←]   Masa 2                   │
├─────────────────────────────────┤
│                                 │
│       01:23:45                  │   ← 56px, mono, canlı
│       geçen süre                │
│                                 │
│       275 som                   │   ← Anlık ücret
│       anlık tutar               │
│                                 │
│  Başlama: 18:42                 │
│  Süre: 1s 23dk                  │
│  Saatlik: 200 som               │
│                                 │
│  [ Yanlış Başladım ]            │   ← ilk 60sn aktif, sonra disabled
│                                 │
│   ┌───────────────────────┐     │
│   │                       │     │
│   │     DURDURUP BİTİR    │     │   ← Kırmızı, full-width
│   │                       │     │
│   └───────────────────────┘     │
└─────────────────────────────────┘
```

### 4.8 Ödeme Özeti

Masa bitirildiğinde modal olarak açılır.

```
┌─────────────────────────────────┐
│  Ödeme Özeti             [x]    │
├─────────────────────────────────┤
│                                 │
│  Masa 2 · VIP Salon             │
│  18:42 → 20:05                  │
│                                 │
│  Süre              1s 23dk      │
│  Saatlik           200 som      │
│  ─────────────────────────      │
│  Ara Toplam        275 som      │
│                                 │
│  İndirim                        │
│  [ 0% ] [5%] [10%] [20%] [✏️]  │   ← chip seçiciler
│                                 │
│  ─────────────────────────      │
│  ÖDENECEK         275 som       │   ← 32px bold
│                                 │
│   ┌───────────────────────┐     │
│   │ ONAYLA ve KAPAT       │     │
│   └───────────────────────┘     │
│                                 │
│   [İPTAL]                       │   ← geri dön, kapatma
└─────────────────────────────────┘
```

İndirim chip'lerinden biri seçildiğinde ödenecek tutar canlı güncellenir.

### 4.9 Raporlar Dashboard (Owner)

```
┌─────────────────────────────────┐
│  [←]   Raporlar                 │
├─────────────────────────────────┤
│  [Tümü ▾]  [Bu Ay ▾]           │   ← filtreler
├─────────────────────────────────┤
│                                 │
│  ┌───────────────────────────┐  │
│  │ Toplam Gelir              │  │
│  │ 142,500 som               │  │
│  │ ↑ %12 geçen aya göre      │  │
│  └───────────────────────────┘  │
│                                 │
│  ┌───────────────────────────┐  │
│  │ Session Sayısı            │  │
│  │ 384                       │  │
│  └───────────────────────────┘  │
│                                 │
│  Günlük Gelir                   │
│  ┌───────────────────────────┐  │
│  │    ▃▅▂▇█▄▆▂▇▅▆▄▃▇        │  │  ← bar chart
│  │                           │  │
│  └───────────────────────────┘  │
│                                 │
│  Masa Performansı               │
│  Masa 1 ████████░░ 45,200 som   │
│  Masa 2 ██████░░░░ 32,100 som   │
│  Masa 3 ████░░░░░░ 21,800 som   │
│                                 │
│  Manager Performansı            │
│  Aibek    ██████████ 65,000     │
│  Nurlan   ██████░░░░ 42,000     │
│                                 │
│  Saat Dağılımı                  │
│  ┌───────────────────────────┐  │
│  │  ▁▁▁▂▃▄▅▇██▇▆▅▃▂▁         │  │
│  │ 10 12 14 16 18 20 22      │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

### 4.10 Manager Yönetimi (Owner)

```
┌─────────────────────────────────┐
│  [←]   Manager'lar              │
├─────────────────────────────────┤
│  Aktif Davet Kodu:              │
│  ┌───────────────────────────┐  │
│  │   TF-48X2KD               │  │   ← tıklanıp kopyalanır
│  │   [Kopyala] [Yenile]      │  │
│  └───────────────────────────┘  │
│                                 │
│  Kayıtlı Manager'lar            │
│                                 │
│  ● Aibek Asanov                 │
│    aibek · Son giriş: 10dk önce │
│    [Düzenle] [Sil]              │
│                                 │
│  ● Nurlan Bekov                 │
│    nurlan · Son giriş: 2 gün    │
│    [Düzenle] [Sil]              │
│                                 │
│  [+ Yeni Manager Davet Et]      │
└─────────────────────────────────┘
```

## 5. Empty States (Boş Durumlar)

Her ekranın boş hali tasarlanmalı. İllustrasyon + kısa yönlendirici metin + CTA.

| Ekran | Empty State |
|-------|-------------|
| Home — hiç masa yok | "Henüz masa eklenmemiş. Ekle butonuna tıklayın." + illüstrasyon |
| Raporlar — veri yok | "Henüz session kaydedilmemiş. İlk session'dan sonra buradayız." |
| Manager listesi boş | "Henüz manager eklemedin. Davet kodu paylaş." |
| Mekan listesi boş | "Henüz mekan yok. İlk mekanını ekle." |

## 6. Loading & Error States

- **Loading (ilk açılış):** Skeleton card'lar (gri shimmer).
- **Loading (buton içinde):** Spinner, buton metnini değiştirme, disable et.
- **Error (network):** Üstten gelen snackbar: "İnternet bağlantısı yok. Tekrar deneniyor..."
- **Error (form):** Input'un altında kırmızı 13px metin.
- **Error (kritik, sayfa bazlı):** Ortada X simgesi, hata mesajı, "Tekrar Dene" butonu.

## 7. Animasyonlar & Mikro-etkileşim

Az ve amaçlı:

- **Buton basılma:** Scale 0.98, 100ms.
- **Masa başlatma onayı:** Kart yeşilden kırmızıya 300ms fade.
- **Session bitirme:** Bottom sheet aşağı kayar, tutarı 500ms sayma animasyonu ile gösterir.
- **Tab değişimi:** 150ms slide.
- **Snackbar:** 200ms slide up, 3sn sonra kaybolur.

> Animasyon süresi 400ms'yi geçmemeli. Manager hızlı tıklamak ister, animasyon onu yavaşlatmamalı.

## 8. Erişilebilirlik

- Kontrast oranı min. 4.5:1 (metin için).
- Dokunma alanı min. 44x44pt.
- Font boyutu sistem ayarıyla ölçeklenebilmeli.
- Ekran okuyucu etiketleri (semantic labels) her butona eklenmeli.
- Renk tek başına anlam taşımamalı (ör: "boş" yazısı + yeşil nokta, sadece renk değil).

## 9. Çok Dillilik Notları

Dil seçenekleri: **Rusça, Kırgızca, Türkçe** (MVP için RU ve KG öncelik).

- Metinler 30-40% daha uzun olabilir Rusça'da. Buton genişlikleri esnek tasarlansın.
- Tarih/saat yerel formatında: RU/KG için 24 saat.
- Para birimi: "som" (Kırgız Somu) — 1250 som (ayraçsız gösterimi kolay okunur).

## 10. Deliverable'lar (Designer'dan beklenen)

1. **Figma dosyası:**
   - Design tokens (color, typography, spacing variable'ları)
   - Component library (button, input, card, chip, bottom sheet, modal)
   - Tüm 16 ekran, her state için (idle / loading / error / empty)
   - Owner flow ve manager flow ayrı frame grupları
2. **İkon seti:** Lucide veya Phosphor'dan seçim. Özel ikonlara gerek yok.
3. **Illustration set:** 4-5 adet özgün illüstrasyon (welcome, empty states).
4. **Prototype:** Figma'da tıklanabilir prototype, ana akışlar için.
5. **Design QA:** Geliştirme sırasında haftada 1 review.

## 11. Referans / İlham

İncelemek için (taklit için değil, referans):
- Toast POS, Square Point of Sale (restaurant POS UX)
- Rusça rakipler: iiko mobil, R-Keeper (gözlem için)
- Calm.com — tipografi ve renk tonu
- Linear.app — bilgi yoğunluğu dengesi

## 12. Tasarım Sırasındaki Soru İşaretleri

Aşağıdaki kararlar tasarım sürecinde netleşecek, karar verilmeli:

- [ ] Logo ve brand identity var mı? Varsa stil?
- [ ] Illustration stili: flat mi, 3D mi, line art mı?
- [ ] Onboarding ekranı olsun mu (3 slide)?
- [ ] Manager için "vardiya başlat/bitir" şimdilik olmasın mı? (şiddetle tavsiye: v2'ye)
- [ ] İndirim yüzdeleri sabit mi, owner ayarlar mı?
- [ ] Masa detayında saatlik fiyatı manager değiştirebilsin mi? (tavsiye: hayır, sadece owner)
