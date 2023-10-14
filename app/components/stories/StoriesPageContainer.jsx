"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { storiesAdded, activatedStories } from "@/app/store/stories";
import { mediaAdded } from "@/app/store/media";
import { personsAdded } from "@/app/store/persons";
import StoriesContainer from "./StoriesContainer";
import { topicsAdded } from "@/app/store/topics";
import {
  englishLanguageActivated,
  germanLanguageActivated,
} from "@/app/store/language";
import Tabs from "./Tabs";

const StoriesPageContainer = ({
  stories,
  allMedia,
  allPersons,
  topics,

  lang,
}) => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState();

  useEffect(() => {
    setLanguage(lang);
  }, [lang]);

  useEffect(() => {
    if (language === "de") {
      dispatch(germanLanguageActivated({}));
    } else {
      dispatch(englishLanguageActivated({}));
    }
  }, [language, dispatch]);

  useEffect(() => {
    dispatch(storiesAdded({ stories }));
  }, [stories, dispatch]);

  useEffect(() => {
    dispatch(mediaAdded({ allMedia }));
  }, [allMedia, dispatch]);

  useEffect(() => {
    dispatch(personsAdded({ allPersons }), [allPersons, dispatch]);
  });

  useEffect(() => {
    dispatch(topicsAdded({ topics }), [topics, dispatch]);
  });

  dispatch(activatedStories({ stories }));

  return (
    <>
      <Tabs />
      <StoriesContainer />
    </>
  );
};

export default StoriesPageContainer;
