import React from 'react'
import './Header.css'
import SearchIcon from "@mui/icons-material/Search";
import { Avatar } from '@mui/material';
import {useStateValue} from './StateProvider'

function Header() {
    const [{user},dispatch]=useStateValue()
  return (
    <div className='header'>
        <div className='header__left'>
            <SearchIcon/>
            <input
                placeholder='Search for Artists, Songs, or Podcasts '
                type='text'
            />

        </div>
        <div className='header__right'>
            <Avatar src={user?.images[0]?.url} alt='RQ'/>
            <h1>{user?.display_name}</h1>
        </div>
    </div>
  )
}

export default Header