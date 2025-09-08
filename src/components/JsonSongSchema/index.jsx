const JsonSongSchema = ({ title, lyricist, lyrics, artist = 'Annie in Black', ytId = null }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    'name': title,
    'lyricist': lyricist
      ? { '@type': 'Person', 'name': lyricist }
      : { '@type': 'MusicGroup', 'name': artist },
    'composer': {
      '@type': 'MusicGroup',
      'name': artist
    },
    'lyrics': {
      '@type': 'CreativeWork',
      'text': lyrics
    }
  };

  if (ytId) {
    schema.recordedAs = {
      '@type': 'MusicRecording',
      'name': title,
      'byArtist': {
        '@type': 'MusicGroup',
        'name': artist
      },
      'url': `https://www.youtube.com/watch?v=${ytId}`,
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default JsonSongSchema;
