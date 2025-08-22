const kebabCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2') // handle camelCase to kebab-case
    .replace(/[\s_]+/g, '-')             // replace spaces and underscores with -
    .replace(/[^a-zA-Z0-9-]/g, '')       // remove non-alphanumeric except -
    .toLowerCase();
};

const classList = (baseName, args) => {
  let filtered = Object.keys(args).filter((arg) => args[arg]);
  filtered = filtered.map((className) => `${baseName}--${kebabCase(className)}`);
  filtered.unshift(baseName);

  return filtered.join(' ');
};

export default classList;
