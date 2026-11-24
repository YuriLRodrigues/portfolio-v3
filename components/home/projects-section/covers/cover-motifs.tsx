"use client";

import { Bars, Chip, Lines, Panel, Ring } from "./cover-frame";

/**
 * Um motivo por projeto. Cada um desenha a ideia central do produto — a barra
 * de treino, o anúncio de carro, o PDF assinado — usando as mesmas primitivas,
 * para que todas as capas pareçam da mesma família.
 */

const stroke = {
  fill: "none",
  stroke: "var(--primary)",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const softStroke = {
  fill: "none",
  stroke: "var(--foreground)",
  strokeOpacity: 0.28,
  strokeWidth: 2,
  strokeLinecap: "round",
} as const;

/* 01 — Workout Tracker: anel de progresso, barra de supino e volume semanal */
function WorkoutTrackerMotif() {
  return (
    <g>
      <Ring cx={178} cy={222} r={84} progress={0.72} thickness={14} />
      <g {...stroke}>
        <line x1="140" y1="222" x2="216" y2="222" />
        <line x1="132" y1="206" x2="132" y2="238" />
        <line x1="224" y1="206" x2="224" y2="238" />
        <line x1="120" y1="212" x2="120" y2="232" strokeOpacity="0.55" />
        <line x1="236" y1="212" x2="236" y2="232" strokeOpacity="0.55" />
      </g>

      <Panel x={318} y={112} width={402} height={236} emphasis={0.7}>
        <Lines x={344} y={138} width={150} count={2} gap={16} thickness={6} opacity={0.35} widths={[1, 0.5]} />
        <Chip x={640} y={134} width={56} height={20} filled />
        <Bars x={346} baseline={312} values={[38, 52, 44, 68, 59, 81, 72]} barWidth={22} gap={26} maxHeight={122} active={5} />
        <line x1={344} y1={318} x2={696} y2={318} stroke="var(--foreground)" strokeOpacity="0.16" strokeWidth="1.5" />
      </Panel>
    </g>
  );
}

/** Perfil de carro em caixa de 208×74, desenhado da traseira para a frente. */
const CAR_BODY = "M6 62 C1 62 -1 57 2 50 L24 43 L52 14 C55 11 59 9 63 9 L132 9 C137 9 141 11 144 14 L172 43 L198 50 C205 52 208 57 205 62 Z";

function CarSilhouette({ x, y, scale = 1, opacity = 1 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity}>
      <path d={CAR_BODY} fill="var(--primary)" fillOpacity="0.16" stroke="var(--primary)" strokeOpacity="0.85" strokeWidth={3 / scale} strokeLinejoin="round" />
      <path d="M60 40 L78 18 L100 18 L100 40 Z" fill="var(--primary)" fillOpacity="0.4" />
      <path d="M110 40 L110 18 L130 18 L148 40 Z" fill="var(--primary)" fillOpacity="0.28" />
      <g fill="var(--card)" stroke="var(--primary)" strokeOpacity="0.9" strokeWidth={3 / scale}>
        <circle cx={58} cy={62} r={15} />
        <circle cx={158} cy={62} r={15} />
      </g>
      <g fill="var(--primary)" fillOpacity="0.55">
        <circle cx={58} cy={62} r={5} />
        <circle cx={158} cy={62} r={5} />
      </g>
    </g>
  );
}

