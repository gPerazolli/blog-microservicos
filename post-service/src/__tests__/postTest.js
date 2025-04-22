const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

let createdPostId;

const token = jwt.sign(
  { id: 1, role: 'professor' }, 
  'supersecret', 
  { expiresIn: '1h' }
);

describe('Post Service API', () => {
  
  it('Deve listar posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('Deve criar um novo post', async () => {
    const res = await request(app)
      .post('/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Título Teste',
        content: 'Conteúdo do post teste',
        author: 'Autor Teste'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    createdPostId = res.body._id;
  });

  it('Deve atualizar um post existente', async () => {
    const res = await request(app)
      .put(`/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${token}`) 
      .send({
        title: 'Título Atualizado'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toBe('Título Atualizado');
  });

  it('Deve deletar um post', async () => {
    const res = await request(app)
      .delete(`/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${token}`); 

    expect(res.statusCode).toEqual(204);
  });

});
