export const getYoutubeId = (url: string): string | null => {
  const parsedUrl = new URL(url);
  const id = parsedUrl.searchParams.get("v");
  if (id) return id;
  const match = parsedUrl.pathname.split("/");
  return match.length > 1 ? match[1] : null;
};

export const getYoutubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};
