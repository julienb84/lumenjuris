
import { Link } from "react-router-dom";
import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Tableau de bord", path: "/dashboard", active: true },
  { label: "Générateur de modèles", path: "/generateur" },
  { label: "Signature", path: "/signature" },
  { label: "Analyse de conformité", path: "/analyzer" },
  { label: "Chat juridique RH", path: "/chat" },
  { label: "Calculateur juridique", path: "/calculateur" },
  { label: "Veille information", path: "/veille" },
  { label: "Paramètres", path: "/parametres" },
];

const kpiCards = [
  { value: "48", label: "Nombre de contrats",  sub: "Total actifs",                badge: null },
  { value: "32", label: "Contrats signés",      sub: null,                          badge: "+5 ce mois" },
  { value: "12", label: "Contrats en cours",    sub: "En attente de signature",     badge: null },
  { value: "4",  label: "Arrivées bientôt",     sub: "Dans les 30 prochains jours", badge: null },
  { value: "5",  label: "Procédures en cours",  sub: "2 échéances cette semaine",   badge: null },
  { value: "3",  label: "Alertes juridiques",   sub: "2 prioritaires",              badge: null },
];

const veilleItems = [
  { tag: "Temps de travail", title: "Nouvelle obligation d'information des salariés en CDD",     date: "28 fév. 2026" },
  { tag: "Rupture",          title: "Réforme des indemnités prud'homales : barème actualisé",    date: "25 fév. 2026" },
  { tag: "Discipline",       title: "Procédure disciplinaire : nouveaux délais de prescription", date: "22 fév. 2026" },
];

const docTypes = [
  { label: "CDI",                  sub: "Contrat durée indéterminée" },
  { label: "CDD",                  sub: "Contrat durée déterminée" },
  { label: "Avenant",              sub: "Modification contractuelle" },
  { label: "Lettre disciplinaire", sub: "Procédure disciplinaire" },
];

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = useCallback((file: File) => {
    if (!file) return;
    navigate("/analyzer", { state: { file } });
  }, [navigate]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragOver(true); };
  const handleDragLeave = () => setDragOver(false);

  return (
    <div> {/* root: flex layout */}

      {/* ── Sidebar ── */}
      {sidebarOpen && (
        <aside> {/* fixed left sidebar */}
          <div> {/* logo */}
            <Link to="/dashboard">LumenJuris</Link>
          </div>

          <nav> {/* navigation links */}
            <ul>
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link to={item.path}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div> {/* sidebar footer */}
            <span>Données sécurisées – Hébergement UE</span>
          </div>
        </aside>
      )}

      {/* ── Main ── */}
      <div> {/* main column: header + content */}

        {/* Header */}
        <header>
          <div> {/* left: toggle + search */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)}>Menu</button>
            <div> {/* search bar */}
              <input type="text" placeholder="Rechercher un document, une clause..." />
            </div>
          </div>
          <div> {/* right: notifications + user */}
            <button>Notifications</button>
            <div> {/* user avatar + name */}
              <span>ML</span>
              <span>Marie L.</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main>
          <div> {/* content wrapper */}

            {/* Page title */}
            <div> {/* title row */}
              <div>
                <h1>Tableau de bord</h1>
                <p>Vue d'ensemble de votre conformité RH</p>
              </div>
              <span>Conforme au Code du travail français</span>
            </div>

            {/* KPI Cards */}
            <div> {/* 6-col grid */}
              {kpiCards.map((card, i) => (
                <div key={i}> {/* card */}
                  <div> {/* icon + badge row */}
                    <div>{/* icon */}</div>
                    {card.badge && <span>{card.badge}</span>}
                  </div>
                  <div>
                    <div>{card.value}</div>
                    <div>{card.label}</div>
                    {card.sub && <div>{card.sub}</div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Middle 2-col grid */}
            <div>

              {/* Analyse rapide */}
              <div> {/* card */}
                <div> {/* card header */}
                  <div>
                    <h2>Analyse rapide</h2>
                    <p>Vérifiez la conformité de vos documents</p>
                  </div>
                  <div>{/* icon */}</div>
                </div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                > {/* drop zone */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.doc"
                    style={{ display: "none" }}
                    onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                  />
                  <p>Glissez-déposez votre document ici</p>
                  <p>PDF, DOCX – Contrats, avenants, procédures</p>
                </div>
                <Link to="/analyzer">Analyser un document</Link>
              </div>

              {/* Générateur intelligent */}
              <div> {/* card */}
                <div> {/* card header */}
                  <div>
                    <h2>Générateur intelligent</h2>
                    <p>Créez des documents juridiques conformes</p>
                  </div>
                  <div>{/* icon */}</div>
                </div>
                <div> {/* 2-col doc type grid */}
                  {docTypes.map((item) => (
                    <button key={item.label}>
                      <span>{item.label}</span>
                      <span>{item.sub}</span>
                    </button>
                  ))}
                </div>
                <Link to="/generateur">Créer un document</Link>
              </div>

              {/* Chat juridique RH */}
              <div> {/* card */}
                <div> {/* card header */}
                  <div>
                    <h2>Chat juridique RH</h2>
                    <p>Réponses avec sources juridiques</p>
                  </div>
                  <div>{/* icon */}</div>
                </div>
                <div> {/* message preview */}
                  <div> {/* avatar */}</div>
                  <div>
                    <p>"Quelles sont les obligations lors d'un licenciement pour faute grave ?"</p>
                    <p>Sources : Art. L1232-1, L1234-1 du Code du travail</p>
                  </div>
                </div>
                <Link to="/chat">Poser une question</Link>
              </div>

              {/* Calculateur juridique */}
              <div> {/* card */}
                <div> {/* card header */}
                  <div>
                    <h2>Calculateur juridique</h2>
                    <p>Estimations légales instantanées</p>
                  </div>
                  <div>{/* icon */}</div>
                </div>
                <div> {/* calculator preview */}
                  <p>Indemnité de licenciement</p>
                  <div>
                    <div><span>Ancienneté</span><span>8 ans</span></div>
                    <div><span>Salaire brut mensuel</span><span>3 200 €</span></div>
                    <div><span>Motif</span><span>Personnel</span></div>
                  </div>
                  <div> {/* result row */}
                    <span>Estimation</span>
                    <span>6 400 €</span>
                  </div>
                </div>
                <Link to="/calculateur">Calculer une indemnité</Link>
              </div>

            </div> {/* end middle grid */}

            {/* Veille personnalisée */}
            <div> {/* card */}
              <div> {/* card header */}
                <div>
                  <h2>Veille personnalisée</h2>
                  <p>Actualités juridiques impactant votre entreprise</p>
                </div>
                <div>{/* icon */}</div>
              </div>
              <div> {/* 3-col grid */}
                {veilleItems.map((item, i) => (
                  <div key={i}> {/* veille card */}
                    <div> {/* tag row */}
                      <span>{item.tag}</span>
                    </div>
                    <p>{item.title}</p>
                    <time>{item.date}</time>
                  </div>
                ))}
              </div>
              <Link to="/veille">Voir toutes les actualités</Link>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

