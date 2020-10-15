import Image from '../models/Image';

export default {
  // Renderiza apenas 1 orfanato
  render(image: Image) {
    return {
      id: image.id,
      url: `http://localhost:3333/uploads/${image.path}`,
      
    };
  },
  // Renderiza vários orfanatos
  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  }
};