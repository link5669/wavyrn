import "./DarkOverlay.css";

/**
 * Reusable dark overlay to sit between a background image and foreground content.
 * Use inside a position: relative container; overlay covers the container at the given opacity.
 */
const DarkOverlay = ({ opacity = 0.3, className = "", ...props }) => (
    <div
        className={`dark-overlay ${className}`.trim()}
        style={{ opacity }}
        aria-hidden="true"
        {...props}
    />
);

export default DarkOverlay;
