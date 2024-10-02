export const extractVideoId = (url) => {
  const youtubeRegExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const vimeoRegExp = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/\w+\/)?(\d+)/;

  const youtubeMatch = url.match(youtubeRegExp);
  if (youtubeMatch) {
    return { platform: 'youtube', id: youtubeMatch[1] };
  }

  const vimeoMatch = url.match(vimeoRegExp);
  if (vimeoMatch) {
    return { platform: 'vimeo', id: vimeoMatch[1] };
  }

  return null;
};

export const generateEmbedUrl = (platform, id) => {
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${id}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${id}`;
    default:
      return '';
  }
};