import React from 'react'
import styled from 'styled-components'
import { useUserContext } from '../context/user_context'

const AuthWrapper = ({ children }) => {
  const { isLoading, error } = useUserContext()

  if (isLoading) {
    return <Wrapper>
      <h1>Loading...</h1>
    </Wrapper>
  }


  if (error) {
    console.log('error')
    return <Wrapper>
      <h1>{error.message}</h1>
    </Wrapper> 
  }

  return <>{children}</>
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
`

export default AuthWrapper
