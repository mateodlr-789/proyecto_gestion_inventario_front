interface Route {
    login: string
    register: string
    principal: string
    orders:string
}

export const route: Route = {
    login: '/login',
    register: '/register',
    orders: '/orders',
    principal: '/principal',
    
}

export const protectedRoutes = [
    route.principal,
    route.register,
    route.orders
]