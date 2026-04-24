# TableFlow — Proje Genel Bilgi ve User Flow Dokümanı

> **Versiyon:** MVP v1.0
> **Doküman Türü:** Ürün Tanımı & User Flow
> **Hedef Okuyucu:** Tüm ekip (Product, Design, Backend, Mobile)

---

## 1. Problem

Bilardo, masa tenisi, satranç gibi "saat bazlı" salon işletmelerinde manager'lar masa kullanım sürelerini hâlâ **kağıda yazarak** takip ediyor. Bu durumun getirdiği somut sorunlar:

- **Hesap hataları** — müşteri ile tartışma, gelir kaybı.
- **Manager dürüstsüzlüğü** — kağıtta saat yazmayı "unutmak" gelir kaybına yol açıyor ve owner bunu tespit edemiyor.
- **Rapor yokluğu** — owner işletmesinin gerçek performansını bilmiyor.
- **Yavaşlık** — yoğun saatlerde manager hesaplama yaparken sıra birikiyor.

## 2. Çözüm

Manager'ın telefonunda çalışan, masa sürelerini otomatik hesaplayan ve owner'a gerçek zamanlı gelir/kullanım raporları veren bir mobil uygulama.

**Temel satış mesajı:**
> "Manager'ının seni soymadığını bilmek için ayda 1000 som."

İkincil mesaj: "Hesap makinesine veda, müşteriyle tartışmaya veda."

## 3. Hedef Kullanıcı

### Owner (İşletme Sahibi)
- 30-55 yaş, genelde erkek.
- 1-3 salonu var.
- Salonda her zaman değil, günde bir-iki kez uğruyor.
- Teknik bilgisi sınırlı ama telefon kullanıyor (WhatsApp, Instagram).
- Asıl derdi: **gelirinin doğru olarak kendine ulaşması**.

### Manager (Çalışan)
- 20-50 yaş.
- Salon başında sürekli duruyor, müşteri ile muhatap olan o.
- Teknik bilgisi düşük olabilir — UI aşırı basit olmalı.
- Asıl derdi: **işini hızlı yapmak, müşteriyle tartışmamak**.

## 4. MVP Kapsamı

### MVP'ye DAHİL olanlar ✅
- Manager kayıt/giriş
- Owner kayıt/giriş (farklı rol)
- Mekan ekleme (owner)
- Masa ekleme / düzenleme / silme
- Masa için saatlik fiyat belirleme
- Masa için **Başlat** → **Bitir** akışı
- Süre otomatik hesaplanır, toplam borç gösterilir
- İndirim yüzdesi uygulama (bitirirken)
- Owner için aylık ve yıllık rapor (toplam gelir, masa bazlı gelir)
- Owner, manager hesabı ekleyebilir/silebilir
- Owner çoklu mekan yönetebilir, seçili mekan home'da gösterilir
- Temel subscription takibi (ayda 1000 som / mekan)

