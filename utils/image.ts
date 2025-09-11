export function getImage(path: any) {
  if (!path || (Array.isArray(path) && path.length === 0) || (typeof path === 'string' && path.trim() === '')) {
    return '/images/admin-icon.svg'
  }

  const finalPath = Array.isArray(path) ? path[0] : path
  const config = useRuntimeConfig()

  return `${config.public.apiBase}/storage/${finalPath}`
}