
import axios from 'axios'
 
const API = axios.create({ baseURL: 'http://localhost:3001' })

export const createIncome = (income)=>API.post('/report/income',income).then((res)=>{
    let result={
        code: res.status,
        message: 'income successfully created',
        object: res
    }
    return result
}).catch((err)=>{
    let result={
        code: 404,
        message: 'income not created'
    }
    return result
})

export const createExpense = (expense)=>API.post('/report/expense',expense).then((res)=>{
    let result={
        code: res.status,
        message: 'expense successfully created',
        object: res
    }
    return result
}).catch((err)=>{
    let result={
        code: 404,
        message: 'expense not created'
    }
    return result
})

export const allIncomes = ()=>API.get('/report/income').then((res)=>{
    let result={
        code: res.status,
        message: 'all incomes successfully got',
        object: res
    }
    return result.object.data
}).catch((err)=>{
    let result={
        code: 404,
        message: 'incomes not got'
    }
    return result
})

export const deleteIncome = (id)=>API.delete(`/report/income/${id}`).then((res)=>{
    let result={
        code: res.status,
        message: 'income successfully deleted',
        object: res
    }
    return result.object.data
}).catch((err)=>{
    let result={
        code: 404,
        message: 'income not deleted'
    }
    return result
})

export const putIncome = (income,id)=>API.put(`/report/income/${id}`,income).then((res)=>{
    let result={
        code: res.status,
        message: 'income successfully created',
        object: res
    }
    return result
}).catch((err)=>{
    let result={
        code: 404,
        message: 'income not created'
    }
    return result
})

//______________________________________USERS
export const createUser = (user)=>API.post('/users',user).then((res)=>{
    let result={
        code: res.status,
        message: 'user successfully created',
        object: res
    }
    return result
}).catch((err)=>{
    let result={
        code: 404,
        message: 'user not created'
    }
    return result
})

export const findUser = (user)=>API.get(`/users/${user.userName}/${user.password}`).then((res)=>{
    let result={
        code: res.status,
        message: 'user successfully found',
        object: res
    }
    return result
}).catch((err)=>{
    let result={
        code: 404,
        message: 'user not found'
    }
    return result
})
// export const getPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)
// export const createPost = (newPost) => API.post("/posts", newPost)
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
// export const deletePost = (id) => API.delete(`/posts/${id}`)
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

// export const signin = (FormData) => API.post('/user/signin', FormData)
// export const signup = (FormData) => API.post('/user/signup', FormData)

