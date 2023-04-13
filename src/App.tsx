import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import ayush_pic from "./assets/ayush.jpeg";

import c_icon from "./assets/tech_icons/c.png";
import docker_icon from "./assets/tech_icons/docker.webp";
import java_icon from "./assets/tech_icons/java.png";
import next_js_icon from "./assets/tech_icons/next_js.png";
import postgresql_icon from "./assets/tech_icons/postgresql.png";
import python_icon from "./assets/tech_icons/python.png";
import react_icon from "./assets/tech_icons/react.png";
import typescript_icon from "./assets/tech_icons/typescript.png";

import snackpass from "./assets/companies/snackpass.png";
import capitalOne from "./assets/companies/capital_one.png";
import appriss from "./assets/companies/appriss.png";

import family from "./assets/images/family.jpg";
import friends_1 from "./assets/images/IMG_1032.png";
import dev from "./assets/images/IMG_1148.jpg";
import shrad from "./assets/images/IMG_1565.png";
import friends_2 from "./assets/images/IMG_2189.jpeg";
import friends_3 from "./assets/images/IMG_2241.jpeg";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from "./styles.module.css";

function App() {
  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;
  const isDesktop = width > 768;

  // console.log(isMobile);

  const alignCenter = {
    display: "flex",
    alignItems: `${isMobile ? "normal" : "center"}`,
  };

  const AboutMeComponent: React.FC = () => {
    return (
      <div
        className={` text-black text-xl w-4/5 md:w-2/6 2xl:w-2/5 flex flex-col items-center md:ml-12 `}
      >
        <div className="font-sans shadow-blue-900 drop-shadow-lg animate-text bg-gradient-to-r from-slate-grey via-dark-teal to-dark-azure bg-clip-text text-transparent text-2xl lg:text-3xl 2xl:text-5xl font-extrabold z-10">
          hey, i'm ayush patel.
        </div>
        <div id="spacer" className="h-2 md:h-5"></div>
        {!isMobile && (
          <div className="font-sans shadow-blue-900 drop-shadow-lg animate-text bg-gradient-to-r from-poppy via-dark-teal to-dark-azure bg-clip-text text-transparent text-sm lg:text-xl 2xl:text-2xl font-regular z-10">
            I'm a software engineer.<br></br>
            Mostly interested in backend engineering, including infrastructure
            and distributed systems. <br></br> I've worked at...
          </div>
        )}
        {!isMobile && <div id="spacer" className="h-12"></div>}
        {isMobile && (
          <div className="font-sans grid grid-rows grid-cols-3 columns-md gap-x-6 -gap-y-12 text-sm md:text-2xl font-regular z-10 items-center">
            <div>
              <img
                src={snackpass}
                className={`w-12 h-12 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 ml-6`}
                alt=""
              ></img>
            </div>
            <div>
              <img
                src={capitalOne}
                className={`w-32 h-18 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 mt-2`}
                alt=""
              ></img>
            </div>
            <div>
              <img
                src={appriss}
                className={`w-32 h-18 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 mt-2`}
                alt=""
              ></img>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans font-bold text-xs">snackpass</div>
              <br></br>
              <div className="italic font-sans font-regular text-xs -my-5">
                swe intern '23
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans font-bold text-xs">capital one</div>
              <br></br>
              <div className="italic font-sans font-regular text-xs -my-5">
                swe intern '22
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-sans font-bold text-xs">appriss</div>
              <br></br>
              <div className="italic font-sans font-regular text-xs -my-5">
                swe intern '21
              </div>
            </div>
          </div>
        )}
        {isDesktop && (
          <div className="font-sans grid grid-rows grid-cols-2 columns-md gap-x-6 lg:gap-y-0 xl:gap-y-5 text-sm md:text-2xl font-regular z-10">
            <div>
              <img
                src={snackpass}
                className={`w-24 h-24 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 ml-8`}
                alt=""
              ></img>
            </div>
            <div className="pt-6 flex flex-col items-start mt-1">
              <div className="font-sans font-bold text-lg xl:text-2xl">
                snackpass
              </div>
              <br></br>
              <div className="italic font-sans font-regular text-sm xl:text-xl -my-6">
                swe intern '23
              </div>
            </div>
            <div>
              <img
                src={capitalOne}
                className={`w-44 h-24.75 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 `}
                alt=""
              ></img>
            </div>
            <div className="pt-6 flex flex-col items-start mt-1">
              <div className="font-sans font-bold text-lg xl:text-2xl">
                capital one
              </div>
              <br></br>
              <div className="italic font-sans font-regular text-sm xl:text-xl -my-6">
                swe intern '22
              </div>
            </div>

            <div>
              <img
                src={appriss}
                className={`w-44 h-24.75 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10`}
                alt=""
              ></img>
            </div>
            <div className="pt-6 flex flex-col items-start mt-1">
              <div className="font-sans font-bold text-lg xl:text-3xl">
                appriss
              </div>
              <br></br>
              <div className="italic font-sans font-regular text-sm xl:text-xl -my-6">
                swe intern '21
              </div>
            </div>
          </div>
        )}
        <div id="spacer" className="lg:h-2"></div>
        {/* {!isMobile && (
          <div className="font-sans shadow-blue-900 drop-shadow-lg animate-text bg-gradient-to-r from-poppy via-dark-teal to-dark-azure bg-clip-text text-transparent text-sm lg:text-2xl font-regular z-10">
            Reach out on LinkedIn for any inquies. <br></br> Hope you enjoyed my
            page!
          </div>
        )} */}
      </div>
    );
  };
  return (
    <Parallax pages={3.25}>
      <ParallaxLayer speed={.5} factor={1} offset={0}>
        <div className="container">
          {Array.from({ length: 99 }, (_, i) => i).map((_) => (
            <div className="snowflake"></div>
          ))}
        </div>
        <div className="App transition-all">
          <div id="spacer" className="h-1/6 md:h-2"></div>
          <div className="flex flex-col w-full h-screen justify-center items-center z-10">
            <img
              src={ayush_pic}
              className="w-52 h-52 md:w-64 md:h-64 rounded-full shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10"
              alt=""
            ></img>
            <div id="spacer" className="h-12"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg  animate-text bg-gradient-to-r from-dark-indigo via-indigo-400 to-dark-indigo bg-clip-text text-transparent text-2xl md:text-3xl font-extrabold z-10">
              Ayush Patel
            </div>
            <div id="spacer" className="h-4"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg animate-text bg-gradient-to-r from-dark-azure via-dark-indigo to-eerie-black bg-clip-text text-transparent text-xl md:text-xl font-extrabold z-10">
              swe intern @ snackpass
            </div>
            <div id="spacer" className="h-6"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg flex flex-row justify-center w-full items-center  z-10">
              <a className="" href="https://www.linkedin.com/in/ayushnpatel">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="font-sans transition ease-in-out delay hover:scale-110 h-9 md:h-12 text-dark-azure hover:text-indigo-400"
                />
              </a>
              <div className="w-6" />
              <a
                className=" bg-transparent z-10"
                href="https://www.github.com/ayushnpatel"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="h-9 md:h-12 transition ease-in-out delay hover:scale-110 text-dark-azure hover:text-indigo-400"
                />
              </a>
              <div className="w-6" />
              <a
                className=" bg-transparent z-10"
                href="https://www.instagram.com/ayush.127/"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="h-9 md:h-12 transition ease-in-out delay hover:scale-110 text-dark-azure hover:text-indigo-400"
                />
              </a>
              <div className="w-6" />
              <a
                className="bg-transparent z-10"
                href="src/assets/ayush_patel_resume.pdf"
              >
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="h-9 md:h-12 transition ease-in-out delay hover:scale-110 text-dark-azure hover:text-indigo-400"
                />
              </a>
            </div>
            <div id="spacer" className="h-8"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg  flex flex-row justify-center w-full items-center  z-10">
              <a className="" href="https://www.python.org">
                <img
                  src={python_icon}
                  className="w-8 h-8 md:w-12 md:h-12 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://www.typescriptlang.org">
                <img
                  src={typescript_icon}
                  className="w-7 h-7 md:w-10 md:h-10 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://www.java.com">
                <img
                  src={java_icon}
                  className="w-8 h-8 md:w-10 md:h-10 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a
                className=""
                href="https://en.wikipedia.org/wiki/C_(programming_language)l"
              >
                <img
                  src={c_icon}
                  className="w-7 h-8 md:w-8 md:h-10   z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://reactjs.org/">
                <img
                  src={react_icon}
                  className="w-8 h-7 md:w-12 md:h-10 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://www.postgresql.org/">
                <img
                  src={postgresql_icon}
                  className="w-8 h-8 md:w-12 md:h-12 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-2 md:w-4" />
              <a className="" href="https://www.docker.com/">
                <img
                  src={docker_icon}
                  className="w-8 h-8 md:w-12 md:h-12 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-2 md:w-4" />
              <a className="" href="https://www.nextjs.org/">
                <img
                  src={next_js_icon}
                  className="w-10 h-7 md:w-16 md:h-12 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
            </div>
            <div id="spacer" className="h-48 md:h-4"></div>
          </div>
        </div>
      </ParallaxLayer>
      <ParallaxLayer
        sticky={{ start: 1, end: 3 }}
        style={{
          ...alignCenter,
          justifyContent: `${isMobile ? "center" : "start"}`,
          paddingTop: `${isMobile ? "4vh" : "2vh"}`,
        }}
        speed={.5}
      >
        <AboutMeComponent />
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
        speed={isMobile ? 0.2 : .25}
        sticky={{ start: 2, end: 3 }}
        style={{
          ...alignCenter,
          justifyContent: `${isMobile ? "center" : "flex-end"}`,
          paddingTop: `${isMobile ? "22vh" : "12vh"}`,
          paddingRight: `${isDesktop ? "4vw" : "0vw"}`
          // paddingBottom: `${isMobile ? "40vh" : "0vh"}`
        }}
        
        className="pb-24"
      >
        <div
          className={`${
            isDesktop && styles.parallax
          } grid md:grid-rows-3  grid-cols-1 lg:grid-cols-2 md:gap-x-6 md:gap-y-6`}
        >
          <img
            src={friends_2}
            className={`row-span-2 md:row-span-1 w-48 h-32 xl:w-78 xl:h-52 mt-9 md:mt-1 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 rounded-xl`}
            alt=""
          ></img>
          <img
            src={family}
            className={`${
              isDesktop && styles.parallax
            } row-span-2 md:row-span-1 w-48 h-32 xl:w-78 xl:h-52 mt-5 md:mt-1 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>
          <img
            src={shrad}
            className={`${
              isDesktop && styles.parallax
            } row-span-2 md:row-span-1 w-48 h-32 xl:w-78 xl:h-52 mt-5 md:mt-1 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>

          <img
            src={friends_1}
            className={`${
              isDesktop && styles.parallax
            } invisible md:visible row-span-2 lg:row-span-1 w-48 h-32 xl:w-78 xl:h-52 mt-1 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>
          <img
            src={dev}
            className={`${
              isDesktop && styles.parallax
            } invisible md:visible row-span-2 lg:row-span-1 w-48 h-32 xl:w-78 xl:h-52 mt-1 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>

          <img
            src={friends_3}
            className={`${
              isDesktop && styles.parallax
            } invisible md:visible row-span-2 md:row-span-1 w-48 h-32 xl:w-78 xl:h-52 mt-1 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}

export default App;
