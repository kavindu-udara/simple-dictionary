import React, { useState, useEffect, useRef } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";

const Content = ({ data, error, loading }) => {
  const [interjection, setInterjection] = useState(true);
  const [noun, setNoun] = useState(false);
  const [verb, setVerb] = useState(false);

  // need to at this to content
  const [nounContent, setNounContent] = useState([]);
  const [verbContent, setVerbContent] = useState([]);
  const [interjectionContent, setInterjectionContent] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");

  const audioRef = useRef(null);

  const phonetics = data[0].phonetics;
  const filteredPhonetics = phonetics.slice(1);

  const source = data[0].sourceUrls;

  const handleNounBtn = () => {
    setNoun(true);
    setInterjection(false);
    setVerb(false);
  };
  const handleVerbBtn = () => {
    setNoun(false);
    setInterjection(false);
    setVerb(true);
  };
  const handleInterjecBtn = () => {
    setNoun(false);
    setInterjection(true);
    setVerb(false);
  };

  const getMeaningsIndex = (data, targetPart) => {
    let indices;
    for (let i = 0; i < data[0].meanings.length; i++) {
      if (data[0].meanings[i].partOfSpeech === targetPart) {
        indices = i;
      }
    }
    return indices == undefined ? false : indices;
  };

  useEffect(() => {
    setNounContent([]);
    setVerbContent([]);
    setInterjectionContent([]);
    if (data[0]?.word) {
      const nounIndex = getMeaningsIndex(data, "noun");
      nounIndex !== false ? setNounContent(data[0].meanings[nounIndex]) : null;

      const verbIndex = getMeaningsIndex(data, "verb");
      verbIndex !== false ? setVerbContent(data[0].meanings[verbIndex]) : null;

      const interjectionIndex = getMeaningsIndex(data, "interjection");
      interjectionIndex !== false
        ? setInterjectionContent(data[0].meanings[interjectionIndex])
        : null;

      setAudioUrl(data[0]?.phonetics[0]?.audio);
    }
  }, [data]);

  const handleClick = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {
      !error ? (
        <>
          <div className="mt-5 ml-3 text-5xl">
            {loading ? (
              <div class="p-4 w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-20 w-40 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            ) : (
              data[0].word
            )}
          </div>

          {loading ? (
            <div class="p-4 w-full mx-auto">
              <div class="animate-pulse flex space-x-4">
                <div class="flex-1 space-y-6 py-1">
                  <div class="space-y-3">
                    <div class="grid grid-cols-3 w-40 gap-4">
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                      <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="ml-3 mt-3 text-blue-600 text-lg flex">
              {filteredPhonetics.map((word) => {
                return word.text + ",";
              })}
              <button onClick={handleClick}>
                {
                !audioUrl ?
                null
                :
                !isPlaying ? (
                  <HiSpeakerXMark className="mt-2 cursor-pointer ml-1" />
                ) : (
                  <HiSpeakerWave className="mt-2 cursor-pointer ml-1" />
                )}
              </button>
              <audio ref={audioRef} src={audioUrl} controls={false} />
            </div>
          )}

          <div class="grid grid-cols-3 divide-x ml-3 px-1 py-1 rounded-md divide-stone-100 w-80 mt-3">
            <div
              className={`px-3 py-1 rounded text-center  cursor-pointer ${
                interjection ? `bg-stone-500 text-stone-50` : `bg-stone-200`
              } `}
              onClick={handleInterjecBtn}
            >
              interjection
            </div>
            <div
              className={` px-3 py-1 ml-1 rounded text-center  cursor-pointer ${
                noun ? `bg-stone-500 text-stone-50` : `bg-stone-200`
              } `}
              onClick={handleNounBtn}
            >
              noun
            </div>
            <div
              className={` px-3 ml-1 py-1 rounded text-center  cursor-pointer ${
                verb ? `bg-stone-500 text-stone-50` : `bg-stone-200`
              } `}
              onClick={handleVerbBtn}
            >
              verb
            </div>
          </div>

          <div className="mt-5 ml-3 text-xl font-bold uppercase flex mb-3">
            definitions{" "}
            <div className="text-xl ml-5 text-stone-400">
              {interjection
                ? interjectionContent?.definitions?.length
                : verb
                ? verbContent?.definitions?.length
                : nounContent?.definitions?.length}
            </div>
          </div>

          {loading ? (
            <div>
              <div class="p-4 w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p-4 w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                  <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                      <div class="grid grid-cols-3 gap-4">
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {interjection
                ? interjectionContent?.definitions?.map((definition, index) => {
                    return (
                      <div className="ml-3 mb-2">
                        <p className="text-base">
                          <span className="font-bold mr-2">{index + 1}.</span>
                          {definition?.definition}
                          <br />
                        </p>
                        <p className="text-stone-500 font-mono ">
                          {definition?.example ? (
                            <div>
                              <span className="bg-stone-500 w-1 rounded mr-1 ml-2">
                                .
                              </span>
                              {definition.example}
                            </div>
                          ) : null}
                        </p>
                      </div>
                    );
                  })
                : verb
                ? verbContent?.definitions?.map((definition, index) => {
                    return (
                      <div className="ml-3 mb-2">
                        <p className="text-base">
                          <span className="font-bold mr-2">{index + 1}.</span>
                          {definition?.definition}
                          <br />
                          <p className="text-stone-500 font-mono ">
                            {definition?.example ? (
                              <div>
                                <span className="bg-stone-500 w-1 rounded mr-1 ml-2">
                                  .
                                </span>
                                {definition.example}
                              </div>
                            ) : null}
                          </p>
                        </p>
                      </div>
                    );
                  })
                : nounContent?.definitions?.map((definition, index) => {
                    return (
                      <div className="ml-3 mb-2">
                        <p className="text-base">
                          <span className="font-bold mr-2">{index + 1}.</span>
                          {definition?.definition}
                          <br />
                          <p className="text-stone-500 font-mono ">
                            {definition?.example ? (
                              <div>
                                <span className="bg-stone-500 w-1 rounded mr-1 ml-2">
                                  .
                                </span>
                                {definition.example}
                              </div>
                            ) : null}
                          </p>
                        </p>
                      </div>
                    );
                  })}
            </div>
          )}

          <div className="flex ml-3 mt-5">
            <div className="w-1/2">
              <div className="uppercase font-bold text-ml flex">
                synonyms
                <div className="text-ml ml-2 text-stone-400">
                  {interjection
                    ? interjectionContent?.synonyms?.length
                    : verb
                    ? verbContent?.synonyms?.length
                    : nounContent?.synonyms?.length}
                </div>
              </div>

              <ul>
                {loading ? (
                  <div>
                    <div class="p-4 w-full mx-auto">
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-6 py-1">
                          <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {interjection
                      ? interjectionContent?.synonyms?.map((synonym) => {
                          return <li>{synonym}</li>;
                        })
                      : verb
                      ? verbContent?.synonyms?.map((synonym) => {
                          return <li>{synonym}</li>;
                        })
                      : nounContent?.synonyms?.map((synonym) => {
                          return <li>{synonym}</li>;
                        })}
                  </div>
                )}
              </ul>
            </div>
            <div className="w-1/2">
              <div className="uppercase font-bold text-ml flex">
                antonyms
                <div className="text-ml ml-2 text-stone-400">
                  {interjection
                    ? interjectionContent?.antonyms?.length
                    : verb
                    ? verbContent?.antonyms?.length
                    : nounContent?.antonyms?.length}
                </div>
              </div>
              <ul>
                {loading ? (
                  <div>
                    <div class="p-4 w-full mx-auto">
                      <div class="animate-pulse flex space-x-4">
                        <div class="flex-1 space-y-6 py-1">
                          <div class="space-y-3">
                            <div class="grid grid-cols-3 gap-4">
                              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                              <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    {interjection
                      ? interjectionContent?.antonyms?.map((antonym) => {
                          return <li>{antonym}</li>;
                        })
                      : verb
                      ? verbContent?.antonyms?.map((antonym) => {
                          return <li>{antonym}</li>;
                        })
                      : nounContent?.antonyms?.map((antonym) => {
                          return <li>{antonym}</li>;
                        })}
                  </div>
                )}
              </ul>
            </div>
          </div>

          <div className="mt-10 text-base mb-5">
            source :-{" "}
            <a className="text-blue-500" href={source}>
              {data[0].sourceUrls}
            </a>
          </div>
        </>
      ) : (
        <div className="mt-10 mb-10 text-center text-stone-400">
          Sorry, We can't find what are you looking for :(
        </div>
      )}
    </>
  );

};

export default Content;
