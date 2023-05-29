const server = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(server);

/* describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })

    test('responds to /users', async () => {
        const res = await request.get('/users');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    })
}) */

describe('Test Handlers', () => {
    test('responds to /', async () => {
        const res = await request.get('/');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /employees', async () => {
        const res = await request.get('/employees');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /bakery', async () => {
        const res = await request.get('/bakery');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /deli', async () => {
        const res = await request.get('/deli');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });

    test('responds to /produce', async () => {
        const res = await request.get('/produce');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200)
    });
});