/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
module.exports = {
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  trailingComma: 'es5',
  plugins: ['prettier-plugin-tailwindcss'],
};
