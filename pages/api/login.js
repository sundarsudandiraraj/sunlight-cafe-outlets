import fetch from 'isomorphic-unfetch'
import FormData from 'form-data'

export default async (req, res) => {
    const { username, password, location } = await req.body
    const url = 'https://sunlight-cafe.herokuapp.com/api/v1/login/'

    try {
        let formData = new FormData()
            formData.append('email',username)
            formData.append('password',password)
            formData.append('location',location)

        const response = await fetch(url, {
            method: 'post',
            body: formData,
        })
        if (response.ok) {
        const result = await response.json()
        if(result.message){
            return res.status(400).json({ message: result.message })    
        }else{
            return res.status(200).json({ token: result.token, locationName: result.store })
        }
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