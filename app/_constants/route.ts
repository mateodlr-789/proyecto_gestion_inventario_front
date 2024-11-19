interface Route {
    login: string
    register: string
    principal: string
    orders:string
    CreateOrder: string
}

export const route: Route = {
    login: '/login',
    register: '/register',
    orders: '/orders',
    principal: '/principal',
    CreateOrder: '/orders/create-order',
}

export const protectedRoutes = [
    route.principal,
    route.register,
    route.orders,
    route.CreateOrder
]