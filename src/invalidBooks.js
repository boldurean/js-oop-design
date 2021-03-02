const yup = require('yup');

const genres = [
  'drama', 'horror', 'fantasy', 'classic',
];

const getInvalidBooks = (coll) => {
  const schema = yup.object().shape({
    name: yup.string().required(),
    author: yup.string().required(),
    pagesCount: yup.number().positive().integer(),
    link: yup.string().url().min(10),
    genre: yup.string().oneOf(genres),
  });

  return coll.filter((book) => !schema.isValidSync(book));
}

module.exports = getInvalidBooks;
