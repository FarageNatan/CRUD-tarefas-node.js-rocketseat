// utils/build-route-path.js
export function buildRoutePath(path) {
    const routeParametersRegex = /:([a-zA-Z]+)/g
    
    // Substitui :id por grupo nomeado
    const pathWithParameters = path.replaceAll(routeParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)')

    // Regex final: começa com a rota, permite query string (?...) no final
    const pathRegex = new RegExp(`^${pathWithParameters}(?:\\?.*)?$`)

    console.log(`Rota compilada: ${path} → ${pathRegex}`) // ← Log para debug

    return pathRegex
}