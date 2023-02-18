import { useState, useEffect } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

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

  console.log(isMobile);

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
            I'm a software engineer whose worked at a couple of companies.
            Mostly interested in backend engineering, including infrastructure
            and distributed systems. <br></br> I've worked at...
          </div>
        )}
        {!isMobile && <div id="spacer" className="h-12"></div>}
        {isMobile && (
          <div className="font-sans grid grid-rows grid-cols-3 columns-md gap-x-6 -gap-y-12 text-sm md:text-2xl font-regular z-10 items-center">
            <div>
              <img
                src="src/assets/companies/snackpass.png"
                className={`w-12 h-12 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 ml-6`}
                alt=""
              ></img>
            </div>
            <div>
              <img
                src="src/assets/companies/capital_one.png"
                className={`w-32 h-18 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 mt-2`}
                alt=""
              ></img>
            </div>
            <div>
              <img
                src="src/assets/companies/appriss.png"
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
          <div className="font-sans grid grid-rows grid-cols-2 columns-md gap-x-6 lg:gap-y-0 xl:gap-y-10 text-sm md:text-2xl font-regular z-10">
            <div>
              <img
                src="src/assets/companies/snackpass.png"
                className={`w-32 h-32 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 ml-6`}
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
                src="src/assets/companies/capital_one.png"
                className={`w-48 h-27 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10`}
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
                src="src/assets/companies/appriss.png"
                className={`w-48 h-27 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10`}
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
        <div id="spacer" className="lg:h-6"></div>
        {!isMobile && (
          <div className="font-sans shadow-blue-900 drop-shadow-lg animate-text bg-gradient-to-r from-poppy via-dark-teal to-dark-azure bg-clip-text text-transparent text-sm lg:text-2xl font-regular z-10">
            Reach out on LinkedIn for any inquies. <br></br> Hope you enjoyed my
            page!
          </div>
        )}
      </div>
    );
  };
  return (
    <Parallax pages={3.25}>
      <ParallaxLayer speed={0.2} factor={1} offset={0}>
        <div className="container">
          {Array.from({ length: 99 }, (_, i) => i).map((_) => (
            <div className="snowflake"></div>
          ))}
        </div>
        <div className="App transition-all">
          <div id="spacer" className="h-2"></div>
          <div className="flex flex-col w-full h-screen justify-center items-center z-10">
            <img
              src="src/assets/ayush.jpeg"
              className="w-64 h-64 md:w-96 md:h-96 rounded-full shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10"
              alt=""
            ></img>
            <div id="spacer" className="h-12"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg  animate-text bg-gradient-to-r from-aerospace-orange via-dark-azure to-poppy bg-clip-text text-transparent text-3xl md:text-5xl font-extrabold z-10">
              Ayush Patel
            </div>
            <div id="spacer" className="h-4"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg animate-text bg-gradient-to-r from-slate-grey via-indigo-700 to-eerie-black bg-clip-text text-transparent text-2xl md:text-3xl font-extrabold z-10">
              swe intern @ snackpass
            </div>
            <div id="spacer" className="h-6"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg flex flex-row justify-center w-full items-center  z-10">
              <a className="" href="https://www.linkedin.com/in/ayushnpatel">
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="font-sans transition ease-in-out delay hover:scale-110 h-12 md:h-16 text-dark-azure hover:text-indigo-400"
                />
              </a>
              <div className="w-6" />
              <a
                className=" bg-transparent z-10"
                href="https://www.github.com/ayushnpatel"
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  className="h-12 md:h-16 transition ease-in-out delay hover:scale-110 text-dark-azure hover:text-indigo-400"
                />
              </a>
              <div className="w-6" />
              <a
                className=" bg-transparent z-10"
                href="https://www.instagram.com/ayush.127/"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="h-12 md:h-16 transition ease-in-out delay hover:scale-110 text-dark-azure hover:text-indigo-400"
                />
              </a>
              <div className="w-6" />
              <a
                className="bg-transparent z-10"
                href="src/assets/ayush_patel_resume.pdf"
              >
                <FontAwesomeIcon
                  icon={faNewspaper}
                  className="h-12 md:h-16 transition ease-in-out delay hover:scale-110 text-dark-azure hover:text-indigo-400"
                />
              </a>
            </div>
            <div id="spacer" className="h-8"></div>
            <div className="font-sans shadow-blue-900 drop-shadow-lg  flex flex-row justify-center w-full items-center  z-10">
              <a className="" href="https://www.python.org">
                <img
                  src="src/assets/tech_icons/python.png"
                  className="w-8 h-8 md:w-16 md:h-16 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://www.typescriptlang.org">
                <img
                  src="src/assets/tech_icons/typescript.png"
                  className="w-7 h-7 md:w-14 md:h-14 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://www.java.com">
                <img
                  src="src/assets/tech_icons/java.png"
                  className="w-8 h-8 md:w-14 md:h-14   z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a
                className=""
                href="https://en.wikipedia.org/wiki/C_(programming_language)l"
              >
                <img
                  src="src/assets/tech_icons/c.png"
                  className="w-7 h-8 md:w-14 md:h-16   z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://reactjs.org/">
                <img
                  src="src/assets/tech_icons/react.png"
                  className="w-8 h-7 md:w-16 md:h-14 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-1 md:w-3" />
              <a className="" href="https://www.postgresql.org/">
                <img
                  src="src/assets/tech_icons/postgresql.png"
                  className="w-8 h-8 md:w-16 md:h-16 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-2 md:w-4" />
              <a className="" href="https://www.docker.com/">
                <img
                  src="src/assets/tech_icons/docker.webp"
                  className="w-8 h-8 md:w-16 md:h-16 z-10 transition ease-in-out delay hover:scale-110"
                  alt=""
                ></img>
              </a>
              <div className="w-2 md:w-4" />
              <a className="" href="https://www.nextjs.org/">
                <img
                  src="src/assets/tech_icons/next_js.png"
                  className="w-10 h-7 md:w-24 md:h-16 z-10 transition ease-in-out delay hover:scale-110"
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
          paddingTop: `${isMobile ? "2%" : "0%"}`,
        }}
      >
        <AboutMeComponent />
      </ParallaxLayer>
      <ParallaxLayer
        offset={2}
        speed={isMobile ? 0.1 : 0.75}
        sticky={{ start: 2, end: 3 }}
        style={{
          ...alignCenter,
          justifyContent: `${isMobile ? "center" : "flex-end"}`,
          paddingTop: `${isMobile ? "40%" : "46vh"}`,
          paddingBottom: `${isDesktop ? "50vh" : "0%"}`,
        }}
        className="pb-24"
      >
        <div
          className={`${
            isDesktop && styles.parallax
          } grid md:grid-rows-2 grid-cols-1 md:grid-cols-2 md:gap-6 md:gap-y-0 `}
        >
          <img
            src="src/assets/images/IMG_2189.jpeg"
            className={`row-span-2 lg:row-span-1 w-60 h-40 xl:w-88 xl:h-59 mt-9 md:mt-8 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10 rounded-xl`}
            alt=""
          ></img>
          <img
            src="src/assets/images/family.jpg"
            className={`${
              isDesktop && styles.parallax
            } row-span-2 lg:row-span-1 w-60 h-40 xl:w-88 xl:h-59 mt-5 md:mt-8 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>
          <img
            src="src/assets/images/IMG_1565.png"
            className={`${
              isDesktop && styles.parallax
            } row-span-2 lg:row-span-1 w-60 h-40 xl:w-88 xl:h-59 mt-5 md:mt-8 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>

          <img
            src="src/assets/images/IMG_1032.png"
            className={`${
              isDesktop && styles.parallax
            } invisible md:visible row-span-2 lg:row-span-1 w-60 h-40 xl:w-88 xl:h-59 mt-8 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>
          <img
            src="src/assets/images/IMG_1148.jpg"
            className={`${
              isDesktop && styles.parallax
            } invisible md:visible row-span-2 lg:row-span-1 w-60 h-40 xl:w-88 xl:h-59 mt-8 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>

          <img
            src="src/assets/images/IMG_2241.jpeg"
            className={`${
              isDesktop && styles.parallax
            } invisible md:visible row-span-2 lg:row-span-1 w-60 h-40 xl:w-88 xl:h-59 mt-8 shadow-blue-800 drop-shadow-2xl transition ease-in-out delay hover:scale-110 z-10  rounded-xl`}
            alt=""
          ></img>
        </div>
      </ParallaxLayer>
    </Parallax>
  );
}

export default App;
