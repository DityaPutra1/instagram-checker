export function compareInstagram(oldData, newData) {
  const oldFollowers = new Set(oldData?.followers || []);
  const newFollowers = new Set(newData?.followers || []);

  const oldFollowing = new Set(oldData?.following || []);
  const newFollowing = new Set(newData?.following || []);

  // Followers changes
  const newFollowersList = [...newFollowers].filter(
    (user) => !oldFollowers.has(user)
  );

  const lostFollowersList = [...oldFollowers].filter(
    (user) => !newFollowers.has(user)
  );

  // Following changes
  const newFollowingList = [...newFollowing].filter(
    (user) => !oldFollowing.has(user)
  );

  const unfollowedList = [...oldFollowing].filter(
    (user) => !newFollowing.has(user)
  );

  // Growth metrics
  const followerGrowth =
    newFollowers.size - oldFollowers.size;

  const followingGrowth =
    newFollowing.size - oldFollowing.size;

  const followerGrowthPercent =
    oldFollowers.size === 0
      ? 0
      : ((followerGrowth / oldFollowers.size) * 100).toFixed(2);

  const followingGrowthPercent =
    oldFollowing.size === 0
      ? 0
      : ((followingGrowth / oldFollowing.size) * 100).toFixed(2);

  return {
    followers: {
      new: newFollowersList,
      lost: lostFollowersList,
    },

    following: {
      new: newFollowingList,
      unfollowed: unfollowedList,
    },

    growth: {
      followers: followerGrowth,
      following: followingGrowth,
      followersPercent: followerGrowthPercent,
      followingPercent: followingGrowthPercent,
    },

    summary: {
      totalNewFollowers: newFollowersList.length,
      totalLostFollowers: lostFollowersList.length,
      totalNewFollowing: newFollowingList.length,
      totalUnfollowed: unfollowedList.length,
    },
  };
}