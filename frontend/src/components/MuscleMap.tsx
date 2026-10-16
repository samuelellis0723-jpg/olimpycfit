import { useId, useState } from 'react';
import '../styles/muscles.css';

export const muscleNames: Record<string, string> = {
  chest: 'Pecho', back: 'Espalda', shoulders: 'Hombros', biceps: 'Bíceps',
  triceps: 'Tríceps', abs: 'Abdomen', glutes: 'Glúteos', quads: 'Cuádriceps',
  hamstrings: 'Isquiotibiales', calves: 'Pantorrillas',
};
type Region = { key: string; path: string; mirrored?: boolean };
const front: Region[] = [
  { key: 'shoulders', path: 'M78 82 Q57 81 49 109 L65 119 Q69 98 83 95Z', mirrored: true },
  { key: 'chest', path: 'M84 99 Q94 93 107 98 L107 132 Q86 139 72 122 L76 109Z', mirrored: true },
  { key: 'biceps', path: 'M51 117 Q60 112 65 124 L57 163 Q45 166 45 150Z', mirrored: true },
  { key: 'abs', path: 'M89 141 L106 139 L106 157 L88 157Z M88 162 L106 162 L106 180 L87 180Z M87 185 L106 185 L106 207 L91 217Z', mirrored: true },
  { key: 'quads', path: 'M78 230 Q91 223 105 237 L103 281 L96 323 Q81 326 79 309 L75 270Z', mirrored: true },
];
const back: Region[] = [
  { key: 'shoulders', path: 'M78 82 Q57 81 49 109 L65 119 Q69 98 83 95Z', mirrored: true },
  { key: 'back', path: 'M91 78 L107 83 L107 191 L92 210 L82 169 L72 123 L80 99Z', mirrored: true },
  { key: 'triceps', path: 'M51 117 Q60 112 65 124 L57 166 Q44 166 45 150Z', mirrored: true },
  { key: 'glutes', path: 'M87 211 Q100 207 107 216 L107 252 Q88 270 73 251 L76 228Z', mirrored: true },
  { key: 'hamstrings', path: 'M76 262 Q91 269 104 258 L101 292 L96 325 Q84 330 80 311Z', mirrored: true },
  { key: 'calves', path: 'M82 337 Q90 329 98 338 L101 365 L95 389 Q82 390 80 373Z', mirrored: true },
];
const body = 'M94 60 Q110 67 126 60 L130 77 Q157 79 169 102 L181 155 L184 184 L191 237 Q188 247 179 239 L167 202 L158 169 L149 137 L145 185 L150 224 Q155 250 147 282 L140 334 L141 394 L153 414 Q154 423 139 423 L122 417 L115 354 L111 296 L109 296 L105 354 L98 417 L81 423 Q66 423 67 414 L79 394 L80 334 L73 282 Q65 250 70 224 L75 185 L71 137 L62 169 L53 202 L41 239 Q32 247 29 237 L36 184 L39 155 L51 102 Q63 79 90 77Z';

export default function MuscleMap({ primary, secondary, exerciseName }: {
  primary: string[]; secondary: string[]; exerciseName: string;
}) {
  const id = useId();
  const [selected, setSelected] = useState<string | null>(null);
  const current = selected || primary.find(key => key in muscleNames) || 'chest';
  const involvement = (key: string) => primary.includes(key) ? 'Principal' : secondary.includes(key) ? 'Secundario' : 'Sin énfasis indicado';
  const className = (key: string) => `muscle-region ${primary.includes(key) ? 'primary' : secondary.includes(key) ? 'secondary' : 'neutral'} ${current === key ? 'selected' : ''}`;

  return <section className="muscle-map" aria-label={`Grupos musculares de ${exerciseName}`}>
    <div className="muscle-map-heading"><div><p className="eyebrow">EL MOVIMIENTO, A SIMPLE VISTA</p><h3>Conoce los grupos que participan</h3></div><span className="tag">ESQUEMA EDUCATIVO</span></div>
    <p className="small muted">Selecciona una zona o su nombre. Con teclado, usa Tab y Enter o la barra espaciadora. El color y el tipo de trazo distinguen la participación.</p>
    <div className="muscle-map-layout">
      <div className="body-views">
        {([{ view: 'frontal', regions: front }, { view: 'posterior', regions: back }] as const).map(({ view, regions }) => <figure key={view}>
          <svg viewBox="0 0 220 440" role="group" aria-labelledby={`${id}-${view}-title ${id}-${view}-desc`}>
            <title id={`${id}-${view}-title`}>Vista {view} del cuerpo</title>
            <desc id={`${id}-${view}-desc`}>Ilustración original simplificada. Las zonas y los controles de texto permiten explorar músculos; no muestra diagnósticos ni intensidad cuantitativa.</desc>
            <g aria-hidden="true" className="body-outline"><ellipse cx="110" cy="35" rx="20" ry="25"/><path d={body}/><path className="body-guide" d="M110 82V211 M79 332Q89 337 99 332 M121 332Q131 337 141 332"/></g>
            {regions.map(region => <g key={region.key} className={className(region.key)} role="button" tabIndex={0}
              aria-label={`${muscleNames[region.key]}, vista ${view}, ${involvement(region.key).toLowerCase()}`}
              aria-pressed={current === region.key} onClick={() => setSelected(region.key)}
              onKeyDown={event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelected(region.key); } }}>
              <path d={region.path}/>{region.mirrored && <path d={region.path} transform="translate(220 0) scale(-1 1)"/>}
            </g>)}
          </svg>
          <figcaption>VISTA {view.toUpperCase()}</figcaption>
        </figure>)}
      </div>
      <div className="muscle-explorer">
        <div className="muscle-legend"><span><i className="primary"/>Principal</span><span><i className="secondary"/>Secundario</span></div>
        <div className="muscle-controls" aria-label="Explorar grupos musculares">{Object.entries(muscleNames).map(([key, name]) => <button key={key} type="button" aria-pressed={current === key} onClick={() => setSelected(key)} className={className(key)}>
          <span>{name}</span><small>{involvement(key)}</small>
        </button>)}</div>
        <div className="muscle-inspection" role="status" aria-live="polite"><strong>{muscleNames[current]}</strong><p>{involvement(current)} en {exerciseName.toLocaleLowerCase()} según el catálogo. La participación varía con la técnica y la variante; no representa una medición individual.</p></div>
      </div>
    </div>
  </section>;
}
