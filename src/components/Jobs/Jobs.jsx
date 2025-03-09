import { Col, Container, Row } from "react-bootstrap";
import "./Jobs.css";
import BoxCell from "../BoxCell";
import { useEffect, useState } from "react";

const Jobs = ({ selected, setSelected }) => {
    const [currUnderline, setCurrUnderline] = useState(0);
    useEffect(() => {
        setCurrUnderline(selected);
    }, [selected]);
    const handleMouseOver = (index) => {
        setCurrUnderline(index);
    };

    return (
        <div onMouseOut={() => setCurrUnderline(selected)}>
            <Container style={{ margin: "0px" }}>
                <Row style={{ height: "10em", width: "100vw", padding: 0 }}>
                    <Col
                        className="parent"
                        style={{ padding: 0 }}
                        onClick={() => {
                            setSelected(0);
                        }}
                    >
                        <BoxCell
                            onMouseOver={() => handleMouseOver(0)}
                            isUnderlined={currUnderline == 0 ? true : false}
                            selected={selected == 0 ? true : false}
                            title="Audio Directing"
                            subtitle="Project Management & Coordination"
                            imageName="https://www.dl.dropboxusercontent.com/scl/fo/a3fkjiwf82shfmcfkxldd/AFwotJtNsDI6BmtoO5tia_M/Services%20-%20Audio%20Directing.jpg?rlkey=h4gcwkyxfih2njqoxl8zl4f00&e=1&dl=0"
                        />
                    </Col>
                    <Col
                        className="parent"
                        style={{ padding: 0 }}
                        onClick={() => {
                            setSelected(1);
                        }}
                    >
                        <BoxCell
                            onMouseOver={() => handleMouseOver(1)}
                            isUnderlined={currUnderline == 1 ? true : false}
                            selected={selected == 1 ? true : false}
                            title="Production"
                            subtitle="Mixing, Mastering, & Music Editing"
                            imageName="https://www.dl.dropboxusercontent.com/scl/fo/a3fkjiwf82shfmcfkxldd/AEaWTRrOJOEPU-mj-F5OI2Q/Services%20-%20Production.png?rlkey=h4gcwkyxfih2njqoxl8zl4f00&e=1&dl=0"
                        />
                    </Col>
                </Row>
            </Container>
            <Container style={{ margin: "0px" }}>
                <Row style={{ height: "10em", width: "100vw" }}>
                    <Col
                        className="parent"
                        style={{ padding: 0 }}
                        onClick={() => {
                            setSelected(2);
                        }}
                    >
                        <BoxCell
                            onMouseOver={() => handleMouseOver(2)}
                            isUnderlined={currUnderline == 2}
                            selected={selected == 2}
                            title="Sound Design"
                            subtitle="Sound Effects, Ambiences, Foley, & Sonic Branding"
                            imageName="https://www.dl.dropboxusercontent.com/scl/fo/a3fkjiwf82shfmcfkxldd/ADH5NYZVhydXIWbvm82mkNI/Services%20-%20Sound%20Design.jpg?rlkey=h4gcwkyxfih2njqoxl8zl4f00&e=1&dl=0"
                            backgroundPosition="center 30%" // Move Sound Design image up
                        />
                    </Col>
                    <Col
                        className="parent"
                        style={{ padding: 0 }}
                        onClick={() => {
                            setSelected(3);
                        }}
                    >
                        <BoxCell
                            onMouseOver={() => handleMouseOver(3)}
                            isUnderlined={currUnderline == 3}
                            selected={selected == 3}
                            title="Music"
                            subtitle="Film, Games, Theme Parks, Trailers, & Interactive Media"
                            imageName="https://www.dl.dropboxusercontent.com/scl/fo/a3fkjiwf82shfmcfkxldd/AKK1cD493aHirAoU0KU6Fzg/Services%20-%20Music.png?rlkey=h4gcwkyxfih2njqoxl8zl4f00&e=1&dl=0"
                        />
                    </Col>
                    <Col
                        className="parent"
                        style={{ padding: 0 }}
                        onClick={() => {
                            setSelected(4);
                        }}
                    >
                        <BoxCell
                            onMouseOver={() => handleMouseOver(4)}
                            isUnderlined={currUnderline == 4}
                            selected={selected == 4}
                            title="Voice Acting"
                            subtitle="Writing, Casting, Editing & Voice Acting"
                            imageName="https://www.dl.dropboxusercontent.com/scl/fo/tmx340km7moqr280v7if3/h/Website%20Photos/Services%20-%20Voiceover.png?rlkey=rgp43tzu84ovmy10j9gni62q5&e=1&dl=0"
                            backgroundPosition="center 50%" // Move Production image down
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Jobs;
