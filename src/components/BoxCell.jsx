import { useEffect, useState } from "react";

const BoxCell = ({
    title,
    subtitle,
    selected,
    imageName,
    isUnderlined,
    onMouseOver,
    backgroundPosition = "center",
}) => {
    const [scale, setScale] = useState(100);
    const [underlineAnimation, setUnderlineAnimation] = useState(false);

    useEffect(() => {
        setUnderlineAnimation(selected);
    }, [selected]);

    const handleMouseOver = () => {
        setScale(120);
        setUnderlineAnimation(true);
        onMouseOver();
    };

    const handleMouseOut = () => {
        setScale(100);
        setUnderlineAnimation(false);
    };

    const underlineStyle = {
        textDecoration: "none",
        background: `linear-gradient(currentColor, currentColor) bottom / 0 0.1em no-repeat`,
        transition: "1s background-size",
        backgroundSize: isUnderlined ? "100% 0.1em" : "0% 0.1em",
        marginTop: "0px",
    };

    return (
        <div
            style={{
                backgroundImage: "url('" + imageName + "?url')",
                backgroundSize: "cover",
                transition: "0.4s",
                backgroundPosition: backgroundPosition, // Use the prop to control positioning
                position: "relative",
                overflow: "hidden",
            }}
            id="animate-area"
            onMouseOver={onMouseOver}
        >
            {/* Semi-opaque black overlay with blur */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "rgba(0, 0, 0, 0.7)",
                    backdropFilter: "blur(1px)",
                    zIndex: 1,
                }}
            ></div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 2,
                    display: "block",
                    textAlign: "center",
                }}
            >
                <h2 style={{ marginBottom: "0" }}>{title}</h2>
                <p
                    style={isUnderlined ? underlineStyle : {}}
                    className="underline-target"
                >
                    {subtitle}
                </p>
                <div className="underline"></div>
            </div>
        </div>
    );
};

export default BoxCell;
