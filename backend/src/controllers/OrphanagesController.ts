import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import orphanageView from '../views/Orphanages_view';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';

export default {
  async index(request: Request, response: Response) {
    // Coleta o repositório presente no banco
    const orphanagesRepository = getRepository(Orphanage);

    // Lógica para buscar as informações do banco
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    // Retorno da requisição para o usuário
    return response.json(orphanageView.renderMany(orphanages));
  },

  async show(request: Request, response: Response) {
    const { id } = request.params;

    // Coleta o repositório presente no banco
    const orphanagesRepository = getRepository(Orphanage);

    // Lógica para buscar um único orfanato no banco
    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    // Retorno da requisição para o usuário
    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {
    console.log(request.files);
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends
    } = request.body;
  
    const orphanagesRepository = getRepository(Orphanage);
    const requestImages = request.files as Express.Multer.File[]; // Necessário forçar o multar a entender que e um array
    
    const images = requestImages.map(image => {
      return { path: image.filename } // unico campo que precisamos preencher manualmente
    })
  

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    // Todo o schema de validação
    const schema = Yup.object().shape({
      name: Yup.string().required('Nome obrigatório'),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    // Executando toda a validação
    await schema.validate(data, {
      abortEarly: false,
    });

    const orphanage = orphanagesRepository.create(data);
  
    // Salvando no banco
    await orphanagesRepository.save(orphanage);
  
  
    return response.status(201).json(orphanage);
  }
};