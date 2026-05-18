# Sport Manager — Yayına Alma Planı

Bu plan, üç bileşenden oluşan Sport Manager ürününün canlıya alınması için hazırlanmıştır. Bileşenler birbirine bağımlı olduğundan sıralama önemlidir: **Backend → Web → Mobile**.

## 1. Sistem Mimarisi

| Bileşen | Konum | Teknoloji | Çalışan |
|---------|-------|-----------|---------|
| Backend API | `sport_manager_backend/` | Spring Boot 3 (parent 4.0.6) · Java 21 · Spring Security · Spring Data JPA · PostgreSQL · jjwt 0.11.5 · Maven (wrapper) · Dockerfile (multi-stage, alpine, non-root user) | Şu anda `http://157.230.124.178:8080` üzerinde (Digital Ocean droplet, HTTP) |
| Web | `sport_manager_web/` | Vite 5 · React 18 · `base: '/sport_manager_web/'` (GitHub Pages prefix). `chats/` ve `project/` klasörleri ile birlikte gelen Claude Design handoff paketi — şu an HTML prototip, henüz prod React kodu değil | Henüz deploy edilmemiş |
| Mobile | `sport_manager_mobile/` | Flutter 3.41.7 (FVM) · Dart ^3.11.1 · Melos monorepo · BLoC · GetIt · Dio · Firebase Remote Config · Material 3 · Diller: en / ru / ky · Paketler: core, api_client, storage_client, auth, facility, managers, subscription, reports | Firebase projesi `sport-manager-4bba2` bağlı |

## 2. Yayın Öncesi — Tüm Bileşenler

### 2.1 Backend (Spring Boot)

**Kod temizliği ve güvenlik**

- `application.yml` üç gerçek sırla çalışıyor: `DATABASE_*`, `JWT_SECRET`. Bu değerlerin **hiçbir koşulda repo'da olmadığını** doğrula (`git log -p src/main/resources/` ile geçmişte de sızıntı olmadığını kontrol et; varsa BFG / `git filter-repo` ile temizle ve tüm parolaları döndür).
- `JWT_SECRET` minimum 256 bit olmalı. Prod için `openssl rand -base64 64` ile yeni bir anahtar üret; **dev secret prod'da kullanılmasın**.
- `SecurityConfiguration.java` üzerinden `/api/v1/**` şu an `permitAll()` — token yokken `@AuthenticationPrincipal User` null gelebilir. `HomePageController` içindeki her endpoint'i tekrar gözden geçir, null kontrolü ve role-based yetkilendirme (`@PreAuthorize` veya manuel) ekle. Bu mevcut bir footgun (CLAUDE.md'de belirtilmiş).
- Error handling iki paralel mekanizmada (`AuthServiceImpl` → `ResponseStatusException`, `HomeService` → `AppException` + `GlobalExceptionHandler`). Yayın öncesi tek mekanizmaya (`AppException`) taşı; aksi halde istemci `code` + `message{en,ru,ky}` formatı bekleyip null `message` alacak.
- `messages_*.properties` dosyaları var ama `GlobalExceptionHandler` okumuyor — çevirileri tek kaynağa (kod ya da .properties) indir.
- Login/refresh handler'larında `password`, `refreshToken` gibi alanların loglara basılmadığından emin ol. `show-sql: false` ✅ ayarlı, koru.
- `CommandLineRunner` / `@PostConstruct` ile seed data ekleyen yer varsa prod profilinde devre dışı bırak.
- CORS politikasını `SecurityConfiguration` içinde sertleştir: yalnızca web origin'i (örn. `https://app.sport-manager.kg`) izinli, `*` kullanma.

**Veritabanı**

- `jpa.hibernate.ddl-auto=update` **prod için tehlikeli** — şema migration aracı yok. Yayın öncesi **Flyway veya Liquibase ekle**:
  - Şu anki şemayı (`User`, `InviteCode`, `Venue`, `Tables`, `Session`) baseline migration olarak çıkar (`mvn flyway:baseline` veya `pg_dump --schema-only`).
  - Prod profilinde `ddl-auto=validate` (veya `none`), migrationlar `db/migration/V__*.sql` altında versiyonlanmış olarak.
