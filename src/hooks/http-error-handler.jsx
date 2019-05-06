import { useState, useEffect } from 'react'

export default axios => {
  const [error, setError] = useState(null)

  //creates a reference to the request interceptor on the fly
  const reqInterceptor = axios.interceptors.request.use(req => {
    setError(null)
    return req
  })
  //creates a reference to the response interceptor on the fly
  const resInterceptor = axios.interceptors.response.use(
    res => res,
    err => {
      setError(err)
    }
  )

  useEffect(() => {
    return () => {
      axios.interceptors.request.eject(reqInterceptor)
      axios.interceptors.response.eject(resInterceptor)
    }
  }, [])

  const errorConfirmedHandler = () => {
    setError(null)
  }

  return [error, errorConfirmedHandler]
}