/* 02 — AutoCars: a busca, o anúncio em destaque e a fila de resultados */
function AutoCarsMotif() {
  return (
    <g>
      <Panel x={70} y={74} width={392} height={44} radius={22} emphasis={0.35}>
        <circle cx={100} cy={96} r={9} {...softStroke} strokeOpacity={0.55} />
        <line x1={107} y1={103} x2={115} y2={111} {...softStroke} strokeOpacity={0.55} />
        <Lines x={130} y={92} width={196} count={1} gap={0} thickness={7} opacity={0.22} widths={[1]} />
      </Panel>
      <Chip x={482} y={82} width={76} height={28} />
      <Chip x={570} y={82} width={64} height={28} />
      <Chip x={646} y={82} width={84} height={28} filled />

      <Panel x={70} y={140} width={404} height={266} emphasis={0.9}>
        <CarSilhouette x={110} y={186} scale={1.18} />
        <path d="M430 186c-11-9-19-15-19-23a10 10 0 0 1 19-5a10 10 0 0 1 19 5c0 8-8 14-19 23z" fill="var(--primary)" fillOpacity="0.9" />
        <Lines x={102} y={318} width={230} count={2} gap={20} thickness={8} opacity={0.4} widths={[0.82, 0.48]} />
        <rect x={102} y={362} width={116} height={16} rx={8} fill="var(--primary)" fillOpacity="0.75" />
        <rect x={232} y={364} width={64} height={12} rx={6} fill="var(--foreground)" fillOpacity="0.18" />
      </Panel>

      {[0, 1, 2].map((i) => {
        const y = 140 + i * 90;
        return (
          <Panel key={i} x={496} y={y} width={234} height={74} radius={12} emphasis={i === 0 ? 0.5 : 0.24}>
            <rect x={510} y={y + 14} width={68} height={46} rx={8} fill="var(--primary)" fillOpacity="0.1" />
            <CarSilhouette x={514} y={y + 22} scale={0.29} opacity={i === 0 ? 0.95 : 0.55} />
            <Lines x={592} y={y + 22} width={122} count={2} gap={16} thickness={6} opacity={i === 0 ? 0.34 : 0.2} widths={[0.94, 0.52]} />
            <rect x={592} y={y + 52} width={54} height={9} rx={4.5} fill="var(--primary)" fillOpacity={i === 0 ? 0.6 : 0.3} />
          </Panel>
        );
      })}
    </g>
  );
}

/* 03 — Fincheck: rosca de categorias e extrato com entradas e saídas */
function FincheckMotif() {
  return (
    <g>
      <g>
        <circle cx={186} cy={222} r={82} fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth={26} />
        <circle cx={186} cy={222} r={82} fill="none" stroke="var(--primary)" strokeOpacity="0.85" strokeWidth={26} strokeDasharray="208 515" transform="rotate(-90 186 222)" />
        <circle cx={186} cy={222} r={82} fill="none" stroke="var(--primary)" strokeOpacity="0.45" strokeWidth={26} strokeDasharray="126 515" transform="rotate(55 186 222)" />
      </g>

      <Panel x={324} y={116} width={396} height={228} emphasis={0.7}>
        <Lines x={350} y={142} width={120} count={1} gap={0} thickness={7} opacity={0.35} widths={[1]} />
        {[0, 1, 2, 3].map((i) => {
          const y = 182 + i * 42;
          const income = i === 0 || i === 2;
          return (
            <g key={i}>
              <circle cx={362} cy={y} r={11} fill="var(--primary)" fillOpacity={income ? 0.22 : 0.1} />
              <path
                d={income ? `M357 ${y + 3} l5 -6 l5 6` : `M357 ${y - 3} l5 6 l5 -6`}
                fill="none"
                stroke="var(--primary)"
                strokeOpacity={income ? 0.95 : 0.5}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <Lines x={386} y={y - 3} width={180} count={1} gap={0} thickness={6} opacity={0.24} widths={[0.55 + i * 0.12]} />
              <rect x={620} y={y - 5} width={72} height={10} rx={5} fill="var(--primary)" fillOpacity={income ? 0.5 : 0.18} />
            </g>
          );
        })}
      </Panel>
    </g>
  );
}

/* 04 — Document Signature: a página, a rubrica e o selo de assinado */
function DocumentSignatureMotif() {
  return (
    <g>
      <Panel x={186} y={72} width={300} height={344} radius={16} emphasis={0.25} />
      <Panel x={244} y={96} width={300} height={344} radius={16} emphasis={0.85}>
        <path d="M484 96 h60 v60" fill="none" stroke="var(--primary)" strokeOpacity="0.45" strokeWidth="2" />
        <Lines x={276} y={146} width={220} count={5} gap={22} thickness={7} opacity={0.24} widths={[1, 0.86, 0.94, 0.62, 0.78]} />
        <line x1={276} y1={318} x2={496} y2={318} stroke="var(--foreground)" strokeOpacity="0.18" strokeWidth="1.5" strokeDasharray="6 7" />
        <path d="M284 312c18-26 26 14 42-6s20 16 38-10 26 18 44-8" fill="none" stroke="var(--primary)" strokeOpacity="0.95" strokeWidth={3.5} strokeLinecap="round" />
        <Lines x={276} y={344} width={120} count={1} gap={0} thickness={6} opacity={0.2} widths={[1]} />
      </Panel>

      <g>
        <circle cx={578} cy={330} r={46} fill="var(--card)" fillOpacity="0.9" />
        <circle cx={578} cy={330} r={46} fill="none" stroke="var(--primary)" strokeOpacity="0.55" strokeWidth="2.5" strokeDasharray="10 8" />
        <path d="M558 330 l14 15 l25 -31" {...stroke} strokeWidth={5} />
      </g>
    </g>
  );
}