- Prod PostgreSQL: en az v14 (README v14+), `sslmode=require` URL'de zaten zorlanıyor — sertifika hostingde geçerli olsun.
- `InviteCode` 7 günlük TTL'i temizleyen bir zamanlanmış görev (`@Scheduled` + cron) ekle, aksi halde tablo büyür.
- Refresh token rotasyonu mevcut (login/refresh ⇒ tek aktif token). Logout'un gerçekten `User.refreshToken`'ı null'ladığını entegrasyon testiyle doğrula.

**Build**

- `./mvnw clean package -DskipTests=false` ile **testler dahil** üretim JAR'ı:
  - `target/sportmanager-0.0.1-SNAPSHOT.jar`
- Docker imajı:
  ```bash
  docker build -t sport-manager-backend:$(git rev-parse --short HEAD) .
  docker tag sport-manager-backend:$(git rev-parse --short HEAD) sport-manager-backend:latest
  ```
- Image registry: Docker Hub / GitHub Container Registry / Digital Ocean Container Registry — birini seç, push et.
- Version stratejisi: `pom.xml` içinde `0.0.1-SNAPSHOT` → release için `0.1.0` gibi sabit etiket ver, `-SNAPSHOT`'ı prod'a alma.

**Hosting Seçenekleri (önerilen sıralama)**

1. **Mevcut Digital Ocean droplet'i yükselt (en hızlı yol)** — Zaten `157.230.124.178` üzerinde çalışıyor:
   - Droplet'i Docker + nginx + certbot ile yeniden kur (veya Docker Compose: app + postgres + nginx + watchtower).
   - Yönetilen DB'ye geç: Digital Ocean **Managed PostgreSQL** (otomatik yedek, sslmode=require uyumlu). Droplet üzerinde postgres tutma.
   - nginx reverse proxy ile 443 → 8080.
2. **Render / Railway / Fly.io** — Dockerfile zaten hazır; `git push` ile deploy, managed Postgres + otomatik HTTPS dahil. Küçük takım için en az operasyon yükü.
3. **AWS ECS / Google Cloud Run** — Ölçek gerekirse. Cloud Run en pratik: konteyner imajını çek, env var'ları ayarla, hazır.
4. **Kubernetes (DOKS, GKE)** — Şu trafik hacmi için aşırı; sadece yatay ölçek gerçekten gerekirse.

**Domain, SSL, CDN**

