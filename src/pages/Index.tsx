import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/files/38be53e1-d3f2-4b79-a02b-17106c6d4138.jpg";
const VENUE_IMAGE = "https://cdn.poehali.dev/projects/ab37d73f-1443-402c-bbab-13217f615402/files/0fdbdb34-7e9b-4aa9-b4ed-c1ee9bd3ff58.jpg";

const PLAYLIST = [
  { title: "Perfect", artist: "Ed Sheeran" },
  { title: "A Thousand Years", artist: "Christina Perri" },
  { title: "Can't Help Falling in Love", artist: "Elvis Presley" },
  { title: "At Last", artist: "Etta James" },
  { title: "Make You Feel My Love", artist: "Adele" },
];

const SCHEDULE = [
  { time: "14:00", title: "Сбор гостей", desc: "Торжественная встреча и фотосессия" },
  { time: "15:00", title: "Церемония", desc: "Выездная регистрация брака" },
  { time: "16:00", title: "Фуршет", desc: "Лёгкие закуски и шампанское в саду" },
  { time: "17:30", title: "Банкет", desc: "Торжественный ужин и первый танец" },
  { time: "20:00", title: "Торт", desc: "Разрезание свадебного торта" },
  { time: "21:00", title: "Танцы", desc: "Живая музыка до полуночи" },
];

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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target as HTMLElement);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.4 }
    );
    sectionRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (index: number) => {
    sectionRefs.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>

      {/* Side Navigation */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3 hidden md:flex">
        {["Главная", "Детали", "RSVP", "Подарки", "Программа"].map((label, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`nav-dot ${activeSection === i ? "active" : ""}`}
            title={label}
          />
        ))}
      </nav>

      {/* Music Player */}
      <div
        className="music-player fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-6 py-3"
        style={{
          background: "rgba(248, 244, 238, 0.92)",
          border: "1px solid var(--gold-light)",
          boxShadow: "0 8px 40px rgba(201, 169, 110, 0.15)",
        }}
      >
        <button
          onClick={() => setCurrentTrack((p) => (p - 1 + PLAYLIST.length) % PLAYLIST.length)}
          style={{ color: "var(--stone)", cursor: "pointer", background: "none", border: "none" }}
        >
          <Icon name="SkipBack" size={14} />
        </button>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="flex items-center justify-center w-8 h-8 transition-all"
          style={{
            background: isPlaying ? "var(--gold)" : "transparent",
            border: "1px solid var(--gold)",
            color: isPlaying ? "var(--cream)" : "var(--gold)",
            borderRadius: "50%",
            cursor: "pointer",
          }}
        >
          <Icon name={isPlaying ? "Pause" : "Play"} size={12} />
        </button>
        <button
          onClick={() => setCurrentTrack((p) => (p + 1) % PLAYLIST.length)}
          style={{ color: "var(--stone)", cursor: "pointer", background: "none", border: "none" }}
        >
          <Icon name="SkipForward" size={14} />
        </button>
        <div className="text-xs" style={{ color: "var(--stone)", letterSpacing: "0.05em" }}>
          <span style={{ color: "var(--charcoal)", fontWeight: 400 }}>{PLAYLIST[currentTrack].title}</span>
          <span className="mx-1">·</span>
          <span>{PLAYLIST[currentTrack].artist}</span>
        </div>
        <Icon name="Music2" size={12} style={{ color: "var(--gold-light)" } as React.CSSProperties} />
      </div>

      {/* ─── HERO ─── */}
      <section
        ref={(el) => { sectionRefs.current[0] = el; }}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(248,244,238,0.45) 0%, rgba(248,244,238,0.65) 60%, var(--cream) 100%)" }}
        />

        <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
          <p
            className="opacity-0-init animate-fade-in font-display italic mb-6"
            style={{ color: "var(--gold)", fontSize: "1rem", letterSpacing: "0.15em", animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            приглашают вас разделить их радость
          </p>

          <h1
            className="opacity-0-init animate-fade-up font-display mb-4"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              fontWeight: 300,
              color: "var(--charcoal)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              animationDelay: "0.4s",
              animationFillMode: "forwards",
            }}
          >
            Александр
            <br />
            <span className="font-display italic" style={{ color: "var(--gold)", fontSize: "0.85em" }}>&amp;</span>
            <br />
            Мария
          </h1>

          <div
            className="opacity-0-init animate-fade-in flex items-center justify-center gap-4 mb-8"
            style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}
          >
            <div style={{ height: "1px", width: "60px", background: "var(--gold-light)" }} />
            <span className="font-display italic" style={{ color: "var(--stone)", fontSize: "1.1rem", letterSpacing: "0.1em" }}>
              14 сентября 2024
            </span>
            <div style={{ height: "1px", width: "60px", background: "var(--gold-light)" }} />
          </div>

          <p
            className="opacity-0-init animate-fade-up"
            style={{
              color: "var(--stone)",
              fontSize: "0.8rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              animationDelay: "1s",
              animationFillMode: "forwards",
            }}
          >
            Москва · Особняк «Белый зал»
          </p>

          <div
            className="opacity-0-init animate-fade-in mt-12"
            style={{ animationDelay: "1.2s", animationFillMode: "forwards" }}
          >
            <button onClick={() => scrollTo(1)} className="btn-gold">
              Подробнее
            </button>
          </div>
        </div>

        <button
          onClick={() => scrollTo(1)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ color: "var(--gold-light)", background: "none", border: "none", cursor: "pointer" }}
        >
          <Icon name="ChevronDown" size={20} />
        </button>
      </section>

      {/* ─── ДЕТАЛИ ─── */}
      <section
        ref={(el) => { sectionRefs.current[1] = el; }}
        className="py-32 px-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <p className="ornament mb-3">детали торжества</p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--charcoal)", letterSpacing: "-0.02em" }}
            >
              Дата, время и место
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-px" style={{ border: "1px solid var(--gold-light)" }}>
            {[
              { icon: "Calendar", title: "Дата", lines: ["14 сентября", "2024 года", "Суббота"] },
              { icon: "Clock", title: "Время", lines: ["Начало в 14:00", "Сбор гостей", "с 13:30"] },
              { icon: "MapPin", title: "Место", lines: ["Особняк «Белый зал»", "ул. Пречистенка, 12", "Москва"] },
            ].map(({ icon, title, lines }, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-12 text-center"
                style={{
                  background: "white",
                  borderRight: i < 2 ? "1px solid var(--gold-light)" : "none",
                }}
              >
                <div className="mb-5">
                  <Icon name={icon as Parameters<typeof Icon>[0]["name"]} size={20} style={{ color: "var(--gold)" } as React.CSSProperties} />
                </div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1rem" }}>
                  {title}
                </p>
                {lines.map((l, j) => (
                  <p
                    key={j}
                    className="font-display"
                    style={{
                      fontSize: j === 0 ? "1.5rem" : "1rem",
                      fontWeight: 300,
                      color: j === 0 ? "var(--charcoal)" : "var(--stone)",
                      lineHeight: 1.4,
                    }}
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-16 relative overflow-hidden" style={{ height: "280px" }}>
            <img src={VENUE_IMAGE} alt="Место проведения" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0 flex items-end p-8"
              style={{ background: "linear-gradient(to top, rgba(44,36,22,0.6) 0%, transparent 60%)" }}
            >
              <div>
                <p className="font-display italic text-white text-xl mb-1">Особняк «Белый зал»</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                  Уникальное историческое пространство в сердце Москвы
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── RSVP ─── */}
      <section
        ref={(el) => { sectionRefs.current[2] = el; }}
        className="py-32 px-6"
        style={{ background: "white" }}
      >
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-16">
            <p className="ornament mb-3">подтверждение</p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--charcoal)", letterSpacing: "-0.02em" }}
            >
              Вы придёте?
            </h2>
            <p style={{ color: "var(--stone)", fontSize: "0.85rem", letterSpacing: "0.05em", marginTop: "1rem" }}>
              Просим подтвердить присутствие до 1 сентября 2024
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-16" style={{ animation: "scaleIn 0.8s cubic-bezier(0.16,1,0.3,1) forwards" }}>
              <div className="mb-6 flex justify-center">
                <Icon name="Heart" size={32} style={{ color: "var(--gold)" } as React.CSSProperties} />
              </div>
              <h3 className="font-display mb-3" style={{ fontSize: "2rem", fontWeight: 300, color: "var(--charcoal)" }}>
                Спасибо!
              </h3>
              <p style={{ color: "var(--stone)", fontSize: "0.9rem" }}>
                {rsvpStatus === "yes"
                  ? "Мы рады, что вы будете с нами в этот особенный день."
                  : "Жаль, что вы не сможете присоединиться. Мы вас любим."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="flex gap-4 mb-12 justify-center">
                {(["yes", "no"] as const).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setRsvpStatus(v)}
                    style={{
                      padding: "0.75rem 2rem",
                      border: "1px solid",
                      borderColor: rsvpStatus === v ? "var(--gold)" : "var(--gold-light)",
                      background: rsvpStatus === v ? "var(--gold)" : "transparent",
                      color: rsvpStatus === v ? "var(--cream)" : "var(--stone)",
                      fontSize: "0.75rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      fontFamily: "Montserrat, sans-serif",
                      fontWeight: 400,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    {v === "yes" ? "Буду" : "Не смогу"}
                  </button>
                ))}
              </div>

              {rsvpStatus === "yes" && (
                <div className="space-y-8 animate-fade-up">
                  <div>
                    <label style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block" }}>
                      Ваше имя
                    </label>
                    <input
                      className="wedding-input mt-1"
                      placeholder="Имя и фамилия"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block" }}>
                      Количество гостей
                    </label>
                    <select
                      className="wedding-input mt-1"
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
                    <label style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block" }}>
                      Пожелания по меню
                    </label>
                    <input
                      className="wedding-input mt-1"
                      placeholder="Вегетарианское, аллергии..."
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", display: "block" }}>
                      Пожелание молодым
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Ваши добрые слова..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        resize: "none",
                        background: "transparent",
                        border: "none",
                        borderBottom: "1px solid var(--gold-light)",
                        borderRadius: 0,
                        padding: "0.75rem 0",
                        color: "var(--charcoal)",
                        fontFamily: "Montserrat, sans-serif",
                        fontWeight: 300,
                        fontSize: "0.875rem",
                        letterSpacing: "0.05em",
                        width: "100%",
                        outline: "none",
                        marginTop: "0.25rem",
                      }}
                    />
                  </div>
                  <div className="text-center pt-4">
                    <button type="submit" className="btn-gold-filled">
                      Подтвердить
                    </button>
                  </div>
                </div>
              )}

              {rsvpStatus === "no" && (
                <div className="text-center animate-fade-up">
                  <p className="font-display italic mb-6" style={{ color: "var(--stone)", fontSize: "1.1rem" }}>
                    Жаль, что вы не сможете быть с нами...
                  </p>
                  <button type="submit" className="btn-gold">
                    Отправить
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* ─── ПОДАРКИ ─── */}
      <section
        ref={(el) => { sectionRefs.current[3] = el; }}
        className="py-32 px-6"
      >
        <div className="max-w-3xl mx-auto text-center">
          <p className="ornament mb-3">с любовью</p>
          <h2
            className="font-display mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--charcoal)", letterSpacing: "-0.02em" }}
          >
            Благодарность и подарки
          </h2>

          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--gold-light), transparent)", marginBottom: "3rem" }} />

          <p
            className="font-display italic mb-8"
            style={{ fontSize: "1.4rem", color: "var(--stone)", fontWeight: 300, lineHeight: 1.7 }}
          >
            «Ваше присутствие — лучший подарок,
            <br />который вы можете нам преподнести»
          </p>

          <p style={{ color: "var(--stone)", fontSize: "0.875rem", lineHeight: 1.9, maxWidth: "480px", margin: "0 auto 3rem" }}>
            Если вы хотите порадовать нас чем-то особенным, мы будем благодарны
            за денежный подарок на нашу совместную мечту — путешествие на Амальфитанское побережье.
          </p>

          <div
            className="inline-block px-10 py-8 text-center"
            style={{ border: "1px solid var(--gold-light)", background: "white" }}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--stone)", marginBottom: "1rem" }}>
              Реквизиты
            </p>
            <p className="font-display" style={{ fontSize: "1.5rem", fontWeight: 300, color: "var(--charcoal)", marginBottom: "0.25rem" }}>
              Мария Петрова
            </p>
            <p style={{ color: "var(--stone)", fontSize: "0.85rem", letterSpacing: "0.1em" }}>
              Сбербанк · +7 (999) 000-00-00
            </p>
          </div>

          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--gold-light), transparent)", marginTop: "3rem" }} />
        </div>
      </section>

      {/* ─── ПРОГРАММА ─── */}
      <section
        ref={(el) => { sectionRefs.current[4] = el; }}
        className="py-32 px-6"
        style={{ background: "white" }}
      >
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-20">
            <p className="ornament mb-3">расписание</p>
            <h2
              className="font-display"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, color: "var(--charcoal)", letterSpacing: "-0.02em" }}
            >
              Программа дня
            </h2>
          </div>

          <div className="relative">
            <div
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: "4.5rem",
                background: "linear-gradient(to bottom, transparent, var(--gold-light), var(--gold), var(--gold-light), transparent)",
              }}
            />

            <div className="space-y-10">
              {SCHEDULE.map(({ time, title, desc }, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className="text-right shrink-0 pt-1" style={{ width: "4rem" }}>
                    <span className="font-display" style={{ fontSize: "1.1rem", fontWeight: 300, color: "var(--gold)" }}>
                      {time}
                    </span>
                  </div>

                  <div
                    className="relative z-10 shrink-0 mt-2"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      background: "var(--gold)",
                      border: "3px solid white",
                      boxShadow: "0 0 0 1px var(--gold-light)",
                      marginLeft: "-1px",
                    }}
                  />

                  <div className="pb-2">
                    <h3
                      className="font-display mb-1"
                      style={{ fontSize: "1.3rem", fontWeight: 400, color: "var(--charcoal)" }}
                    >
                      {title}
                    </h3>
                    <p style={{ color: "var(--stone)", fontSize: "0.85rem", lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-24 pb-16">
          <div style={{ height: "1px", background: "linear-gradient(to right, transparent, var(--gold-light), transparent)", marginBottom: "2.5rem" }} />
          <h3
            className="font-display italic mb-4"
            style={{ fontSize: "2rem", color: "var(--charcoal)", fontWeight: 300 }}
          >
            Александр &amp; Мария
          </h3>
          <p style={{ color: "var(--stone)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            14 · 09 · 2024
          </p>
          <div className="flex items-center justify-center gap-3 mt-6">
            <Icon name="Heart" size={12} style={{ color: "var(--gold)" } as React.CSSProperties} />
          </div>
        </div>
      </section>
    </div>
  );
}
