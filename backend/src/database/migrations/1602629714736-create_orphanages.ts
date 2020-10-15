import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanages1602629714736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'orphanages',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true, //Não pode ser negativo
          isPrimary: true, //Identifica como chave primária
          isGenerated: true, //Coluna gerada automaticamente
          generationStrategy: 'increment', //Utilizar lógica de auto incremente ao ser gerada (aumenta id a cada registo)
        },
        {
          name: 'name',
          type: 'varchar'
        },
        {
          name: 'latitude',
          type: 'decimal',
          scale: 10, //numero depois da virgula 
          precision: 2, // numero antes da virgula
        },
        {
          name: 'longitude',
          type: 'decimal',
          scale: 10,
          precision: 2,
        },
        {
          name: 'about',
          type: 'text',
        },
        {
          name: 'instructions',
          type: 'text',
        },
        {
          name: 'opening_hours',
          type: 'varchar',
        },
        {
          name: 'open_on_weekends',
          type: 'boolean',
          default: false,
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orphanages');
  }

}
