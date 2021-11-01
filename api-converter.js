const fs = require("fs");
const filePath = process.argv[2];
const minimumLength = process.argv[3] || 1;

fs.readFile(filePath, "utf8", (_, data) => {
  let wordsCache = {};

  data
    .split("\r\n")
    .forEach((line) => recursion(wordsCache, {}, line, 0, minimumLength));

  let highestRankingKey = Object.keys(wordsCache)[0];

  Object.keys(wordsCache).forEach((word) => {
    if (wordsCache[word] > wordsCache[highestRankingKey])
      highestRankingKey = word;
  });

  console.log(highestRankingKey);
});

// Cache stores the count of words in object,
// Localcache ensures that no words are added more than once per recursive step
function recursion(cache, localcache = {}, string, fromIndex, substrLength) {
  // Guard Case
  if (string.length <= substrLength)
    return fromIndex <= substrLength
      ? recursion(cache, localcache, string, fromIndex + 1, 0)
      : undefined;

  // Add to Cache
  const val = string.substr(fromIndex, substrLength);
  if (val.length >= minimumLength && !localcache[val]) {
    localcache[val] = true;
    if (cache[val]) cache[val]++;
    else cache[val] = 1;
  }

  //Move to next step
  return recursion(cache, localcache, string, fromIndex, substrLength + 1);
}
