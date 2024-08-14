interface Route {
    login: string
    register: string
    principal: string
}

export const route: Route = {
    login: '/login',
    register: '/register',
    principal: '/principal',
}

export const protectedRoutes = [
    route.principal,
    route.register
]