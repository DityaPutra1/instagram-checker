export function parseInstagram({ followers, following }) {
  const followersRaw = Array.isArray(followers)
    ? followers
    : followers?.relationships_followers || [];

  const followingRaw = Array.isArray(following)
    ? following
    : following?.relationships_following || [];

  const getUsername = (item) => {
    return (
      item?.string_list_data?.[0]?.value ||
      item?.title ||
      null
    );
  };

  const normalize = (username) =>
    username?.trim().toLowerCase();

  const uniqueSorted = (list) =>
    [...new Set(list.map(normalize).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b)
    );

  const followersList = uniqueSorted(
    followersRaw.map(getUsername)
  );

  const followingList = uniqueSorted(
    followingRaw.map(getUsername)
  );

  const followersSet = new Set(followersList);
  const followingSet = new Set(followingList);

  const mutual = followingList.filter((u) =>
    followersSet.has(u)
  );

  const notFollowBack = followingList.filter(
    (u) => !followersSet.has(u)
  );

  const fans = followersList.filter(
    (u) => !followingSet.has(u)
  );

  return {
    followers: followersList,
    following: followingList,
    mutual,
    fans,
    notFollowBack,

    counts: {
      followers: followersList.length,
      following: followingList.length,
      mutual: mutual.length,
      fans: fans.length,
      notFollowBack: notFollowBack.length,
    },

    generatedAt: new Date().toISOString(),
  };
}