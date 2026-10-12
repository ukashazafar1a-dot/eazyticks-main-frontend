import OriginalLogo from "@/assets/OriginalLogo";

export default function Loading() {
  return (
    <div
      className="site-loading"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        overflow: "hidden",
        background: "#343a40",
        width: "100%"
      }}
    >
      <OriginalLogo />
    </div>
  );
}
