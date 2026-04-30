import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

// ── Иллюстрации из загруженных картинок ──
const IMG_CAR      = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/bd977c12-5a17-45e5-be9a-f3621093b9a8.jpg";
const IMG_COUPLE   = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/6cb1cb89-5198-4189-820e-d15a7f18eeef.jpg";
const IMG_GLASSES  = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/2b38fad7-7796-42aa-8ea9-8a7fda8a91cf.jpg";
const IMG_RING     = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/5d887b39-b022-4b60-a025-639c7c7b3645.jpg";
const IMG_PARTY    = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/b5e184c4-0baa-4d86-936f-a432f8a017f0.png";

// Дата свадьбы
const WEDDING_DATE = new Date("2026-06-26T15:30:00");

const SCHEDULE = [
  { time: "15:30", title: "Сбор гостей" },
  { time: "16:00", title: "Церемония регистрации" },
  { time: "17:00", title: "Банкет" },
  { time: "23:00", title: "Завершение вечера" },
];

// ── Компонент: иллюстрация с убранным фоном ──
function SketchImg({ src, style }: { src: string; style?: React.CSSProperties }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      style={{
        mixBlendMode: "multiply",
        filter: "contrast(1.5) brightness(0.75) saturate(0)",
        ...style,
      }}
    />
  );
}

// ── Countdown ──
function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ── Секция-обёртка ──
function Page({ children, bg }: { children: React.ReactNode; bg?: string }) {
  return (
    <div
      style={{
        minHeight: "100dvh",
        background: bg || "#fff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "4.5rem",
      }}
    >
      {children}
    </div>
  );
}

const SECTIONS = ["Главная", "Детали", "Место", "Программа", "Пожелания", "Анкета", "До встречи"];