### MVP'de OLMAYAN (v2'ye bırak) ❌
- İçecek/atıştırmalık satışı (önemli! ama MVP'yi karmaşıklaştırır)
- Masa rezervasyonu
- Farklı saat tarifeleri (gündüz/akşam/hafta sonu)
- Masa duraklat/devam et (sigara molası senaryosu)
- Vardiya kapanış raporu
- Müşteri veritabanı / sadakat programı
- Offline mod (ama mimari offline-ready olmalı)
- Online ödeme entegrasyonu
- Push notification
- Çoklu dil (ilk başta Rusça + Kırgızca yeterli)

> ⚠️ **İçecek satışı konusu:** Bu özellik gerçekçi bir ürün için zorunlu ama karmaşık. MVP'yi vaktinde çıkarmak için v2'ye erteliyoruz. İlk müşteri görüşmelerinde bunun deal-breaker olup olmadığını öğren.

## 5. User Flow'lar

### 5.1 Manager Flow — İlk Giriş

```
[Uygulama Açılır]
      │
      ▼
[Welcome Ekranı]
      │
      ▼
[Giriş Yap] ──── [Kaydım yok] ──► [Kayıt Ol Ekranı]
      │                                  │
      │                                  ▼
      │                           [Kullanıcı adı, şifre,
      │                            davet kodu (owner'dan)]
      │                                  │
      ▼                                  │
[Home — Mekanlar & Masalar] ◄────────────┘
```

**Not:** Manager, owner'ın verdiği davet kodu olmadan kayıt olamaz. Aksi halde herkes kayıt olabilir, sistem kirlenir.

### 5.2 Manager Flow — Günlük İş Akışı

```
[Home]
 └─ Seçili mekan gösterilir (ör: "Mekan #1 - Merkez Şube")
 └─ Altında o mekanın masaları grid/list olarak:
    ┌────────┬────────┬────────┐
    │ Masa 1 │ Masa 2 │ Masa 3 │
    │ BOŞ    │ DOLU   │ BOŞ    │
    │        │ 00:45  │        │
    └────────┴────────┴────────┘

Müşteri geldi → Manager masaya tıklar
      │
      ▼
[Masa Detayı]
 - Masa No, Adı, Saatlik Fiyat
 - "BAŞLAT" butonu (büyük, yeşil)
      │
      ▼ (tıklama)
[Başlatıldı]
 - Süre sayacı canlı çalışır (00:00:15 → 00:01:23 ...)
 - "DURDURUP BİTİR" butonu görünür
      │
Home'a döndüğünde masa "DOLU" olarak görünür,
üzerinde canlı süre sayacı çalışır.

Müşteri oyununu bitirdi → Manager masaya tekrar girer
      │
      ▼
[Masa Detayı — Aktif Session]
 - Geçen süre: 1s 23dk
 - Ücret: 245 som
 - [İndirim uygula] (opsiyonel)
      │
      ▼
[BİTİR tıklanır]
      │
      ▼
[Ödeme Özeti Ekranı]
 - Toplam süre: 1s 23dk
 - Tutar: 245 som
 - İndirim: -%10 = -24.5 som
 - Ödenecek: 220.5 som
 - [ONAYLA & KAPAT]
      │
      ▼
[Home — Masa boşaldı]
```

### 5.3 Manager Flow — Mekan Değiştirme

Bazı manager'lar birden fazla mekanda çalışır.

```
[Home] → AppBar'da "mekan değiştir" ikonuna tıklar
      │
      ▼
[Mekan Seçim Bottom Sheet]
 - Merkez Şube ✓
 - Botanika Şubesi
 - ...
      │
      ▼
[Seçim yapılır] → Home yenilenir, o mekanın masaları gelir
```

### 5.4 Owner Flow — Kayıt ve İlk Kurulum

```
[Welcome] → [Kayıt Ol]
      │
      ▼
[Rol Seçimi]
 - Ben owner'ım
 - Ben manager'ım (davet kodum var)
      │
      ▼ (owner seçildi)
[Owner Kayıt: email, şifre, telefon, isim]
      │
      ▼
[İlk Mekan Kurulumu]
 - Mekan adı (örn: "Merkez Şube")
 - Mekan numarası/kodu
 - Kaç masa var? (ilk masalar toplu eklenebilir)
      │
      ▼
[Owner Home]
```

### 5.5 Owner Flow — Günlük Kullanım

Owner uygulamayı bir manager gibi kullanabilir (masa başlat/bitir) ama ekstra yetkileri var:

```
[Owner Home]
 - AppBar'da: Mekan değiştirici, "Raporlar", "Ayarlar"
 - Normal manager görünümü + aşağıda özet kart:
   "Bugünkü gelir: 3,450 som | Aktif masa: 4"
```

**Raporlar Ekranı:**
```
[Raporlar]
 ├─ [Bugün]     — anlık gelir, masa bazlı
 ├─ [Bu Hafta]  — gün gün
 ├─ [Bu Ay]     — gün gün, toplam
 ├─ [Bu Yıl]    — ay ay
 └─ [Özel Aralık]
```

Her raporda gösterilecekler:
- Toplam gelir
- Session sayısı
- Ortalama session süresi
- Masa bazlı kırılım (en çok gelir getiren masa)
- Manager bazlı kırılım (hangi manager kaç session açtı)
- Saat bazlı dağılım (en yoğun saatler grafiği)

**Ayarlar:**
- Mekan yönetimi (ekle/düzenle/sil)
- Masa yönetimi (ekle/düzenle/sil, fiyat değiştir)
- Manager yönetimi (ekle/sil, davet kodu oluştur)
- Abonelik durumu (son ödeme, sonraki ödeme)
- Şifre değiştir
- Çıkış yap

## 6. Edge Case'ler & Kritik Kararlar

Bu senaryolar MVP'de net şekilde çözülmeli:

| Senaryo | Çözüm |
|---------|-------|
| Manager masayı başlatıp uygulamayı kapattı | Session backend'de açık, tekrar girince devam ediyor gösterilir |
| Telefon pil bitti | Aynı — server'da kayıtlı, başka telefondan da girilebilir |
| İnternet koptu, session açık | Local'de saat çalışmaya devam eder, bağlantı gelince sync edilir |
| Yanlışlıkla BAŞLAT'a tıklandı | İlk 60 saniye içinde "İptal Et" butonu aktif olur |
| Manager session açıkken mekan değiştirdi | Sessionlar mekana bağlı, başka mekanda görünmez ama devam eder |
| Owner manager'ı çıkardı ama manager'ın açık session'ı var | Session kapatılana kadar manager'ın o oturumu aktif kalır |
| İki manager aynı anda aynı masayı başlatmaya çalıştı | Backend "already active" hatası döner, ekran yenilenir |
| Müşteri parayı ödeyemedi, ertesi gün gelecek | "Borç olarak kaydet" opsiyonu (v2 için not al — MVP'de tutarı not edip bitir) |

## 7. Gelir Modeli

**Abonelik Bazlı:**
- Her **mekan** için ayda **1000 som**.
- Owner kayıt olduğunda **14 gün ücretsiz deneme**.
- Ödeme: Ay başında, manuel ödeme (MVP'de online payment yok — owner'a fatura gönderilir, banka transferi ile alınır).

**Kritik finansal not:**
> 1000 som = ~11 USD/ay. Rakipler genellikle 30-70 USD arası. Bu fiyat çok düşük — sadece pazara giriş için geçerli. 6 ay sonra fiyat 2500 som'a çıkacak şekilde planla.

**Büyüme varsayımları (ilk yıl):**
- Ay 1-2: 3 pilot mekan (ücretsiz, veri topluyoruz)
- Ay 3-6: 15 ödeyen mekan (15.000 som/ay)
- Ay 7-12: 50 ödeyen mekan (50.000 som/ay)
- Yıl sonu MRR hedefi: 50.000-80.000 som

## 8. Başarı Kriterleri (MVP için)

MVP'nin başarılı olduğunu ölçmek için:

**Ürün metrikleri:**
- Kurulum sonrası ilk 7 günde manager en az 10 session açmış olmalı
- Session başlatma → bitirme süresi, masanın gerçek kullanım süresi ile %98 uyumlu olmalı
- Crash rate < %1

**İş metrikleri:**
- İlk 3 ayda 10 ödeyen mekan
- Churn rate < %15/ay
- Owner NPS > 40

## 9. Teknik Mimariye Kısa Bakış

```
┌─────────────┐         ┌─────────────┐
│  Mobile App │◄───────►│   Backend   │
│  (Flutter)  │  HTTPS  │  (Node.js)  │
└─────────────┘         └──────┬──────┘
                               │
                        ┌──────▼──────┐
                        │ PostgreSQL  │
                        └─────────────┘
```

Detaylar için:
- `03_backend_dokumani.md`
- `04_mobile_dokumani.md`

## 10. Yol Haritası (Tahmini)

| Faz | Süre | Çıktı |
|-----|------|-------|
| Discovery (kullanıcı görüşmeleri) | 2 hafta | 5-10 salon sahibi ile yapılan mülakat notları |
| Design (Figma) | 3 hafta | Tamamlanmış yüksek çözünürlüklü tasarımlar |
| Backend MVP | 4 hafta | Deploy edilmiş API + DB |
| Mobile MVP | 5 hafta | Android + iOS build'leri |
| Pilot | 4 hafta | 3 mekanda canlı kullanım, bug fix |
| **Toplam** | **~4.5 ay** | Pazara hazır ürün |

> Not: Backend ve Mobile paralel yürür, Design'dan sonra başlar.

## 11. İlk Pilot Müşteri Kriteri

Pilot için aranan salon:
- Bishkek merkezinde
- Owner açık fikirli, teknolojiyle arası iyi
- En az 3 masa
- Günde en az 15 session
- Owner haftada en az 1 kez geri bildirim vermeye razı

Pilot süresi boyunca:
- Uygulama ücretsiz
- Haftalık geri bildirim toplantısı (30 dk)
- Bug raporu için WhatsApp hattı

## 12. Riskler

| Risk | Olasılık | Etki | Mitigasyon |
|------|----------|------|------------|
| Manager uygulamayı kullanmayı reddediyor | Yüksek | Yüksek | UI'ı aşırı basit yap, owner'ın takip edeceğini manager bilsin |
| Owner ödeme yapmıyor (MVP'den sonra) | Orta | Yüksek | Değer göstermeden para isteme, önce 1-2 ay ücretsiz |
| İnternet sorunu | Yüksek | Orta | Offline-first mimari (v2'de tam offline, MVP'de local state) |
| Rakip çıktı | Orta | Orta | Yerel varlık, müşteri ilişkisi güçlü tut, özellik yarışı yapma |
| Teknik debt | Orta | Orta | Kod review zorunlu, test coverage > %60 |