- Domain kararı (`sport-manager.kg`, `sportmanager.app` vb.) ve **API alt-domain'i** (`api.sport-manager.kg`).
- DNS: A/AAAA kaydı hosting'e, `CAA` kaydı (Let's Encrypt için isteğe bağlı sertleştirme).
- SSL: Let's Encrypt (certbot, nginx) veya hosting'in otomatik TLS'i. Sertifika yenileme cron'unu doğrula (`certbot renew --dry-run`).
- **REST API'ye genel CDN gereksiz**; Cloudflare proxy'si DDoS koruması için önerilir (DNS only başla, sonra Proxy on'a geç).
- HTTPS yönlendirmesini Spring değil reverse proxy'de zorla; `server.forward-headers-strategy=native` ekle ki `X-Forwarded-*` header'ları doğru işlensin.

**Veritabanı / Migration Adımları**

1. Managed Postgres oluştur, `sport_manager` veritabanı + uygulama kullanıcısı.
2. (Flyway eklendikten sonra) `mvn flyway:migrate` ile baseline + migrationları uygula.
3. İlk `OWNER` kullanıcısını seed migration ile ekle (bcrypt hash ile, şifreyi 1Password/Bitwarden'da sakla, ilk girişte değiştir).
4. Yedek: Managed Postgres günlük yedek + 7 günlük PITR aç.

**Monitoring / Logging**

- Spring Boot Actuator ekle (`spring-boot-starter-actuator`):
  - `/actuator/health` (liveness/readiness), `/actuator/info`, `/actuator/metrics`.
  - Sadece `health` public; gerisi internal auth arkasında.
- Logging: `logback-spring.xml` ile JSON formatına geç (Logstash encoder), `stdout`'a yaz — Docker/hosting log toplayıcı yakalar.
- APM: **Sentry** (Java SDK) veya **OpenTelemetry → Grafana Cloud / Datadog**. JWT içerikleri ve şifreler scrubbed olsun.
- Uptime: BetterStack / UptimeRobot ile `/actuator/health` 5 dakikada bir ping.
- Rate limiting: Spring'te `bucket4j-spring-boot-starter` veya nginx `limit_req_zone` ile `/auth/*` endpoint'leri için (brute force koruması).

**Backend için test gereksinimleri**

- `mvn test` yeşil olmalı. Şu anki test bağımlılıkları: `spring-boot-starter-data-jpa-test`, `security-test`, `webmvc-test` — Testcontainers ile gerçek Postgres'e karşı entegrasyon testi yaz (en az login + register + refresh flow).
- Güvenlik testi: `mvn org.owasp:dependency-check-maven:check` ile bağımlılık zafiyetleri tara; kritik bulgular kapanmadan release etme.
- JWT yenileme + logout + invite-code üretim/tüketim akışları için manuel smoke test (Postman koleksiyonu hazırla, `publish/postman.json`).

### 2.2 Web (Vite + React)

**Durum uyarısı:** `sport_manager_web/` şu an bir **Claude Design handoff bundle** — `project/` altında HTML prototipler, `chats/` altında tasarım transcript'leri var. `package.json`'da yalnız `react` + `react-dom` mevcut, **uygulama state'i / router / API katmanı yok**. Bu klasör yayına almadan önce gerçek React uygulamasına dönüştürülmeli, ya da web yayını sonraya bırakılmalı.

**Yayın için ön koşullar**

- Tasarımlardan üretim React kodu (router: React Router, state: zustand / Redux Toolkit, API: axios/fetch + react-query).
- Auth: backend JWT akışına entegrasyon (access + refresh, refresh-on-401 interceptor).
- ENV yönetimi: `VITE_API_BASE_URL`, `VITE_ENV`, `VITE_SENTRY_DSN`. `.env.development`, `.env.production`. **Tüm `VITE_*` değişkenleri client'a sızar** — secret koyma.
- `.gitignore`'a `.env.local`, `.env.*.local` mutlaka.
- `console.log`'ları temizle (vite build'de drop için `esbuild.drop: ['console','debugger']` ayarı).
- Erişilebilirlik (a11y): semantic HTML, alt text, klavye navigasyonu.
- SEO: `index.html` meta, `og:*`, `robots.txt`, `sitemap.xml`.
- `vite.config.js` içindeki `base: '/sport_manager_web/'` ayarı **GitHub Pages alt yol** içindir — kendi domain'inde root'tan serve edeceksen `base: '/'` yap, aksi halde assets 404 verir.

**Build**

```bash
npm ci
npm run build         # dist/ üretir
npm run preview       # yerel olarak prod build'i test et
```

**Test**

- Şu an test yok. En azından login + ana ekran için **Playwright** ile 3-5 smoke test yaz. CI'da `npm run build && npx playwright test` zorunlu olsun.
- Lighthouse score: Performance ≥ 80, Accessibility ≥ 90 hedefle.

**Hosting Seçenekleri**

1. **Cloudflare Pages / Netlify / Vercel** — Vite için ideal. Otomatik HTTPS, CDN, preview deploy, GitHub entegrasyonu. Backend'e CORS izin ver.
2. **GitHub Pages** — `vite.config.js` zaten `base: '/sport_manager_web/'` ile uyumlu. `.github/workflows/` altında deploy workflow'u var (mevcut). Ücretsiz ama custom domain için DNS ayarı gerekir.
3. **Backend ile aynı sunucuda nginx static** — Ek altyapı yok ama CDN avantajı kaybolur.

**Domain / SSL / CDN**

- `app.sport-manager.kg` veya `sport-manager.kg` ana domain'i. SSL hosting tarafında otomatik (Cloudflare/Netlify/Vercel).
- CDN dahili — ekstra adım yok. Cache-Control header'larını `vite build` zaten hash'li dosya isimleriyle çözüyor (`assets/index-[hash].js` → `Cache-Control: public, max-age=31536000, immutable`).

**Monitoring / Analytics**

- Hata: **Sentry** (`@sentry/react`).
- Analitik: **Plausible** veya **Umami** (privacy-friendly), ya da GA4. KVKK/GDPR uyumlu cookie banner.
- Performans: Vercel Analytics / Cloudflare Web Analytics.

### 2.3 Mobile (Flutter + Melos)

**Kod temizliği ve güvenlik**

- `app/dev.env` ve `app/prod.env` **şu anda aynı içerik** (`BASE_URL=http://157.230.124.178:8080`). Prod'a almadan:
  - `prod.env` içindeki `BASE_URL`'i **HTTPS**'li yeni API domain'ine güncelle (`https://api.sport-manager.kg`).
  - `IS_DEV=false`, `IS_MOCK=false` ayarlı kalsın.
  - `.env` dosyalarının `.gitignore`'da olduğunu doğrula (şu an commit edilmiş — repo'dan kaldır, secret rotate et).
