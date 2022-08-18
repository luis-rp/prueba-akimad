import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './Home'
import { UserInfo } from './UserInfo'

export const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/user/:username" element={<UserInfo />} />
      </Routes>
  )
}
