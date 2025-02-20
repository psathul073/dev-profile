import PropTypes from "prop-types";
import Icons from "./Icons";
import useSound from "use-sound";
// import ProjectImage from "./ProjectImage";
import SkeltonCard from "./SkeltonCard";
import { lazy, Suspense, useState, useEffect } from "react";
import CardButton from "./CardButton";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  runTransaction,
  get,
} from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";

const ProjectImage = lazy(() => delayForImage(import("./ProjectImage")));

const ProjectView = (props) => {
  // Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  // Initializes Firebase with your credentials.
  const app = initializeApp(firebaseConfig);
  // Creates a reference to Firebase Realtime Database.
  const database = getDatabase(app);
  // Add authentication
  const auth = getAuth(app);
  // Create cardLike node
  const cardLikesRef = ref(database, `projects/${props.cardId}`);
  // project data
  const { name, details, imageURL, demoLink, sourceCode } = props.projectData;

  const [isVisibleBug, setIsVisibleBug] = useState(true);
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [hasClickBug, setHasClickBug] = useState(false);
  // Sounds
  const [play] = useSound("/sound/click.mp3");

  // To update the like count in real time listener
  useEffect(() => {
    // Handle authentication
    signInAnonymously(auth)
      .then((userCredential) => {
        const uid = userCredential.user.uid;
        setUser(userCredential.user);

        // Check if user has already liked this project card
        const userLikeRef = ref(
          database,
          `projects/${props.cardId}/userLikes/${uid}`
        );

        get(userLikeRef).then((snapshot) => {
          // if user is already liked
          if (snapshot.exists()) {
            setHasClickBug(true);
            setIsVisibleBug(false); // hide bug button
          }
        });
      })
      .catch((error) => {
        console.error("Auth error", error);
      });

      // add current like count
    onValue(cardLikesRef, (snapshot) => {
      const cardData = snapshot.val() || { totalLikes: 0 };
      setCount(cardData.totalLikes || 0);
    });
  }, []);

  function handleClick() {
    console.log("handle clicked");

    if (!user) {
      alert("Please wait for authentication");
      return;
    }

    if (hasClickBug) {
      alert("You've already done this!");
      return;
    }

    // Create structure of update data.
    const updates = {};
    updates[`projects/${props.cardId}/userLikes/${user.uid}`] = true;

    runTransaction(cardLikesRef, (currentData) => {
      if (!currentData) {
        setIsVisibleBug(false);
        // return current card like reference
        return {
          totalLikes: 1,
          userLikes: {
            [user.uid]: true,
          },
        };
      }
      // Update the total likes and increment if user is not liked
      const newData = {
        ...currentData,
        totalLikes: (currentData.totalLikes || 0) + 1,
        userLikes: {
          ...(currentData.users || {}),
          [user.uid]: true,
        },
      };
      setIsVisibleBug(false);
      // Update the database
      return newData;
    })
      .then(() => {
        setHasClickBug(true);
      })
      .catch((error) => {
        console.error("Transaction failed:", error);
      });
  }

  // Hide project view
  function exitView() {
    props.exitButton(false);
  }

  return (
    <div className=" h-dvh w-dvw absolute top-0 flex justify-center items-center px-3  bg-gray-50 bg-[url(https://www.transparenttextures.com/patterns/cubes.png)] ">
      <Suspense fallback={<SkeltonCard />}>
        <div className="  sm:h-1/2  w-full lg:w-1/2 relative flex py-4 sm:py-2 px-4 gap-3  flex-col justify-center items-center sm:flex-row rounded-xl z-20 shadow-md bg-white">
          {/* Exit button */}
          <button
            className=" absolute  right-4 top-4 z-10 text-xl p-1 bg-slate-100 text-slate-500 font-bold  sm:bg-transparent rounded-full hover:border-slate-500 hover:bg-slate-100 focus:border-slate-500 focus:bg-slate-100 active:border-slate-500 active:bg-slate-100 hover:scale-105 focus:scale-105 active:scale-105 cursor-pointer animate-pulse"
            onClick={exitView}
          >
            <Icons name={"cross"} />{" "}
          </button>
          {/* Project image */}
          <ProjectImage imageURL={imageURL} text={name} />
          {/* project content */}
          <div className=" flex flex-col gap-3 h-full sm:w-[60%] sm:h-[95%] relative rounded-md p-2 ">
            <div className="text-[1.1rem] sm:text-xl font-black font-doto uppercase  text-black ">
              {/* Title */}
              <h3>{name}</h3>
            </div>

            <div className="overflow-y-scroll h-full sm:mb-18 sm:h-auto font-doto font-medium text-slate-700 antialiased sm:text-base ">
              {/* Paragraph */}
              <p>{details}</p>
            </div>
            {/* Buttons */}
            <div className=" w-full flex justify-evenly cursor-pointer border-t border-slate-200 pt-2">
              {isVisibleBug ? (
                <CardButton
                  btnClass={
                    "text-slate-700  hover:text-green-300 focus:text-green-300 active:text-green-300"
                  }
                  spanClass={"bg-green-100 shadow-green-100 text-green-400"}
                  iconName={"bug"}
                  text={`Bug∼${count}`}
                  onClick={handleClick}
                  disable={hasClickBug}
                  playSound={play}
                />
              ) : (
                <CardButton
                  btnClass={
                    "text-slate-700 hover:text-green-300 focus:text-green-300 active:text-green-300"
                  }
                  spanClass={"bg-green-100 shadow-green-100 text-green-400"}
                  iconName={"bugNet"}
                  text={`𓆣∼${count}`}
                  playSound={play}
                />
              )}

              <CardButton
                btnClass={
                  "text-slate-700 hover:text-indigo-300 focus:text-indigo-300 active:text-indigo-300"
                }
                spanClass={"bg-indigo-100 shadow-indigo-100 text-indigo-400"}
                iconName={"demo"}
                text={"Demo"}
                link={demoLink}
                playSound={play}
              />
              <CardButton
                btnClass={
                  "text-slate-700 hover:text-rose-300 focus:text-rose-300 active:text-rose-300 "
                }
                spanClass={"bg-rose-100 shadow-rose-100 text-rose-400"}
                iconName={"source"}
                text={"Source"}
                link={sourceCode}
                playSound={play}
              />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
};

// Load skelton image...
async function delayForImage(images) {
  return new Promise((resolve) => {
    setTimeout(resolve, 10000);
  }).then(() => images);
}

ProjectView.propTypes = {
  exitButton: PropTypes.func,
  projectData: PropTypes.object,
  cardId: PropTypes.number,
};

export default ProjectView;