- `talker_flutter` + `talker_dio_logger` prod'da KAPALI olmalı. `Env.isDev` false ise logger'ı initialize etme; aksi halde JWT'ler ve API çağrıları kullanıcı cihazında loglanır.
- `pubspec.yaml` içinde `firebase_crashlytics` ve `firebase_analytics` **yorum satırına alınmış** — prod öncesi aç, initialize et ve `app/lib/main.dart` içinde `FlutterError.onError = FirebaseCrashlytics.instance.recordFlutterFatalError` bağla.
- `flutter_secure_storage` zaten ekli — access token / refresh token bunda saklansın, `shared_preferences` değil.
- ProGuard / R8 (Android) ve obfuscation flag'leri (`--obfuscate --split-debug-info=build/symbols`) ile release derle.
- HTTPS zorlaması: iOS `Info.plist` içinde `NSAppTransportSecurity` istisnası KALDIR; Android `network_security_config.xml` ile `cleartextTrafficPermitted="false"`.
- App ikonları + splash güncel mi? `flutter_launcher_icons.yaml` ve `flutter_native_splash.yaml` üzerinden `melos run gen-splash` ile yeniden üret.

**Build**

```bash
# Bootstrap (tüm paketlerin pub get'i)
melos bootstrap

# Kod üretimi (.g.dart)
make build-runner

# Lint + analyz (CI parity)
melos run format-check
melos run analyze-check
melos run unit-test

# Android release APK
cd app && flutter build apk --release \
  --dart-define-from-file=prod.env \
  --obfuscate --split-debug-info=build/symbols/android

# Android App Bundle (Play Store için)
cd app && flutter build appbundle --release \
  --dart-define-from-file=prod.env \
  --obfuscate --split-debug-info=build/symbols/android

# iOS release (kod imzalı IPA)
cd app && flutter build ipa --release \
  --dart-define-from-file=prod.env \
  --obfuscate --split-debug-info=build/symbols/ios
```

Not: `Makefile` ve `pubspec.yaml`'daki mevcut `build-ios` script'i `--no-codesign` ile çalışıyor — bu sadece CI sanity check için; gerçek mağaza yüklemesinde Xcode üzerinden imzala veya Fastlane match kullan.

**Test**

- `melos run unit-test` her paket için yeşil olsun.
- Smoke test: gerçek prod backend'e karşı login → register → invite-code → refresh akışı manuel olarak iki cihazda (Android + iOS).
- Offline davranış: `connectivity_plus` ekli — ağ kesilince hata snackbar/dialog'larının doğru göründüğünü doğrula.

**Hosting / Yayın Mağazaları**

- **Google Play Console** — AAB yükle. İlk yayında ek gerekenler: privacy policy URL, data safety formu (Firebase analytics + crashlytics topladığı için "Diagnostics" + "App activity" işaretle), içerik derecelendirmesi, hedef yaş grubu.
- **Apple App Store Connect** — IPA yükle (Transporter veya Xcode), TestFlight ile iç test grubu, ardından review'a gönder. App Privacy formu doldur, ATT (App Tracking Transparency) Firebase Analytics için gerekli olabilir.
- **İç dağıtım:** Firebase App Distribution veya TestFlight invite, kapalı beta turu için.

**Domain / SSL / CDN**

- Mobile uygulama doğrudan domain barındırmaz; **backend API mutlaka HTTPS olmalı** (mobile zorunluluğu — `cleartextTrafficPermitted=false`).
- iOS Universal Links + Android App Links yapılacaksa, `apple-app-site-association` ve `assetlinks.json` dosyalarını web sunucusunda host et (`https://app.sport-manager.kg/.well-known/`).
- Firebase Remote Config zaten entegre — feature flag'leri ve "minimum app version" kontrolü için kullan.

**Monitoring / Analytics**

