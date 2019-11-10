import fetch from 'isomorphic-unfetch'
import FormData from 'form-data'

export default async (req, res) => {
  const { endUrl, itemid, storeid, menuid, qty, token } = await req.body

  try {
    let formData = new FormData()
        if(storeid) formData.append('storeid',storeid)
        if(itemid) formData.append('itemid',itemid)
        if(menuid) formData.append('menuid',menuid)
        if(qty) formData.append('qty',qty)
        const AuthStr = 'Bearer: '+ token;

    const response = await fetch(endUrl, {
        method: 'put',
        credentials: 'include',
        headers: {
          Authorization: JSON.stringify({ AuthStr })
        },
        body: formData,
      })
    if (response.ok) {
      const result = await response.json()
      return res.status(200).json({ message: result.message })
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