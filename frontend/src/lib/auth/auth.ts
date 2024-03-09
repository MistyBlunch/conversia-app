export const isAuthenticated = () => {
  return localStorage.getItem('refresh_token')? true : false
}