/* 05 — Cinematecando: a tira de filme atravessando os pôsteres */
function CinematecandoMotif() {
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <Panel key={i} x={92 + i * 150} y={96 + i * 22} width={132} height={196} radius={12} emphasis={i === 1 ? 0.8 : 0.3}>
          <Lines x={110 + i * 150} y={252 + i * 22} width={96} count={2} gap={14} thickness={5} opacity={i === 1 ? 0.38 : 0.2} widths={[0.9, 0.55]} />
        </Panel>
      ))}

      <g transform="rotate(-12 560 240)">
        <rect x={452} y={150} width={244} height={180} rx={10} fill="var(--card)" fillOpacity="0.92" />
        <rect x={452.75} y={150.75} width={242.5} height={178.5} rx={10} fill="none" stroke="var(--primary)" strokeOpacity="0.55" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={464 + i * 46} y={160} width={22} height={16} rx={4} fill="var(--foreground)" fillOpacity="0.2" />
            <rect x={464 + i * 46} y={304} width={22} height={16} rx={4} fill="var(--foreground)" fillOpacity="0.2" />
          </g>
        ))}
        <rect x={464} y={188} width={220} height={104} rx={6} fill="var(--primary)" fillOpacity="0.14" />
        <path d="M548 210 l58 30 l-58 30 z" fill="var(--primary)" fillOpacity="0.9" />
      </g>
    </g>
  );
}

/** Teclado, mouse, headset e monitor — um por vitrine. */
function PeripheralGlyph({ kind, x, y, active }: { kind: 0 | 1 | 2 | 3; x: number; y: number; active: boolean }) {
  const paint = active ? { ...stroke, strokeWidth: 2.5 } : { ...softStroke, strokeWidth: 2.5 };
  if (kind === 0) {
    return (
      <g {...paint}>
        <rect x={x + 8} y={y + 16} width={104} height={48} rx={8} />
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1={x + 24 + k * 22} y1={y + 32} x2={x + 24 + k * 22} y2={y + 32} strokeWidth={7} />
        ))}
        <line x1={x + 30} y1={y + 50} x2={x + 90} y2={y + 50} strokeOpacity={0.55} />
      </g>
    );
  }
  if (kind === 1) {
    return (
      <g {...paint}>
        <path d={`M${x + 44} ${y + 66} v-30 a16 16 0 0 1 32 0 v30 a16 16 0 0 1 -32 0z`} />
        <line x1={x + 60} y1={y + 24} x2={x + 60} y2={y + 40} />
      </g>
    );
  }
  if (kind === 2) {
    return (
      <g {...paint}>
        <path d={`M${x + 24} ${y + 56} v-14 a36 36 0 0 1 72 0 v14`} />
        <rect x={x + 14} y={y + 50} width={20} height={32} rx={9} />
        <rect x={x + 86} y={y + 50} width={20} height={32} rx={9} />
      </g>
    );
  }
  return (
    <g {...paint}>
      <rect x={x + 16} y={y + 16} width={88} height={54} rx={6} />
      <line x1={x + 60} y1={y + 70} x2={x + 60} y2={y + 80} />
      <line x1={x + 42} y1={y + 82} x2={x + 78} y2={y + 82} />
    </g>
  );
}

