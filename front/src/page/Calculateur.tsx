import { useState } from "react";
import { Calculator, Download, Info } from "lucide-react";

function calcIndemnite(anciennete: number, salaire: number) {
  if (!anciennete || !salaire) return null;
  const tranche1 = Math.min(anciennete, 10) * (salaire / 4);
  const tranche2 = Math.max(0, anciennete - 10) * (salaire / 3);
  const total = tranche1 + tranche2;
  return { total, salaire, anciennete, tranche1, tranche2 };
}

export function Calculateur() {
  const [anciennete, setAnciennete] = useState("8");
  const [salaire, setSalaire] = useState("3200");
  const [motif, setMotif] = useState("perso");
  const [calculated, setCalculated] = useState(true);

  const result = calculated ? calcIndemnite(parseFloat(anciennete), parseFloat(salaire)) : null;
  const formula = motif === "perso" ? "1/4 mois par année" : "1/4 mois par année (éco)";

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Calculateur juridique</h1>
        <p className="text-sm text-gray-500 mt-1">Estimez les indemnités et obligations légales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">

        {/* Left: form */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-[#354F99]" />
            <h2 className="text-base font-semibold text-gray-900">Indemnité de licenciement</h2>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Ancienneté (années)</label>
            <input
              type="number" min="0" value={anciennete}
              onChange={(e) => { setAnciennete(e.target.value); setCalculated(false); }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#354F99] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Salaire brut mensuel (€)</label>
            <input
              type="number" min="0" value={salaire}
              onChange={(e) => { setSalaire(e.target.value); setCalculated(false); }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#354F99] transition-colors"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700">Motif du licenciement</label>
            <select
              value={motif}
              onChange={(e) => { setMotif(e.target.value); setCalculated(false); }}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 outline-none focus:border-[#354F99] transition-colors bg-white"
            >
              <option value="perso">Personnel (non disciplinaire)</option>
              <option value="eco">Économique</option>
            </select>
          </div>

          <button
            onClick={() => setCalculated(true)}
            className="w-full bg-[#354F99] text-white text-sm font-semibold py-3 rounded-lg hover:bg-[#2d4387] transition-colors"
          >
            Calculer l'indemnité
          </button>
        </div>

        {/* Résultat */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center space-y-1">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Indemnité estimée</p>
            <p className="text-4xl font-bold text-[#354F99]">
              {result ? result.total.toLocaleString("fr-FR", { maximumFractionDigits: 0 }) + " €" : "— €"}
            </p>
            <p className="text-xs text-gray-400">Minimum légal</p>
          </div>

          {/* Détails */}
          {result && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-semibold text-gray-900">Détail du calcul</h3>
              <dl className="space-y-3">
                {[
                  { label: "Salaire de référence",   value: `${result.salaire.toLocaleString("fr-FR")} €/mois` },
                  { label: "Ancienneté",              value: `${result.anciennete} an${result.anciennete > 1 ? "s" : ""}` },
                  { label: "Formule applicable",      value: formula },
                  { label: "Calcul",                  value: `${result.salaire.toLocaleString("fr-FR")} × 1/4 × ${result.anciennete} = ${result.total.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`, bold: true },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4 text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-500">{row.label}</span>
                    <span className={`font-medium text-right ${row.bold ? "text-gray-900" : "text-gray-700"}`}>{row.value}</span>
                  </div>
                ))}
              </dl>

              <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <Info className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Base légale : Art. R1234-2 du Code du travail. La convention collective peut prévoir une indemnité plus favorable.
                </p>
              </div>

              <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-500 border border-gray-200 rounded-lg py-2.5 hover:border-gray-300 transition-colors">
                <Download className="h-4 w-4" />
                Exporter le rapport
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

