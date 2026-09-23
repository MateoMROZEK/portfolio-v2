import { ImageResponse } from "next/og";
import { PC_BUILDS, getPCBuild, shortComponentName, type ComponentCategory } from "@/lib/pcbuilder";

// Placeholder visual for PC builds without a photo, rendered once at build time.
export const dynamic = "force-static";

export function generateStaticParams() {
  return PC_BUILDS.map((build) => ({ slug: build.slug }));
}

const WIDTH = 1200;
const HEIGHT = 750;

const NAVY_950 = "#101c30";
const NAVY_900 = "#152642";
const GOLD = "#b18e58";
const GOLD_SOFT = "#cbb389";

const SPEC_ROWS: { category: ComponentCategory; label: string }[] = [
  { category: "processor", label: "CPU" },
  { category: "graphic-card", label: "GPU" },
  { category: "ram", label: "RAM" },
  { category: "ssd", label: "SSD" },
];

async function loadMontserrat(weight: number): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Montserrat:wght@${weight}`
    ).then((res) => res.text());
    const url = /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/.exec(css)?.[1];
    return url ? await fetch(url).then((res) => res.arrayBuffer()) : null;
  } catch {
    return null;
  }
}

/** Front-three-quarter outline of a tower case with a glass panel, drawn in gold. */
function TowerIllustration() {
  return (
    <svg width="360" height="460" viewBox="0 0 360 460" fill="none">
      {/* side depth */}
      <path d="M250 40 L310 15 L310 395 L250 420 Z" fill={NAVY_900} stroke={GOLD} strokeWidth="2" />
      <path d="M40 40 L100 15 L310 15 L250 40 Z" fill={NAVY_900} stroke={GOLD} strokeWidth="2" />
      {/* glass side panel */}
      <rect
        x="40"
        y="40"
        width="210"
        height="380"
        rx="6"
        fill="rgba(203,179,137,0.06)"
        stroke={GOLD}
        strokeWidth="2"
      />
      <rect
        x="56"
        y="56"
        width="178"
        height="348"
        rx="4"
        stroke={GOLD_SOFT}
        strokeOpacity="0.35"
        strokeWidth="1.5"
      />
      {/* top radiator fans */}
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={90 + i * 55}
          cy="84"
          r="20"
          stroke={GOLD_SOFT}
          strokeOpacity="0.6"
          strokeWidth="1.5"
        />
      ))}
      {/* motherboard + cpu block */}
      <rect
        x="72"
        y="118"
        width="120"
        height="150"
        rx="3"
        stroke={GOLD_SOFT}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />
      <rect x="108" y="150" width="40" height="40" rx="6" stroke={GOLD} strokeWidth="2" />
      {/* ram sticks */}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={162 + i * 7} y="132" width="3" height="70" fill={GOLD} opacity="0.7" />
      ))}
      {/* graphics card */}
      <rect
        x="66"
        y="288"
        width="160"
        height="38"
        rx="4"
        fill="rgba(177,142,88,0.18)"
        stroke={GOLD}
        strokeWidth="2"
      />
      <circle cx="112" cy="307" r="12" stroke={GOLD_SOFT} strokeWidth="1.5" />
      <circle cx="160" cy="307" r="12" stroke={GOLD_SOFT} strokeWidth="1.5" />
      {/* psu shroud */}
      <rect
        x="56"
        y="350"
        width="178"
        height="54"
        rx="3"
        fill="rgba(177,142,88,0.08)"
        stroke={GOLD_SOFT}
        strokeOpacity="0.4"
        strokeWidth="1.5"
      />
      {/* front panel accent */}
      <path
        d="M280 70 L280 360"
        stroke={GOLD}
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* feet */}
      <rect x="60" y="420" width="30" height="8" rx="2" fill={GOLD} opacity="0.6" />
      <rect x="200" y="420" width="30" height="8" rx="2" fill={GOLD} opacity="0.6" />
    </svg>
  );
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const build = getPCBuild(slug);
  if (!build) return new Response("Not found", { status: 404 });

  const specs = SPEC_ROWS.flatMap(({ category, label }) => {
    const component = build.components.find((c) => c.category === category);
    return component ? [{ label, value: shortComponentName(component.name) }] : [];
  });

  const [bold, medium] = await Promise.all([loadMontserrat(700), loadMontserrat(500)]);
  const fonts = [
    bold && { name: "Montserrat", data: bold, weight: 700 as const, style: "normal" as const },
    medium && { name: "Montserrat", data: medium, weight: 500 as const, style: "normal" as const },
  ].filter((f) => f !== null);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        fontFamily: "Montserrat",
        color: "white",
        backgroundColor: NAVY_950,
        backgroundImage: `radial-gradient(circle at 75% 45%, ${NAVY_900} 0%, ${NAVY_950} 65%)`,
        position: "relative",
      }}
    >
      {/* dotted grid */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundImage: "radial-gradient(rgba(203,179,137,0.14) 1.5px, transparent 1.5px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: 720,
          padding: "0 0 0 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 40, height: 3, backgroundColor: GOLD }} />
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 4, color: GOLD }}>
            {(build.type_project ?? "PC Build").toUpperCase()}
          </div>
        </div>

        <div style={{ marginTop: 22, fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>
          {build.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 40 }}>
          {specs.map((spec) => (
            <div key={spec.label} style={{ display: "flex", alignItems: "center", gap: 18 }}>
              <div
                style={{
                  width: 72,
                  flexShrink: 0,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: GOLD_SOFT,
                }}
              >
                {spec.label}
              </div>
              <div style={{ fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,0.85)" }}>
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            alignSelf: "flex-start",
            padding: "8px 18px",
            borderRadius: 999,
            border: `1.5px solid ${GOLD}`,
            fontSize: 16,
            fontWeight: 500,
            letterSpacing: 1,
            color: GOLD_SOFT,
          }}
        >
          Photo à venir · Photo coming soon
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TowerIllustration />
      </div>

      <div
        style={{
          position: "absolute",
          right: 56,
          bottom: 40,
          display: "flex",
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 3,
        }}
      >
        <span style={{ color: "white" }}>Z3K</span>
        <span style={{ color: GOLD }}>.DEV</span>
      </div>
    </div>,
    { width: WIDTH, height: HEIGHT, fonts: fonts.length ? fonts : undefined }
  );
}
