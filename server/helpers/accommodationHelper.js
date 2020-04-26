import roomServices from '../services/roomService';
import photoServices from '../services/photoService';
import serviceServices from '../services/servicesService';
import accommodationService from '../services/accommodationService';

class Accommodation {
  static async createAccommodation(accommodation) {
    const createAccommodation = await accommodationService.createAccommodation(
      accommodation,
    );
    return {
      id: createAccommodation.dataValues.id,
      ...accommodation,
    };
  }

  static async storeImage(image, ownerId, type) {
    const { url, details } = image;
    const newImage = { ownerId, type, url, details };
    const savedImage = await photoServices.createphoto(newImage);
    return {
      id: savedImage.dataValues.id,
      ...newImage,
    };
  }

  static async storeImages(images, ownerId, type) {
    const imagesFormated = Promise.all(
      images.map((image) => {
        const createdImage = this.storeImage(image, ownerId, type);
        return createdImage;
      }),
    );
    return imagesFormated;
  }

  static async createService(service, accommodationId) {
    const newService = {
      name: service.name,
      description: service.description,
      cost: service.cost,
      accommodation_id: accommodationId,
    };
    const createdServices = await serviceServices.createService(newService);
    return {
      id: createdServices.dataValues.id,
      ...newService,
    };
  }

  static async createServices(services, accommodationId) {
    const formatedServices = Promise.all(
      services.map((service) => {
        const createdService = this.createService(service, accommodationId);
        return createdService;
      }),
    );
    return formatedServices;
  }

  static async createRoom(room, accommodationId) {
    const newRoom = {
      name: room.name,
      accommodation_id: accommodationId,
      type: room.type,
      cost: room.cost,
      status: room.status,
      description: room.description,
      roomNumber: room.roomNumber,
      similarRooms: room.similarRooms,
    };
    const createdRoom = await roomServices.createRoom(newRoom);
    const roomImage = await photoServices.createphoto({
      url: room.image.url,
      details: room.image.details,
      ownerId: createdRoom.dataValues.id,
      type: 'room',
    });
    return {
      id: createdRoom.dataValues.id,
      ...newRoom,
      image: {
        id: roomImage.id,
        url: roomImage.url,
        details: roomImage.details,
      },
    };
  }

  static async createRooms(rooms, accommodationId) {
    const formatedRooms = Promise.all(
      rooms.map((room) => {
        const createdRoom = this.createRoom(room, accommodationId);
        return createdRoom;
      }),
    );
    return formatedRooms;
  }

  static async getSubjectImages(subjectId, type) {
    const images = await photoServices.findByProp({
      ownerId: subjectId,
      type,
    });
    const imagesInfo = images.map((image) => {
      const { id, url, details } = image;
      return { id, url, details };
    });
    return imagesInfo;
  }

  static async getServices(accommodationId) {
    const services = await serviceServices.findByProp({
      accommodation_id: accommodationId,
    });
    const formatedServices = services.map((service) => {
      const { id, name, description, cost } = service;
      return { id, name, description, cost };
    });
    return formatedServices;
  }

  static async getRoom(room) {
    const image = await photoServices.findByProp({
      ownerId: room.id,
      type: 'room',
    });
    return {
      id: room.id,
      name: room.name,
      description: room.description,
      cost: room.cost,
      status: room.status,
      roomNumber: room.roomNumber,
      similarRooms: room.similarRooms,
      type: room.type,
      image: {
        id: image[0].dataValues.id,
        url: image[0].dataValues.url,
        details: image[0].dataValues.details,
      },
    };
  }

  static async getRooms(accommodationId) {
    const rooms = await roomServices.findByProp({
      accommodation_id: accommodationId,
    });
    const formatedRooms = Promise.all(
      rooms.map((room) => {
        const roomWithImage = this.getRoom(room);
        return roomWithImage;
      }),
    );
    return formatedRooms;
  }

  static async getFormatedAccommodations(accommodations) {
    const accommDetails = Promise.all(
      accommodations.result.map((accommodation) => {
        const data = this.formatAccommodationResponse(accommodation);
        return data;
      }),
    );
    return accommDetails;
  }

  static async formatAccommodationResponse(accommodation) {
    const { id } = accommodation;
    const images = await this.getSubjectImages(id, 'accommodation');
    const services = await this.getServices(id);
    const rooms = await this.getRooms(id);
    return {
      id,
      name: accommodation.name,
      description: accommodation.description,
      location: accommodation.location,
      owner: accommodation.owner,
      status: accommodation.status,
      cost: accommodation.cost,
      createdAt: accommodation.createdAt,
      updatedAt: accommodation.updatedAt,
      services,
      images,
      rooms,
    };
  }
}

export default Accommodation;
