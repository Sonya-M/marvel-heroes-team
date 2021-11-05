
/*
use limit & offset params for custom limits:
e.g.
https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=20&apikey=[KEY]
*/

export const ALL_CHARACTERS = "http://gateway.marvel.com/v1/public/characters";

// e.g. https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=Hulk%20Incredible&apikey=[KEY]


export const ALL_COMICS = "http://gateway.marvel.com/v1/public/comics"