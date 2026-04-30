import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const COUPLE_IMG  = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/6cb1cb89-5198-4189-820e-d15a7f18eeef.jpg";
const PARTY_IMG   = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/b5e184c4-0baa-4d86-936f-a432f8a017f0.png";
const RING_IMG    = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/5d887b39-b022-4b60-a025-639c7c7b3645.jpg";
const GLASSES_IMG = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/2b38fad7-7796-42aa-8ea9-8a7fda8a91cf.jpg";
const CAR_IMG     = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/bucket/bd977c12-5a17-45e5-be9a-f3621093b9a8.jpg";
const FLOWERS_IMG = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/files/a943f521-b3c3-4c22-97a1-c51206aca462.jpg";

const PLAYLIST = [
  { title: "Perfect", artist: "Ed Sheeran" },
  { title: "A Thousand Years", artist: "Christina Perri" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "At Last", artist: "Etta James" },
  { title: "Make You Feel My Love", artist: "Adele" },
];

const SCHEDULE = [
  { time: "14:00", title: "Сбор гостей", desc: "Встреча и лёгкий фуршет" },
  { time: "15:00", title: "Церемония", desc: "Выездная регистрация брака" },
  { time: "16:00", title: "Фотосессия", desc: "Прогулка и шампанское" },
  { time: "17:30", title: "Банкет", desc: "Торжественный ужин и первый танец" },
  { time: "20:00", title: "Торт", desc: "Разрезание свадебного торта" },
  { time: "21:00", title: "Танцы", desc: "Живая музыка до полуночи" },
];

const SECTIONS = ["Главная", "Детали", "RSVP", "Подарки", "Программа"];

