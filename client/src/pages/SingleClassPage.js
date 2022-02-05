import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useRoomsContext } from '../context/rooms_context'
import { rooms_url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import axios from 'axios'

import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleClassPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [students, setStudents] = useState([])

  const fetchStudents = async (url) => {
    try {
      const response = await axios.get(url)
      const students = response.data.students
      setStudents(students)
      setLoading(false)
      setError(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    setLoading(true)
    // const url = 'http://localhost:5000/api/v1/students/'
    const url = '/api/v1/students/'
    fetchStudents(url)
  }, [id])

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (error) {
    return <h1>Error, Some Thing Wrong...</h1>
  }


  return <Wrapper>
    <h1>Danh sách sinh viên lớp tiếng nhật {id}</h1>
    <h4><Link to="/">Come Back To Home Page</Link></h4>
    {id === 'a1' ? students.slice(0,20).map((student, index) => {
        return <p key={index}>{index + 1} : {student.name}</p>
      })
      :
      students.slice(20,).map((student, index) => {
        return <p key={index}>{index + 1} : {student.name}</p>
      })
    }
    

  </Wrapper>
}

const Wrapper = styled.main`
  margin-left: 100px;
`

export default SingleClassPage
