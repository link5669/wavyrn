import marc from "/Team Profiles/Marc Yu/Marc Yu Profile Picture.jpg";
import austinb from "/Team Profiles/Austin Burkett/Austin Burkett Profile Picture.png";
import austinl from "/Team Profiles/Austin Leshock/Austin Leshock Profile Picture.jpg";
import max from "/Team Profiles/Max Jaime/Max Jaime Profile Picture.jpg";
import sam from "/Team Profiles/Sam Leigh/Sam Leigh Profile Picture.jpg";
import ananta from "/Team Profiles/Ananta Arora/Ananta Arora Profile Picture.jpg";
import angelica from "/Team Profiles/Angelica Ramos Profile Picture.jpg";
import gret from "/Team Profiles/Gret Price/Gret Price Profile Picture.jpg";
import paul from "/Team Profiles/IMG_0407.jpg";
import josh from "/Team Profiles/Josh Trochet Profile Pic.png";
import miles from "/Team Profiles/miles.png";
import julian from "/Team Profiles/julian.jpg";

const getPfpImage = (name) => {
    return name == "Marc Yu"
        ? marc
        : name == "Austin Burkett"
          ? austinb
          : name == "Austin Leshock"
            ? austinl
            : name == "Max Jaime"
              ? max
              : name == "Sam Leigh"
                ? sam
                : name == "Ananta Arora"
                  ? ananta
                  : name == "Angelica Ramos"
                    ? angelica
                    : name == "Gret Price"
                      ? gret
                      : name == "Paul Edward May"
                        ? paul
                        : name == "Josh Trochet"
                          ? josh
                          : name == "Neil Small"
                            ? "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/ACxo9WVOXI-04I-ydbhCzA0/Neil%20Small/WAVPFP.png?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                            : name == "Michelle Lai"
                              ? "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/ADv0rYvWSIqK3PVXpNuvhmU/Michelle%20Lai/2025%20Profile%20Picture.jpg?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                              : name == "Miles Acquaviva"
                                ? miles
                                : name == "Zionna Brown"
                                  ? "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/ACHgxIGUvgk5A6RNmwPOLn4/Zionna%20Brown/2025%20Zionna%20Brown%20Profile%20Pic.jpg?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                                  : name == "Quinne Houck"
                                    ? "https://media.discordapp.net/attachments/690615563864768513/1361072234952917022/side.jpg?ex=6806a74c&is=680555cc&hm=7a7e1d92a3fa82e3cb84160298b80c72abddbf961b81abe12405cf227d650a56&=&format=webp&width=690&height=921"
                                    : name == "Caleb Skelly"
                                      ? "https://www.dl.dropboxusercontent.com/scl/fo/7de9q581pxdwcvcvu4qep/AGk-WLXVxAdDn2VM_0XwFo0/Caleb%20Skelly/large.png?rlkey=pdazvtkk2j75glkyqgsj4m7oz&e=1&dl=0"
                                      : name == "Julian Cabrera"
                                        ? julian
                                        : "https://via.placeholder.com/150";
};

export { getPfpImage };