/* 06 — Setup Pro Store: a vitrine à esquerda, o carrinho fechando o pedido à direita */
function SetupProStoreMotif() {
  return (
    <g>
      {([0, 1, 2, 3] as const).map((i) => {
        const x = 62 + (i % 2) * 176;
        const y = 104 + Math.floor(i / 2) * 156;
        return (
          <Panel key={i} x={x} y={y} width={156} height={134} emphasis={i === 0 ? 0.85 : 0.26}>
            <PeripheralGlyph kind={i} x={x + 22} y={y + 24} active={i === 0} />
            {i === 0 ? <rect x={x + 22} y={y + 104} width={62} height={12} rx={6} fill="var(--primary)" fillOpacity="0.7" /> : null}
          </Panel>
        );
      })}

      <Panel x={456} y={104} width={278} height={308} emphasis={0.8}>
        <g transform="translate(486 136) scale(0.62)" {...stroke} strokeWidth={5}>
          <path d="M0 0 h22 l22 96 h88 l18 -62 h-106" />
          <circle cx={52} cy={116} r={11} />
          <circle cx={124} cy={116} r={11} />
        </g>
        <Lines x={584} y={142} width={124} count={2} gap={18} thickness={7} opacity={0.34} widths={[1, 0.58]} />

        <line x1={484} y1={244} x2={708} y2={244} stroke="var(--foreground)" strokeOpacity="0.16" strokeWidth="1.5" strokeDasharray="6 7" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Lines x={484} y={266 + i * 30} width={130} count={1} gap={0} thickness={6} opacity={0.22} widths={[0.62 + i * 0.16]} />
            <rect x={650} y={264 + i * 30} width={58} height={10} rx={5} fill="var(--primary)" fillOpacity={0.3} />
          </g>
        ))}
        <line x1={484} y1={356} x2={708} y2={356} stroke="var(--foreground)" strokeOpacity="0.16" strokeWidth="1.5" />
        <rect x={484} y={374} width={86} height={14} rx={7} fill="var(--foreground)" fillOpacity="0.2" />
        <rect x={614} y={370} width={94} height={20} rx={10} fill="var(--primary)" fillOpacity="0.85" />
      </Panel>
    </g>
  );
}

/* 07 — Fast King: o lanche, a comanda e o pagamento aprovado */
function FastKingMotif() {
  return (
    <g>
      <g transform="translate(96 132)">
        <path d="M14 56 a74 40 0 0 1 148 0z" fill="var(--primary)" fillOpacity="0.8" />
        <rect x={6} y={62} width={164} height={22} rx={11} fill="var(--foreground)" fillOpacity="0.22" />
        <rect x={10} y={90} width={156} height={26} rx={10} fill="var(--primary)" fillOpacity="0.45" />
        <rect x={6} y={122} width={164} height={20} rx={10} fill="var(--foreground)" fillOpacity="0.18" />
        <path d="M14 150 a74 30 0 0 0 148 0z" fill="var(--primary)" fillOpacity="0.6" />
      </g>

      <Panel x={324} y={90} width={240} height={296} radius={10} emphasis={0.8}>
        <Lines x={352} y={122} width={168} count={1} gap={0} thickness={8} opacity={0.4} widths={[0.62]} />
        <line x1={352} y1={152} x2={536} y2={152} stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="5 6" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Lines x={352} y={172 + i * 34} width={110} count={1} gap={0} thickness={6} opacity={0.24} widths={[0.6 + (i % 3) * 0.16]} />
            <rect x={488} y={170 + i * 34} width={48} height={9} rx={4.5} fill="var(--primary)" fillOpacity={0.35} />
          </g>
        ))}
        <line x1={352} y1={316} x2={536} y2={316} stroke="var(--foreground)" strokeOpacity="0.2" strokeWidth="1.5" strokeDasharray="5 6" />
        <rect x={430} y={332} width={106} height={14} rx={7} fill="var(--primary)" fillOpacity="0.75" />
      </Panel>

      <Panel x={600} y={176} width={130} height={172} radius={16} emphasis={0.45}>
        <rect x={620} y={200} width={90} height={56} rx={8} fill="var(--primary)" fillOpacity="0.18" />
        <rect x={620} y={214} width={90} height={12} fill="var(--primary)" fillOpacity="0.45" />
        <path d="M642 300 l14 15 l30 -36" {...stroke} strokeWidth={5} />
      </Panel>
    </g>
  );
}

