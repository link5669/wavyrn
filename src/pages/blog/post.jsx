import ReactPlayer from "react-player"
import { Player } from "react-simple-player"

const Post = ({isMobile}) => {
    return (
        <>
            {/* <div
                style={{
                    backgroundImage: "url('/images/dnd.jpg?url')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: isMobile ? "150%" : "100%",
                    height: "11em",
                    width: "100vw",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: isMobile ? ".5em" : "1em",
                }}
            >
                {isMobile ? (
                    <p
                        style={{
                            paddingTop: isMobile && "3%",
                            marginBottom: ".5em",
                            marginTop: isMobile ? "0em" : "1em",
                            color: "white",
                            fontSize: "2.5em",
                            textAlign: "center",
                        }}
                    >
                        <b>
                            Blog
                        </b>
                    </p>
                ) : (
                    <>
                        <h1
                            style={{
                                paddingTop: isMobile ? "5%" : "0%",
                                marginBottom: ".5em",
                                marginTop: isMobile ? "0em" : "1em",
                                color: "white",
                                fontSize: '5em',
                                fontWeight: "bold"
                            }}
                        >
                            Blog
                        </h1>
                    </>
                )}
            </div> */}
            {/* width: "80vw", */}
            <div style={{ float: "left", backgroundColor: "RGB(1,1,1)" }}>
                <div style={{ margin: !isMobile && "7vh", padding: isMobile ? "3%": "2vw", backgroundColor: "white", borderRadius: !isMobile &&"30px" }}>
                    <h2>
                        The Sound Design of Delta Emblock, An Original Character from Resurgence of the Storm
                    </h2>
                    <h4 style={{ color: 'grey', fontSize: "1.4em" }}>
                        by Caleb Skelly<br />
                        {/* <div style={{ paddingBottom: "1vw" }} /> */}
                        August 11th, 2024
                    </h4>
                    <img style={{ paddingTop: "1vw", paddingBottom: "1vw", width: '40vw' }} src="https://www.dl.dropboxusercontent.com/scl/fi/ax771z19zz57mkuoornrq/ROTS-_FullBanner.png?rlkey=57o4zwids4p6ha96uvwxzb5qx&e=1&dl=0" />
                    <p>
                        I'm Caleb Skelly, and I'm the Lead Sound Designer for Delta Emblock in Resurgence of the Storm.
                        <br /><br />
                        This is a behind-the-scenes look at how I created her identity as a brand new character in the Resurgence environment. While I’m familiar with Heroes of the Storm, I didn't really get to play a whole lot of it, but I really love how there are a lot of different characters from a lot of different properties coming together. Delta specifically is from StarCraft and I’ve played a little bit of StarCraft. I think Delta is a bit of a deep-cut character, so we had a lot of freedom when it came to designing her both gameplay-wise and sound-wise.
                        <br /><br />
                        StarCraft has a really strong set of sounds they use to identify specific groups or factions. The Protoss have a shimmery, glassy sort of feel, and the Zerg are more organic and squishy. Humans, like Delta, have a neutral presence in that their equipment is technologically advanced, but they're not really harnessing raw psychic power or biological power like the other two groups are. But Delta's main characteristic is that she's psionic and that makes her different from a lot of other characters. It sets her apart in both StarCraft and Resurgence, so while her core sounds are based on military audio—like rifle shots and reloads and handling magazines and bullets and stuff you would see in war and battle—they're augmented by her own psychic ability and they take on a more unique and otherworldly quality, especially when sound gets involved.
                        <br /><br />
                        She also has a weapon-swapping mechanic built into her kit, which is kind of what she's based around as a character in-game. This made her palette a lot more interesting and honestly a pretty fun challenge.
                        <br /><br />
                        <video controls width="400vw">
                            <source src="https://www.dl.dropboxusercontent.com/scl/fi/yuvidf97uuilabd7l6gbw/CLIP-1.mp4?rlkey=83yo6wwywwjhcdcgvolfdrusb&dl=0" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <br /><br />
                        Her weapons each have a distinct core sound that is used in their shot, impact, and swap sounds, so her rifle is booming and resonant like a sniper usually is…
                        <br /><br /><video controls width="400vw" preload="metadata" crossOrigin="anonymous">
                            <source src="https://www.dl.dropboxusercontent.com/scl/fi/93jmerneqtx53xfuvpcm5/CLIP-2.mp4?rlkey=ppe0lmz78jc3v90dvcb83m52b&dl=0" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <br /><br />
                        And her railgun uses electrical crackling and sparking…
                        <br /><br /><video type="video/mp4" src="https://www.dl.dropboxusercontent.com/scl/fi/nr6ldpmh4jros3vyh19fl/CLIP-3.mp4?rlkey=kaon7gvpncnit6f13vnhtw237&dl=1" controls width="400vw" />
                        <br /><br />
                        But her rocket launcher is more of a liquid plasma, pneumatic hissing kind of weapon. It's not all junky, but it makes a lot of noise. It's not exactly quiet equipment. Her Q ability, which is her long shot for lack of a better phrase, changes. The sound changes depending on which weapon she currently has in play, so taking into account those core characteristics of each of the three weapons above, her Q ability will change depending on what weapon she has in hand.
                        <br /><br /><video type="video/mp4" src="https://www.dl.dropboxusercontent.com/scl/fi/ccn6pjaehloumbb76q8uo/CLIP-4.mp4?rlkey=e1j881ptu6sz7dplaru329r82&dl=1" controls width="400vw" />
                        <br /><br />
                        Her E ability is her primary escape and stealth option, and that was made by swinging a plastic PVC pipe and adding a lot of heavy flanging effects and ring modulation to create a fast fading shimmering effect, almost like a ghost. Her first ultimate was made using various clinking and clanging sounds. I was inspired by the LEGO building sound from the LEGO games. Some were foley, some were sourced, some were synthesized, to create that rapid building up and then breaking down effect of her pylons as they come in and out.
                        <br /><br />
                        <Player
                            grey={[206, 0, 54]}
                            accent={[255, 0, 0]}
                            src={"https://www.dl.dropboxusercontent.com/scl/fi/qcoehhyzfpr209itpet1s/CLIP-5.wav?rlkey=jc6zxrrdmywaxwm9ldl2rhetx&dl=1"}
                            height={30}
                            style={{width: '30vw'}}
                        />
                        {/* <video type="video/mp4" src="https://www.dl.dropboxusercontent.com/scl/fi/qcoehhyzfpr209itpet1s/CLIP-5.wav?rlkey=jc6zxrrdmywaxwm9ldl2rhetx&dl=1" controls width="800px" /> */}
                        <br /><br />
                        Delta in all is supposed to sort of represent humanity on another level, and I was given a lot of parameters to work in, specifically references to previous StarCraft properties and other kinds of references to keep her unique and distinct, but also in line with what they imagined her to be.
                        <br /><br />
                        So making her was a fun and interesting challenge, and I love that I got the opportunity to do it.
                    </p>
                </div>
            </div>
            <footer
                style={{
                    backgroundColor: "black",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50px",
                }}
            >
                <p style={{ color: "white", textAlign: "center", lineHeight: "50px" }}>
                    ©️2024 Wavyrn • All Rights Reserved
                </p>
            </footer>
        </>
    )
}

export default Post