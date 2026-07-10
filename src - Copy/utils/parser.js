import JSZip from "jszip";

/**
 * Normalisasi username agar perbandingan akurat.
 */
function normalize(username) {
  return String(username).trim().toLowerCase();
}

/**
 * Cari file di mana pun di dalam ZIP.
 */
function findFile(zip, fileName) {
  return Object.keys(zip.files).find((path) =>
    path.toLowerCase().endsWith(fileName.toLowerCase())
  );
}

/**
 * Ambil followers.
 */
function getFollowers(json) {
  if (!Array.isArray(json)) return [];

  return json
    .map((item) => item?.string_list_data?.[0]?.value)
    .filter(Boolean)
    .map(normalize);
}

/**
 * Ambil following.
 */
function getFollowing(json) {
  const arr = json.relationships_following || json;

  if (!Array.isArray(arr)) return [];

  return arr
    .map((item) => item?.title || item?.string_list_data?.[0]?.value)
    .filter(Boolean)
    .map(normalize);
}

export async function parseInstagram(file) {
  const zip = await JSZip.loadAsync(file);

  const followersPath = findFile(zip, "followers_1.json");
  const followingPath = findFile(zip, "following.json");

  if (!followersPath)
    throw new Error("followers_1.json tidak ditemukan.");

  if (!followingPath)
    throw new Error("following.json tidak ditemukan.");

  const followersJSON = JSON.parse(
    await zip.file(followersPath).async("string")
  );

  const followingJSON = JSON.parse(
    await zip.file(followingPath).async("string")
  );

  const followers = getFollowers(followersJSON);
  const following = getFollowing(followingJSON);

  const followerSet = new Set(followers);
  const followingSet = new Set(following);

  const mutual = [];
  const notFollowBack = [];
  const fans = [];

  following.forEach((user) => {
    if (followerSet.has(user)) {
      mutual.push(user);
    } else {
      notFollowBack.push(user);
    }
  });

  followers.forEach((user) => {
    if (!followingSet.has(user)) {
      fans.push(user);
    }
  });

  return {
    followers: [...followers].sort(),
    following: [...following].sort(),
    mutual: [...mutual].sort(),
    fans: [...fans].sort(),
    notFollowBack: [...notFollowBack].sort(),

    totalFollowers: followers.length,
    totalFollowing: following.length,
    totalMutual: mutual.length,
    totalFans: fans.length,
    totalNotFollowBack: notFollowBack.length,
  };
}