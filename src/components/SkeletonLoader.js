import React from "react";

const styles = {
  container: {
    maxWidth: "120rem",
    padding: "0 3.2rem",
    margin: "0 auto",
    width: "800px",
  },
  section: {
    marginTop: "10px",
    padding: "2.2rem",
    borderRadius: "0.3rem",
    boxShadow:
      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
  },
  skeletonLine: (width = "100%", height = "20px") => ({
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    width,
    height,
    marginBottom: "10px",
    animation: "pulse 1.5s infinite",
  }),
};

const SkeletonLoader = () => {
  return (
    <div style={styles.container}>
      {[1, 2].map((_, idx) => (
        <div key={idx} style={styles.section}>
          <div style={styles.skeletonLine("60%", "24px")} />
          <div style={styles.skeletonLine("100%", "16px")} />
          <div style={styles.skeletonLine("90%", "16px")} />
          <div style={styles.skeletonLine("95%", "16px")} />
        </div>
      ))}
      {/* Add keyframes for animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              background-color: #e0e0e0;
            }
            50% {
              background-color: #f5f5f5;
            }
            100% {
              background-color: #e0e0e0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SkeletonLoader;
