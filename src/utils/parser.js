import JSZip from "jszip";

/* =====================================================
   HELPERS
===================================================== */

function normalize(username) {
  return String(username || "")
    .trim()
    .replace(/^@/, "")
    .replace(/\//g, "")
    .toLowerCase();
}

function unique(list) {
  return [...new Set(list)];
}

function sort(list) {
  return [...list].sort((a, b) => a.localeCompare(b));
}

function isJson(path) {
  return path.toLowerCase().endsWith(".json");
}

function isHtml(path) {
  return path.toLowerCase().endsWith(".html");
}

/* =====================================================
   ZIP FILE SCANNER
===================================================== */

function getAllFiles(zip) {
  return Object.keys(zip.files).filter(
    (path) => !zip.files[path].dir
  );
}

function getFollowerFiles(files) {
  return files
    .filter((file) => {
      const f = file.toLowerCase();

      return (
        f.includes("followers_") &&
        (isJson(f) || isHtml(f))
      );
    })
    .sort();
}

function getFollowingFiles(files) {
  return files
    .filter((file) => {
      const f = file.toLowerCase();

      return (
        f.includes("following") &&
        (isJson(f) || isHtml(f))
      );
    })
    .sort();
}

/* =====================================================
   JSON PARSER
===================================================== */

function parseFollowersJSON(json) {
  if (!Array.isArray(json)) return [];

  return json
    .map((item) => item?.string_list_data?.[0]?.value)
    .filter(Boolean)
    .map(normalize);
}

function parseFollowingJSON(json) {
  const arr =
    json.relationships_following || json;

  if (!Array.isArray(arr)) return [];

  return arr
    .map(
      (item) =>
        item?.title ||
        item?.string_list_data?.[0]?.value
    )
    .filter(Boolean)
    .map(normalize);
}/* =====================================================
   HTML PARSER
===================================================== */

function parseInstagramHTML(html) {
  const usernames = [];

  // Format HTML terbaru Instagram
  const regex =
    /href="https?:\/\/(?:www\.)?instagram\.com\/([^\/"?]+)\/?"/gi;

  let match;

  while ((match = regex.exec(html)) !== null) {
    usernames.push(normalize(match[1]));
  }

  // Backup regex
  if (usernames.length === 0) {
    const regex2 =
      /https?:\/\/(?:www\.)?instagram\.com\/([A-Za-z0-9._]+)/gi;

    while ((match = regex2.exec(html)) !== null) {
      usernames.push(normalize(match[1]));
    }
  }

  return unique(usernames);
}

/* =====================================================
   FILE READER
===================================================== */

async function readFollowersFile(zip, path) {
  const text = await zip.file(path).async("string");

  if (isJson(path)) {
    try {
      return parseFollowersJSON(JSON.parse(text));
    } catch (err) {
      console.error(path, err);
      return [];
    }
  }

  return parseInstagramHTML(text);
}

async function readFollowingFile(zip, path) {
  const text = await zip.file(path).async("string");

  if (isJson(path)) {
    try {
      return parseFollowingJSON(JSON.parse(text));
    } catch (err) {
      console.error(path, err);
      return [];
    }
  }

  return parseInstagramHTML(text);
}/* =====================================================
   MAIN PARSER
===================================================== */

export async function parseInstagram(file) {
  const zip = await JSZip.loadAsync(file);

  const files = getAllFiles(zip);

  const followerFiles = getFollowerFiles(files);
  const followingFiles = getFollowingFiles(files);

  if (followerFiles.length === 0) {
    throw new Error(
      "File followers tidak ditemukan di dalam ZIP Instagram."
    );
  }

  if (followingFiles.length === 0) {
    throw new Error(
      "File following tidak ditemukan di dalam ZIP Instagram."
    );
  }

  let followers = [];
  let following = [];

  /* =============================
     READ FOLLOWERS
  ============================== */

  for (const filePath of followerFiles) {
    try {
      const users = await readFollowersFile(
        zip,
        filePath
      );

      followers.push(...users);
    } catch (err) {
      console.error(
        "Gagal membaca follower:",
        filePath,
        err
      );
    }
  }

  /* =============================
     READ FOLLOWING
  ============================== */

  for (const filePath of followingFiles) {
    try {
      const users = await readFollowingFile(
        zip,
        filePath
      );

      following.push(...users);
    } catch (err) {
      console.error(
        "Gagal membaca following:",
        filePath,
        err
      );
    }
  }

  followers = sort(unique(followers));
  following = sort(unique(following));

  const followerSet = new Set(followers);
  const followingSet = new Set(following);

  const mutual = [];
  const notFollowBack = [];
  const fans = [];

  for (const user of following) {
    if (followerSet.has(user)) {
      mutual.push(user);
    } else {
      notFollowBack.push(user);
    }
  }

  for (const user of followers) {
    if (!followingSet.has(user)) {
      fans.push(user);
    }
  }  return {
    followers,
    following,
    mutual,
    fans,
    notFollowBack,

    totalFollowers: followers.length,
    totalFollowing: following.length,
    totalMutual: mutual.length,
    totalFans: fans.length,
    totalNotFollowBack: notFollowBack.length,

    counts: {
      followers: followers.length,
      following: following.length,
      mutual: mutual.length,
      fans: fans.length,
      notFollowBack: notFollowBack.length,
    },

    generatedAt: new Date().toISOString(),
  };
}