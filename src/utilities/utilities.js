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
import zionna from "/Team Profiles/zionna.jpg";
import caleb from "/Team Profiles/caleb.jpg";
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
                      : name == "Miles Acquaviva"
                        ? miles
                        : name == "Zionna Brown"
                          ? zionna
                          : name == "Caleb Skelly"
                            ? caleb
                            : name == "Julian Cabrera"
                              ? julian
                              : "https://via.placeholder.com/150";
};

export { getPfpImage };
