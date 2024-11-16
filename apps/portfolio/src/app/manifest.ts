import type { MetadataRoute } from "next";

export default function manifest() {
  return <MetadataRoute.Manifest>{
    short_name: "AR",
    description:
      "TBD",
    background_color: "#FFFFFF",
    name: "AR Portfolio",
    theme_color: "#151515",
    start_url: "/",
    display: "fullscreen",
    icons: [
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