export default function Index() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [rsvpStatus, setRsvpStatus] = useState<"yes" | "no" | null>(null);
  const [formData, setFormData] = useState({ name: "", guests: "1", dietary: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = sectionRefs.current.indexOf(e.target as HTMLElement);
            if (idx !== -1) setActiveSection(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((r) => r && observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (i: number) =>
    sectionRefs.current[i]?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>

      {/* ── Side Nav ── */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {SECTIONS.map((label, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`nav-dot ${activeSection === i ? "active" : ""}`}
            title={label}
          />
        ))}
      </nav>

      {/* ── Music Bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-center gap-5 px-6 py-3"
        style={{ background: "var(--cream)", borderTop: "1px solid rgba(26,23,16,0.12)" }}
      >
        <button
          onClick={() => setCurrentTrack((p) => (p - 1 + PLAYLIST.length) % PLAYLIST.length)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", opacity: 0.45 }}
        >
          <Icon name="SkipBack" size={13} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            width: "28px", height: "28px", borderRadius: "50%",
            background: isPlaying ? "var(--ink)" : "transparent",
            border: "1px solid var(--ink)",
            color: isPlaying ? "var(--cream)" : "var(--ink)",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={11} />
        </button>
        <button
          onClick={() => setCurrentTrack((p) => (p + 1) % PLAYLIST.length)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", opacity: 0.45 }}
        >
          <Icon name="SkipForward" size={13} />
        </button>
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "0.95rem", color: "var(--ink)", opacity: 0.55 }}>
          {PLAYLIST[currentTrack].title}
          <span style={{ opacity: 0.5 }}> — {PLAYLIST[currentTrack].artist}</span>
        </span>
      </div>

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="min-h-screen flex flex-col items-center justify-center relative"
        style={{ paddingBottom: "4rem", overflow: "hidden" }}
      >
        {/* bg: тусовка слева снизу */}
        <img src={PARTY_IMG} alt="" aria-hidden style={{
          position: "absolute", left: "-4%", bottom: "6%",
          width: "clamp(220px, 30vw, 420px)",
          mixBlendMode: "multiply", opacity: 0.18, pointerEvents: "none", userSelect: "none",
        }} />
        {/* bg: машина справа снизу */}
        <img src={CAR_IMG} alt="" aria-hidden style={{
          position: "absolute", right: "-3%", bottom: "4%",
          width: "clamp(180px, 24vw, 340px)",
          mixBlendMode: "multiply", opacity: 0.16, pointerEvents: "none", userSelect: "none",
        }} />
        <div className="animate-float" style={{ marginBottom: "2rem", width: "220px" }}>
          <img
            src={COUPLE_IMG}
            alt="Жених и невеста"
            style={{ width: "100%", mixBlendMode: "multiply", opacity: 0.92 }}
          />
        </div>

        <div className="text-center px-8">
          <p
            className="animate-fade-in delay-0"
            style={{
              fontFamily: "Montserrat, sans-serif", fontWeight: 300,
              fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase",
              color: "var(--ink)", marginBottom: "1.5rem",
            }}
          >
            с радостью приглашают вас
          </p>

          <h1
            className="animate-fade-up delay-1 font-display"
            style={{
              fontSize: "clamp(3.8rem, 11vw, 8rem)", fontWeight: 300,
              lineHeight: 0.95, letterSpacing: "-0.03em",
              color: "var(--ink)", marginBottom: "1.5rem",
            }}
          >
            Александр
            <br />
            <span style={{ fontStyle: "italic", opacity: 0.4, fontSize: "0.5em", letterSpacing: "0.05em" }}>и</span>
            <br />
            Мария
          </h1>

          <div className="animate-fade-in delay-3" style={{ marginBottom: "0.75rem" }}>
            <span style={{
              fontFamily: "Cormorant Garamond, serif",
              fontStyle: "italic", fontSize: "1.3rem",
              color: "var(--ink)", opacity: 0.55,
            }}>
              14 сентября 2024
            </span>
          </div>

          <p
            className="animate-fade-in delay-4"
            style={{
              fontFamily: "Montserrat, sans-serif", fontWeight: 300,
              fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase",
              color: "var(--ink)", opacity: 0.45, marginBottom: "2.5rem",
            }}
          >
            Москва · Особняк «Белый зал»
          </p>

          <div className="animate-fade-in delay-5">
            <button onClick={() => scrollTo(1)} className="btn-sketch">
              Открыть приглашение
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo(1)}
          className="absolute animate-bounce"
          style={{
            bottom: "5rem", left: "50%", transform: "translateX(-50%)",
            background: "none", border: "none", cursor: "pointer",
            color: "var(--ink)", opacity: 0.25,
          }}
        >
          <Icon name="ChevronDown" size={18} />
        </button>
      </section>

      {/* ══════════════ ДЕТАЛИ ══════════════ */}
      <section
        ref={(el) => { sectionRefs.current[1] = el; }}
        style={{ padding: "8rem 1.5rem", borderTop: "1px solid rgba(26,23,16,0.1)", position: "relative", overflow: "hidden" }}
      >
        {/* bg: кольцо справа по центру */}
        <img src={RING_IMG} alt="" aria-hidden style={{
          position: "absolute", right: "-2%", top: "50%", transform: "translateY(-50%)",
          width: "clamp(200px, 28vw, 400px)",
          mixBlendMode: "multiply", opacity: 0.13, pointerEvents: "none", userSelect: "none",
        }} />
        <div style={{ maxWidth: "640px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "Montserrat, sans-serif", fontWeight: 300,
            fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
            opacity: 0.4, marginBottom: "1rem", textAlign: "center",
          }}>
            детали торжества
          </p>
          <h2 className="font-display" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300,
            textAlign: "center", marginBottom: "5rem", letterSpacing: "-0.02em",
          }}>
            Когда и где
          </h2>

          {[
            { icon: "Calendar", label: "дата", value: "14 сентября 2024", sub: "суббота" },
            { icon: "Clock", label: "время", value: "14:00", sub: "сбор гостей с 13:30" },
            { icon: "MapPin", label: "место", value: "Особняк «Белый зал»", sub: "ул. Пречистенка, 12 · Москва" },
          ].map(({ icon, label, value, sub }, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: "2rem",
                padding: "2rem 0",
                borderBottom: i < 2 ? "1px solid rgba(26,23,16,0.1)" : "none",
              }}
            >
              <div style={{ paddingTop: "0.2rem", opacity: 0.35, flexShrink: 0 }}>
                <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={16} />
              </div>
              <div>
                <p style={{
                  fontFamily: "Montserrat, sans-serif", fontWeight: 300,
                  fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase",
                  opacity: 0.4, marginBottom: "0.4rem",
                }}>
                  {label}
                </p>
                <p className="font-display" style={{ fontSize: "1.6rem", fontWeight: 300, lineHeight: 1.2, marginBottom: "0.2rem" }}>
                  {value}
                </p>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", opacity: 0.5 }}>
                  {sub}
                </p>
              </div>
            </div>
          ))}

          <div style={{ textAlign: "center", marginTop: "4rem", opacity: 0.55 }}>
            <img src={DECO_IMG} alt="" style={{ width: "160px", display: "inline-block", mixBlendMode: "multiply" }} />
          </div>
        </div>
      </section>

      {/* ══════════════ RSVP ══════════════ */}
      <section
        ref={(el) => { sectionRefs.current[2] = el; }}
        style={{ padding: "8rem 1.5rem", borderTop: "1px solid rgba(26,23,16,0.1)", background: "var(--cream-dark)", position: "relative", overflow: "hidden" }}
      >
        {/* bg: бокалы слева сверху */}
        <img src={GLASSES_IMG} alt="" aria-hidden style={{
          position: "absolute", left: "-3%", top: "5%",
          width: "clamp(160px, 22vw, 300px)",
          mixBlendMode: "multiply", opacity: 0.14, pointerEvents: "none", userSelect: "none",
        }} />
        {/* bg: машина справа снизу */}
        <img src={CAR_IMG} alt="" aria-hidden style={{
          position: "absolute", right: "-2%", bottom: "5%",
          width: "clamp(160px, 20vw, 280px)",
          mixBlendMode: "multiply", opacity: 0.11, pointerEvents: "none", userSelect: "none",
        }} />
        <div style={{ maxWidth: "480px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "Montserrat, sans-serif", fontWeight: 300,
            fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
            opacity: 0.4, marginBottom: "1rem", textAlign: "center",
          }}>
            подтверждение
          </p>
          <h2 className="font-display" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300,
            textAlign: "center", marginBottom: "1rem", letterSpacing: "-0.02em",
          }}>
            Вы будете?
          </h2>
          <p style={{
            fontFamily: "Cormorant Garamond, serif", fontStyle: "italic",
            fontSize: "1rem", textAlign: "center", opacity: 0.5, marginBottom: "3.5rem",
          }}>
            Просим ответить до 1 сентября 2024
          </p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "3rem 0" }}>
              <img
                src={COUPLE_IMG} alt=""
                style={{ width: "120px", display: "inline-block", mixBlendMode: "multiply", opacity: 0.7, marginBottom: "1.5rem" }}
              />
              <h3 className="font-display" style={{ fontSize: "2.2rem", fontWeight: 300, marginBottom: "0.75rem" }}>
                Спасибо!
              </h3>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.1rem", opacity: 0.6 }}>
                {rsvpStatus === "yes"
                  ? "Мы так рады, что вы будете с нами."
                  : "Жаль, что не получится. Мы вас любим."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: "flex", gap: "0", marginBottom: "3rem", justifyContent: "center" }}>
                {(["yes", "no"] as const).map((v, vi) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRsvpStatus(v)}
                    style={{
                      padding: "0.75rem 2rem",
                      border: "1px solid var(--ink)",
                      borderRight: vi === 0 ? "none" : "1px solid var(--ink)",
                      background: rsvpStatus === v ? "var(--ink)" : "transparent",
                      color: rsvpStatus === v ? "var(--cream)" : "var(--ink)",
                      fontFamily: "Montserrat, sans-serif", fontWeight: 300,
                      fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      cursor: "pointer", transition: "all 0.2s",
                    }}
                  >
                    {v === "yes" ? "Да, буду" : "Не смогу"}
                  </button>
                ))}
              </div>

              {rsvpStatus === "yes" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                  {[
                    { key: "name", label: "Ваше имя", placeholder: "Имя и фамилия" },
                    { key: "dietary", label: "Пожелания по меню", placeholder: "Вегетарианское, аллергии…" },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label style={{
                        display: "block", fontFamily: "Montserrat, sans-serif", fontWeight: 300,
                        fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                        opacity: 0.45, marginBottom: "0.5rem",
                      }}>
                        {label}
                      </label>
                      <input
                        className="sketch-input"
                        placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                        required={key === "name"}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{
                      display: "block", fontFamily: "Montserrat, sans-serif", fontWeight: 300,
                      fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      opacity: 0.45, marginBottom: "0.5rem",
                    }}>
                      Количество гостей
                    </label>
                    <select
                      className="sketch-input"
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      style={{ background: "transparent", cursor: "pointer" }}
                    >
                      <option value="1">1 гость</option>
                      <option value="2">2 гостя</option>
                      <option value="3">3 гостя</option>
                    </select>
                  </div>
                  <div>
                    <label style={{
                      display: "block", fontFamily: "Montserrat, sans-serif", fontWeight: 300,
                      fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase",
                      opacity: 0.45, marginBottom: "0.5rem",
                    }}>
                      Пожелание молодым
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ваши добрые слова…"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        background: "transparent", border: "none",
                        borderBottom: "1px solid rgba(26,23,16,0.35)",
                        borderRadius: 0, padding: "0.6rem 0",
                        color: "var(--ink)", fontFamily: "Cormorant Garamond, serif",
                        fontSize: "1.1rem", fontStyle: "italic",
                        width: "100%", outline: "none", resize: "none",
                      }}
                    />
                  </div>
                  <div style={{ textAlign: "center", paddingTop: "1rem" }}>
                    <button type="submit" className="btn-sketch-filled">Подтвердить</button>
                  </div>
                </div>
              )}

              {rsvpStatus === "no" && (
                <div style={{ textAlign: "center" }}>
                  <p className="font-display" style={{ fontStyle: "italic", fontSize: "1.2rem", opacity: 0.6, marginBottom: "2rem" }}>
                    Жаль, что не получится…
                  </p>
                  <button type="submit" className="btn-sketch">Отправить</button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ══════════════ ПОДАРКИ ══════════════ */}
      <section
        ref={(el) => { sectionRefs.current[3] = el; }}
        style={{ padding: "8rem 1.5rem", borderTop: "1px solid rgba(26,23,16,0.1)", position: "relative", overflow: "hidden" }}
      >
        {/* bg: кольцо слева */}
        <img src={RING_IMG} alt="" aria-hidden style={{
          position: "absolute", left: "-2%", top: "50%", transform: "translateY(-50%)",
          width: "clamp(180px, 24vw, 340px)",
          mixBlendMode: "multiply", opacity: 0.12, pointerEvents: "none", userSelect: "none",
        }} />
        {/* bg: тусовка справа снизу */}
        <img src={PARTY_IMG} alt="" aria-hidden style={{
          position: "absolute", right: "-2%", bottom: "3%",
          width: "clamp(160px, 20vw, 300px)",
          mixBlendMode: "multiply", opacity: 0.1, pointerEvents: "none", userSelect: "none",
        }} />
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "Montserrat, sans-serif", fontWeight: 300,
            fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
            opacity: 0.4, marginBottom: "1rem",
          }}>
            с любовью
          </p>
          <h2 className="font-display" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300,
            letterSpacing: "-0.02em", marginBottom: "3rem",
          }}>
            Благодарность
          </h2>

          <div style={{ opacity: 0.6, width: "160px", margin: "0 auto 2.5rem" }}>
            <img src={FLOWERS_IMG} alt="" style={{ width: "100%", mixBlendMode: "multiply" }} />
          </div>

          <p className="font-display" style={{
            fontStyle: "italic", fontSize: "1.35rem", lineHeight: 1.75,
            opacity: 0.65, marginBottom: "2rem",
          }}>
            «Ваше присутствие рядом —<br />лучший подарок, который только можно представить»
          </p>

          <div style={{ height: "1px", background: "rgba(26,23,16,0.12)", margin: "2.5rem 0" }} />

          <p style={{
            fontFamily: "Montserrat, sans-serif", fontWeight: 300,
            fontSize: "0.85rem", lineHeight: 1.9, opacity: 0.65, marginBottom: "2.5rem",
          }}>
            Если вы хотите порадовать нас чем-то особенным —
            мы мечтаем о путешествии на Амальфитанское побережье.
          </p>

          <div style={{
            border: "1px solid rgba(26,23,16,0.2)",
            padding: "2rem 2.5rem", display: "inline-block",
          }}>
            <p style={{
              fontFamily: "Montserrat, sans-serif", fontWeight: 300,
              fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase",
              opacity: 0.4, marginBottom: "0.75rem",
            }}>
              реквизиты
            </p>
            <p className="font-display" style={{ fontSize: "1.4rem", fontWeight: 300, marginBottom: "0.3rem" }}>
              Мария Петрова
            </p>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 300, fontSize: "0.8rem", opacity: 0.55 }}>
              Сбербанк · +7 (999) 000-00-00
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════ ПРОГРАММА ══════════════ */}
      <section
        ref={(el) => { sectionRefs.current[4] = el; }}
        style={{ padding: "8rem 1.5rem 12rem", borderTop: "1px solid rgba(26,23,16,0.1)", background: "var(--cream-dark)", position: "relative", overflow: "hidden" }}
      >
        {/* bg: бокалы справа по центру */}
        <img src={GLASSES_IMG} alt="" aria-hidden style={{
          position: "absolute", right: "-3%", top: "50%", transform: "translateY(-50%)",
          width: "clamp(180px, 24vw, 340px)",
          mixBlendMode: "multiply", opacity: 0.13, pointerEvents: "none", userSelect: "none",
        }} />
        {/* bg: машина слева снизу */}
        <img src={CAR_IMG} alt="" aria-hidden style={{
          position: "absolute", left: "-2%", bottom: "8%",
          width: "clamp(180px, 22vw, 320px)",
          mixBlendMode: "multiply", opacity: 0.12, pointerEvents: "none", userSelect: "none",
        }} />
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={{
            fontFamily: "Montserrat, sans-serif", fontWeight: 300,
            fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase",
            opacity: 0.4, marginBottom: "1rem", textAlign: "center",
          }}>
            расписание дня
          </p>
          <h2 className="font-display" style={{
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 300,
            textAlign: "center", letterSpacing: "-0.02em", marginBottom: "5rem",
          }}>
            Программа
          </h2>

          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute", left: "3.5rem", top: 0, bottom: 0,
              width: "1px", background: "rgba(26,23,16,0.12)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {SCHEDULE.map(({ time, title, desc }, i) => (
                <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ width: "3.5rem", textAlign: "right", flexShrink: 0, paddingTop: "0.15rem" }}>
                    <span className="font-display" style={{ fontSize: "1rem", fontWeight: 300, opacity: 0.5 }}>
                      {time}
                    </span>
                  </div>
                  <div style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    border: "1px solid var(--ink)", background: "var(--cream-dark)",
                    flexShrink: 0, marginTop: "0.4rem", position: "relative", zIndex: 1,
                  }} />
                  <div>
                    <p className="font-display" style={{ fontSize: "1.2rem", fontWeight: 400, marginBottom: "0.2rem" }}>
                      {title}
                    </p>
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "0.95rem", opacity: 0.5 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: "6rem" }}>
            <div style={{ height: "1px", background: "rgba(26,23,16,0.12)", marginBottom: "2.5rem" }} />
            <div style={{ marginBottom: "1.5rem", opacity: 0.5 }}>
              <img src={COUPLE_IMG} alt="" style={{ width: "90px", display: "inline-block", mixBlendMode: "multiply" }} />
            </div>
            <h3 className="font-display" style={{ fontStyle: "italic", fontSize: "1.8rem", fontWeight: 300, marginBottom: "0.5rem" }}>
              Александр &amp; Мария
            </h3>
            <p style={{
              fontFamily: "Montserrat, sans-serif", fontWeight: 300,
              fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.35,
            }}>
              14 · 09 · 2024
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}