/* 08 — Marvel Explorer: a grade paginada com um personagem aberto */
function MarvelExplorerMotif() {
  return (
    <g>
      <Panel x={88} y={88} width={300} height={40} radius={20} emphasis={0.3}>
        <circle cx={116} cy={108} r={8} {...softStroke} strokeOpacity={0.5} />
        <line x1={122} y1={114} x2={129} y2={121} {...softStroke} strokeOpacity={0.5} />
        <Lines x={144} y={104} width={150} count={1} gap={0} thickness={7} opacity={0.2} widths={[1]} />
      </Panel>

      {Array.from({ length: 8 }, (_, i) => {
        const x = 88 + (i % 4) * 78;
        const y = 156 + Math.floor(i / 4) * 102;
        const active = i === 2;
        return (
          <Panel key={i} x={x} y={y} width={62} height={86} radius={8} emphasis={active ? 0.9 : 0.24}>
            <circle cx={x + 31} cy={y + 32} r={15} fill="var(--primary)" fillOpacity={active ? 0.7 : 0.22} />
            <path d={`M${x + 14} ${y + 70} a17 17 0 0 1 34 0z`} fill="var(--primary)" fillOpacity={active ? 0.5 : 0.16} />
          </Panel>
        );
      })}

      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={104 + i * 26} cy={378} r={i === 1 ? 8 : 5} fill="var(--primary)" fillOpacity={i === 1 ? 0.9 : 0.25} />
        ))}
      </g>

      <Panel x={434} y={108} width={288} height={268} emphasis={0.85}>
        <circle cx={578} cy={188} r={44} fill="var(--primary)" fillOpacity="0.65" />
        <path d="M528 268 a50 50 0 0 1 100 0z" fill="var(--primary)" fillOpacity="0.35" />
        <Lines x={472} y={292} width={212} count={3} gap={20} thickness={7} opacity={0.26} widths={[0.9, 1, 0.6]} />
      </Panel>
    </g>
  );
}

/* 09 — Valorant Info Hub: a mira, o agente e o mapa em planta */
function ValorantHubMotif() {
  return (
    <g>
      <g transform="translate(176 216)">
        <circle r={62} fill="none" stroke="var(--primary)" strokeOpacity="0.3" strokeWidth="2" />
        <circle r={7} fill="var(--primary)" fillOpacity="0.9" />
        <g {...stroke} strokeWidth={4}>
          <line x1={0} y1={-88} x2={0} y2={-30} />
          <line x1={0} y1={30} x2={0} y2={88} />
          <line x1={-88} y1={0} x2={-30} y2={0} />
          <line x1={30} y1={0} x2={88} y2={0} />
        </g>
      </g>

      <Panel x={88} y={330} width={190} height={92} emphasis={0.6}>
        <circle cx={128} cy={376} r={22} fill="var(--primary)" fillOpacity="0.6" />
        <Lines x={162} y={362} width={96} count={2} gap={18} thickness={6} opacity={0.3} widths={[1, 0.6]} />
      </Panel>

      <Panel x={330} y={92} width={392} height={300} emphasis={0.8}>
        <g fill="var(--primary)" fillOpacity="0.1">
          <rect x={356} y={118} width={132} height={104} rx={6} />
          <rect x={508} y={118} width={186} height={70} rx={6} />
          <rect x={356} y={242} width={90} height={124} rx={6} />
          <rect x={466} y={208} width={228} height={158} rx={6} />
        </g>
        <g {...stroke} strokeOpacity={0.55} strokeWidth={2.5}>
          <rect x={356} y={118} width={132} height={104} rx={6} />
          <rect x={508} y={118} width={186} height={70} rx={6} />
          <rect x={356} y={242} width={90} height={124} rx={6} />
          <rect x={466} y={208} width={228} height={158} rx={6} />
        </g>
        <path d="M422 222 v20 h44 v-34 h42" fill="none" stroke="var(--primary)" strokeOpacity="0.9" strokeWidth={3} strokeDasharray="9 8" strokeLinecap="round" />
        <circle cx={422} cy={170} r={9} fill="var(--primary)" fillOpacity="0.85" />
        <circle cx={580} cy={288} r={9} fill="var(--primary)" fillOpacity="0.45" />
      </Panel>
    </g>
  );
}

