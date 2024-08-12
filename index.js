const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();
const PORT = 3050;

// Mock database -->  é uma técnica usada em desenvolvimento e testes para simular o comportamento de um banco de dados real
let users = [
    {
        id: 1,
        name: 'Igor',
        email: 'igorcarmona@gmail.com'
    },
    {
        id: 2,
        name: 'Michael',
        email: 'michael@hotmail.com'
    },
    {
        id: 3,
        name: 'Pedro',
        email: 'pedro@outlook.com'
    }
]

// Rota de busca de usuários
router.get('/users/:id', ctx => {
    if (!users[ctx.params.id - 1]) {
        return ctx.throw(404, 'Usuário não encontrado');
    }

    ctx.status = 200;
    ctx.body = users[ctx.params.id - 1];
});

// Rota de atualização de usuários
router.post('/users/:id', ctx => {
    if (!users[ctx.params.id - 1]) {
        return ctx.throw(404, 'Usuário não encontrado');
    }

    ctx.status = 200;
                                //target object                 //source object
    ctx.body = Object.assign(users[ctx.params.id - 1], ctx.request.body);
});

app.use(koaBody.koaBody());
app.use(router.allowedMethods())
app.use(router.routes())

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
