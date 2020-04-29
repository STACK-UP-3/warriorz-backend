const filtereAccommodation = (data) => {
  const filteredAccommodationData = {
    name: data.name,
    description: data.description,
    location: data.location,
    owner: data.owner,
    status: data.status || 'available',
    type: data.type,
    cost: data.cost,
    images: data.images,
    services: data.services,
    rooms: data.rooms,
  };
  return filteredAccommodationData;
};

export default filtereAccommodation;
