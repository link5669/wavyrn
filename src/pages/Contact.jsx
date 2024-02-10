import WavNavbar from "../components/Navbar";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
//secret key 6Lcjzm0pAAAAALljx7Dmg7Drp3AnYz8GThhT91JZ

const Contact = () => {
  const captchaRef = useRef(null);
  const handleSubmit = (e) => {
    // e.preventDefault();
    // const token = captchaRef.current.getValue();
    // captchaRef.current.reset();
  };

  return (
    <>
      <WavNavbar />
      <ReCAPTCHA
        sitekey={"6Lcjzm0pAAAAADPgllq3V1121dMrCMYnZwaRSLr5"}
        ref={captchaRef}
      />
    </>
  );
};

export default Contact;