/* 10 — Fullstack Templates: o terminal da API e a tela do front, ligados pelo contrato gerado */
function FullstackTemplatesMotif() {
  return (
    <g>
      <Panel x={78} y={112} width={292} height={264} emphasis={0.85}>
        <g fill="var(--primary)">
          <circle cx={104} cy={138} r={5} fillOpacity={0.85} />
          <circle cx={122} cy={138} r={5} fillOpacity={0.5} />
          <circle cx={140} cy={138} r={5} fillOpacity={0.28} />
        </g>
        <path d="M104 174 l12 9 l-12 9" {...stroke} />
        <Lines x={128} y={180} width={190} count={1} gap={0} thickness={7} opacity={0.4} widths={[1]} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <Chip x={104} y={214 + i * 36} width={50} height={16} filled={i === 1} />
            <Lines x={166} y={219 + i * 36} width={170} count={1} gap={0} thickness={6} opacity={0.24} widths={[i % 2 ? 0.62 : 1]} />
          </g>
        ))}
      </Panel>

      <path d="M370 244 C 410 244, 418 206, 458 206" fill="none" stroke="var(--primary)" strokeOpacity="0.85" strokeWidth={3} strokeDasharray="9 8" strokeLinecap="round" />
      <g>
        <circle cx={414} cy={226} r={24} fill="var(--card)" fillOpacity="0.95" />
        <circle cx={414} cy={226} r={24} fill="none" stroke="var(--primary)" strokeOpacity="0.6" strokeWidth="2.5" />
        <path d="M408 214 c-6 0 -6 4 -6 7 s-2 5 -5 5 c3 0 5 2 5 5 s0 7 6 7" {...stroke} strokeWidth={2.5} />
        <path d="M420 214 c6 0 6 4 6 7 s2 5 5 5 c-3 0 -5 2 -5 5 s0 7 -6 7" {...stroke} strokeWidth={2.5} />
      </g>

      <Panel x={458} y={92} width={268} height={304} emphasis={0.6}>
        <rect x={482} y={116} width={220} height={30} rx={9} fill="var(--primary)" fillOpacity="0.1" stroke="var(--primary)" strokeOpacity="0.45" strokeWidth="2" />
        <Lines x={500} y={128} width={110} count={1} gap={0} thickness={6} opacity={0.22} widths={[1]} />
        {[0, 1, 2, 3].map((i) => {
          const y = 166 + i * 46;
          const done = i < 2;
          return (
            <g key={i}>
              <rect x={482} y={y} width={22} height={22} rx={6} fill="var(--primary)" fillOpacity={done ? 0.8 : 0} stroke="var(--primary)" strokeOpacity="0.7" strokeWidth="2" />
              {done ? <path d={`M487 ${y + 11} l5 5 l9 -10`} fill="none" stroke="var(--card)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /> : null}
              <Lines x={518} y={y + 3} width={170} count={2} gap={11} thickness={5} opacity={done ? 0.18 : 0.3} widths={[1, 0.55]} />
            </g>
          );
        })}
        <g>
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={570 + i * 22} cy={370} r={i === 0 ? 7 : 5} fill="var(--primary)" fillOpacity={i === 0 ? 0.9 : 0.25} />
          ))}
        </g>
      </Panel>
    </g>
  );
}

export const COVER_MOTIFS = {
  fullstackTemplates: FullstackTemplatesMotif,
  workoutTracker: WorkoutTrackerMotif,
  autoCars: AutoCarsMotif,
  fincheck: FincheckMotif,
  documentSignature: DocumentSignatureMotif,
  cinematecando: CinematecandoMotif,
  setupProStore: SetupProStoreMotif,
  fastKing: FastKingMotif,
  marvelTechTest: MarvelExplorerMotif,
  valorantHub: ValorantHubMotif,
} as const;

export type CoverMotifId = keyof typeof COVER_MOTIFS;

export function isCoverMotifId(id: string): id is CoverMotifId {
  return id in COVER_MOTIFS;
}
