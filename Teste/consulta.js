

(async ()=>{
    const db=require('./db')
    console.log('Obter todos os usuarios')
    const clientes = await db.todosClientes()
    console.log(clientes)
})()

// (async ()=>{
//     const db=require('./db')
// })()