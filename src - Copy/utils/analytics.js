export function getStats(data) {
  const totalFollowers = data.followers?.length ?? 0;
  const totalFollowing = data.following?.length ?? 0;
  const mutual = data.mutual?.length ?? 0;
  const notFollowBack = data.notFollowBack?.length ?? 0;
  const fans = data.fans?.length ?? 0;

  const followRatio = (
    totalFollowers / Math.max(totalFollowing, 1)
  ).toFixed(2);

  const followBackRate = (
    (mutual / Math.max(totalFollowing, 1)) * 100
  ).toFixed(1);

  const audienceRate = (
    (fans / Math.max(totalFollowers, 1)) * 100
  ).toFixed(1);

  const accountBalance = totalFollowers - totalFollowing;

  let insight = "";

  if (followBackRate >= 90) {
    insight = "Sangat baik. Sebagian besar akun yang Anda ikuti juga mengikuti Anda kembali.";
  } else if (followBackRate >= 70) {
    insight = "Cukup baik. Tingkat follow back berada di atas rata-rata.";
  } else if (followBackRate >= 50) {
    insight = "Sedang. Masih cukup banyak akun yang belum mengikuti Anda kembali.";
  } else {
    insight = "Rendah. Sebagian besar akun yang Anda ikuti tidak follow back.";
  }

  return {
    totalFollowers,
    totalFollowing,
    mutual,
    notFollowBack,
    fans,

    followRatio,
    followBackRate,
    audienceRate,
    accountBalance,
    insight,
  };
}

export function getGhostFollowers(data) {
  const followers = data.followers ?? [];

  // Placeholder hingga tersedia data interaksi.
  // Dengan file ZIP Instagram standar kita belum bisa
  // mengetahui follower yang benar-benar "ghost".
  const active = followers.slice(
    0,
    Math.floor(followers.length * 0.3)
  );

  return followers.filter((user) => !active.includes(user));
}

export function getSummary(data) {
  const stats = getStats(data);

  return [
    {
      title: "Followers",
      value: stats.totalFollowers,
      color: "blue",
    },
    {
      title: "Following",
      value: stats.totalFollowing,
      color: "purple",
    },
    {
      title: "Mutual",
      value: stats.mutual,
      color: "pink",
    },
    {
      title: "Fans",
      value: stats.fans,
      color: "green",
    },
    {
      title: "Not Follow Back",
      value: stats.notFollowBack,
      color: "red",
    },
  ];
}

export function getChartData(data) {
  return [
    {
      name: "Followers",
      value: data.followers.length,
    },
    {
      name: "Following",
      value: data.following.length,
    },
    {
      name: "Mutual",
      value: data.mutual.length,
    },
    {
      name: "Fans",
      value: data.fans.length,
    },
    {
      name: "Not Follow Back",
      value: data.notFollowBack.length,
    },
  ];
}