export default (data) => {
  const filtered = {
    firstname: data.firstname,
    lastname: data.lastname,
    country: data.country,
    gender: data.gender,
    birthdate: data.birthdate,
    preferredLanguage: data.preferredLanguage,
    preferredCurrency: data.preferredCurrency,
    bio: data.bio,
    city: data.city,
    department: data.department,
    appNotification: data.appNotification,
    emailNotification: data.emailNotification,
    photoUrl: data.photoUrl,
  };
  return filtered;
};
