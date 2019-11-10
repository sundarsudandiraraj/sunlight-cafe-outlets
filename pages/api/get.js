import fetch from 'isomorphic-unfetch'

export default async (req, res) => {
  const { endUrl, token } = await req.body
  try {
    const AuthStr = 'Bearer: '+ token;
    const response = await fetch(endUrl, {
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({ AuthStr })
        },
      })
      // console.log(response)
    if (response.ok) {
      const result = await response.json()
      return res.status(200).json({ data: result })
    } else {
      const error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    const { response } = error
    return response
      ? res.status(response.status).json({ message: response.statusText })
      : res.status(400).json({ message: error.message })
  }
}