- **Firebase Crashlytics** — crash + non-fatal exception toplama (`pubspec.yaml` satırını aç).
- **Firebase Analytics** — temel event'ler (login, register, invite_used, venue_created).
- **Firebase Remote Config** — `min_supported_version`, `maintenance_mode`, feature flag'leri.
- **Sentry Flutter** (opsiyonel, Crashlytics yerine veya yanında) — daha zengin breadcrumb + Dio integration.

## 3. Yayın Sırası (Release Order)

1. **Backend'i prod'a al** (HTTPS + managed DB + Flyway baseline ile). Domain'de canlı, smoke test geçti.
2. **Mobile prod build'i** yeni HTTPS BASE_URL ile derle, **iç beta** (TestFlight / Firebase App Distribution) — minimum 48 saat.
3. **Web** (gerçek React kodu hazırsa) prod'a deploy, backend CORS allowlist'ine domain ekle.
4. **Mağaza yayınları** — Google Play kademeli yayın %10 → %50 → %100, Apple review (genellikle 24-72 saat).

## 4. Yayın Sonrası Kontrol Listesi

**İlk 24 saat**

- [ ] Backend `/actuator/health` 200 dönüyor, uptime monitör yeşil.
- [ ] PostgreSQL bağlantı havuzu (Hikari) doluya yakın değil — Hikari metric'lerini kontrol et.
- [ ] JWT refresh akışı gerçek kullanıcılarda çalışıyor (Sentry/log'ta `INVALID_TOKEN` artışı yok).
- [ ] Web Lighthouse skoru tekrar ölçüldü, prod'da degrade yok.
- [ ] Mobile Crashlytics dashboard'unda crash-free user oranı ≥ %99.
- [ ] Üç dilde (en/ru/ky) hata mesajları doğru görünüyor — `Accept-Language` header'ı backend tarafından okunuyor, mobile `context.l10n` doğru fallback yapıyor.

**İlk hafta**

- [ ] Managed Postgres ilk yedek alındı, restore tatbikatı yapıldı (staging'e).
- [ ] Sentry/Crashlytics'te kritik issue queue'su sıfır.
- [ ] Rate limiting gerçek trafiği kesmiyor — false-positive bloklar var mı?
- [ ] `InviteCode` cleanup cron'u çalışıyor, expired kayıtlar siliniyor.
- [ ] Privacy policy URL'i hem mağazalarda hem web'de yayında.
- [ ] Mağaza geri bildirimleri (Play + App Store) takip ediliyor, yanıt akışı kuruldu.

**İlk ay**

- [ ] Versiyon yükseltme akışı test edildi: Remote Config `min_supported_version` artırıldığında mobile zorunlu güncelleme dialog'u açılıyor mu?
- [ ] Backend bağımlılık zafiyet taraması (`dependency-check`) cron'a alındı, kritik CVE alarmı kuruldu.
- [ ] DB yedek restore tatbikatı, RTO/RPO ölçüldü.

## 5. Rollback Planı

- **Backend:** önceki Docker imajı `:v{N-1}` tag'i ile registry'de duruyor olmalı. `docker-compose pull && up -d` ile geri dön. Flyway migration "down" yazılmadıysa, kritik yapı değişikliklerini iki release'e yay (V1: kolon ekle, V2: kullan, V3: eski kolonu sil — böylece rollback safe).
- **Web:** Cloudflare Pages / Netlify / Vercel'in "Rollback to previous deploy" düğmesi — saniyeler.
- **Mobile:** Play Console'da "Halt staged rollout"; App Store'da "Remove from sale" geçici çözüm. Kritik bug için Firebase Remote Config'ten `maintenance_mode=true` ile uygulamayı bilgilendirme moduna al (önceden bu flag'in handle edildiğini kodda doğrula).

## 6. Açık Sorular / Karar Bekleyenler

- Domain adı kesinleşti mi? (`sport-manager.kg` vs `.app` vs `.io`)
- Web bileşeni şu yayında dahil mi, yoksa sonraki sürüme mi bırakılıyor? (Şu hâliyle prod hazır değil.)
- E-posta gönderim sağlayıcısı (`/auth/forgot-password` için): Postmark / Resend / SES — seçim yok, kod akışı eksik (README'de e-posta gönderildiği iddia ediliyor ama implementasyonu doğrulanmalı).
- KVKK / Kırgızistan kişisel veri mevzuatına uyum belgesi hazırlandı mı?
- Mağaza geliştirici hesapları aktif mi? (Google Play $25 tek seferlik, Apple Developer Program $99/yıl)
