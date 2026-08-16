type TechIconProps = {
  /** Devicon CSS class, e.g. "devicon-html5-plain" (requires the global devicon CDN stylesheet). */
  deviconClass: string;
  label: string;
  size?: number;
};

export function TechIcon({ deviconClass, label, size = 18 }: TechIconProps) {
  return <i className={deviconClass} style={{ fontSize: size }} aria-hidden="true" title={label} />;
}
