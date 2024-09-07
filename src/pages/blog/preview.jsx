import ReactPlayer from "react-player"
import { Player } from "react-simple-player"
import { Link } from "react-router-dom"

const Preview = ({isMobile}) => {
    return (
        <div style={{ margin: !isMobile && "7vh", padding: "2vw", backgroundColor: "white", borderRadius: isMobile ? "0px" : "30px" }}>
            <h2>
                The Sound Design of Delta Emblock, An Original Character from Resurgence of the Storm
            </h2>
            <h4 style={{ color: 'grey', fontSize: "1.4em" }}>
                by Caleb Skelly<br />
                August 11th, 2024
            </h4>
            <img style={{ paddingTop: "1vw", paddingBottom: "1vw", width: '40vw' }} src="https://www.dl.dropboxusercontent.com/scl/fi/ax771z19zz57mkuoornrq/ROTS-_FullBanner.png?rlkey=57o4zwids4p6ha96uvwxzb5qx&e=1&dl=0" />

            <p>
                I'm Caleb Skelly, and I'm the Lead Sound Designer for Delta Emblock in Resurgence of the Storm.
                <br /><br />
                This is a behind-the-scenes look at how I created her identity as a brand new character in the Resurgence environment. While I’m familiar with Heroes of the Storm, I didn't really get to play a whole lot of it, but I really love how there are a lot of different characters from a lot of different properties coming together. Delta specifically is from StarCraft and I’ve played a little bit of StarCraft. I think Delta is a bit of a deep-cut character, so we had a lot of freedom when it came to designing her both gameplay-wise and sound-wise.
                <br /><br />
                StarCraft has a really strong set of sounds they use to identify specific groups or factions. The Protoss have a shimmery, glassy sort of feel, and the Zerg are more organic and squishy. Humans, like Delta, have a neutral presence in that their equipment is technologically advanced, but they're not really harnessing raw psychic power or biological power like the other two groups are. But Delta's main characteristic is that she's psionic and that makes her different from a lot of other characters. It sets her apart in both StarCraft and Resurgence, so while her core sounds are based on military audio—like rifle shots and reloads and handling magazines and bullets and stuff you would see in war and battle—they're augmented by her own psychic ability and they take on a more unique and otherworldly quality, especially when sound gets involved...
            </p>
            <Link
                to="/blog/240811-the-sound-design-of-delta-emblock"
            >
                <button style={{ backgroundColor: "#CE0036", borderRadius: '5px',color: "white" }}>Learn more</button>
            </Link>
        </div>
    )
}

export default Preview