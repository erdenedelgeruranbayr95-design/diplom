export default function Preloader() {
  return (
    <div className="pre" id="pre">
      <b>МЭДРЭХ</b>
      <b id="pct" style={{ fontSize: "clamp(24px,4.5vw,54px)" }}>
        0
      </b>
      <div className="pre-line">
        <i id="pbar"></i>
      </div>
    </div>
  );
}
