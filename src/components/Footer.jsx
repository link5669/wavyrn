import { useTranslation } from "../hooks/useTranslation";

const Footer = () => {
    const { t } = useTranslation();
    return (
        <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px 25%",
          backgroundColor: "black",
          zIndex: 1000,
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            style={{
              maxHeight: "45px",
              flexShrink: 1,
            }}
            src="/images/logo_red.png"
          />
          <span style={{
            color: "black",
            fontSize: "0.5em",
            marginLeft: "3px",
            marginTop: "-8px",
            verticalAlign: "top",
            lineHeight: "1"
          }}>™</span>
        </div>
        <p
          style={{
            color: "white",
            margin: 0,
            lineHeight: "50px",
            whiteSpace: "nowrap", // Prevents text wrapping
          }}
        >
          {t('footer.copyright')}
        </p>
      </div>
    );
};

export default Footer;