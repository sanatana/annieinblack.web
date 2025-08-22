
const getCleanText = (text) => {
  let finalText = text;
  try {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    finalText = (textArea.value || '').trim();
  } catch {
    // ignore
  }

  return finalText;
};

const setTitle = (title) => {
  if (typeof title !== 'string') {
    document.title = process.env.REACT_APP_APPLICATION_NAME || 'Annie in Black';
    return;
  }

  const finalTitle = getCleanText(title);

  document.title = finalTitle
    ? `${finalTitle} - ${process.env.REACT_APP_APPLICATION_NAME}`
    : `${process.env.REACT_APP_APPLICATION_NAME}`;
};

const removeDescription = (metaDescription) => {
  if (metaDescription) { metaDescription.remove(); }
};

const setDescription = (description, metaDescription, head) => {
  if (!description || typeof description !== 'string') {
    removeDescription(metaDescription);
    return;
  }

  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    head.appendChild(metaDescription);
  }

  metaDescription.setAttribute('content', description);
};

const removeCanonical = (metaLink) => {
  if (metaLink) { metaLink.remove(); }
};

const setCanonical = (url, metaLink, head) => {
  if (!url || typeof url !== 'string') {
    removeCanonical(metaLink);
    return;
  }

  if (!metaLink) {
    metaLink = document.createElement('link');
    metaLink.rel = 'canonical';
    head.appendChild(metaLink);
  }

  metaLink.href = url;
};

const setPageTitle = (title, description = null, canonicalUrl = null) => {
  const head = document.head || document.getElementsByTagName('head')[0];
  let metaDescription = document.querySelector('meta[name="description"]');
  let metaLink = document.querySelector('link[rel="canonical"]');

  if (!head) {
    return;
  }

  setTitle(title);
  setDescription(description, metaDescription, head);
  setCanonical(canonicalUrl, metaLink, head);
};

export default setPageTitle;
