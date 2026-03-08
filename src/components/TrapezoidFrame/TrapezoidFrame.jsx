import "./TrapezoidFrame.css";

/**
 * Reusable trapezoid frame: semi-transparent gray fill with red border,
 * plus fully opaque gray corner triangles on the left and right.
 * Triangles use the screen edge, a small portion of the bottom edge, and a diagonal hypotenuse.
 *
 * @param {string} [className] - Extra class names for the wrapper
 * @param {number} [widthPercent=42] - Width of the center trapezoid as % of container (e.g. 42 = narrow, 65 = wider)
 * @param {number} [topWidthPercent=42] - Width of the trapezoid's top edge as % (shape); often same as widthPercent
 * @param {number} [bottomWidthPercent=100] - Unused; reserved for future shape tweaks
 * @param {number} [triangleWidthPercent=8] - Width of each side corner triangle as % of container
 */
const TrapezoidFrame = ({
    className = "",
    fill = "rgba(0, 0, 0, 0.55)",
    borderColor = "#CE0036",
    borderWidth = 2.2,
    topWidthPercent = 42,
    bottomWidthPercent = 100,
    widthPercent = 42,
    triangleFill = "rgba(45, 45, 50, 1)",
    triangleWidthPercent = 8,
    style = {},
}) => {
    const topInset = (100 - topWidthPercent) / 2;
    const points = `${topInset},0 ${100 - topInset},0 100,100 0,100`;
    const horizontalInset = (100 - widthPercent) / 2;

    return (
        <div className={`trapezoid-frame-wrapper ${className}`.trim()} style={style} aria-hidden="true">
            <div className="trapezoid-frame-overlay" />
            {/* Left corner triangle: screen edge (left), small bottom segment, diagonal hypotenuse */}
            <div
                className="trapezoid-frame-corner trapezoid-frame-corner--left"
                style={{ width: `${triangleWidthPercent}%` }}
            >
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="0,0 0,100 100,100" fill={triangleFill} />
                                        <line x1="0" y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" stroke={borderColor} strokeWidth={borderWidth} />

                </svg>
            </div>
            {/* Right corner triangle: screen edge (right), small bottom segment, diagonal hypotenuse */}
            <div
                className="trapezoid-frame-corner trapezoid-frame-corner--right"
                style={{ width: `${triangleWidthPercent}%` }}
            >
                <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <polygon points="100,0 100,100 0,100" fill={triangleFill} />
                    <line x1="100" y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" stroke={borderColor} strokeWidth={borderWidth} />
                </svg>
            </div>
            {/* Center trapezoid */}
            <div
                className="trapezoid-frame"
                style={{
                    left: `${horizontalInset}%`,
                    right: "auto",
                    width: `${widthPercent}%`,
                }}
            >
                <svg
                    className="trapezoid-frame-svg"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                >
                    <polygon
                        points={points}
                        fill={fill}
                        stroke="none"
                    />
                    {/* Top and side borders only; bottom border invisible */}
                    <line x1={topInset} y1="0" x2={100 - topInset} y2="0" vectorEffect="non-scaling-stroke" stroke={borderColor} strokeWidth={borderWidth} />
                    <line x1={topInset} y1="0" x2="0" y2="100" vectorEffect="non-scaling-stroke" stroke={borderColor} strokeWidth={borderWidth} />
                    <line x1={100 - topInset} y1="0" x2="100" y2="100" vectorEffect="non-scaling-stroke" stroke={borderColor} strokeWidth={borderWidth} />
                </svg>
            </div>
        </div>
    );
};

export default TrapezoidFrame;
