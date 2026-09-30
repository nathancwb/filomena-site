import React from "react";
import { Composition } from "remotion";
import "./index.css";
import { InstagramPostHero } from "./InstagramPostHero";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="InstagramPostHero"
        component={InstagramPostHero}
        durationInFrames={180}
        fps={30}
        width={720}
        height={1280}
      />
    </>
  );
};
