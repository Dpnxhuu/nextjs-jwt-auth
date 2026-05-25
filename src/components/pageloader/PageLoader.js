"use client"

export default function PageLoader() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "#0a0a0f",  // 👈 apne page ka bg color daal
      zIndex: 9999,
      gap: "16px",
    }}>
      <div style={{
        width: "44px",
        height: "44px",
        border: "3px solid #2a2a3a",       // 👈 dark track
        borderTop: "3px solid #7F77DD",     // 👈 purple spinner
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ color: "#888", fontSize: "14px" }}>Loading...</p>
    </div>
  )
}