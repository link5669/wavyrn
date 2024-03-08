const PlayPause = ({ isPlaying }) => {
    return (
      <>
        {isPlaying ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 16 16"
            style={{
              position: "relative",
              width: "35px",
              height: "35px",
              borderStyle: "solid",
              borderColor: "white",
              borderRadius: "50%",
            }}
          >
            <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
          </svg>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "35px",
              height: "35px",
              borderStyle: "solid",
              borderColor: "white",
              borderRadius: "50%",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 16 16"
              style={{
                width: "40px",
                height: "40px",
                transform: "translateX(1px)",
              }}
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
            </svg>
          </div>
        )}
      </>
    );
  };
  
  export default PlayPause;