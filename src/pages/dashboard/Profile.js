import React from 'react'
import { useState } from 'react'
import { FormRow } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { updateUser } from '../../features/user/userSlice'

function Profile() {
  const { isLoading, user } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const [userDate, setUserDate] = useState({
    name: user?.name || '',
    email: user?.email || '',
    lastName: user?.lastName || '',
    location: user?.location || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const { name, email, lastName, location } = userDate
    if (!name || !email || !lastName || !location) {
      toast.error('please fill out all fields')
      return
    }
    dispatch(updateUser(userDate))
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setUserDate({ ...userDate, [name]: value })
  }

  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={userDate.name}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            value={userDate.lastName}
            handleChange={handleChange}
          />
          <FormRow
            type="email"
            name="email"
            value={userDate.email}
            handleChange={handleChange}
          />
          <FormRow
            type="text"
            name="location"
            value={userDate.location}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? 'Please Wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile
