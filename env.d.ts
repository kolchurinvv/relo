interface ImportMeta {
  env: {
    VITE_MAPBOX_TOKEN: string;
    NODE_ENV: "development" | "production";
    SSR: boolean;
  };
  glob: (arg: string) => string;
}
