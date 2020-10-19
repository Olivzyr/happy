import Image from '../models/Image';

export default {
  // Renderiza apenas 1 orfanato
  render(image: Image) {
    return {
      id: image.id,
      url: `http://10.94.250.110:3333/uploads/${image.path}`,
      
    };
  },
  // Renderiza vários orfanatos
  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
};