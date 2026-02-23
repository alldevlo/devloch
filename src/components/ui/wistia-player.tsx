import Script from "next/script";

type WistiaPlayerProps = {
  mediaId: string;
  className?: string;
};

export function WistiaPlayer({ mediaId, className }: WistiaPlayerProps) {
  return (
    <div className={className}>
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      <Script src={`https://fast.wistia.com/embed/${mediaId}.js`} type="module" strategy="afterInteractive" />
      <wistia-player media-id={mediaId} aspect="1.7777777777777777" />
    </div>
  );
}