export default function Index() {
  const [activeSection, setActiveSection] = useState(0);
  const [rsvpStep, setRsvpStep] = useState<"form" | "done">("form");
  const [formData, setFormData] = useState({ name: "", phone: "", dietary: "" });
  const [wishPage, setWishPage] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const countdown = useCountdown(WEDDING_DATE);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = sectionRefs.current.indexOf(e.target as HTMLElement);
          if (idx !== -1) setActiveSection(idx);
        }
      }),
      { threshold: 0.45 }
    );
    sectionRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) =>
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div style={{ background: "#fff" }}>

      {/* ── Side nav ── */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2.5">
        {SECTIONS.map((label, i) => (
          <button key={i} onClick={() => scrollTo(i)}
            className={`nav-dot ${activeSection === i ? "active" : ""}`} title={label} />
        ))}
      </nav>

      {/* ── Нижняя кнопка «Подтвердить присутствие» ── */}
      <button className="bottom-bar" onClick={() => scrollTo(5)}>
        Подтвердить присутствие
      </button>

      {/* ════════════ 1. ГЛАВНАЯ ════════════ */}
      <section ref={(el) => { sectionRefs.current[0] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ textAlign: "center", position: "relative", zIndex: 1, padding: "0 2rem" }}>
          <h1 className="font-hand animate-fade-up delay-1"
            style={{ fontSize: "clamp(3.5rem, 14vw, 6rem)", fontWeight: 700, color: "var(--blue)", lineHeight: 1.1, marginBottom: "0.5rem" }}>
            Вадим
          </h1>
          <p className="font-hand animate-fade-up delay-2"
            style={{ fontSize: "clamp(2rem, 8vw, 3rem)", color: "var(--blue)", opacity: 0.6, marginBottom: "0.25rem" }}>+</p>
          <h1 className="font-hand animate-fade-up delay-3"
            style={{ fontSize: "clamp(3.5rem, 14vw, 6rem)", fontWeight: 700, color: "var(--blue)", lineHeight: 1.1, marginBottom: "2rem" }}>
            Евгения
          </h1>

          <p className="font-hand animate-fade-in delay-4"
            style={{ fontSize: "1.35rem", color: "var(--blue)", opacity: 0.75, marginBottom: "2rem" }}>
            26 июня, 2026 | 15:30
          </p>

          <div className="animate-fade-in delay-5">
            <button className="btn-blue" onClick={() => scrollTo(1)}>Открыть приглашение</button>
          </div>
        </div>

        <button onClick={() => scrollTo(1)} style={{ position: "absolute", bottom: "5.5rem", left: "50%", transform: "translateX(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--blue)", opacity: 0.4, zIndex: 2 }} className="animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </button>
      </section>

      {/* ════════════ 2. ОБРАЩЕНИЕ ════════════ */}
      <section ref={(el) => { sectionRefs.current[1] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ padding: "3rem 2rem 2rem", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 className="font-hand" style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)", fontWeight: 700, color: "var(--blue)", lineHeight: 1.2, marginBottom: "2rem" }}>
            Дорогие наши<br />друзья и родные!
          </h2>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.15rem", color: "var(--blue)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
            Мы решили сказать друг другу «да» и хотим разделить этот момент только с самыми родными.
          </p>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.15rem", color: "var(--blue)", lineHeight: 1.6 }}>
            Будем счастливы видеть вас на нашей свадьбе!
          </p>
        </div>
      </section>

      {/* ════════════ 3. МЕСТО ════════════ */}
      <section ref={(el) => { sectionRefs.current[2] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ padding: "2.5rem 2rem", position: "relative", zIndex: 1, flex: 1, textAlign: "center" }}>
          <h2 className="font-hand" style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", fontWeight: 600, color: "var(--blue)", marginBottom: "1.5rem" }}>
            Место проведения
          </h2>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.2rem", color: "var(--blue)", lineHeight: 1.7, marginBottom: "2rem" }}>
            г. Красногорск,<br />ул. Железнодорожная, д. 38А.
          </p>
          <button className="btn-blue" style={{ fontSize: "1.1rem", padding: "0.65rem 1.8rem" }}>
            Как добраться
          </button>
        </div>
      </section>

      {/* ════════════ 4. ПРОГРАММА + ТАЙМЕР ════════════ */}
      <section ref={(el) => { sectionRefs.current[3] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ padding: "3rem 2rem 2rem", position: "relative", zIndex: 1, textAlign: "center" }}>
          <h2 className="font-hand" style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", fontWeight: 600, color: "var(--blue)", marginBottom: "2rem" }}>
            Программа дня
          </h2>

          <div style={{ position: "relative", marginBottom: "3rem" }}>
            {/* Вертикальная линия */}
            <div style={{ position: "absolute", left: "calc(50% - 0.5px)", top: 0, bottom: 0, width: "1px", background: "rgba(37,99,235,0.25)" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {SCHEDULE.map(({ time, title }, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: "1rem" }}>
                  <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.05rem", color: "var(--blue)", opacity: 0.7, textAlign: "right" }}>{title}</p>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", border: "1.5px solid var(--blue)", background: "#fff", flexShrink: 0 }} />
                  <p className="font-hand" style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--blue)" }}>{time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Таймер */}
          <div style={{ marginTop: "1rem" }}>
            <p className="font-hand" style={{ fontSize: "1.6rem", fontWeight: 600, color: "var(--blue)", marginBottom: "1rem", textAlign: "center" }}>
              До свадьбы осталось
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", textAlign: "center" }}>
              {[
                { val: countdown.days,    label: "Дней" },
                { val: countdown.hours,   label: "Часа" },
                { val: countdown.minutes, label: "Минут" },
                { val: countdown.seconds, label: "Секунд" },
              ].map(({ val, label }) => (
                <div key={label}>
                  <p className="font-hand" style={{ fontSize: "2.5rem", fontWeight: 700, color: "var(--blue)", lineHeight: 1 }}>{pad(val)}</p>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", color: "var(--blue)", opacity: 0.55, letterSpacing: "0.05em", marginTop: "0.2rem" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════ 5. ПОЖЕЛАНИЯ ════════════ */}
      <section ref={(el) => { sectionRefs.current[4] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ padding: "3rem 2rem", position: "relative", zIndex: 1, flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <h2 className="font-hand" style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", fontWeight: 600, color: "var(--blue)", marginBottom: "2.5rem", textAlign: "center" }}>
              Пожелания
            </h2>

            {wishPage === 0 ? (
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem", color: "var(--blue)", lineHeight: 1.7, textAlign: "center" }}>
                Будем очень признательны, если вы воздержитесь от криков «Горько». Ведь поцелуй — это знак выражения чувств, и он не может быть по заказу.
              </p>
            ) : (
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem", color: "var(--blue)", lineHeight: 1.7, textAlign: "center" }}>
                Пожалуйста, не дарите нам цветы! Мы не успеем насладиться их красотой и ароматом. Если хотите подарить нам ценный и нужный подарок, мы будем очень благодарны за вклад в бюджет нашей молодой семьи.
              </p>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.5rem", marginTop: "2rem" }}>
            <button onClick={() => setWishPage(0)} style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem", color: "var(--blue)", background: "none", border: "none", cursor: "pointer", opacity: wishPage === 0 ? 1 : 0.4 }}>←</button>
            <span style={{ fontFamily: "Caveat, cursive", fontSize: "1rem", color: "var(--blue)", opacity: 0.6 }}>{wishPage + 1} / 2</span>
            <button onClick={() => setWishPage(1)} style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem", color: "var(--blue)", background: "none", border: "none", cursor: "pointer", opacity: wishPage === 1 ? 1 : 0.4 }}>→</button>
          </div>
        </div>
      </section>

      {/* ════════════ 6. АНКЕТА ГОСТЯ ════════════ */}
      <section ref={(el) => { sectionRefs.current[5] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ padding: "3rem 2rem", position: "relative", zIndex: 1, flex: 1, textAlign: "center" }}>
          <h2 className="font-hand" style={{ fontSize: "clamp(1.8rem, 7vw, 2.5rem)", fontWeight: 600, color: "var(--blue)", marginBottom: "0.5rem" }}>
            Анкета гостя
          </h2>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.05rem", color: "var(--blue)", opacity: 0.7, marginBottom: "2rem", lineHeight: 1.5 }}>
            Пожалуйста, подтвердите своё присутствие на мероприятии до:
          </p>
          <p className="font-hand" style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--blue)", marginBottom: "2.5rem" }}>
            01.06.2026 ✓
          </p>

          {rsvpStep === "done" ? (
            <div style={{ paddingTop: "2rem" }}>
              <p className="font-hand" style={{ fontSize: "2rem", fontWeight: 600, color: "var(--blue)" }}>Спасибо!</p>
              <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.1rem", color: "var(--blue)", opacity: 0.7, marginTop: "0.5rem" }}>Мы вас ждём!</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setRsvpStep("done"); }} style={{ display: "flex", flexDirection: "column", gap: "1.8rem", textAlign: "left" }}>
              <div>
                <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue)", opacity: 0.5, marginBottom: "0.4rem" }}>
                  Ваше имя
                </label>
                <input className="sketch-input" placeholder="Имя и фамилия" value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue)", opacity: 0.5, marginBottom: "0.4rem" }}>
                  Телефон
                </label>
                <input className="sketch-input" placeholder="+7 (___) ___-__-__" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <label style={{ display: "block", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--blue)", opacity: 0.5, marginBottom: "0.75rem" }}>
                  Предпочтения по алкоголю
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {["Вино", "Шампанское", "Водка", "Пиво", "Не употребляю"].map((opt) => (
                    <label key={opt} style={{ display: "flex", alignItems: "center", gap: "0.75rem", fontFamily: "Caveat, cursive", fontSize: "1.15rem", color: "var(--blue)", cursor: "pointer" }}>
                      <input
                        type="checkbox"
                        style={{ width: "18px", height: "18px", accentColor: "var(--blue)", cursor: "pointer" }}
                        checked={formData.dietary.includes(opt)}
                        onChange={(e) => {
                          const current = formData.dietary ? formData.dietary.split(",").map(s => s.trim()).filter(Boolean) : [];
                          const updated = e.target.checked ? [...current, opt] : current.filter(s => s !== opt);
                          setFormData({ ...formData, dietary: updated.join(", ") });
                        }}
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ paddingTop: "0.5rem" }}>
                <button type="submit" className="btn-blue" style={{ width: "100%" }}>
                  Подтвердить
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ════════════ 7. ДО ВСТРЕЧИ ════════════ */}
      <section ref={(el) => { sectionRefs.current[6] = el; }} style={{ minHeight: "100dvh", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", overflow: "hidden", paddingBottom: "5rem", background: "#fff" }}>

        <div style={{ padding: "3rem 2rem", position: "relative", zIndex: 1, textAlign: "center", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <p style={{ fontFamily: "Caveat, cursive", fontSize: "1.2rem", color: "var(--blue)", opacity: 0.7, marginBottom: "1rem" }}>
            До скорой встречи!<br />С любовью,
          </p>
          <h2 className="font-hand" style={{ fontSize: "clamp(3rem, 12vw, 5rem)", fontWeight: 700, color: "var(--blue)", lineHeight: 1.1 }}>
            Вадим<br />+<br />Евгения
          </h2>
        </div>

      </section>

    </div>
  );
}